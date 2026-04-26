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

export const clientOnboardSchema = z.object({
  lead_id: z.number().nullable().optional(),
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email("Invalid email format").or(z.string().length(0)).or(z.null()).optional(),
  phone: z.string().max(50).optional(),
  business_name: z.string().max(255).optional(),
  service: z.string().min(1, "Service is required").max(255),
  project_value: z.coerce.number().min(0, "Project value must be positive").optional(),
  amount_paid: z.coerce.number().min(0, "Amount paid must be positive").optional(),
});

export const taskCreateSchema = z.object({
  client_id: z.number().min(1, "Client ID is required"),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  due_date: z.string().nullable().optional(),
});

export const taskUpdateSchema = z.object({
  id: z.number().min(1, "Task ID is required"),
  status: z.enum(["pending", "ongoing", "completed"]).optional(),
  title: z.string().max(255).optional(),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  due_date: z.string().nullable().optional(),
});
