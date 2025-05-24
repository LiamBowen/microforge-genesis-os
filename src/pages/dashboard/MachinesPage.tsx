
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateMachineDialog from "@/components/CreateMachineDialog";
import { useMachines } from "@/hooks/useMachines";
import { Play, Square, AlertCircle, Wrench } from "lucide-react";

const MachinesPage = () => {
  const { machines, loading, startMachine, stopMachine, createMachine } = useMachines();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "maintenance":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Play size={16} className="text-green-500" />;
      case "error":
        return <AlertCircle size={16} className="text-red-500" />;
      case "maintenance":
        return <Wrench size={16} className="text-yellow-500" />;
      default:
        return <Square size={16} className="text-gray-500" />;
    }
  };

  const getMachineActions = (machine: any) => {
    const actions = [];
    
    if (machine.status === 'idle') {
      actions.push({
        label: "Start",
        onClick: () => startMachine(machine.id),
        variant: "default" as const
      });
    }
    
    if (machine.status === 'running') {
      actions.push({
        label: "Stop",
        onClick: () => stopMachine(machine.id),
        variant: "destructive" as const
      });
    }
    
    actions.push({
      label: "View Logs",
      onClick: () => console.log(`View logs for ${machine.id}`),
      variant: "outline" as const
    });

    return actions;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Machines</h1>
            <p className="text-gray-400">Manage and monitor your connected devices.</p>
          </div>
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">Loading machines...</div>
          </div>
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

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Connected Machines</h2>
            <CreateMachineDialog onCreateMachine={createMachine} />
          </div>
          
          {machines.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No machines found. Create your first machine to get started.</p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {machines.map((machine) => (
                <Card 
                  key={machine.id} 
                  className="bg-dark-card border-gray-800 overflow-hidden"
                >
                  <div className={`h-1 ${getStatusColor(machine.status)}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(machine.status)}
                      <h3 className="text-xl font-semibold">{machine.name}</h3>
                    </div>
                    <p className="text-gray-400 mb-2">
                      {machine.machine_type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} | Status: {machine.status}
                    </p>
                    {machine.last_started && (
                      <p className="text-sm text-gray-500">
                        Last started: {new Date(machine.last_started).toLocaleString()}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-2 flex-wrap">
                    {getMachineActions(machine).map((action, actionIndex) => (
                      <Button 
                        key={actionIndex} 
                        variant={action.variant}
                        size="sm" 
                        className={action.variant === "outline" ? "border-gray-700" : ""}
                        onClick={action.onClick}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default MachinesPage;
