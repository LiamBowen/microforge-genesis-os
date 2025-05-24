
import { z } from "zod";

export const machineSchema = z.object({
  name: z.string().min(3, "Machine name must be at least 3 characters").max(50, "Machine name must be less than 50 characters"),
  machineType: z.enum(["3d-printer", "cnc-mill", "laser-cutter", "injection-molder", "generic"], {
    errorMap: () => ({ message: "Please select a valid machine type" })
  }),
});

export const machineConfigurationSchema = z.object({
  temperature: z.number().min(0).max(1000).optional(),
  speed: z.number().min(0).max(100).optional(),
  precision: z.number().min(0.1).max(10).optional(),
}).passthrough(); // Allow additional properties

export type MachineFormData = z.infer<typeof machineSchema>;
export type MachineConfiguration = z.infer<typeof machineConfigurationSchema>;
