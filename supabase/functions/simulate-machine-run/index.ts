
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

    console.log(`Simulating machine run for job ${jobId} on machine ${machineId}`);
    
    // Simulate job progression with random completion time (30-120 seconds)
    const completionTime = Math.random() * 90000 + 30000; // 30-120 seconds in milliseconds
    const progressInterval = completionTime / 100; // Update progress every 1% completion
    
    // Background task to simulate job progress
    const simulateProgress = async () => {
      try {
        for (let progress = 0; progress <= 100; progress += Math.random() * 10 + 5) {
          // Check if job still exists and is running
          const { data: currentJob } = await supabase
            .from('jobs')
            .select('status')
            .eq('id', jobId)
            .single();

          if (!currentJob || currentJob.status !== 'running') {
            console.log(`Job ${jobId} was cancelled or completed externally`);
            return;
          }

          // Update progress
          const actualProgress = Math.min(100, Math.round(progress));
          await supabase
            .from('jobs')
            .update({ progress: actualProgress })
            .eq('id', jobId);

          // Log progress events occasionally
          if (actualProgress % 25 === 0 && actualProgress > 0) {
            await supabase
              .from('machine_events')
              .insert({
                machine_id: machineId,
                event_type: 'progress_update',
                message: `Job progress: ${actualProgress}%`,
                details: { job_id: jobId, progress: actualProgress }
              });
          }

          // Small chance of error (5%)
          if (Math.random() < 0.05 && progress > 20) {
            await supabase
              .from('jobs')
              .update({ 
                status: 'error',
                error_message: 'Simulated machine error: Tool break detected',
                completed_at: new Date().toISOString()
              })
              .eq('id', jobId);

            await supabase
              .from('machine_events')
              .insert({
                machine_id: machineId,
                event_type: 'error',
                message: 'Machine error: Tool break detected',
                details: { job_id: jobId, error_type: 'tool_break' }
              });

            // Reset machine status
            await supabase
              .from('machines')
              .update({ 
                status: 'error',
                last_stopped: new Date().toISOString()
              })
              .eq('id', machineId);

            return;
          }

          if (actualProgress >= 100) break;
          
          // Wait before next update
          await new Promise(resolve => setTimeout(resolve, progressInterval));
        }

        // Complete the job
        await supabase
          .from('jobs')
          .update({ 
            status: 'completed',
            progress: 100,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);

        // Log completion event
        await supabase
          .from('machine_events')
          .insert({
            machine_id: machineId,
            event_type: 'job_completed',
            message: `Job completed successfully`,
            details: { job_id: jobId }
          });

        // Reset machine status to idle
        await supabase
          .from('machines')
          .update({ 
            status: 'idle',
            last_stopped: new Date().toISOString()
          })
          .eq('id', machineId);

        console.log(`Job ${jobId} completed successfully`);

      } catch (error) {
        console.error('Error in job simulation:', error);
        
        // Mark job as error
        await supabase
          .from('jobs')
          .update({ 
            status: 'error',
            error_message: `Simulation error: ${error.message}`,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);

        // Reset machine status
        await supabase
          .from('machines')
          .update({ 
            status: 'error',
            last_stopped: new Date().toISOString()
          })
          .eq('id', machineId);
      }
    };

    // Start simulation in background
    simulateProgress();

    return new Response(
      JSON.stringify({ success: true, message: 'Machine simulation started' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in simulate-machine-run function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
