import UserClass, { UserModel } from "../models/user.js";
import {
  CreateUserInput,
  CreateUserOutput,
} from "../schema/user/create.user.js";
import { SigninInput, SigninOutput } from "../schema/user/signin.user.js";
import bcrypt from "bcrypt";
import { VerifyTokenOutput } from "../schema/user/token.verify.js";
import jwt from "../utils/jwt.js";

export enum DuplicateCheck {
  EMAIL = 1,
  USERNAME = 2,
  BOTH_USERNAME_EMAIL = 3,
}

class UserService {
  /**
   * Creates a new user in the system.
   *
   * @param user - The user object containing the email, username, password, and roles of the user to be created.
   * @param duplicateCheck - The type of duplicate check to perform.
   * @returns A boolean value indicating whether the user was successfully created (true) or if the user is a duplicate (false).
   */
  async signUp(
    user: UserClass,
    duplicateCheck: DuplicateCheck
  ): Promise<boolean> {
    const isDuplicate = await this.isDuplicate(user, duplicateCheck);

    if (isDuplicate) {
      return false;
    }

    await UserModel.create(user);

    return true;
  }

  private async isDuplicate(
    user: UserClass,
    duplicateCheck: DuplicateCheck = DuplicateCheck.EMAIL
  ): Promise<boolean> {
    const { email, username } = user;

    let u: UserClass;
    switch (duplicateCheck) {
      case DuplicateCheck.EMAIL:
        u = await UserModel.find().find_by_email(email);
        return !!u?._id;

      case DuplicateCheck.USERNAME:
        u = await UserModel.find().find_by_username(username);
        return !!u?._id;

      case DuplicateCheck.BOTH_USERNAME_EMAIL:
        u = await UserModel.findOne({ $or: [{ email }, { username }] });
        return !!(u?._id || u?._id);

      default:
        return false;
    }
  }

  async signin(input: SigninInput): Promise<SigninOutput> {
    let message: String[] = [];
    const SIGNIN_RESULT_MESSAGE = {
      INVALID_USERNAME_PASSOWRD: "Invalid email or password",
    };

    const user = await UserModel.find().find_by_email(input.email).lean();

    if (!user) {
      message.push(SIGNIN_RESULT_MESSAGE.INVALID_USERNAME_PASSOWRD);
      return { messages: message };
    }

    //validate password
    const passwordIsValid =
      input.password.length > 0 &&
      (await bcrypt.compare(
        input.password.toString(),
        user.password.toString()
      ));

    if (!passwordIsValid || message.length > 0) {
      message.push(SIGNIN_RESULT_MESSAGE.INVALID_USERNAME_PASSOWRD);
      return { messages: message };
    }
    const token = jwt.encodeJwt(user);
    const out: SigninOutput = { token, email: user.email, messages: message };

    return out;
  }

  async verifyToken(inputToken: String) {
    if (inputToken)
      try {
        const decoded = jwt.decodeJwt<UserClass>(inputToken.toString());

        const user = await UserModel.findOne({ _id: decoded._id }).lean();
        if (user._id)
          return {
            isValid: true,
            token: inputToken,
            email: user.email,
          } as VerifyTokenOutput;
      } catch (err) {
        console.log(err);
      }

    return {
      isValid: false,
      token: inputToken,
      email: "",
    };
  }
}

export default UserService;
