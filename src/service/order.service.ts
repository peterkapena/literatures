import { OrderClass, OrderModel } from "@/models/schema/Order";
import { connectToDB } from "./mongo";
import User from "@peterkapena/user_auth/src/models/User";
import { UserModel } from "@/models/schema/User";

export default class OrderService {
  static async _(): Promise<OrderService> {
    await connectToDB();
    return new OrderService();
  }

  async createOrder(input: OrderClass): Promise<OrderClass> {
    return await OrderModel.create(input);
  }

  async getOrdersByUser(userId: String): Promise<
    {
      order: OrderClass;
      user: User;
    }[]
  > {
    const rtn = await Promise.all(
      (
        await OrderModel.find({ userId }).sort({ when_created: -1 })
      ).map(async (order: OrderClass) => ({
        order,
        user: await UserModel.findById(order.userId),
      }))
    );
    return rtn;
  }

  async getOrders(): Promise<{ order: OrderClass; user: User }[]> {
    const orders = await OrderModel.find().sort({ when_created: -1 });

    const rtn = await Promise.all(
      orders.map(async (o) => ({
        order: o,
        user: await UserModel.findById(o.userId),
      }))
    );

    return rtn;
  }

  async getOrder(_id: String): Promise<OrderClass> {
    const rtn = await OrderModel.findOne({ _id });
    return rtn;
  }

  async edit(input: OrderClass, id: string): Promise<Boolean> {
    // console.log(id);
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
  async delete(id: String): Promise<boolean> {
    return (await OrderModel.deleteOne({ _id: id })).deletedCount > 0;
  }
}
