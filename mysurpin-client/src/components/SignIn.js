import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../actions";
import store from "../store/store";

const SignIn = ({ isSignInOn, handleSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const counter = useSelector((state) => state.tagsReducer);
  const dispatch = useDispatch();

  const practice = () => {
    dispatch(increment());
    console.log(store.getState());
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="signIn">
      {isSignInOn ? (
        <div className="signin-formOn">
          <div className="signin__title">Sign In Surpin</div>
          <button className="google-login__logo">
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
            ></input>
            <input
              className="signin-form__password__input"
              placeholder="Password"
              value={password}
              required
              onChange={onChangePassword}
            ></input>
          </div>
          <button className="signin__btn">sign in</button>
        </div>
      ) : (
        <div className="signin-formOff">
          <div className="signin__title">Sign In Surpin!</div>
          <div className="signin__ment">
            To keep connected with us, please login with your personal
            information
          </div>
          {/* <button className="signin__btn" onClick={() => handleSignIn()}>
            sign in
          </button> */}
          <button className="signin__btn" onClick={() => practice()}>
            sign in
          </button>
        </div>
      )}
    </div>
  );
};
export default SignIn;
