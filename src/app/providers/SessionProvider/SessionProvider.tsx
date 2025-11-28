"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

interface NextAuthProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

export const NextAuthProvider = ({ children, session }: NextAuthProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
