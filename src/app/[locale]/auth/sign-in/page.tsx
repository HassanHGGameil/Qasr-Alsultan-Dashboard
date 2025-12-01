"use client";
import { useSession } from "next-auth/react";
import SignIn from "@/components/auth/signIn";
import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";

const SignInPage = () => {
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
  if (status === "authenticated") return null; 

  return (
    <section className="w-full">
      <div className="container">
        <SignIn />
      </div>
    </section>
  );
};

export default SignInPage;
