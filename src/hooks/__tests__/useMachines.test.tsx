
import { renderHook, waitFor } from '@/test/test-utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMachines } from '../useMachines'
import { vi } from 'vitest'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

// Mock the AuthContext
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' },
  }),
}))

// Mock the supabase client
const mockSupabase = {
  functions: {
    invoke: vi.fn(),
  },
  auth: {
    getSession: vi.fn().mockResolvedValue({
      data: { session: { access_token: 'mock-token' } }
    }),
  },
}

vi.mock('@/integrations/supabase/client', () => ({
  supabase: mockSupabase,
}))

describe('useMachines', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch machines successfully', async () => {
    const mockMachines = [
      {
        id: '1',
        name: 'Test Machine',
        machine_type: '3d-printer',
        status: 'idle',
        configuration: {},
        last_started: null,
        last_stopped: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
    ]

    mockSupabase.functions.invoke.mockResolvedValue({
      data: { machines: mockMachines },
      error: null,
    })

    const { result } = renderHook(() => useMachines(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.machines).toEqual(mockMachines)
  })

  it('should handle create machine successfully', async () => {
    mockSupabase.functions.invoke.mockResolvedValue({
      data: { success: true },
      error: null,
    })

    const { result } = renderHook(() => useMachines(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    await result.current.createMachine('New Machine', '3d-printer')

    expect(mockSupabase.functions.invoke).toHaveBeenCalledWith('create-machine', {
      body: { name: 'New Machine', machineType: '3d-printer' },
      headers: {
        Authorization: 'Bearer mock-token',
      },
    })
  })
})
