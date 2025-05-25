
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMachineLogs } from "@/hooks/useMachineLogs";
import { AlertCircle, Clock, Settings, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MachineLogsProps {
  machineId: string;
  machineName?: string;
  limit?: number;
}

const MachineLogs = ({ machineId, machineName, limit = 20 }: MachineLogsProps) => {
  const { logs, loading, refetch } = useMachineLogs(machineId, limit);

  const getEventTypeIcon = (eventType: string) => {
    switch (eventType) {
      case 'machine_started':
      case 'machine_stopped':
        return <Settings size={16} className="text-blue-500 flex-shrink-0" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-500 flex-shrink-0" />;
      default:
        return <Clock size={16} className="text-gray-500 flex-shrink-0" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatEventType = (eventType: string) => {
    return eventType
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Clock size={20} className="flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xl font-semibold">Machine Logs</div>
              {machineName && (
                <div className="text-sm text-gray-400 font-normal">{machineName}</div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-400">
              <RefreshCw size={20} className="animate-spin" />
              <span>Loading logs...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-dark-card border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <Clock size={20} className="flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xl font-semibold">Machine Logs</div>
              {machineName && (
                <div className="text-sm text-gray-400 font-normal">{machineName}</div>
              )}
            </div>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={refetch}
            className="border-gray-700 flex items-center gap-2"
          >
            <RefreshCw size={14} />
            <span>Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle size={48} className="mx-auto mb-4 text-gray-500 opacity-50" />
            <p className="text-gray-400 text-lg">No logs found for this machine.</p>
            <p className="text-gray-500 text-sm mt-2">Events will appear here once the machine starts running.</p>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 bg-gray-900/50">
                  <TableHead className="text-gray-300 font-semibold py-4">Timestamp</TableHead>
                  <TableHead className="text-gray-300 font-semibold py-4">Event Type</TableHead>
                  <TableHead className="text-gray-300 font-semibold py-4">Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} className="border-gray-800 hover:bg-gray-900/30">
                    <TableCell className="text-gray-400 py-4 font-mono text-sm">
                      {formatTimestamp(log.created_at)}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        {getEventTypeIcon(log.event_type)}
                        <span className="text-gray-300 font-medium">
                          {formatEventType(log.event_type)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300 py-4 max-w-md">
                      <div className="break-words">{log.message}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MachineLogs;
