import React from "react";

const SingUp = () => {
  return (
    <div className="signUp">
      <div className="signup__formOff">
        <div className="signup__title"></div>
        <div className="signup__ment"></div>
        <button className="signup__btn"></button>
      </div>
      <div className="signup__formOn">
        <div className="signup__title"></div>
        <div className="signup__ment"></div>
        <div className="signup-form">
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
