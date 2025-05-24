
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Rocket } from "lucide-react";

interface Protocol {
  id: string;
  name: string;
  description: string;
}

interface DeployProtocolDialogProps {
  machineId: string;
  machineName: string;
  onDeploySuccess?: () => void;
}

const DeployProtocolDialog = ({ machineId, machineName, onDeploySuccess }: DeployProtocolDialogProps) => {
  const [open, setOpen] = useState(false);
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [selectedProtocol, setSelectedProtocol] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingProtocols, setLoadingProtocols] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchProtocols = async () => {
    if (!user) return;

    setLoadingProtocols(true);
    try {
      const { data, error } = await supabase
        .from('protocols')
        .select('id, name, description')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching protocols:', error);
        toast({
          title: "Error",
          description: "Failed to fetch protocols",
          variant: "destructive",
        });
        return;
      }

      setProtocols(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch protocols",
        variant: "destructive",
      });
    } finally {
      setLoadingProtocols(false);
    }
  };

  useEffect(() => {
    if (open && user) {
      fetchProtocols();
    }
  }, [open, user]);

  const handleDeploy = async () => {
    if (!selectedProtocol || !user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('deploy-protocol', {
        body: { 
          machineId: machineId,
          protocolId: selectedProtocol 
        },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error('Error deploying protocol:', error);
        toast({
          title: "Error",
          description: "Failed to deploy protocol",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Protocol deployed successfully",
      });

      setOpen(false);
      setSelectedProtocol("");
      if (onDeploySuccess) {
        onDeploySuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to deploy protocol",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-gray-700">
          <Rocket size={16} className="mr-1" />
          Deploy Protocol
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deploy Protocol</DialogTitle>
          <DialogDescription>
            Deploy a protocol to {machineName}. Select from your available protocols.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {loadingProtocols ? (
            <div className="text-center text-gray-400">Loading protocols...</div>
          ) : protocols.length === 0 ? (
            <div className="text-center text-gray-400">
              No protocols available. Create a protocol first.
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Select Protocol</label>
                <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Choose a protocol..." />
                  </SelectTrigger>
                  <SelectContent>
                    {protocols.map((protocol) => (
                      <SelectItem key={protocol.id} value={protocol.id}>
                        <div>
                          <div className="font-medium">{protocol.name}</div>
                          {protocol.description && (
                            <div className="text-sm text-gray-400">{protocol.description}</div>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeploy}
            disabled={!selectedProtocol || loading || protocols.length === 0}
          >
            {loading ? "Deploying..." : "Deploy Protocol"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeployProtocolDialog;
