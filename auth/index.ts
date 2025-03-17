import { getUser } from "@/lib/db";
import { compare } from "bcrypt-ts";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        let user = await getUser(email);

        let passwordsMatch = await compare(password, user?.password!);
        if (passwordsMatch) return user as any;
      },
    }),
  ],
});
