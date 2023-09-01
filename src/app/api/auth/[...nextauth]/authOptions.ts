import { UserClass, UserModel } from "@/models/schema/User";
import { connectToDB } from "@/service/mongo";
import UserService from "@/service/user.service";
import { NextAuthOptions, Session } from "next-auth";
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
export interface CustomSession extends Session {
  id: string;
}
export const authOptions: NextAuthOptions = {
  providers: [GoogleProvider(googleCred)],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      if (session.user?.email) {
        const sessionUser = await UserModel.findOne({
          email: session.user?.email,
        });

        // console.log("findByEmail");
        if (sessionUser?.id) {
          // console.log(session.user?.email);
          const customSession: CustomSession = {
            ...session,
            id: sessionUser.id,
          };
          return customSession;
        }
      }
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();
        const user: UserClass = {
          email: profile?.email || "",
          name: profile?.name || "",
          image: profile?.image || "",
        };

        await new UserService().createUser(user);
        return true;
      } catch (error) {
        // console.log(error);
        return false;
      }
    },
  },
};
