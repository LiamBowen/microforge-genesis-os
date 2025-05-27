
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UserInfoSection from "@/components/dashboard/UserInfoSection";
import AgentStatusDisplay from "@/components/AgentStatusDisplay";
import StatsCard from "@/components/dashboard/StatsCard";
import MachineStatusTable from "@/components/dashboard/MachineStatusTable";

const Dashboard = () => {
  const stats = [
    { 
      label: "Active Machines", 
      value: "3",
      change: "+1 from yesterday",
      trend: "up" as const
    },
    { 
      label: "Jobs in Queue", 
      value: "6",
      change: "+2 from last hour", 
      trend: "up" as const
    },
    { 
      label: "Completed Today", 
      value: "14",
      change: "+8 vs yesterday",
      trend: "up" as const
    },
    { 
      label: "Downtime Alerts", 
      value: "1",
      change: "Alignment fault",
      trend: "alert" as const,
      showTooltip: true,
      tooltipText: "Machine errors reported in the last 24h"
    },
  ];

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
              <StatsCard
                key={index}
                label={stat.label}
                value={stat.value}
                change={stat.change}
                trend={stat.trend}
                showTooltip={stat.showTooltip}
                tooltipText={stat.tooltipText}
              />
            ))}
          </div>
        </section>

        <section>
          <MachineStatusTable />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
