import { getModelForClass, prop } from "@typegoose/typegoose";

class UserClass {
  @prop()
  public _id?: String;
  @prop()
  public literature?: String;
  @prop()
  public quantity?: String;
  @prop()
  public when?: String;
  @prop()
  public notes?: String;
}

export const UserModel = getModelForClass(UserClass);
