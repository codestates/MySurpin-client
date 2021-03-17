import React from "react";

const SingIn = () => {
  return (
    <div className="SignIn">
      <div className="signin-formOn">
        <div className="sign__title"></div>
        <image className="google-login__logo"></image>
        <div className="signin__ment"></div>
        <div className="signin-form">
          <input className="signin-form__email__input"></input>
          <input className="signin-form__password__input"></input>
        </div>
        <button className="signin__btn"></button>
      </div>
      <div className="signin-formOff">
        <div className="sign__title"></div>
        <div className="sign__ment"></div>
        <button className="signin__btn"></button>
      </div>
    </div>
  );
};

export default SingIn;
