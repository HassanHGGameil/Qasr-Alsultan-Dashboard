
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/lib/constains/constains";
import { useEffect } from "react";
import SignUp from "@/components/auth/SignUp";

const SignUpPage = () => {
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
     <section className="  w-full">
      <div className="container">
        <SignUp />
      </div>
    </section>
  );
};

export default SignUpPage;

