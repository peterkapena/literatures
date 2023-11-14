import { z } from "zod";

export const ProfileFormSchema = z.object({
  firstName: z
    .string({})
    .min(1, "This is required")
    .max(100, "This must be less than 100 characters long"),
  lastName: z
    .string()
    .min(1, "This is required")
    .max(100, "This must be less than 100 characters long"),
  cell: z.string().min(1, "This is required").max(18, "Incorrect cell number"),
});

export type ProfileFormSchemaType = z.infer<typeof ProfileFormSchema>;
