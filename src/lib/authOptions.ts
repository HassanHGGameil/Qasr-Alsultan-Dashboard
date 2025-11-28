import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import prisma from "./prismaDB/prismadb";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            throw new Error("Invalid email or password");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          // ❗ Protect internal info — always return generic error
          if (!user || !user.hashedPassword) {
            throw new Error("Invalid email or password");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isCorrectPassword) {
            throw new Error("Invalid email or password");
          }

          // ✔ Only return needed fields
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          role: token.role as any,
        };
      }
      return session;
    },
  },

  // Pages configuration for proper redirects
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },

  // Cookie settings for both development and production
  cookies: {
    sessionToken: {
      name: `${
        process.env.NODE_ENV === "production" &&
        process.env.NEXTAUTH_URL?.startsWith("https")
          ? "__Secure-"
          : ""
      }next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // Only set secure to true if using HTTPS
        secure: process.env.NEXTAUTH_URL?.startsWith("https") ?? false,
        // Don't set domain - let browser handle it automatically for same-origin
        // This works better across different deployment scenarios
        domain: undefined,
      },
    },
  },

  debug: process.env.NODE_ENV === "development",

  // ✔ Required for signing sessions
  secret: process.env.NEXT_AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
};
