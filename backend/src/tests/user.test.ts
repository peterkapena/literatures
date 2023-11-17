// tests/auth.test.ts
import { describe, expect, it, beforeAll, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import UserClass from "../models/user";
import UserService, { DuplicateCheck } from "../services/user.service";

describe("Duplication Tests", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/auth_test_auth", {});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  const user: UserClass = {
    email: "user@example.com",
    password: "password",    
    roles: [],
    username: "username",
  };

  it("should allow a user to sign up", async () => {
    const result = await new UserService().signUp(user, DuplicateCheck.EMAIL);
    expect(result).toBe(true);
  });

  // it("should not allow a user to sign up with an existing username", async () => {
  //   const result = await new UserService().signUp(user, DuplicateCheck.EMAIL);
  //   expect(result).toBe(false);
  // });

  // it("should allow a user to sign in with correct credentials and verify its token", async () => {
  //   const result = await new UserService().signin({
  //     email: user.email,
  //     password: user.password,
  //   });

  //   expect(result.token).not.toBeNull();

  //   if (result.token) {
  //     const result2 = await new UserService().verifyToken(result.token);
  //     expect(result2.isValid).toBe(true);
  //   }
  // });

  // it("should return invalid for invalid token", async () => {
  //   const result2 = await new UserService().verifyToken("result.token");
  //   expect(result2.isValid).toBe(false);
  // });

  // it("should not allow a user to sign in with incorrect credentials", async () => {
  //   const result = await new UserService().signin({
  //     email: user.username,
  //     password: "user.password",
  //   });
  //   expect(result?.messages?.length).toBeGreaterThan(0);
  // });
});
