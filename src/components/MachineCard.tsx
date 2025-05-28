
import React, { useCallback } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square, AlertCircle, Wrench, FileText, Wifi, Settings } from "lucide-react";
import DeployProtocolDialog from "@/components/DeployProtocolDialog";
import EditConfigurationDrawer from "@/components/EditConfigurationDrawer";
import AgentConfigurationDrawer from "@/components/AgentConfigurationDrawer";
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
        return <Play size={16} className="text-green-500 flex-shrink-0" />;
      case "error":
        return <AlertCircle size={16} className="text-red-500 flex-shrink-0" />;
      case "maintenance":
        return <Wrench size={16} className="text-yellow-500 flex-shrink-0" />;
      default:
        return <Square size={16} className="text-gray-500 flex-shrink-0" />;
    }
  }, []);

  const getConnectivityIcon = useCallback((connectivity: string) => {
    return connectivity === 'wifi' ? (
      <Wifi size={14} className="text-neon-cyan" />
    ) : (
      <Settings size={14} className="text-gray-400" />
    );
  }, []);

  const handleStart = useCallback(() => onStart(machine.id), [onStart, machine.id]);
  const handleStop = useCallback(() => onStop(machine.id), [onStop, machine.id]);
  const handleViewLogs = useCallback(() => onViewLogs(machine.id), [onViewLogs, machine.id]);

  const machineTypeDisplay = React.useMemo(() => 
    machine.machine_type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    [machine.machine_type]
  );

  const statusDisplay = React.useMemo(() => 
    machine.status.charAt(0).toUpperCase() + machine.status.slice(1),
    [machine.status]
  );

  const connectivityDisplay = React.useMemo(() => 
    machine.connectivity === 'wifi' ? 'Wi-Fi Direct' : 'Agent-based',
    [machine.connectivity]
  );

  return (
    <Card className="bg-dark-card border-gray-800 overflow-hidden h-full flex flex-col">
      <div className={`h-1 ${getStatusColor(machine.status)}`}></div>
      <CardContent className="p-6 flex-1">
        <div className="flex items-center gap-3 mb-3">
          {getStatusIcon(machine.status)}
          <h3 className="text-xl font-semibold text-white truncate flex-1">{machine.name}</h3>
          {getConnectivityIcon(machine.connectivity)}
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Type:</span>
            <span className="text-gray-300 font-medium">{machineTypeDisplay}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Connectivity:</span>
            <span className="text-gray-300 font-medium flex items-center gap-1">
              {connectivityDisplay}
            </span>
          </div>

          {machine.connectivity === 'wifi' && machine.ip_address && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400">IP Address:</span>
              <span className="text-gray-300 font-medium text-xs">{machine.ip_address}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Status:</span>
            <span className={`font-medium px-2 py-1 rounded-full text-xs ${
              machine.status === 'running' ? 'bg-green-500/20 text-green-400' :
              machine.status === 'error' ? 'bg-red-500/20 text-red-400' :
              machine.status === 'maintenance' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {statusDisplay}
            </span>
          </div>
        </div>
        
        {machine.last_started && (
          <div className="mt-4 pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              <span className="block">Last started:</span>
              <span className="text-gray-400">{new Date(machine.last_started).toLocaleString()}</span>
            </p>
          </div>
        )}

        {machine.connectivity === 'wifi' && machine.last_ping && (
          <div className="mt-2">
            <p className="text-xs text-gray-500">
              <span className="block">Last ping:</span>
              <span className="text-gray-400">{new Date(machine.last_ping).toLocaleString()}</span>
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex flex-col gap-3">
        <div className="flex gap-2 w-full">
          {machine.status === 'idle' && (
            <Button 
              variant="default"
              size="sm" 
              onClick={handleStart}
              className="flex-1"
            >
              <Play size={14} className="mr-2" />
              Start
            </Button>
          )}
          
          {machine.status === 'running' && (
            <Button 
              variant="destructive"
              size="sm" 
              onClick={handleStop}
              className="flex-1"
            >
              <Square size={14} className="mr-2" />
              Stop
            </Button>
          )}
          
          <Button 
            variant="outline"
            size="sm"
            className="border-gray-700 flex-1"
            onClick={handleViewLogs}
          >
            <FileText size={14} className="mr-2" />
            Logs
          </Button>
        </div>
        
        <div className="flex gap-2 w-full">
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
        </div>

        {machine.connectivity === 'agent' && (
          <div className="flex gap-2 w-full">
            <AgentConfigurationDrawer 
              machine={machine}
              onConfigUpdate={onRefetch}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
});

MachineCard.displayName = 'MachineCard';

export default MachineCard;
