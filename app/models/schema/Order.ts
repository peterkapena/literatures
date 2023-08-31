import { getModelForClass, pre, prop } from "@typegoose/typegoose";

interface OrderClassSchemaQueryHelpers {}

@pre<OrderClass>("save", function () {
  this.when_created = new Date().toISOString();
})

export class OrderClass {
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

export const OrderModel = getModelForClass<
typeof OrderClass,
OrderClassSchemaQueryHelpers
>(OrderClass, {
options: { customName: "Order" },
});
