import { OrderClass, OrderModel } from "@/models/schema/Order";
import { connectToDB } from "./mongo";

export default class OrderService {
  async createOrder(input: OrderClass): Promise<OrderClass> {
    await connectToDB();
    // console.log("OrderService.createOrder");
    return await OrderModel.create(input);
  }

  async getOrdersByUser(userId: String) {
    await connectToDB();
    const rtn = (await OrderModel.find({ userId })).map(
      (order: OrderClass) => order
    );
    // console.log(rtn);
    return rtn;
  }
}
