
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileDown, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMachines } from "@/hooks/useMachines";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const AgentSetupPage = () => {
  const { machines, loading } = useMachines();
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedMachineId, setSelectedMachineId] = useState<string>("");
  const [serialPort, setSerialPort] = useState<string>("/dev/ttyUSB0");
  const [baudRate, setBaudRate] = useState<string>("115200");
  const [generating, setGenerating] = useState(false);

  const serialPorts = [
    "/dev/ttyUSB0",
    "/dev/ttyUSB1", 
    "/dev/ttyACM0",
    "COM1",
    "COM2", 
    "COM3",
    "COM4"
  ];

  const baudRates = [
    "9600",
    "19200",
    "38400",
    "57600",
    "115200",
    "230400"
  ];

  useEffect(() => {
    if (machines.length > 0 && !selectedMachineId) {
      setSelectedMachineId(machines[0].id);
    }
  }, [machines, selectedMachineId]);

  const generateAgentConfig = async () => {
    if (!selectedMachineId || !user) {
      toast({
        title: "Error",
        description: "Please select a machine",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-agent-config', {
        body: {
          machine_id: selectedMachineId,
          serial_port: serialPort,
          baud_rate: parseInt(baudRate)
        }
      });

      if (error) {
        console.error('Error generating config:', error);
        toast({
          title: "Error", 
          description: "Failed to generate agent configuration",
          variant: "destructive",
        });
        return;
      }

      // Download the config file
      const blob = new Blob([JSON.stringify(data.config, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `microforge-agent-config-${selectedMachineId.slice(0, 8)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Agent configuration downloaded successfully",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate agent configuration", 
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const selectedMachine = machines.find(m => m.id === selectedMachineId);

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Device Agent Setup</h1>
          <p className="text-gray-400">
            Connect your local MicroForge Agent to the cloud dashboard and control your machines in real time.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-dark-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Agent Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="machine-select">Machine</Label>
                <Select value={selectedMachineId} onValueChange={setSelectedMachineId}>
                  <SelectTrigger className="bg-dark-lighter border-gray-700">
                    <SelectValue placeholder="Select a machine" />
                  </SelectTrigger>
                  <SelectContent>
                    {machines.map((machine) => (
                      <SelectItem key={machine.id} value={machine.id}>
                        {machine.name} ({machine.machine_type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedMachine && (
                <div className="space-y-2">
                  <Label>Machine ID</Label>
                  <Input 
                    value={selectedMachine.id}
                    readOnly
                    className="bg-gray-800 border-gray-700 text-gray-400"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Supabase Project URL</Label>
                <Input 
                  value="https://xsszkljybkvblexuampr.supabase.co"
                  readOnly
                  className="bg-gray-800 border-gray-700 text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label>Supabase API Key</Label>
                <Input 
                  value="••••••••••••••••••••••••••••••••••••••••"
                  readOnly
                  className="bg-gray-800 border-gray-700 text-gray-400"
                />
                <p className="text-xs text-gray-500">
                  Machine-scoped authentication token (auto-generated)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serial-port">Serial Port</Label>
                <Select value={serialPort} onValueChange={setSerialPort}>
                  <SelectTrigger className="bg-dark-lighter border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {serialPorts.map((port) => (
                      <SelectItem key={port} value={port}>
                        {port}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="baud-rate">Baud Rate</Label>
                <Select value={baudRate} onValueChange={setBaudRate}>
                  <SelectTrigger className="bg-dark-lighter border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {baudRates.map((rate) => (
                      <SelectItem key={rate} value={rate}>
                        {rate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={generateAgentConfig}
                  disabled={generating || !selectedMachineId}
                  className="flex-1"
                >
                  <FileDown size={16} className="mr-2" />
                  {generating ? "Generating..." : "Generate Agent Config"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Download Agent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400">
                Download the MicroForge Agent application to run on your local machine.
                The agent will connect to your configured machines and execute jobs from the queue.
              </p>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-700"
                  onClick={() => window.open('https://github.com/microforge/agent/releases/latest', '_blank')}
                >
                  <Download size={16} className="mr-2" />
                  Download for Windows
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-gray-700"
                  onClick={() => window.open('https://github.com/microforge/agent/releases/latest', '_blank')}
                >
                  <Download size={16} className="mr-2" />
                  Download for macOS
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-gray-700"
                  onClick={() => window.open('https://github.com/microforge/agent/releases/latest', '_blank')}
                >
                  <Download size={16} className="mr-2" />
                  Download for Linux
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-500 mb-2">Installation Instructions:</p>
                <ol className="text-sm text-gray-400 space-y-1">
                  <li>1. Download the agent for your platform</li>
                  <li>2. Generate and download the config file above</li>
                  <li>3. Place the config file in the same directory as the agent</li>
                  <li>4. Run the agent executable</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentSetupPage;
