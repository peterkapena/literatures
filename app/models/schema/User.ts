// user.model.ts
import { getModelForClass, prop } from "@typegoose/typegoose";

class UserClass {
  @prop()
  email!: string;

  @prop()
  name!: string;

  @prop()
  image!: string;
}

const UserModel = getModelForClass(UserClass, {
  options: { customName: "Users" },
});

export { UserModel, UserClass };
