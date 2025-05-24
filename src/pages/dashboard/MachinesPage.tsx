
import React, { useState, useCallback, useMemo } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateMachineDialog from "@/components/CreateMachineDialog";
import MachineLogs from "@/components/MachineLogs";
import MachineCard from "@/components/MachineCard";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useMachines } from "@/hooks/useMachines";

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

  const selectedMachine = useMemo(() => 
    machines.find(m => m.id === selectedMachineForLogs),
    [machines, selectedMachineForLogs]
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Machines</h1>
            <p className="text-gray-400">Manage and monitor your connected devices.</p>
          </div>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Connected Machines</h2>
              <Skeleton className="h-10 w-32 rounded" />
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-lg" />
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
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedMachineForLogs(null)}
              className="border-gray-700"
            >
              ← Back to Machines
            </Button>
            <div>
              <h1 className="text-3xl font-bold mb-1">Machine Logs</h1>
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
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Machines</h1>
          <p className="text-gray-400">Manage and monitor your connected devices.</p>
        </div>

        {/* Dashboard Summary */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <DashboardSummary />
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Connected Machines</h2>
            <CreateMachineDialog onCreateMachine={handleCreateMachine} />
          </div>
          
          {machines.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No machines found. Create your first machine to get started.</p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
