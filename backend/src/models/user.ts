import {
  getModelForClass,
  prop,
  pre,
  queryMethod,
  index,
  mongoose,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import bcrypt from "bcrypt";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import base_model from "./base_model.js";

function find_by_email(
  this: ReturnModelType<typeof UserClass, UserClassQueryHelpers>,
  email: UserClass["email"]
) {
  return this.findOne({ email });
}

interface UserClassQueryHelpers {
  find_by_email: AsQueryMethod<typeof find_by_email>;
}

@queryMethod(find_by_email)
@pre<UserClass>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password.toString(), salt);
  this.created_on = new Date().toISOString();
})
@index({ email: 1 })
@queryMethod(find_by_email)
@ObjectType()
export default class UserClass extends base_model {
  @prop({ type: String, unique: true })
  email!: String;

  @prop({ type: String })
  password!: String;

  @prop({ type: [String], default: [], required: false })
  @Field(() => [String])
  roles: String[];
}

export const UserModel = getModelForClass<
  typeof UserClass,
  UserClassQueryHelpers
>(UserClass, {
  options: { customName: "User" },
});