import { UserModel } from "@/models/schema/User";

export default class UserService {
  async createUser(input: any) {
    // console.log(input);
    return await UserModel.create(input);
  }
}
