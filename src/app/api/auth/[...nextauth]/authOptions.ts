// import { UserClass, UserModel } from "@/models/schema/User";
// import { connectToDB } from "@/service/mongo";
import { User, UserModel } from "@/models/schema/User";
import { connectToDB } from "@/service/mongo";
import { UserService } from "@peterkapena/user_auth";
import { DuplicateCheck } from "@peterkapena/user_auth/src/services/UserService";
import { mongoose } from "@typegoose/typegoose";
import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { use } from "react";

export interface CustomSession extends Session {
  id: string;
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email_or_username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // let a = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        await connectToDB();
        const signedin = await new UserService(
          UserModel,
          DuplicateCheck.EMAIL
        ).simple_signIn(
          credentials?.email_or_username || "",
          credentials?.password || ""
        );

        if (signedin?._id) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: signedin._id.toString(),
            email: signedin.email || signedin.username,
            name: signedin.username,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
};
