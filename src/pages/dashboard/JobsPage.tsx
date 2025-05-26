
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Play, Square, AlertCircle, Clock, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useMachines } from "@/hooks/useMachines";
import { useJobs } from "@/hooks/useJobs";

const JobsPage = () => {
  const [open, setOpen] = useState(false);
  const [jobName, setJobName] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { machines } = useMachines();
  const { jobs, loading, submitJob, cancelJob } = useJobs();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitJob = async () => {
    if (!jobName || !selectedMachine || !file) return;

    setIsSubmitting(true);
    
    try {
      const success = await submitJob(jobName, selectedMachine, file);
      
      if (success) {
        // Reset form
        setOpen(false);
        setJobName("");
        setSelectedMachine("");
        setFile(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Play className="w-4 h-4 text-green-400" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-400" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case "queued":
      default:
        return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-green-400";
      case "completed":
        return "text-blue-400";
      case "error":
        return "text-red-400";
      case "queued":
      default:
        return "text-yellow-400";
    }
  };

  const getActionButton = (job: any) => {
    if (job.status === "running" || job.status === "queued") {
      return (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => cancelJob(job.id)}
          className="border-gray-700 hover:bg-red-900/30 hover:text-red-400"
        >
          Cancel
        </Button>
      );
    }
    return null;
  };

  const formatDuration = (startTime: string | null, endTime: string | null) => {
    if (!startTime) return "—";
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const diff = Math.floor((end.getTime() - start.getTime()) / 1000 / 60);
    return `${diff} min`;
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
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-lime"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-800">
                        <th className="p-3 font-medium text-gray-300">Job Name</th>
                        <th className="p-3 font-medium text-gray-300">Machine</th>
                        <th className="p-3 font-medium text-gray-300">Status</th>
                        <th className="p-3 font-medium text-gray-300">Duration</th>
                        <th className="p-3 font-medium text-gray-300">Progress</th>
                        <th className="p-3 font-medium text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => {
                        const machine = machines.find(m => m.id === job.machine_id);
                        return (
                          <tr 
                            key={job.id} 
                            className="border-b border-gray-800 last:border-0"
                          >
                            <td className="p-3">
                              <div>
                                <div className="font-medium">{job.name}</div>
                                {job.file_name && (
                                  <div className="text-sm text-gray-500">{job.file_name}</div>
                                )}
                              </div>
                            </td>
                            <td className="p-3">{machine?.name || 'Unknown'}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(job.status)}
                                <span className={getStatusColor(job.status)}>
                                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                </span>
                              </div>
                            </td>
                            <td className="p-3">
                              {formatDuration(job.started_at, job.completed_at)}
                            </td>
                            <td className="p-3">
                              {job.progress !== null ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-gray-700 rounded-full h-2">
                                    <div 
                                      className="bg-neon-lime h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${job.progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-400">{job.progress}%</span>
                                </div>
                              ) : (
                                "—"
                              )}
                            </td>
                            <td className="p-3">
                              {getActionButton(job)}
                            </td>
                          </tr>
                        );
                      })}
                      {jobs.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-500">
                            No jobs found. Submit your first job to get started.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
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
                  accept=".gcode,.nc,.tap"
                  onChange={handleFileChange}
                  className="bg-dark-lighter border-gray-700"
                  required
                />
                <p className="text-xs text-gray-500">
                  Supported formats: .gcode, .nc, .tap
                </p>
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
