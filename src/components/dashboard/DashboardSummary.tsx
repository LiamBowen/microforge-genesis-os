
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Server, 
  FileText, 
  Play, 
  Square, 
  AlertCircle, 
  Wrench 
} from "lucide-react";

interface DashboardStats {
  totalMachines: number;
  totalProtocols: number;
  runningMachines: number;
  idleMachines: number;
  errorMachines: number;
  maintenanceMachines: number;
}

const DashboardSummary = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalMachines: 0,
    totalProtocols: 0,
    runningMachines: 0,
    idleMachines: 0,
    errorMachines: 0,
    maintenanceMachines: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchStats = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Fetch machines data
      const { data: machines, error: machinesError } = await supabase
        .from('machines')
        .select('status')
        .eq('user_id', user.id);

      if (machinesError) {
        console.error('Error fetching machines:', machinesError);
        return;
      }

      // Fetch protocols data
      const { data: protocols, error: protocolsError } = await supabase
        .from('protocols')
        .select('id')
        .eq('created_by', user.id);

      if (protocolsError) {
        console.error('Error fetching protocols:', protocolsError);
        return;
      }

      // Calculate stats
      const totalMachines = machines?.length || 0;
      const totalProtocols = protocols?.length || 0;
      
      const statusCounts = machines?.reduce((acc, machine) => {
        acc[machine.status] = (acc[machine.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      setStats({
        totalMachines,
        totalProtocols,
        runningMachines: statusCounts.running || 0,
        idleMachines: statusCounts.idle || 0,
        errorMachines: statusCounts.error || 0,
        maintenanceMachines: statusCounts.maintenance || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchStats, 10000);
    
    return () => clearInterval(interval);
  }, [user]);

  const statCards = [
    {
      title: "Total Machines",
      value: stats.totalMachines,
      icon: Server,
      color: "text-blue-500",
    },
    {
      title: "Total Protocols",
      value: stats.totalProtocols,
      icon: FileText,
      color: "text-purple-500",
    },
    {
      title: "Running",
      value: stats.runningMachines,
      icon: Play,
      color: "text-green-500",
    },
    {
      title: "Idle",
      value: stats.idleMachines,
      icon: Square,
      color: "text-gray-500",
    },
    {
      title: "Error",
      value: stats.errorMachines,
      icon: AlertCircle,
      color: "text-red-500",
    },
    {
      title: "Maintenance",
      value: stats.maintenanceMachines,
      icon: Wrench,
      color: "text-yellow-500",
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="bg-dark-card border-gray-800">
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <stat.icon size={20} className={stat.color} />
              <div>
                <p className="text-sm text-gray-400 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardSummary;
