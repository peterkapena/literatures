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
        // const user: UserClass = {
        //   email: profile?.email || "",
        //   name: profile?.name || "",
        //   image: profile?.image || "",
        // };

        // await new UserService().createUser({
        //   email: profile?.email || "",
        //   name: profile?.name || "",
        //   image: profile?.image || "",
        // });
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
