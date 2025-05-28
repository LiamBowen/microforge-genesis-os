
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface CreateWiFiMachineDialogProps {
  onCreateMachine: () => void;
}

const CreateWiFiMachineDialog = ({ onCreateMachine }: CreateWiFiMachineDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [machineType, setMachineType] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const generateAuthToken = () => {
    return crypto.getRandomValues(new Uint8Array(32))
      .reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !machineType || !ipAddress.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Basic IP address validation
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const hostnameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!ipRegex.test(ipAddress) && !hostnameRegex.test(ipAddress)) {
      toast({
        title: "Error",
        description: "Please enter a valid IP address or hostname",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a machine",
        variant: "destructive",
      });
      return;
    }

    setCreating(true);
    try {
      const authToken = generateAuthToken();
      
      const { error } = await supabase
        .from('machines')
        .insert({
          name: name.trim(),
          machine_type: machineType,
          connectivity: 'wifi',
          ip_address: ipAddress.trim(),
          auth_token: authToken,
          status: 'idle',
          user_id: user.id
        });

      if (error) {
        console.error('Error creating Wi-Fi machine:', error);
        toast({
          title: "Error",
          description: "Failed to create Wi-Fi machine",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Wi-Fi machine "${name}" created successfully`,
      });

      setName("");
      setMachineType("");
      setIpAddress("");
      setOpen(false);
      onCreateMachine();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create Wi-Fi machine",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-neon-cyan hover:bg-neon-cyan/90">
          <Wifi size={16} className="mr-2" />
          Add Wi-Fi Machine
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-dark-card border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Add Wi-Fi Connected Machine</DialogTitle>
          <DialogDescription className="text-gray-400">
            Register a machine that connects directly via Wi-Fi to the cloud platform.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wifi-name" className="text-white">Machine Name</Label>
            <Input
              id="wifi-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., ForgeBot-01"
              className="bg-dark-lighter border-gray-700 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wifi-type" className="text-white">Machine Type</Label>
            <Select value={machineType} onValueChange={setMachineType} required>
              <SelectTrigger className="bg-dark-lighter border-gray-700 text-white">
                <SelectValue placeholder="Select machine type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3d-printer">3D Printer</SelectItem>
                <SelectItem value="cnc-mill">CNC Mill</SelectItem>
                <SelectItem value="laser-cutter">Laser Cutter</SelectItem>
                <SelectItem value="injection-molder">Injection Molder</SelectItem>
                <SelectItem value="generic">Generic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wifi-ip" className="text-white">IP Address or Hostname</Label>
            <Input
              id="wifi-ip"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="192.168.1.100 or machine.local"
              className="bg-dark-lighter border-gray-700 text-white"
              required
            />
            <p className="text-xs text-gray-500">
              Enter the local IP address or hostname of your Wi-Fi enabled machine
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={creating}
              className="bg-neon-cyan hover:bg-neon-cyan/90"
            >
              {creating ? "Creating..." : "Create Wi-Fi Machine"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWiFiMachineDialog;
