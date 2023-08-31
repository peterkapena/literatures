import { getModelForClass, prop } from "@typegoose/typegoose";

class UserClass {
  @prop()
  _id?: String;
  @prop({ type: String, required: true })
  literature?: String;
  @prop({ type: String, required: true })
  quantity!: String;
  @prop({ type: String, required: true })
  when!: String;
  @prop()
  notes?: String;
  @prop({ type: String, required: true })
  username!: String;
  @prop({ type: String, required: true })
  password!: String;
}

export const UserModel = getModelForClass(UserClass);
