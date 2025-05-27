
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UserInfoSection from "@/components/dashboard/UserInfoSection";
import AgentStatusDisplay from "@/components/AgentStatusDisplay";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Dashboard = () => {
  const stats = [
    { 
      label: "Active Machines", 
      value: "3",
      change: "+1 from yesterday",
      trend: "up"
    },
    { 
      label: "Jobs in Queue", 
      value: "6",
      change: "+2 from last hour", 
      trend: "up"
    },
    { 
      label: "Completed Today", 
      value: "14",
      change: "+8 vs yesterday",
      trend: "up"
    },
    { 
      label: "Downtime Alerts", 
      value: "1",
      change: "Alignment fault",
      trend: "alert"
    },
  ];

  const machineStatus = [
    ["🖨️", "ForgeBot-01", "3D Printer", "Running", "72%", "Housing Shell - v2"],
    ["⚙️", "CNC-Master", "CNC Router", "Idle", "–", "–"],
    ["🔬", "LaserCutter-X", "Laser Cutter", "Error", "–", "Alignment Fault"],
  ];

  const getMachineIcon = (type: string) => {
    switch (type) {
      case "3D Printer": return "🖨️";
      case "CNC Router": return "⚙️";
      case "Laser Cutter": return "🔬";
      default: return "🏭";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-gray-400">Welcome to your MicroForge control center.</p>
          </div>
          <div className="flex items-center gap-4">
            <AgentStatusDisplay />
            <UserInfoSection />
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-4">Factory Overview</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-dark-card border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400">{stat.label}</p>
                    {stat.label === "Downtime Alerts" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                              <span className="text-xs text-white">?</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Machine errors reported in the last 24h</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <h3 className={`text-3xl font-bold ${
                    stat.trend === "alert" ? "text-red-400" : "text-white"
                  }`}>
                    {stat.value}
                  </h3>
                  <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        stat.trend === "up" ? "bg-green-500" : 
                        stat.trend === "alert" ? "bg-red-500" : "bg-gray-600"
                      }`}
                      style={{ width: `${Math.random() * 60 + 20}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card className="bg-dark-card border-gray-800">
            <CardHeader>
              <CardTitle>Live Machine Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-800">
                      <th className="p-3 font-medium text-gray-300">Icon</th>
                      <th className="p-3 font-medium text-gray-300">Machine</th>
                      <th className="p-3 font-medium text-gray-300">Type</th>
                      <th className="p-3 font-medium text-gray-300">Status</th>
                      <th className="p-3 font-medium text-gray-300">Progress</th>
                      <th className="p-3 font-medium text-gray-300">Current Job</th>
                    </tr>
                  </thead>
                  <tbody>
                    {machineStatus.map((row, rowIndex) => (
                      <tr 
                        key={rowIndex} 
                        className="border-b border-gray-800 last:border-0"
                      >
                        {row.map((cell, cellIndex) => (
                          <td 
                            key={cellIndex} 
                            className={`p-3 ${
                              cellIndex === 3 
                                ? cell === "Running" 
                                  ? "text-green-400" 
                                  : cell === "Error" 
                                    ? "text-red-400" 
                                    : ""
                                : ""
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
