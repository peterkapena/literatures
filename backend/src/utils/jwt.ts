import jwt from "jsonwebtoken";
import crypto from "./crypto.js";

export default class {
  static encodeJwt(
    object: Object,
    options?: jwt.SignOptions | undefined
  ): string {
    const privateKey = Buffer.from(
      process.env.PRIVATE_KEY,
      "base64"
    ).toString();

    const token = jwt.sign(object, privateKey, {
      ...(options && options),
      expiresIn: "24h",
      algorithm: "RS256",
    });
    const tkn = crypto.encrypt(token);
    // console.log(tkn);
    return tkn;
  }

  static decodeJwt<T>(token: string): T | null {
    token = crypto.decrypt(token);
    // console.log(token);
    const publicKey = Buffer.from(process.env.PUBLIC_KEY, "base64").toString();
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  }
}