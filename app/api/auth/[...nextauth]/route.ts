import { UserClass, UserModel } from "@/models/schema/User";
import { connectToDB } from "@/service/mongo";
import UserService from "@/service/user.service";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const googleCred = {
  clientId: process.env.GOOGLE_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
};

export const authOptions: NextAuthOptions = {
  providers: [GoogleProvider(googleCred)],

  callbacks: {
    async session({ session, user }) {
      return session;
    },
    async signIn({ account, profile }) {
      try {
        await connectToDB();
        const user: UserClass = {
          email: profile?.email || "",
          name: profile?.name || "",
          image: profile?.image || "",
        };
        if (!UserModel.find().findByEmail(user.email))
          await new UserService().createUser(user);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
