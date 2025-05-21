
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const formSchema = z.object({
  job_name: z.string().min(1, "Job name is required"),
  machine: z.string().min(1, "Machine selection is required"),
  file_upload: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

const JobsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_name: "",
      machine: "",
    },
  });
  
  const jobQueue = [
    ["Gearbox Casing", "ForgeBot-01", "Running", "12 min", "Cancel"],
    ["Panel Cut A", "LaserCutter-X", "Error", "—", "Retry"],
    ["Bracket Drill", "CNC-Master", "Queued", "—", "Start Now"],
  ];

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Job submitted:", values);
      
      toast({
        title: "Job submitted",
        description: `${values.job_name} has been added to the queue.`,
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your job.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Jobs</h1>
          <p className="text-gray-400">Manage your production queue.</p>
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

        <section>
          <Card className="bg-dark-card border-gray-800">
            <CardHeader>
              <CardTitle>Submit New Job</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="job_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter job name" 
                            className="bg-dark-lighter border-gray-700" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="machine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Machine</FormLabel>
                        <FormControl>
                          <select
                            className="w-full bg-dark-lighter border border-gray-700 rounded-md px-3 py-2 text-base"
                            {...field}
                          >
                            <option value="">Select a machine</option>
                            <option value="ForgeBot-01">ForgeBot-01</option>
                            <option value="CNC-Master">CNC-Master</option>
                            <option value="LaserCutter-X">LaserCutter-X</option>
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-2">
                    <Label htmlFor="file_upload">Upload G-code File</Label>
                    <Input 
                      id="file_upload"
                      type="file" 
                      className="bg-dark-lighter border-gray-700" 
                    />
                  </div>
              
                  <Button 
                    type="submit" 
                    className="w-full bg-neon-lime/20 text-neon-lime hover:bg-neon-lime/30 border border-neon-lime/30"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Job"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default JobsPage;
