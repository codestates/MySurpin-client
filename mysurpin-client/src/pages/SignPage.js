import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const SignPage = () => {
  const [signIn, setSignIn] = useState(false);

  const handleSignIn = () => {
    setSignIn(!signIn);
  };

  return (
    <div className="signPage">
      <section className="signin-section">
        <SignIn isSignInOn={signIn} handleSignIn={handleSignIn}></SignIn>
      </section>
      <section className="signup-section">
        <SignUp isSignInOn={signIn} handleSignIn={handleSignIn}></SignUp>
      </section>
    </div>
  );
};

export default SignPage;
