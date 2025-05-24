
import React, { useCallback } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square, AlertCircle, Wrench, FileText } from "lucide-react";
import DeployProtocolDialog from "@/components/DeployProtocolDialog";
import EditConfigurationDrawer from "@/components/EditConfigurationDrawer";
import type { Machine } from '@/hooks/useMachines';

interface MachineCardProps {
  machine: Machine;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onViewLogs: (id: string) => void;
  onRefetch: () => void;
}

const MachineCard = React.memo(({ machine, onStart, onStop, onViewLogs, onRefetch }: MachineCardProps) => {
  const getStatusColor = useCallback((status: string) => {
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
  }, []);

  const getStatusIcon = useCallback((status: string) => {
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
  }, []);

  const handleStart = useCallback(() => onStart(machine.id), [onStart, machine.id]);
  const handleStop = useCallback(() => onStop(machine.id), [onStop, machine.id]);
  const handleViewLogs = useCallback(() => onViewLogs(machine.id), [onViewLogs, machine.id]);

  const machineTypeDisplay = React.useMemo(() => 
    machine.machine_type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    [machine.machine_type]
  );

  return (
    <Card className="bg-dark-card border-gray-800 overflow-hidden">
      <div className={`h-1 ${getStatusColor(machine.status)}`}></div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          {getStatusIcon(machine.status)}
          <h3 className="text-xl font-semibold">{machine.name}</h3>
        </div>
        <p className="text-gray-400 mb-2">
          {machineTypeDisplay} | Status: {machine.status}
        </p>
        {machine.last_started && (
          <p className="text-sm text-gray-500">
            Last started: {new Date(machine.last_started).toLocaleString()}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-2 flex-wrap">
        {machine.status === 'idle' && (
          <Button 
            variant="default"
            size="sm" 
            onClick={handleStart}
          >
            Start
          </Button>
        )}
        
        {machine.status === 'running' && (
          <Button 
            variant="destructive"
            size="sm" 
            onClick={handleStop}
          >
            Stop
          </Button>
        )}
        
        <Button 
          variant="outline"
          size="sm"
          className="border-gray-700"
          onClick={handleViewLogs}
        >
          <FileText size={16} className="mr-1" />
          View Logs
        </Button>
        
        <DeployProtocolDialog 
          machineId={machine.id}
          machineName={machine.name}
          onDeploySuccess={onRefetch}
        />
        <EditConfigurationDrawer 
          machineId={machine.id}
          machineName={machine.name}
          onConfigUpdate={onRefetch}
        />
      </CardFooter>
    </Card>
  );
});

MachineCard.displayName = 'MachineCard';

export default MachineCard;
