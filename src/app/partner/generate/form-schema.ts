import { z } from "zod";

export const FormSchema = z.object({
  checkboxes: z.array(z.boolean()).nonempty("Please choose one member"),
});
export type FormSchemaType = z.infer<typeof FormSchema>;
