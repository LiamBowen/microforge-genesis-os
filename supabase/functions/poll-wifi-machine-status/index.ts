
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { machineId } = await req.json();
    
    if (!machineId) {
      return new Response(
        JSON.stringify({ error: 'Machine ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get machine details
    const { data: machine, error: machineError } = await supabase
      .from('machines')
      .select('*')
      .eq('id', machineId)
      .eq('connectivity', 'wifi')
      .single();

    if (machineError || !machine) {
      return new Response(
        JSON.stringify({ error: 'Wi-Fi machine not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Poll machine status
    const machineUrl = `http://${machine.ip_address}/status`;
    
    try {
      const response = await fetch(machineUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${machine.auth_token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Machine responded with status: ${response.status}`);
      }

      const machineStatus = await response.json();
      
      // Update machine status in database
      await supabase
        .from('machines')
        .update({
          status: machineStatus.status || 'idle',
          last_ping: new Date().toISOString()
        })
        .eq('id', machineId);

      // If there's a job running, update job progress
      if (machineStatus.job_id && machineStatus.progress !== undefined) {
        await supabase
          .from('jobs')
          .update({
            progress: machineStatus.progress
          })
          .eq('id', machineStatus.job_id);
      }

      // Log status update event
      await supabase
        .from('machine_events')
        .insert({
          machine_id: machineId,
          event_type: 'status_update',
          message: `Status updated via Wi-Fi polling: ${machineStatus.status}`,
          details: machineStatus
        });

      return new Response(
        JSON.stringify({ 
          success: true, 
          machine_status: machineStatus,
          message: 'Machine status updated successfully' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (fetchError) {
      console.error('Failed to poll machine status:', fetchError);
      
      // Update machine status to indicate connection issues
      await supabase
        .from('machines')
        .update({
          status: 'error'
        })
        .eq('id', machineId);

      return new Response(
        JSON.stringify({ 
          error: 'Failed to communicate with Wi-Fi machine',
          details: fetchError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in poll-wifi-machine-status function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
