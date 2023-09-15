"use server";
import { UserService } from "@peterkapena/user_auth";
import User from "@peterkapena/user_auth/src/models/User";

export async function signUp(user: User): Promise<Boolean> {
  return await new UserService().signUp(user);
}
