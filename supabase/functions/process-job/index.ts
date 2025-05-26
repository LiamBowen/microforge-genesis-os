
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

    const { jobId } = await req.json();
    
    if (!jobId) {
      return new Response(
        JSON.stringify({ error: 'Job ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing job ${jobId}`);
    
    // Get job details
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('*, machines(*)')
      .eq('id', jobId)
      .single();

    if (jobError || !job) {
      console.error('Error fetching job:', jobError);
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log job start event
    await supabase
      .from('machine_events')
      .insert({
        machine_id: job.machine_id,
        event_type: 'job_started',
        message: `Job "${job.name}" started processing`,
        details: { job_id: jobId, file_name: job.file_name }
      });

    // Update job status to running
    await supabase
      .from('jobs')
      .update({ 
        status: 'running', 
        started_at: new Date().toISOString(),
        progress: 0
      })
      .eq('id', jobId);

    // Update machine status
    await supabase
      .from('machines')
      .update({ 
        status: 'running',
        last_started: new Date().toISOString()
      })
      .eq('id', job.machine_id);

    // Start the simulation process
    supabase.functions.invoke('simulate-machine-run', {
      body: { jobId, machineId: job.machine_id }
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Job processing started' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in process-job function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
