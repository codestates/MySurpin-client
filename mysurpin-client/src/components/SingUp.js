import React from "react";

const SingUp = () => {
  return (
    <div className="SignUp">
      <div className="signup__formOff">
        <div className="sign__title"></div>
        <div className="sign__ment"></div>
        <button className="signup__btn"></button>
      </div>
      <div className="signup__formOn">
        <div className="signup__title"></div>
        <image className="google-login__logo"></image>
        <div className="sign__ment"></div>
        <div className="sign-form">
          <input className="signup-form__name__input"></input>
          <input className="signup-form__email__input"></input>
          <input className="signup-form__password__input"></input>
          <input className="signup-form__password__check__input"></input>
        </div>
        <button className="signup__btn"></button>
      </div>
    </div>
  );
};

export default SingUp;
