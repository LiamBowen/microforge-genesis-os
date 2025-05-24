
/**
 * Shared utility functions for MicroForge Edge Functions
 */

export async function parseBody(req: Request): Promise<any> {
  try {
    const contentType = req.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      return await req.json();
    }
    
    if (contentType?.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      const result: Record<string, any> = {};
      for (const [key, value] of formData.entries()) {
        result[key] = value;
      }
      return result;
    }
    
    // Default to JSON parsing
    return await req.json();
  } catch (error) {
    console.error('Error parsing request body:', error);
    throw new Error('Invalid request body format');
  }
}

export function validateRequired(data: any, fields: string[]): string | null {
  for (const field of fields) {
    if (!data[field]) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
}

export function createErrorResponse(message: string, status = 400) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
  
  return new Response(
    JSON.stringify({ error: message }),
    { 
      status, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}

export function createSuccessResponse(data: any, status = 200) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
  
  return new Response(
    JSON.stringify(data),
    { 
      status, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}
