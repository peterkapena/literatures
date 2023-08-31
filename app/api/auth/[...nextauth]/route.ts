import NextAuth, { NextAuthOptions } from "next-auth";
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

// console.log(googleCred.clientSecret);

export const authOptions: NextAuthOptions = {
  providers: [GoogleProvider(googleCred)],

  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ account, profile }) {
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
