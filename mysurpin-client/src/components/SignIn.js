import React from "react";

const SignIn = ({ isSignInOn, handleSignIn }) => {
  return (
    <div className="signIn">
      {isSignInOn ? (
        <div className="signin-formOn">
          <div className="signin__title">Sign In Surpin</div>
          <button className="google-login__logo">
            G<img src="../../public/images/logo-google.png" alt=""></img>
          </button>
          <div className="signin__ment">or use email account</div>
          <div className="signin-form">
            <input
              className="signin-form__email__input"
              placeholder="Email"
            ></input>
            <input
              className="signin-form__password__input"
              placeholder="Password"
            ></input>
          </div>
          <button className="signin__btn">sign in</button>
        </div>
      ) : (
        <div className="signin-formOff">
          <div className="signin__title">Sign In Surpin!</div>
          <div className="signin__ment">
            To keep connected with us, please login with your personal
            information
          </div>
          <button className="signin__btn" onClick={() => handleSignIn()}>
            sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
