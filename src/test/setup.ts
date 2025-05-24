
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Add vitest globals to global scope
declare global {
  var describe: typeof import('vitest').describe
  var it: typeof import('vitest').it
  var expect: typeof import('vitest').expect
  var beforeEach: typeof import('vitest').beforeEach
  var afterEach: typeof import('vitest').afterEach
  var beforeAll: typeof import('vitest').beforeAll
  var afterAll: typeof import('vitest').afterAll
}

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: { session: { access_token: 'mock-token' } }
      }),
      onAuthStateChange: vi.fn(),
    },
    functions: {
      invoke: vi.fn(),
    },
  },
}))

// Mock React Router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/' }),
  }
})
