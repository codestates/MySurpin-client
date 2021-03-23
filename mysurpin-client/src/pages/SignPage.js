import React, { useCallback, useState, useEffect } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Navbar from "../components/Navbar";

const SignPage = () => {
  const [signIn, setSignIn] = useState(true);

  const handlePageState = useCallback(() => {
    setSignIn(!signIn);
  }, [signIn]);

  useEffect(() => {
    document.title = "SignPage";
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

  return (
    <>
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
