import { getModelForClass, pre, prop, queryMethod } from "@typegoose/typegoose";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { models } from "mongoose";

interface OrderClassSchemaQueryHelpers {
  findAllByUser: AsQueryMethod<typeof findAllByUser>;
}
function findAllByUser(
  this: ReturnModelType<typeof OrderClass, OrderClassSchemaQueryHelpers>,
  userId: OrderClass["userId"]
) {
  return this.findOne({ userId });
}
@queryMethod(findAllByUser)
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
