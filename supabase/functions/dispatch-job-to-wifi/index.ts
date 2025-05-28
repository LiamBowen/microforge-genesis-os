
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

    const { jobId, machineId } = await req.json();
    
    if (!jobId || !machineId) {
      return new Response(
        JSON.stringify({ error: 'Job ID and Machine ID are required' }),
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

    // Get job details
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (jobError || !job) {
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare job payload for the machine
    const jobPayload = {
      job_id: jobId,
      name: job.name,
      file_name: job.file_name,
      file_url: job.file_url,
      gcode: "G28 ; Home all axes\nG1 X10 Y10 Z10 ; Move to position\n; Additional G-code here", // Placeholder G-code
      estimated_duration: 120, // minutes
      created_at: new Date().toISOString()
    };

    // Send job to Wi-Fi machine
    const machineUrl = `http://${machine.ip_address}/run-job`;
    
    try {
      const response = await fetch(machineUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${machine.auth_token}`
        },
        body: JSON.stringify(jobPayload)
      });

      if (!response.ok) {
        throw new Error(`Machine responded with status: ${response.status}`);
      }

      // Update job status to running
      await supabase
        .from('jobs')
        .update({ 
          status: 'running', 
          started_at: new Date().toISOString() 
        })
        .eq('id', jobId);

      // Update machine status
      await supabase
        .from('machines')
        .update({ 
          status: 'running',
          last_started: new Date().toISOString(),
          last_ping: new Date().toISOString()
        })
        .eq('id', machineId);

      // Log the event
      await supabase
        .from('machine_events')
        .insert({
          machine_id: machineId,
          event_type: 'job_dispatched',
          message: `Job "${job.name}" dispatched to Wi-Fi machine`,
          details: { job_id: jobId, dispatch_method: 'wifi' }
        });

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Job dispatched to Wi-Fi machine successfully' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (fetchError) {
      console.error('Failed to dispatch job to machine:', fetchError);
      
      // Update job status to error
      await supabase
        .from('jobs')
        .update({ 
          status: 'error',
          error_message: `Failed to dispatch to Wi-Fi machine: ${fetchError.message}`
        })
        .eq('id', jobId);

      return new Response(
        JSON.stringify({ 
          error: 'Failed to communicate with Wi-Fi machine',
          details: fetchError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in dispatch-job-to-wifi function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
