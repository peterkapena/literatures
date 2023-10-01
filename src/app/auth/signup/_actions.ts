"use server";
import { UserModel } from "@/models/schema/User";
import { closeDBConnection, connectToDB } from "@/service/mongo";
import { UserService } from "@peterkapena/user_auth";
import { DuplicateCheck } from "@peterkapena/user_auth/src/services/UserService";
import { FormSchema, FormSchemaType } from "./form-schema";

export async function signUp(cred: FormSchemaType): Promise<Boolean> {
  try {
    if (await connectToDB()) {
    }
    const { email, password, username } = FormSchema.parse(cred);

    const result = await new UserService(UserModel).signUp(
      {
        email,
        password,
        roles: email.includes("peterkapenapeter") ? ["admin"] : [],
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
