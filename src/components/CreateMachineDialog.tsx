
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CreateMachineDialogProps {
  onCreateMachine: (name: string, machineType: string) => void;
}

const CreateMachineDialog = ({ onCreateMachine }: CreateMachineDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [machineType, setMachineType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && machineType) {
      onCreateMachine(name, machineType);
      setName('');
      setMachineType('');
      setOpen(false);
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-300">Machine Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter machine name"
              className="bg-dark-lighter border-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="type" className="text-gray-300">Machine Type</Label>
            <Select value={machineType} onValueChange={setMachineType} required>
              <SelectTrigger className="bg-dark-lighter border-gray-700 text-white">
                <SelectValue placeholder="Select machine type" />
              </SelectTrigger>
              <SelectContent className="bg-dark-card border-gray-700">
                <SelectItem value="3d-printer">3D Printer</SelectItem>
                <SelectItem value="cnc-mill">CNC Mill</SelectItem>
                <SelectItem value="laser-cutter">Laser Cutter</SelectItem>
                <SelectItem value="injection-molder">Injection Molder</SelectItem>
                <SelectItem value="generic">Generic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-neon-cyan text-dark hover:bg-neon-cyan/90">
              Create Machine
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMachineDialog;
