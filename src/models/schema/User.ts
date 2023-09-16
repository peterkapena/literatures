// user.model.ts
import User, {
  UserClassQueryHelpers,
} from "@peterkapena/user_auth/src/models/User";
import { getModelForClass } from "@typegoose/typegoose";
import { models } from "mongoose";

const UserModel =
  models.Users ||
  getModelForClass<typeof User, UserClassQueryHelpers>(User, {
    options: { customName: "Users" },
  });

export { UserModel, User };
