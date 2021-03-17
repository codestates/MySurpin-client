import React from "react";
import SignIn from "../components/SingIn";
import SignUp from "../components/SingUp";

const SignPage = () => {
  return (
    <div className="SignPage">
      <section className="signin-section">
        <SignIn></SignIn>
      </section>
      <section className="signup-section">
        <SignUp></SignUp>
      </section>
    </div>
  );
};

export default SignPage;
