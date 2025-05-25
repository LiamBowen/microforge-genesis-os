
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface MachineLog {
  id: string;
  machine_id: string;
  event_type: string;
  message: string;
  created_at: string;
  details: any;
}

export const useMachineLogs = (machineId: string, limit: number = 20) => {
  const [logs, setLogs] = useState<MachineLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchLogs = async () => {
    // Temporarily bypass authentication for development
    // TODO: Re-enable authentication when ready for production
    setLoading(false);
    return;
    
    /* Original auth logic - commented out for now
    if (!user || !machineId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const url = new URL(`https://xsszkljybkvblexuampr.supabase.co/functions/v1/get-recent-logs`);
      url.searchParams.set('machineId', machineId);
      url.searchParams.set('limit', limit.toString());

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLogs(data.logs || []);
    } catch (error) {
      console.error('Error fetching machine logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch machine logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
    */
  };

  useEffect(() => {
    // Temporarily bypass user check for development
    if (machineId) {
      fetchLogs();
    }
    
    /* Original auth logic - commented out for now
    if (user && machineId) {
      fetchLogs();
    }
    */
  }, [machineId, limit]);

  return {
    logs,
    loading,
    refetch: fetchLogs
  };
};
