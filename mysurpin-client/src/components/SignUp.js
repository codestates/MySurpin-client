import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const SignUp = ({ isSignInOn, handlePageState }) => {
  const history = useHistory();
  useSelector((state) => state.userReducer);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const [message, setMessage] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMessage(e.target.value !== password);
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

  const handleClick = () => {
    if (name === "") {
      setMessage("이름을 입력해주세요.");
      return;
    }
    if (email === "") {
      setMessage("이메일을 입력해주세요.");
      return;
    } else if (!ValidateEmail(email)) {
      setMessage("유효하지 않는 이메일 입니다.");
      return;
    }
    if (password === "") {
      setMessage("비밀번호를 입력해주세요.");
    } else if (checkPassword(password)) {
      if (passwordcheck === "") {
        setMessage("비밀번호를 다시 입력해주세요.");
        return;
      } else if (password === passwordcheck) {
        setMessage("");
      } else {
        setMessage("비밀번호를 정확하게 입력해주세요.");
        return;
      }
    }
  };

  const ValidateEmail = (email) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return true;
    }
    return false;
  };

  const checkPassword = (upw) => {
    if (!/^[a-zA-Z0-9]{8,20}$/.test(upw)) {
      setMessage(
        "비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다."
      );
      return false;
    }
    var chk_num = upw.search(/[0-9]/g);
    var chk_eng = upw.search(/[a-z]/gi);
    if (chk_num < 0 || chk_eng < 0) {
      setMessage("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
      return false;
    }
    if (/(\w)\1\1\1/.test(upw)) {
      setMessage("비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.");
      return false;
    } else return true;
  };
  const handleSignUp = () => {
    if (password === passwordcheck) {
    }
    return fetch(`https://api.mysurpin.com/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: { name, email, password },
    })
      .then((res) => {
        if (res.body.accessToken) {
          setMessage("회원가입이 완료되었습니다.");
          history.push("/");
        } else {
          setMessage("잘못된 요청입니다.");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSignUp = () => {
    if (password === passwordcheck) {
      const payload = JSON.stringify({
        nickname: name,
        email,
        password,
      });
      console.log("good");
      fetch(`http://localhost:4000/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: payload,
      })
        .then((res) => {
          if (res.body.message === "Successfully processed") {
            setMessage("회원가입이 완료되었습니다.");
            history.push("/");
          } else {
            setMessage("잘못된 요청입니다.");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="signUp">
      {isSignInOn ? (
        <div className="signup__formOff">
          <div className="signup__title">Sign Up Surpin</div>
          <div className="signup__ment">sign up and make your own surpin!</div>
          <button className="signup__btn" onClick={() => handlePageState()}>
            signup
          </button>
        </div>
      ) : (
        <form onSubmit={handleSignUp}>
          <div className="signup__formOn">
            <div className="signup__title">Sign Up Surpin</div>
            <div className="signup__ment">
              sign up and make your own surpin!
            </div>
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
                type="password"
                value={password}
                required
                placeholder="Password"
                onChange={onChangePassword}
              ></input>
              <input
                className="signup-form__password__check__input"
                type="password"
                value={passwordcheck}
                required
                placeholder="PasswordCheck"
                onChange={onChangePasswordCheck}
              ></input>
            </div>
            <button className="signup__btn" onClick={() => handleClick()}>
              sign up
            </button>
            <span>{message}</span>
          </div>
        </form>
      )}
    </div>
  );
};
export default SignUp;
