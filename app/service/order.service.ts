import { OrderClass, OrderModel } from "../models/schema/Order";
import {coonectDB} from "./mongo";

export default class OrderService {
  async createOrder(input: OrderClass): Promise<OrderClass> {
    await coonectDB();
    console.log("OrderService.createOrder")
    return await OrderModel.create(input);
  }
}
