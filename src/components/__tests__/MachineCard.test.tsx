
import { render, screen, fireEvent } from '@/test/test-utils'
import MachineCard from '../MachineCard'
import { vi } from 'vitest'

const mockMachine = {
  id: '1',
  name: 'Test Machine',
  machine_type: '3d-printer',
  status: 'idle' as const,
  connectivity: 'agent' as const,
  configuration: {},
  last_started: null,
  last_stopped: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

const mockProps = {
  machine: mockMachine,
  onStart: vi.fn(),
  onStop: vi.fn(),
  onViewLogs: vi.fn(),
  onRefetch: vi.fn(),
}

describe('MachineCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders machine information correctly', () => {
    render(<MachineCard {...mockProps} />)
    
    expect(screen.getByText('Test Machine')).toBeInTheDocument()
    expect(screen.getByText(/3D Printer/)).toBeInTheDocument()
    expect(screen.getByText(/Status: idle/)).toBeInTheDocument()
  })

  it('shows start button when machine is idle', () => {
    render(<MachineCard {...mockProps} />)
    
    const startButton = screen.getByText('Start')
    expect(startButton).toBeInTheDocument()
    
    fireEvent.click(startButton)
    expect(mockProps.onStart).toHaveBeenCalledWith('1')
  })

  it('shows stop button when machine is running', () => {
    const runningMachine = { ...mockMachine, status: 'running' as const }
    render(<MachineCard {...mockProps} machine={runningMachine} />)
    
    const stopButton = screen.getByText('Stop')
    expect(stopButton).toBeInTheDocument()
    
    fireEvent.click(stopButton)
    expect(mockProps.onStop).toHaveBeenCalledWith('1')
  })

  it('shows view logs button', () => {
    render(<MachineCard {...mockProps} />)
    
    const viewLogsButton = screen.getByText('View Logs')
    expect(viewLogsButton).toBeInTheDocument()
    
    fireEvent.click(viewLogsButton)
    expect(mockProps.onViewLogs).toHaveBeenCalledWith('1')
  })
})
