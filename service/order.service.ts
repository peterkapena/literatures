 import { OrderClass, OrderModel } from "@/models/schema/Order";
import { connectToDB } from "./mongo";
 
export default class OrderService {
  async createOrder(input: OrderClass): Promise<OrderClass> {
    await connectToDB();
    console.log("OrderService.createOrder")
    return await OrderModel.create(input);
  }
}
