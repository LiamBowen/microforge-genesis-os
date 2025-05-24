
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus } from "lucide-react";
import { protocolSchema, type ProtocolFormData } from "@/schemas/protocol";

interface CreateProtocolDialogProps {
  onCreateProtocol?: () => void;
}

const CreateProtocolDialog = ({ onCreateProtocol }: CreateProtocolDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<ProtocolFormData>({
    resolver: zodResolver(protocolSchema),
    defaultValues: {
      name: "",
      description: "",
      configuration: {},
    },
  });

  const handleCreate = async (data: ProtocolFormData) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('protocols')
        .insert({
          name: data.name,
          description: data.description || null,
          created_by: user.id,
          configuration: data.configuration
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
      form.reset();
      
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Protocol Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter protocol name"
                      className="bg-dark-lighter border-gray-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional description"
                      className="bg-dark-lighter border-gray-700"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Creating..." : "Create Protocol"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProtocolDialog;
