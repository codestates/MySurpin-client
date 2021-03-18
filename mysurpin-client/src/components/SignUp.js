import React, { useState, useCallback } from "react";

const SignUp = ({ isSignInOn, handleSignIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const [errmessage, setErrMessage] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setErrMessage(e.target.value !== password);
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

  const errmessageMsg = () => {
    if (errmessage === true) {
      alert("패스워드가 일치하지 않습니다.");
    }
  };

  // const ValidateEmail = (email) => {
  //   if (
  //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
  //       email
  //     )
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

  // const checkPassword = (upw) => {
  //   if (!/^[a-zA-Z0-9]{8,20}$/.test(upw)) {
  //     setErrMessage(
  //       "비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다."
  //     );
  //     return false;
  //   }
  //   var chk_num = upw.search(/[0-9]/g);
  //   var chk_eng = upw.search(/[a-z]/gi);
  //   if (chk_num < 0 || chk_eng < 0) {
  //     setErrMessage("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
  //     return false;
  //   }
  //   if (/(\w)\1\1\1/.test(upw)) {
  //     setErrMessage("비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.");
  //     return false;
  //   } else return true;
  // };

  return (
    <div className="signUp">
      {isSignInOn ? (
        <div className="signup__formOff">
          <div className="signup__title">Sign Up Surpin</div>
          <div className="signup__ment">sign up and make your own surpin!</div>
          <button className="signup__btn" onClick={() => handleSignIn()}>
            signup
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
          <button className="signup__btn" onClick={errmessageMsg}>
            sign up
          </button>
        </div>
      )}
    </div>
  );
};
export default SignUp;
