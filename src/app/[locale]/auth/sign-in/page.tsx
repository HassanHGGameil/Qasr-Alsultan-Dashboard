"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignIn from "@/components/auth/signIn";
import { DOMAIN } from "@/lib/constains/constains";
import { useEffect } from "react";

const SignInPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(`${DOMAIN}/en/dashboard`);
    }
  }, [status, router]);

  if (status === "loading") return null;
  if (status === "authenticated") return null; // Prevent flash

  return (
    <section className="w-full">
      <div className="container">
        <SignIn />
      </div>
    </section>
  );
};

export default SignInPage;
