
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, AlertTriangle, Clock } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AgentStatus {
  factory_name: string;
  machine_name: string;
  machine_id: string;
  last_ping: string | null;
  agent_version: string;
  error_count: number;
  user_email: string;
  is_online: boolean;
}

const AdminAgentStatusPage = () => {
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAgentStatuses = async () => {
    try {
      // Get recent agent pings with machine and user info
      const { data: recentPings } = await supabase
        .from('machine_events')
        .select(`
          machine_id,
          created_at,
          details,
          machines!inner(
            name,
            user_id
          )
        `)
        .eq('event_type', 'agent_ping')
        .order('created_at', { ascending: false });

      // Get error counts per machine
      const { data: errorCounts } = await supabase
        .from('machine_events')
        .select('machine_id')
        .eq('event_type', 'error')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()); // Last 24 hours

      // Process data to create agent status summary
      const statusMap = new Map<string, AgentStatus>();

      // Process pings
      recentPings?.forEach((ping) => {
        const machineId = ping.machine_id;
        const isRecent = new Date(ping.created_at).getTime() > Date.now() - 5 * 60 * 1000; // 5 minutes

        if (!statusMap.has(machineId)) {
          statusMap.set(machineId, {
            factory_name: "Factory Alpha", // Mock factory name
            machine_name: ping.machines.name,
            machine_id: machineId,
            last_ping: ping.created_at,
            agent_version: ping.details?.agent_version || "1.0.0",
            error_count: 0,
            user_email: "user@example.com", // Would need to join with user data
            is_online: isRecent
          });
        }
      });

      // Add error counts
      const errorCountMap = new Map<string, number>();
      errorCounts?.forEach((error) => {
        const count = errorCountMap.get(error.machine_id) || 0;
        errorCountMap.set(error.machine_id, count + 1);
      });

      // Update status with error counts
      statusMap.forEach((status, machineId) => {
        status.error_count = errorCountMap.get(machineId) || 0;
      });

      setAgentStatuses(Array.from(statusMap.values()));
    } catch (error) {
      console.error('Error fetching agent statuses:', error);
      toast({
        title: "Error",
        description: "Failed to fetch agent statuses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentStatuses();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchAgentStatuses, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatLastPing = (lastPing: string | null) => {
    if (!lastPing) return "Never";
    
    const diff = Date.now() - new Date(lastPing).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getStatusBadge = (isOnline: boolean, errorCount: number) => {
    if (errorCount > 5) {
      return (
        <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
          <AlertTriangle size={12} className="mr-1" />
          Critical
        </Badge>
      );
    }
    
    if (!isOnline) {
      return (
        <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
          <WifiOff size={12} className="mr-1" />
          Offline
        </Badge>
      );
    }
    
    return (
      <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
        <Wifi size={12} className="mr-1" />
        Online
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-1">Agent Reliability Dashboard</h1>
            <p className="text-gray-400">Monitor all MicroForge Agent installations across pilot factories.</p>
          </div>
          <div className="text-sm text-gray-400">
            <Clock size={16} className="inline mr-1" />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        <section>
          <Card className="bg-dark-card border-gray-800">
            <CardHeader>
              <CardTitle>Agent Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-lime"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead>Factory</TableHead>
                      <TableHead>Machine</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Ping</TableHead>
                      <TableHead>Agent Version</TableHead>
                      <TableHead>24h Errors</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agentStatuses.map((status) => (
                      <TableRow key={status.machine_id} className="border-gray-800">
                        <TableCell>
                          <div>
                            <div className="font-medium">{status.factory_name}</div>
                            <div className="text-sm text-gray-500">{status.user_email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{status.machine_name}</div>
                          <div className="text-xs text-gray-500">{status.machine_id.slice(0, 8)}...</div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(status.is_online, status.error_count)}
                        </TableCell>
                        <TableCell>{formatLastPing(status.last_ping)}</TableCell>
                        <TableCell>
                          <code className="px-2 py-1 bg-gray-800 rounded text-xs">
                            v{status.agent_version}
                          </code>
                        </TableCell>
                        <TableCell>
                          {status.error_count > 0 ? (
                            <span className="text-red-400 font-medium">{status.error_count}</span>
                          ) : (
                            <span className="text-gray-500">0</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {agentStatuses.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No agent installations found. Deploy agents to see monitoring data here.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AdminAgentStatusPage;
