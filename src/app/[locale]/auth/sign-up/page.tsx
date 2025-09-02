import getCurrentUser from "@/actions/getCurrentUser";
import SignUp from "@/components/auth/SignUp";
import { redirect } from "@/i18n/routing";
import { DOMAIN } from "@/lib/constains/constains";
import React from "react";

const SignUpPage = async () => {

    const currentUser = await getCurrentUser();
  
    if (currentUser) {
      redirect({
        href: `${DOMAIN}/en/`,
        locale: "en",
      });
      return null;
    }
  


  return (
    <section className="  w-full">
      <div className="container">
        <SignUp />
      </div>
    </section>
  );
};

export default SignUpPage;
