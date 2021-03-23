import React, { useCallback, useState, useEffect } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Navbar from "../components/Navbar";
import AlertModal from "../components/AlertModal";

const SignPage = () => {
  const [signIn, setSignIn] = useState(true);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalComment, setAlertModalComment] = useState("");
  const [googleToken, setGoogleToken] = useState("");

  const closeModal = useCallback(() => {
    setAlertModalOpen(false);
  }, [alertModalOpen]);

  const handlePageState = useCallback(() => {
    setSignIn(!signIn);
  }, [signIn]);

  useEffect(() => {
    document.title = "SignPage";
  }, []);

  useEffect(() => {
    // 자동으로 회원 가입 가능하게?
    console.log("나와랏", window.location.hash);
    console.log("너의 상태는?", !signIn);
    if (window.location.hash !== "" && !signIn) {
      fetch("http://localhost:4000/user/googleSignUp", {
        //googleSignUp or googleSignIn 상황에 따라 다르게 요청해야 함
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({ data: window.location.hash }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    }
  }, []);

  const handleGoogleLogin = () => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: "http://localhost:3000/signpage",
      response_type: "token",
      scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
      include_granted_scopes: "true",
      state: "",
    };
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  };

  const handleSingUpWithGoogle = () => {
    if (googleToken === "") {
      handleGoogleLogin();
    }
  };

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        close={closeModal}
        comment={alertModalComment}
      />
      <Navbar isSignPage={"hidden"} />
      <div className="signPage">
        <section className="signin-section">
          <SignIn
            isSignInOn={signIn}
            handlePageState={handlePageState}
            handleGoogleLogin={handleGoogleLogin}
          ></SignIn>
        </section>
        <section className="signup-section">
          <SignUp
            isSignInOn={signIn}
            handlePageState={handlePageState}
            handleGoogleLogin={handleGoogleLogin}
          ></SignUp>
        </section>
      </div>
    </>
  );
};
export default SignPage;
