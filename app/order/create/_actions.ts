"use server";
import OrderService from "@/app/service/order.service";
import { FormSchemaType, FormSchema } from "./form-schema";

export async function createOrder(data: FormSchemaType, userId: string) {
  const result = FormSchema.safeParse(data);

  if (result.success) {
    await new OrderService().createOrder({
      ...result.data,
      userId,
      when_created: "",
    });

    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
