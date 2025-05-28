
import React, { useState, useCallback, useMemo } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateMachineDialog from "@/components/CreateMachineDialog";
import CreateWiFiMachineDialog from "@/components/CreateWiFiMachineDialog";
import MachineLogs from "@/components/MachineLogs";
import MachineCard from "@/components/MachineCard";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useMachines } from "@/hooks/useMachines";
import { ArrowLeft } from "lucide-react";

const MachinesPage = () => {
  const { machines, loading, startMachine, stopMachine, createMachine, refetch } = useMachines();
  const [selectedMachineForLogs, setSelectedMachineForLogs] = useState<string | null>(null);

  const handleStart = useCallback((id: string) => {
    startMachine(id);
  }, [startMachine]);

  const handleStop = useCallback((id: string) => {
    stopMachine(id);
  }, [stopMachine]);

  const handleViewLogs = useCallback((id: string) => {
    setSelectedMachineForLogs(id);
  }, []);

  const handleCreateMachine = useCallback((name: string, machineType: string) => {
    createMachine(name, machineType);
  }, [createMachine]);

  const handleCreateWiFiMachine = useCallback(() => {
    refetch();
  }, [refetch]);

  const selectedMachine = useMemo(() => 
    machines.find(m => m.id === selectedMachineForLogs),
    [machines, selectedMachineForLogs]
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Machines</h1>
            <p className="text-gray-400">Manage and monitor your connected devices.</p>
          </div>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Overview</h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg bg-gray-800" />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Connected Machines</h2>
              <Skeleton className="h-10 w-32 rounded bg-gray-800" />
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg bg-gray-800" />
              ))}
            </div>
          </section>
        </div>
      </DashboardLayout>
    );
  }

  // If a machine is selected for logs, show the logs view
  if (selectedMachineForLogs) {
    return (
      <DashboardLayout>
        <div className="space-y-8 p-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedMachineForLogs(null)}
              className="border-gray-700 hover:bg-gray-800 flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Back to Machines</span>
            </Button>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-white">Machine Logs</h1>
              <p className="text-gray-400">View recent events and activities.</p>
            </div>
          </div>
          <MachineLogs 
            machineId={selectedMachineForLogs} 
            machineName={selectedMachine?.name}
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Machines</h1>
          <p className="text-gray-400">Manage and monitor your connected devices.</p>
        </div>

        {/* Dashboard Summary */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Overview</h2>
          <DashboardSummary />
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Connected Machines</h2>
            <div className="flex gap-3">
              <CreateMachineDialog onCreateMachine={handleCreateMachine} />
              <CreateWiFiMachineDialog onCreateMachine={handleCreateWiFiMachine} />
            </div>
          </div>
          
          {machines.length === 0 ? (
            <div className="text-center py-12 bg-gray-900/30 rounded-lg border border-gray-800">
              <div className="space-y-3">
                <p className="text-gray-400 text-lg">No machines found</p>
                <p className="text-gray-500 text-sm">Create your first machine to get started.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {machines.map((machine) => (
                <MachineCard
                  key={machine.id}
                  machine={machine}
                  onStart={handleStart}
                  onStop={handleStop}
                  onViewLogs={handleViewLogs}
                  onRefetch={refetch}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default MachinesPage;
