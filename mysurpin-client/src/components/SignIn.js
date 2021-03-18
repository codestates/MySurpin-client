import React, { useState } from "react";
const SignIn = ({ isSignInOn, handleSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="signIn">
      {isSignInOn ? (
        <div className="signin-formOn">
          <div className="signin__title">Sign In Surpin</div>
          <button className="google-login__logo">
            <img src="../../public/images/logo-google.png" alt=""></img>
          </button>
          <div className="signin__ment"></div>
          <div className="signin-form">
            <input
              className="signin-form__email__input"
              value={email}
              required
              onChange={onChangeEmail}
            ></input>
            <input
              className="signin-form__password__input"
              value={password}
              required
              onChange={onChangePassword}
            ></input>
          </div>
          <button className="signin__btn">로그인 완료!</button>
        </div>
      ) : (
        <div className="signin-formOff">
          <div className="signin__title">Sign In Surpin!</div>
          <div className="signin__ment">
            To keep connected with us, please login with your personal
            information
          </div>
          <button className="signin__btn" onClick={() => handleSignIn()}>
            로그인 페이지로 이동
          </button>
        </div>
      )}
    </div>
  );
};
export default SignIn;
