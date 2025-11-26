import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";

import bcrypt from "bcryptjs";

import prisma from "./prismaDB/prismadb";

export const authOptions: NextAuthOptions = {
  // Prisma Adapter for connecting NextAuth with your Prisma DB
  adapter: PrismaAdapter(prisma),

  providers: [
   

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        return { id: user.id, email: user.email, name: user.name }; // Include necessary fields
      },
    }),
  ],

  // Session configuration
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session handling
    maxAge: 7 * 24 * 60 * 60, // Session lasts for 7 days
  },

  // JWT configuration
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in .env
    maxAge: 7 * 24 * 60 * 60, // Token expires after 7 days
  },

  // Debugging for development
  debug: process.env.NODE_ENV === "development",

  // Pages configuration

  // Callbacks for token and session handling
  // callbacks: {
  //   async jwt({ token, user }) {
  //     // Attach user ID to token on login
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     console.log("JWT Callback:", { token, user });
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Include token data in the session object
  //     if (token) {
  //       session.user = {
  //         ...session.user,
  //         id: token.id, // Attach user ID to session
  //       };
  //     }
  //     console.log("Session Callback:", { session, token });
  //     return session;
  //   },
  // },

  
  // Cookies configuration for cross-device compatibility
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production",
  //     },
  //   },
  // },

  // Secret for signing tokens and sessions
  secret: process.env.NEXTAUTH_SECRET,
};
