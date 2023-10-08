import { OrderClass } from "@/models/schema/Order";
import { z } from "zod";

export const FormSchema = z.object({
  members: z
    .array(
      z.object({
        name: z.string(),
        present: z.boolean(),
      })
    )
    .refine((ms) => ms.filter((m) => !m.present).length >= 2, {
      message: "Please select at least two members.",
    }),
});
export type FormSchemaType = z.infer<typeof FormSchema>;
