
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const JobsPage = () => {
  const [open, setOpen] = useState(false);
  const [jobName, setJobName] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Mock machines data - in real app this would come from a hook
  const machines = [
    { id: "forgebot-01", name: "ForgeBot-01" },
    { id: "cnc-master", name: "CNC-Master" },
    { id: "lasercutter-x", name: "LaserCutter-X" },
  ];
  
  const jobQueue = [
    ["Gearbox Casing", "ForgeBot-01", "Running", "12 min", "Cancel"],
    ["Panel Cut A", "LaserCutter-X", "Error", "—", "Retry"],
    ["Bracket Drill", "CNC-Master", "Queued", "—", "Start Now"],
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitJob = async () => {
    if (!jobName || !selectedMachine || !file) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Job submitted:", {
        name: jobName,
        machine_id: selectedMachine,
        gcode_file: file,
      });
      
      toast({
        title: "Job submitted successfully",
        description: `${jobName} has been added to the queue.`,
      });
      
      // Reset form
      setOpen(false);
      setJobName("");
      setSelectedMachine("");
      setFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit job",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-1">Jobs</h1>
            <p className="text-gray-400">Manage your production queue.</p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => setOpen(true)}
            className="bg-neon-lime/20 text-neon-lime hover:bg-neon-lime/30 border border-neon-lime/30"
          >
            <Plus className="w-4 h-4 mr-2" />
            Submit New Job
          </Button>
        </div>

        <section>
          <Card className="bg-dark-card border-gray-800">
            <CardHeader>
              <CardTitle>Job Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-800">
                      <th className="p-3 font-medium text-gray-300">Job Name</th>
                      <th className="p-3 font-medium text-gray-300">Machine</th>
                      <th className="p-3 font-medium text-gray-300">Status</th>
                      <th className="p-3 font-medium text-gray-300">Time Remaining</th>
                      <th className="p-3 font-medium text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobQueue.map((row, rowIndex) => (
                      <tr 
                        key={rowIndex} 
                        className="border-b border-gray-800 last:border-0"
                      >
                        <td className="p-3">{row[0]}</td>
                        <td className="p-3">{row[1]}</td>
                        <td className={`p-3 ${
                          row[2] === "Running" 
                            ? "text-green-400" 
                            : row[2] === "Error" 
                              ? "text-red-400" 
                              : row[2] === "Queued"
                                ? "text-yellow-400"
                                : ""
                        }`}>
                          {row[2]}
                        </td>
                        <td className="p-3">{row[3]}</td>
                        <td className="p-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={`border-gray-700 ${
                              row[4] === "Cancel" 
                                ? "hover:bg-red-900/30 hover:text-red-400" 
                                : row[4] === "Retry" 
                                  ? "hover:bg-yellow-900/30 hover:text-yellow-400" 
                                  : "hover:bg-green-900/30 hover:text-green-400"
                            }`}
                          >
                            {row[4]}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-dark-card border-gray-800">
            <DialogHeader>
              <DialogTitle>Submit New Job</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-name">Job Name</Label>
                <Input
                  id="job-name"
                  placeholder="Enter job name"
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                  className="bg-dark-lighter border-gray-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="machine-select">Select Machine</Label>
                <Select value={selectedMachine} onValueChange={setSelectedMachine} required>
                  <SelectTrigger className="bg-dark-lighter border-gray-700">
                    <SelectValue placeholder="Choose machine" />
                  </SelectTrigger>
                  <SelectContent>
                    {machines.map((machine) => (
                      <SelectItem key={machine.id} value={machine.id}>
                        {machine.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload G-code File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".gcode"
                  onChange={handleFileChange}
                  className="bg-dark-lighter border-gray-700"
                  required
                />
              </div>

              <Button
                size="sm"
                variant="default"
                onClick={handleSubmitJob}
                disabled={!jobName || !selectedMachine || !file || isSubmitting}
                className="w-full bg-neon-lime/20 text-neon-lime hover:bg-neon-lime/30 border border-neon-lime/30"
              >
                {isSubmitting ? "Submitting..." : "Submit Job"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default JobsPage;
