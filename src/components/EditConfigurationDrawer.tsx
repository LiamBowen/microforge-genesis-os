
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Settings } from "lucide-react";

interface EditConfigurationDrawerProps {
  machineId: string;
  machineName: string;
  onConfigUpdate?: () => void;
}

const EditConfigurationDrawer = ({ machineId, machineName, onConfigUpdate }: EditConfigurationDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [configuration, setConfiguration] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [jsonError, setJsonError] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchConfiguration = async () => {
    if (!user || !open) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('machines')
        .select('configuration')
        .eq('id', machineId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching configuration:', error);
        toast({
          title: "Error",
          description: "Failed to fetch machine configuration",
          variant: "destructive",
        });
        return;
      }

      setConfiguration(JSON.stringify(data.configuration || {}, null, 2));
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch machine configuration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchConfiguration();
    }
  }, [open, user, machineId]);

  const validateJson = (jsonString: string) => {
    try {
      JSON.parse(jsonString);
      setJsonError("");
      return true;
    } catch (error) {
      setJsonError("Invalid JSON format");
      return false;
    }
  };

  const handleConfigurationChange = (value: string) => {
    setConfiguration(value);
    if (value.trim()) {
      validateJson(value);
    } else {
      setJsonError("");
    }
  };

  const handleSave = async () => {
    if (!user || !validateJson(configuration)) return;

    setSaving(true);
    try {
      const parsedConfig = JSON.parse(configuration);
      
      const { error } = await supabase.functions.invoke('update-machine-config', {
        body: { 
          machineId: machineId,
          configuration: parsedConfig 
        },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error('Error updating configuration:', error);
        toast({
          title: "Error",
          description: "Failed to update machine configuration",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Machine configuration updated successfully",
      });

      setOpen(false);
      if (onConfigUpdate) {
        onConfigUpdate();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to update machine configuration",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="border-gray-700">
          <Settings size={16} className="mr-1" />
          Edit Config
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle>Edit Configuration</DrawerTitle>
            <DrawerDescription>
              Update the configuration for {machineName}. Make sure the JSON is valid before saving.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {loading ? (
              <div className="text-center text-gray-400 py-8">Loading configuration...</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Configuration (JSON)
                  </label>
                  <textarea
                    value={configuration}
                    onChange={(e) => handleConfigurationChange(e.target.value)}
                    className="w-full h-64 p-3 bg-gray-900 border border-gray-700 rounded-md font-mono text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder='{"key": "value"}'
                  />
                  {jsonError && (
                    <p className="text-red-400 text-sm mt-1">{jsonError}</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <DrawerFooter>
            <Button
              onClick={handleSave}
              disabled={saving || loading || !!jsonError || !configuration.trim()}
            >
              {saving ? "Saving..." : "Save Configuration"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditConfigurationDrawer;
