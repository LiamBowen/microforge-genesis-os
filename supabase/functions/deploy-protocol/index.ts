
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';
import { parseBody } from '../_shared/utils.ts';

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

    const authHeader = req.headers.get('Authorization')!;
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { machineId, protocolConfig } = await parseBody(req);
    
    if (!machineId || !protocolConfig) {
      return new Response(
        JSON.stringify({ error: 'Machine ID and protocol configuration are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Deploying protocol to machine: ${machineId}`);
    
    // Update machine with new protocol configuration
    const { data: machineData, error: machineError } = await supabase
      .from('machines')
      .update({ 
        configuration: protocolConfig,
        status: 'deploying',
        updated_at: new Date().toISOString()
      })
      .eq('id', machineId)
      .eq('user_id', user.id)
      .select();

    if (machineError || !machineData.length) {
      console.error('Database error:', machineError);
      return new Response(
        JSON.stringify({ error: 'Failed to update machine or unauthorized' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log the deployment event
    await supabase.from('machine_events').insert({
      machine_id: machineId,
      event_type: 'deploy',
      details: `Protocol deployed: ${protocolConfig.name || 'Unknown'}`
    });

    return new Response(
      JSON.stringify({ success: true, machine: machineData[0] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in deploy-protocol function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
