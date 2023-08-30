import { getModelForClass, pre, prop } from "@typegoose/typegoose";

@pre<OrderClass>("save", function () {
  this.when = new Date();
})

class OrderClass {
  @prop()
  public _id?: String;
  @prop()
  public userId!: String;
  @prop()
  public literature!: String;
  @prop()
  public quantity!: String;
  @prop()
  public when!: Date;
  @prop({})
  public notes?: String;
}

export const OrderModel = getModelForClass(OrderClass);
