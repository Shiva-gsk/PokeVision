import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import Credentials from "next-auth/providers/credentials";

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import authConfig from "./auth.config"
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schema";

// import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "@/data/user";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            id: string;
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"];
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    // providers: [GitHub],
    providers: [
        GitHub,
        Google,
        Credentials({
            async authorize(credentials) {
                const valid = await LoginSchema.safeParse(credentials);
                if (valid.success) {
                    const { email, password } = valid.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) {
                        return null;
                    }

                    const isValid = await bcrypt.compare(password, user.password);
                    if (isValid) {
                        return user;
                    }
                }
                return null;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            // On initial sign in
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
});
