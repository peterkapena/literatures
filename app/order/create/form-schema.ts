import { OrderClass } from "@/models/schema/Order";
import { z } from "zod";
export const FormSchema = z.object({
  literature: z.string().nonempty("this is required"),
  quantity: z
    .number()
    .min(1, "Quantity must be greater than 18")
    .max(20, "Quantity must be less than 20"), //z.string().nonempty("A valid number is required"),
  notes: z.string(),
});
export type FormSchemaType = z.infer<typeof FormSchema>;

export interface ValidationResult {
  success: boolean;
  data: FormSchemaType;
  order?: OrderClass | undefined;
  _id?: string;
}