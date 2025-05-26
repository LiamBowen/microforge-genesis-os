
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Job {
  id: string;
  user_id: string;
  machine_id: string;
  name: string;
  file_url: string | null;
  file_name: string | null;
  status: 'queued' | 'running' | 'completed' | 'error';
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  error_message: string | null;
  progress: number | null;
}

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchJobs = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error",
          description: "Failed to fetch jobs",
          variant: "destructive",
        });
        return;
      }

      setJobs(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch jobs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${user.id}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('gcode-files')
        .upload(filePath, file);

      if (error) {
        console.error('Error uploading file:', error);
        toast({
          title: "Error",
          description: "Failed to upload file",
          variant: "destructive",
        });
        return null;
      }

      return data.path;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
      return null;
    }
  };

  const submitJob = async (name: string, machineId: string, file: File): Promise<boolean> => {
    if (!user) return false;

    try {
      // Upload file first
      const filePath = await uploadFile(file);
      if (!filePath) return false;

      // Create job record
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          name,
          machine_id: machineId,
          file_url: filePath,
          file_name: file.name,
          user_id: user.id,
          status: 'queued'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating job:', error);
        toast({
          title: "Error",
          description: "Failed to create job",
          variant: "destructive",
        });
        return false;
      }

      // Start job processing
      await supabase.functions.invoke('process-job', {
        body: { jobId: data.id }
      });

      toast({
        title: "Success",
        description: "Job submitted successfully",
      });

      return true;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to submit job",
        variant: "destructive",
      });
      return false;
    }
  };

  const cancelJob = async (jobId: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ status: 'error', error_message: 'Cancelled by user' })
        .eq('id', jobId);

      if (error) {
        console.error('Error cancelling job:', error);
        toast({
          title: "Error",
          description: "Failed to cancel job",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Job cancelled successfully",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to cancel job",
        variant: "destructive",
      });
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    // Subscribe to job changes
    const jobsChannel = supabase
      .channel('jobs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jobs',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Job update:', payload);
          fetchJobs(); // Refresh jobs list
          
          // Show toast for status changes
          if (payload.eventType === 'UPDATE' && payload.new) {
            const job = payload.new as Job;
            if (job.status === 'completed') {
              toast({
                title: "Job Completed",
                description: `${job.name} has finished successfully`,
              });
            } else if (job.status === 'error') {
              toast({
                title: "Job Failed",
                description: `${job.name} encountered an error: ${job.error_message}`,
                variant: "destructive",
              });
            } else if (job.status === 'running') {
              toast({
                title: "Job Started",
                description: `${job.name} is now running`,
              });
            }
          }
        }
      )
      .subscribe();

    // Subscribe to machine events for additional feedback
    const eventsChannel = supabase
      .channel('machine-events')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'machine_events'
        },
        (payload) => {
          console.log('Machine event:', payload);
          const event = payload.new;
          if (event.event_type === 'error') {
            toast({
              title: "Machine Error",
              description: event.message,
              variant: "destructive",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(jobsChannel);
      supabase.removeChannel(eventsChannel);
    };
  }, [user]);

  useEffect(() => {
    fetchJobs();
  }, [user]);

  return {
    jobs,
    loading,
    submitJob,
    cancelJob,
    refetch: fetchJobs
  };
};
