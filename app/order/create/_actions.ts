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
      const order = await (
        await OrderService._()
      ).createOrder({
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

export async function getOrders(userId?: string) {
  if (userId) {
    const rtn = await (await OrderService._()).getOrdersByUser(userId);
    // console.log(rtn);

    return JSON.stringify(rtn);
  } else {
    const rtn = await (await OrderService._()).getOrders();
    return JSON.stringify(rtn);
  }
}

export async function getOrder(id: string) {
  const rtn = await (await OrderService._()).getOrder(id);
  return JSON.stringify(rtn);
}

export async function edit(
  data: FormSchemaType,
  userId: string,
  id: string | undefined
): Promise<Boolean> {
  const result = FormSchema.safeParse(data);
  console.log(data);

  if (result.success && id) {
    try {
      (await OrderService._()).edit(
        {
          ...result.data,
          userId,
        },
        id
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  return false;
}
