
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus } from "lucide-react";

interface CreateProtocolDialogProps {
  onCreateProtocol?: () => void;
}

const CreateProtocolDialog = ({ onCreateProtocol }: CreateProtocolDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleCreate = async () => {
    if (!name.trim() || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('protocols')
        .insert({
          name: name.trim(),
          description: description.trim() || null,
          created_by: user.id,
          configuration: {}
        });

      if (error) {
        console.error('Error creating protocol:', error);
        toast({
          title: "Error",
          description: "Failed to create protocol",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Protocol created successfully",
      });

      setOpen(false);
      setName("");
      setDescription("");
      
      if (onCreateProtocol) {
        onCreateProtocol();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create protocol",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-neon-lime/20 text-neon-lime hover:bg-neon-lime/30 border border-neon-lime/30">
          <Plus size={16} className="mr-2" />
          Create Protocol
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Protocol</DialogTitle>
          <DialogDescription>
            Create a new protocol configuration for your machines.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Protocol Name *
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter protocol name"
              className="bg-dark-lighter border-gray-700"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              className="bg-dark-lighter border-gray-700"
              rows={3}
            />
          </div>
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
            onClick={handleCreate}
            disabled={!name.trim() || loading}
          >
            {loading ? "Creating..." : "Create Protocol"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProtocolDialog;
