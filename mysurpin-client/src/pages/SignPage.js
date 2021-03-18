import React from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const SignPage = () => {
  return (
    <div className="signPage">
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
