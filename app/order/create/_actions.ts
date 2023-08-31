"use server";
import { FormSchemaType, FormSchema } from "./form-schema";

export async function addEntry(data: FormSchemaType) {
  console.log("server action");
  const result = FormSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
