import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email("Invalid email format").or(z.string().length(0)).or(z.null()).optional(),
  phone: z.string().max(50).optional(),
  businessName: z.string().max(255).optional(),
  businessType: z.string().max(255).optional(),
  service: z.string().max(255).optional(),
  message: z.string().min(1, "Message is required").max(2000),
});

export const importLeadSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  business_name: z.string().optional().nullable(),
  business_type: z.string().optional().nullable(),
  service: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

export const importRowsSchema = z.object({
  rows: z.array(importLeadSchema).min(1, "No rows provided"),
});
