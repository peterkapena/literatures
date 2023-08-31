import { OrderClass, OrderModel } from "@/models/schema/Order";
import { connectToDB } from "./mongo";

export default class OrderService {
  static async _(): Promise<OrderService> {
    await connectToDB();
    return new OrderService();
  }

  async createOrder(input: OrderClass): Promise<OrderClass> {
    return await OrderModel.create(input);
  }

  async getOrdersByUser(userId: String): Promise<OrderClass[]> {
    const rtn = (await OrderModel.find({ userId })).map(
      (order: OrderClass) => order
    );
    // console.log(rtn);

    return rtn;
  }

  async getOrders() {
    const rtn = (await OrderModel.find()).map((order: OrderClass) => order);
    return rtn;
  }
  async getOrder(_id: String): Promise<OrderClass> {
    const rtn = await OrderModel.findOne({ _id });
    return rtn;
  }

  async edit(input: OrderClass, id: string): Promise<Boolean> {
    console.log(id);
    const rtn = await OrderModel.updateOne(
      { _id: id },
      {
        literature: input.literature,
        quantity: input.quantity,
        notes: input.notes,
      }
    );
    return rtn.acknowledged;
  }
}
