
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Machine {
  id: string;
  name: string;
  machine_type: string;
  status: 'idle' | 'running' | 'error' | 'maintenance';
  connectivity: 'agent' | 'wifi';
  ip_address?: string;
  auth_token?: string;
  last_ping?: string;
  configuration: any;
  last_started: string | null;
  last_stopped: string | null;
  created_at: string;
  updated_at: string;
}

export const useMachines = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchMachines = async () => {
    // Temporarily bypass authentication for development
    // TODO: Re-enable authentication when ready for production
    setLoading(false);
    return;
    
    /* Original auth logic - commented out for now
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('get-user-machines', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });
      
      if (error) {
        console.error('Error fetching machines:', error);
        toast({
          title: "Error",
          description: "Failed to fetch machines",
          variant: "destructive",
        });
        return;
      }

      setMachines(data.machines || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch machines",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
    */
  };

  const startMachine = async (machineId: string) => {
    // Temporarily bypass authentication for development
    toast({
      title: "Demo Mode",
      description: "Machine start simulated (auth disabled)",
    });
    return;
    
    /* Original auth logic - commented out for now
    if (!user) return;

    try {
      const machine = machines.find(m => m.id === machineId);
      
      if (machine?.connectivity === 'wifi') {
        // Use Wi-Fi job dispatch
        const { data, error } = await supabase.functions.invoke('dispatch-job-to-wifi', {
          body: { machineId, jobId: 'demo-job-id' },
          headers: {
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
        });

        if (error) {
          console.error('Error starting Wi-Fi machine:', error);
          toast({
            title: "Error",
            description: "Failed to start Wi-Fi machine",
            variant: "destructive",
          });
          return;
        }
      } else {
        // Use agent-based start
        const { data, error } = await supabase.functions.invoke('start-machine', {
          body: { machineId },
          headers: {
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
        });

        if (error) {
          console.error('Error starting machine:', error);
          toast({
            title: "Error",
            description: "Failed to start machine",
            variant: "destructive",
          });
          return;
        }
      }

      toast({
        title: "Success",
        description: "Machine started successfully",
      });

      // Refresh machines list
      fetchMachines();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to start machine",
        variant: "destructive",
      });
    }
    */
  };

  const stopMachine = async (machineId: string) => {
    // Temporarily bypass authentication for development
    toast({
      title: "Demo Mode",
      description: "Machine stop simulated (auth disabled)",
    });
    return;
    
    /* Original auth logic - commented out for now
    if (!user) return;

    try {
      const { data, error } = await supabase.functions.invoke('stop-machine', {
        body: { machineId },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error('Error stopping machine:', error);
        toast({
          title: "Error",
          description: "Failed to stop machine",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Machine stopped successfully",
      });

      // Refresh machines list
      fetchMachines();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to stop machine",
        variant: "destructive",
      });
    }
    */
  };

  const createMachine = async (name: string, machineType: string) => {
    // Temporarily bypass authentication for development
    toast({
      title: "Demo Mode",
      description: "Machine creation simulated (auth disabled)",
    });
    return;
    
    /* Original auth logic - commented out for now
    if (!user) return;

    try {
      const { data, error } = await supabase.functions.invoke('create-machine', {
        body: { name, machineType },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error('Error creating machine:', error);
        toast({
          title: "Error",
          description: "Failed to create machine",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Machine created successfully",
      });

      // Refresh machines list
      fetchMachines();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create machine",
        variant: "destructive",
      });
    }
    */
  };

  useEffect(() => {
    // Temporarily bypass user check for development
    fetchMachines();
    
    /* Original auth logic - commented out for now
    if (user) {
      fetchMachines();
    }
    */
  }, []);

  return {
    machines,
    loading,
    startMachine,
    stopMachine,
    createMachine,
    refetch: fetchMachines
  };
};
