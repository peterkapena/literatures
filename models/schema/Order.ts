import { getModelForClass, pre, prop } from "@typegoose/typegoose";

@pre<OrderClass>("save", function () {
  this.when = new Date();
})
class OrderClass {
  @prop()
  _id?: String;
  @prop()
  userId!: String;
  @prop()
  literature!: String;
  @prop()
  quantity!: String;
  @prop()
  when!: Date;
  @prop({})
  notes?: String;
}

export const OrderModel = getModelForClass(OrderClass);
