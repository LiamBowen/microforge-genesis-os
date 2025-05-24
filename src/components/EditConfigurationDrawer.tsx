
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
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
  const [configuration, setConfiguration] = useState("{}");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchConfiguration = async () => {
    if (!user || !machineId) return;

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

  const handleSave = async () => {
    if (!user || !machineId) return;

    // Validate JSON
    try {
      JSON.parse(configuration);
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please enter valid JSON configuration",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke('update-machine-config', {
        body: { 
          machineId: machineId,
          configuration: JSON.parse(configuration)
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

  useEffect(() => {
    if (open && user && machineId) {
      fetchConfiguration();
    }
  }, [open, user, machineId]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="border-gray-700">
          <Settings size={16} className="mr-1" />
          Configure
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Edit Configuration</SheetTitle>
          <SheetDescription>
            Update the configuration for {machineName}. Enter valid JSON format.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {loading ? (
            <div className="text-center text-gray-400">Loading configuration...</div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Configuration (JSON)</label>
                <Textarea
                  value={configuration}
                  onChange={(e) => setConfiguration(e.target.value)}
                  className="mt-1 h-64 font-mono text-sm bg-dark-lighter border-gray-700"
                  placeholder='{"key": "value"}'
                />
              </div>
            </div>
          )}
        </div>
        <SheetFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || saving}
          >
            {saving ? "Saving..." : "Save Configuration"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditConfigurationDrawer;
