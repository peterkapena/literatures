"use server";
import OrderService from "@/service/order.service";
import { FormSchemaType, FormSchema, ValidationResult } from "./form-schema";

export async function createOrder(
  data: FormSchemaType,
  userId: string
): Promise<ValidationResult> {
  const result = FormSchema.safeParse(data);

  if (result.success) {
    try {
      const order = await new OrderService().createOrder({
        ...result.data,
        userId,
      });
      return { success: true, data, _id: order._id?.toString() };
    } catch (error) {
      return { success: true, data };
    }
  }

  return { success: false, data };
}
