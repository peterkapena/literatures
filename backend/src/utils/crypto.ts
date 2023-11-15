import crypto from "crypto";

export default class {
  private static secretKeyHex = process.env.SECRET_KEY_HEX;
  private static ivHex = process.env.IV_HEX;

  static encrypt(data: string): string {
    const secretKey = Buffer.from(this.secretKeyHex, "hex");
    const iv = Buffer.from(this.ivHex, "hex");
    const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
    let encrypted = cipher.update(data, "utf8", "base64");
    encrypted += cipher.final("base64");
    return Buffer.from(encrypted, "utf8").toString("hex");
  }

  static decrypt(data: string): string {
    data = Buffer.from(data, "hex").toString("utf8");
    const secretKey = Buffer.from(this.secretKeyHex, "hex");
    const iv = Buffer.from(this.ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
    let decrypted = decipher.update(data, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}