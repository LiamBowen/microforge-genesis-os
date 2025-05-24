
import { z } from "zod";

export const protocolSchema = z.object({
  name: z.string().min(3, "Protocol name must be at least 3 characters").max(100, "Protocol name must be less than 100 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  configuration: z.record(z.any()).default({}),
});

export type ProtocolFormData = z.infer<typeof protocolSchema>;
