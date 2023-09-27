import { OrderClass } from "@/models/schema/Order";
import { z } from "zod";

export const FormSchema = z.object({
  password: z
    .string({})
    .nonempty("this is required")
    .min(8, "Not shorter than 8")
    .max(100, "This must be less than 100 characters long"),
  email: z
    .string({})
    .nonempty("this is required")
    .email("Invalid email")
    .max(100, "This must be less than 100 characters long"),
  username: z
    .string()
    .nonempty("this is required")
    .max(100, "Notes must be less than 500 characters long"),
});
export type FormSchemaType = z.infer<typeof FormSchema>;

export interface ValidationResult {
  success: boolean;
  data: FormSchemaType;
  order?: OrderClass | undefined;
  _id?: string;
}
