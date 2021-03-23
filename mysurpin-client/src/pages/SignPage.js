import React, { useCallback, useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Navbar from "../components/Navbar";

const SignPage = () => {
  const [signIn, setSignIn] = useState(true);

  const handlePageState = useCallback(() => {
    setSignIn(!signIn);
  }, [signIn]);

  return (
    <>
      <Navbar isSignPage={"hidden"} />
      <div className="signPage">
        <section className="signin-section">
          <SignIn
            isSignInOn={signIn}
            handlePageState={handlePageState}
          ></SignIn>
        </section>
        <section className="signup-section">
          <SignUp
            isSignInOn={signIn}
            handlePageState={handlePageState}
          ></SignUp>
        </section>
      </div>
    </>
  );
};
export default SignPage;
