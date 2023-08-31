// user.model.ts
import {
  ReturnModelType,
  getModelForClass,
  pre,
  prop,
  queryMethod,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { models } from "mongoose";

interface UserSchemaQueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}
function findByEmail(
  this: ReturnModelType<typeof UserClass, UserSchemaQueryHelpers>,
  email: UserClass["email"]
) {
  return this.findOne({ email });
}

@queryMethod(findByEmail)
@pre<UserClass>("save", function () {
  this.when_created = new Date().toISOString();
})
class UserClass {
  _id?: String;
  @prop()
  email!: string;

  @prop()
  name!: string;

  @prop()
  image!: string;

  @prop()
  when_created?: string;
}

// const UserModel =
//   models.Users ||
//   getModelForClass(UserClass, {
//     options: { customName: "Users" },
//   });

const UserModel =
  models.Users ||
  getModelForClass<typeof UserClass, UserSchemaQueryHelpers>(UserClass, {
    options: { customName: "Users" },
  });

export { UserModel, UserClass };
