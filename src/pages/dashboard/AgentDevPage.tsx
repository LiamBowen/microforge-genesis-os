
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Play, Square, AlertCircle, Activity, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMachines } from "@/hooks/useMachines";
import { supabase } from "@/integrations/supabase/client";

const AgentDevPage = () => {
  const { machines } = useMachines();
  const { toast } = useToast();
  const [selectedMachineId, setSelectedMachineId] = useState<string>("");
  const [gcodeStream, setGcodeStream] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const mockGcodeLines = [
    "G28 ; Home all axes",
    "G1 Z15.0 F9000 ; Move platform down 15mm",
    "G92 E0 ; Reset extruder position",
    "G1 F200 E3 ; Extrude 3mm of filament",
    "G92 E0 ; Reset extruder position",
    "G1 F9000",
    "M109 S210 ; Set and wait for extruder temperature",
    "M190 S60 ; Set and wait for bed temperature",
    "G1 Z0.28 F300 ; Move to first layer height",
    "G1 X60.0 E9.0 F1000.0 ; Intro line",
    "G1 X100.0 E12.5 F1000.0 ; Continue intro line",
    "G92 E0 ; Reset extruder",
  ];

  const simulateJobStart = async () => {
    if (!selectedMachineId) {
      toast({
        title: "Error",
        description: "Please select a machine",
        variant: "destructive",
      });
      return;
    }

    try {
      await supabase
        .from('machine_events')
        .insert({
          machine_id: selectedMachineId,
          event_type: 'job_started',
          message: `Simulated job started on ${machines.find(m => m.id === selectedMachineId)?.name}`,
          details: { simulated: true, job_id: `sim-${Date.now()}` }
        });

      toast({
        title: "Success",
        description: "Job start event simulated",
      });
    } catch (error) {
      console.error('Error simulating job start:', error);
      toast({
        title: "Error",
        description: "Failed to simulate job start",
        variant: "destructive",
      });
    }
  };

  const simulateJobComplete = async () => {
    if (!selectedMachineId) {
      toast({
        title: "Error", 
        description: "Please select a machine",
        variant: "destructive",
      });
      return;
    }

    try {
      await supabase
        .from('machine_events')
        .insert({
          machine_id: selectedMachineId,
          event_type: 'job_completed',
          message: `Simulated job completed on ${machines.find(m => m.id === selectedMachineId)?.name}`,
          details: { simulated: true, duration: Math.floor(Math.random() * 3600) }
        });

      toast({
        title: "Success",
        description: "Job completion event simulated",
      });
    } catch (error) {
      console.error('Error simulating job completion:', error);
      toast({
        title: "Error",
        description: "Failed to simulate job completion",
        variant: "destructive",
      });
    }
  };

  const pushErrorEvent = async () => {
    if (!selectedMachineId) {
      toast({
        title: "Error",
        description: "Please select a machine", 
        variant: "destructive",
      });
      return;
    }

    const errorMessages = [
      "Tool temperature out of range",
      "Filament jam detected",
      "Stepper motor timeout",
      "Emergency stop triggered",
      "Bed leveling failed"
    ];

    const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];

    try {
      await supabase
        .from('machine_events')
        .insert({
          machine_id: selectedMachineId,
          event_type: 'error',
          message: `Error: ${randomError}`,
          details: { simulated: true, error_code: Math.floor(Math.random() * 1000) }
        });

      toast({
        title: "Success",
        description: "Error event pushed",
      });
    } catch (error) {
      console.error('Error pushing error event:', error);
      toast({
        title: "Error",
        description: "Failed to push error event",
        variant: "destructive",
      });
    }
  };

  const startGcodeStream = () => {
    setGcodeStream([]);
    setIsStreaming(true);
    
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex >= mockGcodeLines.length) {
        setIsStreaming(false);
        clearInterval(interval);
        return;
      }

      setGcodeStream(prev => [...prev, mockGcodeLines[lineIndex]]);
      lineIndex++;
    }, 500);
  };

  const stopGcodeStream = () => {
    setIsStreaming(false);
    setGcodeStream([]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Agent Developer Testing</h1>
          <p className="text-gray-400">
            Simulate incoming job queue and stream mock events as if a real agent was connected.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-dark-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Event Simulation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Target Machine</label>
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

              <div className="space-y-3">
                <Button 
                  onClick={simulateJobStart}
                  disabled={!selectedMachineId}
                  className="w-full"
                >
                  <Play size={16} className="mr-2" />
                  Simulate Job Start
                </Button>
                
                <Button 
                  onClick={simulateJobComplete}
                  disabled={!selectedMachineId}
                  variant="outline"
                  className="w-full border-gray-700"
                >
                  <Activity size={16} className="mr-2" />
                  Simulate Job Complete
                </Button>
                
                <Button 
                  onClick={pushErrorEvent}
                  disabled={!selectedMachineId}
                  variant="destructive"
                  className="w-full"
                >
                  <AlertCircle size={16} className="mr-2" />
                  Push Error Log Event
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">G-code Stream Display</CardTitle>
                <Badge variant={isStreaming ? "default" : "secondary"}>
                  {isStreaming ? "Streaming" : "Stopped"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  onClick={startGcodeStream}
                  disabled={isStreaming}
                  className="flex-1"
                >
                  <FileText size={16} className="mr-2" />
                  Start Stream
                </Button>
                <Button 
                  onClick={stopGcodeStream}
                  disabled={!isStreaming}
                  variant="outline"
                  className="flex-1 border-gray-700"
                >
                  <Square size={16} className="mr-2" />
                  Stop Stream
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Live G-code Output</label>
                <Textarea
                  value={gcodeStream.join('\n')}
                  readOnly
                  className="h-40 bg-gray-900 border-gray-700 font-mono text-sm"
                  placeholder="G-code commands will appear here..."
                />
              </div>

              {gcodeStream.length > 0 && (
                <div className="text-xs text-gray-500">
                  Lines processed: {gcodeStream.length} / {mockGcodeLines.length}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentDevPage;
