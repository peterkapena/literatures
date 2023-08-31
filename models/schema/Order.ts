import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import { models } from "mongoose";

interface OrderClassSchemaQueryHelpers {}

@pre<OrderClass>("save", function () {
  this.when_created = new Date().toISOString();
})
export class OrderClass {
  _id?: String;
  @prop()
  userId!: String;
  @prop()
  literature!: String;
  @prop()
  quantity!: Number;
  @prop()
  when_created?: String;
  @prop({})
  notes?: String;
}

export const OrderModel =
  models.Order ||
  getModelForClass<typeof OrderClass, OrderClassSchemaQueryHelpers>(
    OrderClass,
    {
      options: { customName: "Order" },
    }
  );
