import { UserClass, UserModel } from "@/models/schema/User";

export default class UserService {
  async createUser(input: UserClass) {
    if (!(await UserModel.find().findByEmail(input.email)))
      return await UserModel.create(input);
  }
}
