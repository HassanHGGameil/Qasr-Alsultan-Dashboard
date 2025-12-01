
"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import SignUp from "@/components/auth/SignUp";
import { useRouter } from "@/i18n/routing";

const SignUpPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

 const role = session?.user?.role;

  useEffect(() => {
    if (status === "authenticated") {
      const redirect = async () => {
        if (role === "USER") {
          await router.push(`/`);
        } else {
          await router.push(`/dashboard`);
        }
      };
      redirect();
    }
  }, [status, role, router]);

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

