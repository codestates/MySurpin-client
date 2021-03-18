import React from "react";
const SignUp = ({ isSignInOn, handleSignIn }) => {
  return (
    <div className="signUp">
      {isSignInOn ? (
        <div className="signup__formOff">
          <div className="signup__title">Sign Up Surpin</div>
          <div className="signup__ment"></div>
          <button className="signup__btn" onClick={() => handleSignIn()}>
            회원가입 페이지로 이동
          </button>
        </div>
      ) : (
        <div className="signup__formOn">
          <div className="signup__title">Sign Up Surpin</div>
          <div className="signup__ment">sign up and make your own surpin!</div>
          <div className="signup-form">
            <input
              className="signup-form__name__input"
              placeholder="Name"
            ></input>
            <input
              className="signup-form__email__input"
              placeholder="Email"
            ></input>
            <input
              className="signup-form__password__input"
              placeholder="Password"
            ></input>
            <input
              className="signup-form__password__check__input"
              placeholder="Password Check"
            ></input>
          </div>
          <button className="signup__btn">회원가입 완료!</button>
        </div>
      )}
    </div>
  );
};
export default SignUp;
