
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

    const { machineId, protocolId, protocolConfig } = await parseBody(req);
    
    if (!machineId || (!protocolId && !protocolConfig)) {
      return new Response(
        JSON.stringify({ error: 'Machine ID and either protocol ID or protocol configuration are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Deploying protocol to machine: ${machineId}`);
    
    let deploymentData;
    
    if (protocolId) {
      // Deploy existing protocol
      const { data, error } = await supabase
        .from('protocol_deployments')
        .insert({
          machine_id: machineId,
          protocol_id: protocolId,
          status: 'active'
        })
        .select();

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to deploy protocol' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      deploymentData = data[0];
    } else {
      // Create new protocol and deploy it
      const { data: protocolData, error: protocolError } = await supabase
        .from('protocols')
        .insert({
          name: protocolConfig.name || 'Custom Protocol',
          description: protocolConfig.description || '',
          configuration: protocolConfig,
          created_by: user.id
        })
        .select();

      if (protocolError) {
        console.error('Protocol creation error:', protocolError);
        return new Response(
          JSON.stringify({ error: 'Failed to create protocol' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Deploy the newly created protocol
      const { data: deployData, error: deployError } = await supabase
        .from('protocol_deployments')
        .insert({
          machine_id: machineId,
          protocol_id: protocolData[0].id,
          status: 'active'
        })
        .select();

      if (deployError) {
        console.error('Deployment error:', deployError);
        return new Response(
          JSON.stringify({ error: 'Failed to deploy protocol' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      deploymentData = deployData[0];
    }

    // Log the deployment event
    await supabase.from('machine_events').insert({
      machine_id: machineId,
      event_type: 'protocol_deployed',
      message: `Protocol deployment completed`,
      details: { deployment_id: deploymentData.id }
    });

    return new Response(
      JSON.stringify({ success: true, deployment: deploymentData }),
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
