
# MicroForge Backend

A scalable backend infrastructure for MicroForge using Deno and Supabase Edge Functions. This backend provides machine management, protocol deployment, and event logging capabilities.

## 🏗️ Project Overview

MicroForge Backend is built with:
- **Deno** - Modern JavaScript/TypeScript runtime
- **Supabase Edge Functions** - Serverless functions at the edge
- **PostgreSQL** - Robust database with real-time capabilities
- **Row Level Security (RLS)** - Fine-grained access control

## 📁 Project Structure

```
/microforge-backend
├── supabase/
│   ├── functions/
│   │   ├── start-machine/         # Start a machine instance
│   │   ├── stop-machine/          # Stop a machine instance
│   │   ├── get-machine-status/    # Get machine status and info
│   │   ├── log-machine-event/     # Log machine events
│   │   ├── get-user-machines/     # Get user's machines
│   │   ├── create-machine/        # Create new machine
│   │   ├── deploy-protocol/       # Deploy protocols to machines
│   │   ├── get-recent-logs/       # Get recent machine logs
│   │   └── _shared/
│   │       └── utils.ts           # Shared utility functions
│   └── config.toml                # Supabase configuration
└── README.md                      # This file
```

## 🚀 Setup Instructions

### Prerequisites

1. **Supabase CLI** - Install from [supabase.com/docs/guides/cli](https://supabase.com/docs/guides/cli)
2. **Deno** - Install from [deno.land](https://deno.land/manual/getting_started/installation)
3. **Supabase Project** - Create at [supabase.com](https://supabase.com)

### Database Setup

Before deploying functions, set up the required database tables:

```sql
-- Create machines table
CREATE TABLE machines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'stopped',
  configuration JSONB DEFAULT '{}',
  last_started TIMESTAMPTZ,
  last_stopped TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create machine events table
CREATE TABLE machine_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id UUID REFERENCES machines(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE machine_events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own machines" ON machines
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view events for their machines" ON machine_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM machines 
      WHERE machines.id = machine_events.machine_id 
      AND machines.user_id = auth.uid()
    )
  );
```

### Local Development

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd microforge-backend
   ```

2. **Start Supabase locally:**
   ```bash
   supabase start
   ```

3. **Link to your project:**
   ```bash
   supabase link --project-ref YOUR_PROJECT_ID
   ```

## 🚢 Deployment Guide

### Deploy All Functions

```bash
# Deploy all functions at once
supabase functions deploy

# Or deploy specific functions
supabase functions deploy start-machine
supabase functions deploy stop-machine
supabase functions deploy get-machine-status
```

### Environment Variables

The functions automatically use these Supabase environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (for admin operations)

No additional setup required - these are provided by Supabase automatically.

### Function URLs

After deployment, your functions will be available at:
```
https://YOUR_PROJECT_ID.supabase.co/functions/v1/FUNCTION_NAME
```

Example:
```
https://xsszkljybkvblexuampr.supabase.co/functions/v1/start-machine
```

## 🔌 API Endpoints

### Machine Management

#### Start Machine
```http
POST /functions/v1/start-machine
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "machineId": "uuid"
}
```

#### Stop Machine
```http
POST /functions/v1/stop-machine
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "machineId": "uuid"
}
```

#### Get Machine Status
```http
GET /functions/v1/get-machine-status?machineId=uuid
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Create Machine
```http
POST /functions/v1/create-machine
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "name": "My Machine",
  "configuration": {
    "cpu": "2",
    "memory": "4GB"
  }
}
```

#### Get User Machines
```http
GET /functions/v1/get-user-machines
Authorization: Bearer YOUR_JWT_TOKEN
```

### Protocol Deployment

#### Deploy Protocol
```http
POST /functions/v1/deploy-protocol
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "machineId": "uuid",
  "protocolConfig": {
    "name": "My Protocol",
    "version": "1.0.0",
    "settings": {}
  }
}
```

### Logging & Events

#### Log Machine Event
```http
POST /functions/v1/log-machine-event
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "machineId": "uuid",
  "eventType": "custom_event",
  "details": "Event description"
}
```

#### Get Recent Logs
```http
GET /functions/v1/get-recent-logs?machineId=uuid&limit=50
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🔐 Authentication

All endpoints (except health checks) require authentication. Include the JWT token in the Authorization header:

```javascript
// Frontend example
const { data: { session } } = await supabase.auth.getSession();
const response = await fetch('/functions/v1/start-machine', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ machineId: 'uuid' })
});
```

## 🛠️ Development

### Shared Utilities

The `_shared/utils.ts` file provides common functions:

- `parseBody(req)` - Parse request body (JSON/form data)
- `validateRequired(data, fields)` - Validate required fields
- `createErrorResponse(message, status)` - Create error responses
- `createSuccessResponse(data, status)` - Create success responses

### Local Testing

```bash
# Serve functions locally
supabase functions serve

# Test with curl
curl -X POST 'http://localhost:54321/functions/v1/start-machine' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"machineId": "test-uuid"}'
```

### Logs and Debugging

View function logs:
```bash
# Real-time logs
supabase functions logs --follow

# Specific function logs
supabase functions logs start-machine
```

## 🔄 Frontend Integration

### React/TypeScript Example

```typescript
import { supabase } from './supabase-client';

// Start a machine
export const startMachine = async (machineId: string) => {
  const { data, error } = await supabase.functions.invoke('start-machine', {
    body: { machineId }
  });
  
  if (error) throw error;
  return data;
};

// Get user machines
export const getUserMachines = async () => {
  const { data, error } = await supabase.functions.invoke('get-user-machines');
  
  if (error) throw error;
  return data.machines;
};
```

## 📊 Monitoring

Monitor your functions in the Supabase Dashboard:
1. Go to Functions section
2. View execution logs, errors, and metrics
3. Set up alerts for function failures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `supabase functions serve`
5. Deploy and test in staging environment
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

---

**Need help?** Check the [Supabase Functions documentation](https://supabase.com/docs/guides/functions) or open an issue.
