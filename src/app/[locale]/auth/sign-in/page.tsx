import SignIn from "@/components/auth/signIn";
import React from "react";

const SignInPage = async () => {
  return (
    <section className="w-full">
      <div className="container">
        <SignIn/>
      </div>
    </section>
  );
};

export default SignInPage;
