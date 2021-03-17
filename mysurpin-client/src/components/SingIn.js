import React from "react";

const SingIn = () => {
  return (
    <div className="signIn">
      <div className="signin-formOn">
        <div className="signin__title"></div>
        <button className="google-login__logo">
          <img srt=""></img>
        </button>
        <div className="signin__ment"></div>
        <div className="signin-form">
          <input className="signin-form__email__input"></input>
          <input className="signin-form__password__input"></input>
        </div>
        <button className="signin__btn"></button>
      </div>
      <div className="signin-formOff">
        <div className="signin__title"></div>
        <div className="signin__ment"></div>
        <button className="signin__btn"></button>
      </div>
    </div>
  );
};

export default SingIn;
