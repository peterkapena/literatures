import { UserClass, UserModel } from "../models/schema/User";

export default class UserService {
  async createUser(input: UserClass): Promise<UserClass> {
    console.log("UserService.createUser");
    return UserModel.create(input);
  }
}
