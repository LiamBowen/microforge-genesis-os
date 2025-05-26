
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the user from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { machine_id, serial_port = '/dev/ttyUSB0', baud_rate = 115200, regenerate = false } = await req.json();

    if (!machine_id) {
      return new Response(
        JSON.stringify({ error: 'Machine ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify user owns the machine
    const { data: machine, error: machineError } = await supabase
      .from('machines')
      .select('*')
      .eq('id', machine_id)
      .eq('user_id', user.id)
      .single();

    if (machineError || !machine) {
      return new Response(
        JSON.stringify({ error: 'Machine not found or access denied' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate machine-scoped JWT token
    // For now, we'll use the anon key - in production you'd generate a more restricted token
    const machineToken = Deno.env.get('SUPABASE_ANON_KEY') ?? '';

    // Generate configuration
    const config = {
      machine_id: machine_id,
      machine_name: machine.name,
      supabase_url: Deno.env.get('SUPABASE_URL'),
      supabase_key: machineToken,
      serial_port: serial_port,
      baud_rate: baud_rate,
      user_id: user.id,
      generated_at: new Date().toISOString(),
      version: "1.0.0"
    };

    // Log the configuration generation
    await supabase
      .from('machine_events')
      .insert({
        machine_id: machine_id,
        event_type: regenerate ? 'config_regenerated' : 'config_generated',
        message: `Agent configuration ${regenerate ? 'regenerated' : 'generated'} for ${machine.name}`,
        details: { 
          serial_port, 
          baud_rate,
          user_id: user.id 
        }
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        config: config,
        message: 'Agent configuration generated successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-agent-config function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
