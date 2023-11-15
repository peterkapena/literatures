import UserClass, { UserModel } from "../models/user.js";
import {
  CreateUserInput,
  CreateUserOutput,
} from "../schema/user/create.user.js";
import { SigninInput, SigninOutput } from "../schema/user/signin.user.js";
import bcrypt from "bcrypt";
import { VerifyTokenOutput } from "../schema/user/token.verify.js";
import jwt from "../utils/jwt.js";

class UserService {
  async createUser(input: CreateUserInput): Promise<CreateUserOutput> {
    if (!(await UserModel.find().find_by_email(input.email))) {
      await UserModel.create(input);
      return { message: [] };
    } else {
      return { message: ["User already exists"] };
    }
  }

  async signin(input: SigninInput): Promise<SigninOutput> {
    let message: String[] = [];
    const SIGNIN_RESULT_MESSAGE = {
      INVALID_USERNAME_PASSOWRD: "Invalid email or password",
      NOT_APPROVED_BY_ADMIN:
        "User not approved by Admin. You will be notified when approved so you can sign in",
    };
    const user = await UserModel.find().find_by_email(input.email).lean();

    if (!user) {
      message.push(SIGNIN_RESULT_MESSAGE.INVALID_USERNAME_PASSOWRD);
      return { message };
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
      return { message };
    }
    const token = jwt.encodeJwt(user);
    const out: SigninOutput = { token, email: user.email, message };

    return out;
  }

  async verifyToken(inputToken: string) {
    if (inputToken)
      try {
        const decoded = jwt.decodeJwt<UserClass>(inputToken);

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
