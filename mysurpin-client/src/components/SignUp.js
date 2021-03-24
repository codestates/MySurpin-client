import React, { useState, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import AlertModal from "./AlertModal";
import { useSelector, useDispatch } from "react-redux";
require("dotenv").config();

const SignUp = ({ isSignInOn, handlePageState, handleGoogleLogin }) => {
  const history = useHistory();
  const googleTokenState = useSelector((state) => state.userReducer);
  const { googleToken } = googleTokenState;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const [message, setMessage] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalComment, setAlertModalComment] = useState("");

  const moveToEmail = useRef();
  const moveToPassword = useRef();
  const moveToCheckPassword = useRef();

  const closeModal = useCallback(() => {
    setAlertModalOpen(false);
  }, [alertModalOpen]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMessage(e.target.value !== password);
    },
    [password, passwordcheck, message]
  );

  const onChangeName = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [name]
  );

  const onChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password]
  );

  const onKeyPressMoveToEmail = useCallback(
    (e) => {
      if (e.key === "Enter") {
        moveToEmail.current.focus();
        handleClick();
      }
    },
    [name, email]
  );

  const onKeyPressMoveToPassword = useCallback(
    (e) => {
      if (e.key === "Enter") {
        moveToPassword.current.focus();
        handleClick();
      }
    },
    [email, password]
  );

  const onKeyPressMoveToPasswordCheck = useCallback(
    (e) => {
      if (e.key === "Enter") {
        moveToCheckPassword.current.focus();
        handleClick();
      }
    },
    [password, passwordcheck]
  );

  const onKeyPressSignUp = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleClick();
      }
    },
    [passwordcheck]
  );

  const handleSignUpWithGoogle = () => {
    // console.log("--------------SingUp 버튼-----------------", googleToken);
    console.log("--------------SignUp 버튼-----------------", googleTokenState);
    if (googleToken.length > 0) {
      fetch("http://localhost:4000/user/googleSignUp", {
        //googleSignUp or googleSignIn 상황에 따라 다르게 요청해야 함
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({ data: googleToken }),
      })
        .then((res) => res.json())
        .then((body) => {
          if (body.message !== "Successfully processed") {
            setAlertModalOpen(true);
            setAlertModalComment("존재하는 유저입니다.");
          } else if (body.message === "Successfully processed") {
            setAlertModalOpen(true);
            setAlertModalComment("로그인을 진행해주세요.");
            history.push("/signpage");
            handlePageState();
          }
        })
        .catch((err) => console.log(err));
    } else {
      handleGoogleLogin();
    }
  };

  const handleSignUp = () => {
    if (password === passwordcheck) {
      const payload = JSON.stringify({
        nickname: name,
        email,
        password,
      });
      fetch(`http://localhost:4000/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: payload,
      })
        .then((res) => res.json())
        .then((body) => {
          if (body.message === "Successfully processed") {
            setMessage("회원가입이 완료되었습니다.");
            setAlertModalOpen(true);
            setAlertModalComment("회원가입이 완료되었습니다.");
          } else {
            setMessage("잘못된 요청입니다.");
          }
        })
        .catch((err) => console.log(err));
    }
    setPasswordCheck("");
  };

  const handleClick = useCallback(() => {
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
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage("비밀번호를 정확하게 입력해주세요.");
        return;
      }
    } else {
      if (email === "") {
        setMessage("이메일을 입력해주세요");
        return;
      } else if (!ValidateEmail(email)) {
        setMessage("유효하지 않는 이메일 입니다.");
        return;
      } else setMessage("");
    }
    if (password === "") {
      setMessage("비밀번호를 입력해주세요.");
      return;
    } else if (checkPassword(password)) {
      handleSignUp(email, password);
      return;
    }
  }, [name, email, password, passwordcheck, message]);

  const ValidateEmail = useCallback(
    (email) => {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        return true;
      }
      return false;
    },
    [email]
  );

  const checkPassword = useCallback(
    (upw) => {
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
    },
    [password, message]
  );

  return (
    <div className="signUp">
      <AlertModal
        open={alertModalOpen}
        close={closeModal}
        comment={alertModalComment}
      />
      {isSignInOn ? (
        <div className="signup__formOff">
          <div className="signup__title">Sign Up Surpin</div>
          <div className="signup__ment">sign up and make your own surpin!</div>
          <button className="signup__btn" onClick={() => handlePageState()}>
            signup
          </button>
        </div>
      ) : (
        <div>
          <div className="signup__formOn">
            <div className="signup__title">Sign Up Surpin</div>
            <button
              className="google-login__logo"
              onClick={handleSignUpWithGoogle}
            >
              G<img src="../../public/images/logo-google.png" alt=""></img>
            </button>
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
                onKeyPress={onKeyPressMoveToEmail}
              ></input>
              <input
                className="signup-form__email__input"
                value={email}
                required
                placeholder="Email"
                onChange={onChangeEmail}
                onKeyPress={onKeyPressMoveToPassword}
                ref={moveToEmail}
              ></input>
              <input
                className="signup-form__password__input"
                type="password"
                value={password}
                required
                placeholder="Password"
                onChange={onChangePassword}
                onKeyPress={onKeyPressMoveToPasswordCheck}
                ref={moveToPassword}
              ></input>
              <input
                className="signup-form__password__check__input"
                type="password"
                value={passwordcheck}
                required
                placeholder="PasswordCheck"
                onChange={onChangePasswordCheck}
                onKeyPress={onKeyPressSignUp}
                ref={moveToCheckPassword}
              ></input>
            </div>
            <button className="signup__btn" onClick={() => handleClick()}>
              sign up
            </button>
            <span className="signup__message">{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignUp;
