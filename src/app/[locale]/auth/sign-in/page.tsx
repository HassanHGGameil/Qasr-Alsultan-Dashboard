import getCurrentUser from "@/actions/getCurrentUser";
import SignIn from "@/components/auth/signIn";
import { redirect } from "@/i18n/routing";
import { DOMAIN } from "@/lib/constains/constains";
import React from "react";

const SignInPage = async () => {

   const currentUser = await getCurrentUser();
    
      if (currentUser) {
        redirect({
          href: `${DOMAIN}/en/`,
          locale: "en",
        });
        return null;
      }


  return (
    <section className="w-full">
      <div className="container">
        <SignIn/>
      </div>
    </section>
  );
};

export default SignInPage;
