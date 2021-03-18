import React, { useState, useCallback } from "react";

const SignUp = ({ isSignInOn, handleSignIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordcheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const passwordErrorMsg = () => {
    if (passwordError === true) {
      alert("패스워드가 일치하지 않습니다.");
    }
  };
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
              value={name}
              required
              placeholder="Name"
              onChange={onChangeName}
            ></input>
            <input
              className="signup-form__email__input"
              value={email}
              required
              placeholder="Email"
              onChange={onChangeEmail}
            ></input>
            <input
              className="signup-form__password__input"
              value={password}
              required
              placeholder="Password"
              onChange={onChangePassword}
            ></input>
            <input
              className="signup-form__password__check__input"
              value={passwordcheck}
              required
              placeholder="PasswordCheck"
              onChange={onChangePasswordCheck}
            ></input>
          </div>
          <button className="signup__btn" onClick={passwordErrorMsg}>
            회원가입 완료!
          </button>
        </div>
      )}
    </div>
  );
};
export default SignUp;
