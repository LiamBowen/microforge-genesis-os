
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Machine {
  id: string;
  name: string;
  machine_type: string;
  status: 'idle' | 'running' | 'error' | 'maintenance';
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
  };

  const startMachine = async (machineId: string) => {
    if (!user) return;

    try {
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
  };

  const stopMachine = async (machineId: string) => {
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
  };

  const createMachine = async (name: string, machineType: string) => {
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
  };

  useEffect(() => {
    if (user) {
      fetchMachines();
    }
  }, [user]);

  return {
    machines,
    loading,
    startMachine,
    stopMachine,
    createMachine,
    refetch: fetchMachines
  };
};
