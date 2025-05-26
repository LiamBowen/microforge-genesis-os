
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Settings, Copy, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import type { Machine } from '@/hooks/useMachines';

interface AgentConfigurationDrawerProps {
  machine: Machine;
  onConfigUpdate?: () => void;
}

const AgentConfigurationDrawer = ({ machine, onConfigUpdate }: AgentConfigurationDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [agentConfig, setAgentConfig] = useState<any>(null);
  const [lastConnection, setLastConnection] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const fetchAgentStatus = async () => {
    if (!machine.id) return;

    setLoading(true);
    try {
      // Check for recent machine events to determine connection status
      const { data: events } = await supabase
        .from('machine_events')
        .select('*')
        .eq('machine_id', machine.id)
        .eq('event_type', 'agent_ping')
        .order('created_at', { ascending: false })
        .limit(1);

      if (events && events.length > 0) {
        const lastPing = new Date(events[0].created_at);
        const now = new Date();
        const diffMinutes = (now.getTime() - lastPing.getTime()) / (1000 * 60);
        
        setLastConnection(lastPing.toLocaleString());
        setIsConnected(diffMinutes < 5); // Consider connected if pinged within 5 minutes
      } else {
        setLastConnection(null);
        setIsConnected(false);
      }

      // Generate current config
      const { data: config } = await supabase.functions.invoke('generate-agent-config', {
        body: { machine_id: machine.id }
      });

      if (config) {
        setAgentConfig(config.config);
      }
    } catch (error) {
      console.error('Error fetching agent status:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!agentConfig) return;

    try {
      await navigator.clipboard.writeText(JSON.stringify(agentConfig, null, 2));
      toast({
        title: "Success",
        description: "Configuration copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const regenerateConfig = async () => {
    if (!machine.id) return;

    setRegenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-agent-config', {
        body: { machine_id: machine.id, regenerate: true }
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to regenerate configuration",
          variant: "destructive",
        });
        return;
      }

      setAgentConfig(data.config);
      toast({
        title: "Success",
        description: "Configuration regenerated successfully",
      });

      if (onConfigUpdate) {
        onConfigUpdate();
      }
    } catch (error) {
      console.error('Error regenerating config:', error);
      toast({
        title: "Error",
        description: "Failed to regenerate configuration",
        variant: "destructive",
      });
    } finally {
      setRegenerating(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchAgentStatus();
    }
  }, [open, machine.id]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="border-gray-700">
          <Settings size={16} className="mr-1" />
          Agent Config
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>Agent Configuration</DrawerTitle>
          <DrawerDescription>
            Configure the MicroForge Agent for {machine.name}
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 space-y-4 overflow-y-auto">
          <div className="space-y-2">
            <Label>Machine Name</Label>
            <Input 
              value={machine.name}
              readOnly
              className="bg-gray-800 border-gray-700 text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label>Connection Status</Label>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle size={14} className="mr-1" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                  <XCircle size={14} className="mr-1" />
                  Offline
                </Badge>
              )}
            </div>
          </div>

          {lastConnection && (
            <div className="space-y-2">
              <Label>Last Connection</Label>
              <Input 
                value={lastConnection}
                readOnly
                className="bg-gray-800 border-gray-700 text-gray-400"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Configuration JSON</Label>
            {loading ? (
              <div className="text-center text-gray-400 py-4">Loading configuration...</div>
            ) : agentConfig ? (
              <div className="relative">
                <pre className="bg-gray-900 border border-gray-700 rounded p-3 text-sm text-gray-300 max-h-40 overflow-y-auto">
                  {JSON.stringify(agentConfig, null, 2)}
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                >
                  <Copy size={14} />
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-4">No configuration available</div>
            )}
          </div>
        </div>

        <DrawerFooter>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={copyToClipboard}
              disabled={!agentConfig}
              className="flex-1"
            >
              <Copy size={16} className="mr-2" />
              Copy to Clipboard
            </Button>
            <Button
              variant="outline"
              onClick={regenerateConfig}
              disabled={regenerating}
              className="flex-1"
            >
              <RotateCcw size={16} className="mr-2" />
              {regenerating ? "Regenerating..." : "Regenerate Config"}
            </Button>
          </div>
          
          <div className="text-sm text-gray-500 text-center px-4 py-2 bg-gray-800/50 rounded">
            Install the MicroForge Agent on a local machine. It will automatically connect using this config and run jobs from the queue.
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AgentConfigurationDrawer;
