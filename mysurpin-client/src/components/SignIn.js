import React, { useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGoogleToken, signIn } from "../actions/index";
import AlertModal from "./AlertModal";

const SignIn = ({ isSignInOn, handlePageState, handleGoogleLogin }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const googleTokenState = useSelector((state) => state.userReducer);
  const { googleToken } = googleTokenState;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalComment, setAlertModalComment] = useState("");

  const moveToPassword = useRef();

  const closeModal = useCallback(() => {
    setAlertModalOpen(false);
  }, [alertModalOpen]);

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

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      moveToPassword.current.focus();
      handleSignIn();
    }
  };
  // 구글 로그인
  const handleSignInWithGoogle = () => {
    handleGoogleLogin("signIn");
  };

  const handleSignIn = () => {
    if (email === "") {
      return;
    }
    if (password === "") {
      return;
    }
    const payload = JSON.stringify({
      email,
      password,
    });
    return fetch(`http://localhost:4000/user/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: payload,
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.accessToken) {
          console.log(body);
          dispatch(signIn(body.accessToken, body.email, body.nickname));
          history.push("/");
        } else {
          setAlertModalOpen(true);
          setAlertModalComment("입력하신 정보가 틀렸습니다.");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="signIn">
      <AlertModal
        open={alertModalOpen}
        close={closeModal}
        comment={alertModalComment}
      />
      {isSignInOn ? (
        <div className="signin-formOn">
          <div className="signin__title">Sign In Surpin</div>
          <button
            className="google-login__logo"
            onClick={handleSignInWithGoogle}
          >
            G<img src="../../public/images/logo-google.png" alt=""></img>
          </button>
          <div className="signin__ment">or use email account</div>
          <div className="signin-form">
            <input
              className="signin-form__email__input"
              placeholder="Email"
              value={email}
              required
              onChange={onChangeEmail}
              onKeyPress={onKeyPress}
            ></input>
            <input
              type="password"
              className="signin-form__password__input"
              placeholder="Password"
              value={password}
              required
              onChange={onChangePassword}
              onKeyPress={onKeyPress}
              ref={moveToPassword}
            ></input>
          </div>
          <button className="signin__btn" onClick={handleSignIn}>
            log in
          </button>
        </div>
      ) : (
        <div className="signin-formOff">
          <div className="signin__title">Log In Surpin!</div>
          <div className="signin__ment">
            To keep connected with us, please login with your personal
            information
          </div>
          <button className="signin__btn" onClick={() => handlePageState()}>
            log in
          </button>
        </div>
      )}
    </div>
  );
};
export default SignIn;
