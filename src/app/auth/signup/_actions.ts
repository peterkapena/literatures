"use server";
import { UserModel } from "@/models/schema/User";
import { closeDBConnection, connectToDB } from "@/service/mongo";
import { UserService } from "@peterkapena/user_auth";
import { DuplicateCheck } from "@peterkapena/user_auth/src/services/UserService";

export async function signUp(
  username: string,
  email: string,
  password: string
): Promise<Boolean> {
  try {
    if (await connectToDB()) {
    }
    const result = await new UserService(UserModel).signUp(
      {
        email,
        password,
        roles: [],
        username,
      },
      DuplicateCheck.BOTH_USERNAME_EMAIL
    );
    return result;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    closeDBConnection();
  }
}
