
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { machineSchema, type MachineFormData } from '@/schemas/machine';
import { useToast } from '@/hooks/use-toast';

interface CreateMachineDialogProps {
  onCreateMachine: (name: string, machineType: string) => void;
}

const CreateMachineDialog = ({ onCreateMachine }: CreateMachineDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<MachineFormData>({
    resolver: zodResolver(machineSchema),
    defaultValues: {
      name: '',
      machineType: undefined,
    },
  });

  const onSubmit = (data: MachineFormData) => {
    try {
      onCreateMachine(data.name, data.machineType);
      form.reset();
      setOpen(false);
      toast({
        title: "Success",
        description: "Machine created successfully",
      });
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to create machine",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 border border-neon-cyan/30">
          Add Machine
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-dark-card border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Machine</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Machine Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter machine name"
                      className="bg-dark-lighter border-gray-700 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="machineType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Machine Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-dark-lighter border-gray-700 text-white">
                        <SelectValue placeholder="Select machine type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-dark-card border-gray-700">
                      <SelectItem value="3d-printer">3D Printer</SelectItem>
                      <SelectItem value="cnc-mill">CNC Mill</SelectItem>
                      <SelectItem value="laser-cutter">Laser Cutter</SelectItem>
                      <SelectItem value="injection-molder">Injection Molder</SelectItem>
                      <SelectItem value="generic">Generic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-neon-cyan text-dark hover:bg-neon-cyan/90"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Creating..." : "Create Machine"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMachineDialog;
