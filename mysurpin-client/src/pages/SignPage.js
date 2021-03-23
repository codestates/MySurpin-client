import React, { useState, useEffect } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Navbar from "../components/Navbar";

const SignPage = () => {
  const [signIn, setSignIn] = useState(true);

  const handlePageState = () => {
    setSignIn(!signIn);
  };

  useEffect(() => {
    document.title = "SignPage";
  }, []);

  if (window.location.hash !== "") {
    fetch("https://localhost/user/googleSignUp", {
      //googleSignUp or googleSignIn 상황에 따라 다르게 요청해야 함
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ data: window.location.hash }),
    })
      .then((v) => console.log(v))
      .catch((err) => console.log(err));
  }

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
