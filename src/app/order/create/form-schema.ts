import { OrderClass } from "@/models/schema/Order";
import { z } from "zod";
export const FormSchema = z.object({
  literature: z
    .string({})
    .nonempty("this is required")
    .max(100, "This must be less than 100 characters long"),
  quantity: z
    .number()
    .min(1, "Quantity must be greater than 1")
    .max(100, "Quantity must be less than 100"),
  notes: z.string().max(500, "Notes must be less than 500 characters long"),
});
export type FormSchemaType = z.infer<typeof FormSchema>;

export interface ValidationResult {
  success: boolean;
  data: FormSchemaType;
  order?: OrderClass | undefined;
  _id?: string;
}
