import Profile from "@/models/schema/Profile";
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
  cell: z
    .string()
    .min(4, "This is required")
    .max(18, "Incorrect cell number")
    .regex(/^\+\d{1,15}$/, "Cell number must be in the format +12345"),
});

export type ProfileFormSchemaType = z.infer<typeof ProfileFormSchema>;

export interface ProfileValidationResult {
  success: boolean;
  data: ProfileFormSchemaType;
  profile?: Profile | undefined;
  _id?: string;
}
