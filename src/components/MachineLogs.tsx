
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMachineLogs } from "@/hooks/useMachineLogs";
import { AlertCircle, Clock, Settings } from "lucide-react";
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
        return <Settings size={16} className="text-blue-500" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={20} />
            Machine Logs {machineName && `- ${machineName}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">Loading logs...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock size={20} />
            Machine Logs {machineName && `- ${machineName}`}
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={refetch}
            className="border-gray-700"
          >
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p>No logs found for this machine.</p>
          </div>
        ) : (
          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-300">Timestamp</TableHead>
                  <TableHead className="text-gray-300">Event Type</TableHead>
                  <TableHead className="text-gray-300">Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} className="border-gray-800">
                    <TableCell className="text-gray-400">
                      {formatTimestamp(log.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getEventTypeIcon(log.event_type)}
                        <span className="text-gray-300">
                          {log.event_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {log.message}
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
