
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const MachinesPage = () => {
  const machines = [
    {
      title: "ForgeBot-01",
      description: "3D Printer | Status: Running | Location: Bay A",
      actions: [{ label: "View Logs" }, { label: "Pause Job" }],
      status: "running",
    },
    {
      title: "CNC-Master",
      description: "CNC Mill | Status: Idle | Location: Bay B",
      actions: [{ label: "Start Job" }, { label: "Calibrate" }],
      status: "idle",
    },
    {
      title: "LaserCutter-X",
      description: "Laser Cutter | Status: Error | Location: Bay C",
      actions: [{ label: "Resolve Error" }],
      status: "error",
    },
  ];

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
            <Button 
              className="bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 border border-neon-cyan/30"
            >
              Add Machine
            </Button>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {machines.map((machine, index) => (
              <Card 
                key={index} 
                className="bg-dark-card border-gray-800 overflow-hidden"
              >
                <div 
                  className={`h-1 ${
                    machine.status === "running" 
                      ? "bg-green-500"
                      : machine.status === "error" 
                        ? "bg-red-500"
                        : "bg-gray-500"
                  }`}
                ></div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{machine.title}</h3>
                  <p className="text-gray-400">{machine.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-2">
                  {machine.actions.map((action, actionIndex) => (
                    <Button 
                      key={actionIndex} 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-700"
                    >
                      {action.label}
                    </Button>
                  ))}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default MachinesPage;
