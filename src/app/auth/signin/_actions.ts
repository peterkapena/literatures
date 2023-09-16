"use server";
import { UserService } from "@peterkapena/user_auth";
import User from "@peterkapena/user_auth/src/models/User";

export async function signIn(user: User): Promise<any> {
  return await new UserService().signIn(
    user.username,
    user.password,
    process.env.PRIVATE_KEY || "",
    process.env.SECRET_KEY_HEX || "",
    process.env.IV_HEX || ""
  );
}
