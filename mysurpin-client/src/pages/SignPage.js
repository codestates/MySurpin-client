import React, { useCallback, useState, useEffect } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Navbar from "../components/Navbar";
import AlertModal from "../components/AlertModal";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGoogleToken, signIn } from "../actions/index";

const SignPage = () => {
  const [isSignInOn, setIsSignInOn] = useState(true);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalComment, setAlertModalComment] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const googleTokenState = useSelector((state) => state.userReducer);
  const { googleToken } = googleTokenState;

  useEffect(() => {
    document.title = "SignPage";
  }, []);

  useEffect(() => {
    console.log("SignPage 일단 확인한다!", window.location.hash);
    let state = window.location.hash.slice(7, 13);
    console.log("SignPage 제대로 잘랐나?", state);

    // 구글 버튼을 누른 곳이 회원가입 일 때
    if (state === "signUp") {
      console.log("회원가입 일 경우 잘 들어와야 한다~?");
      fetch("http://localhost:4000/user/googleSignUp", {
        //googleSignUp or googleSignIn 상황에 따라 다르게 요청해야 함
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({ data: window.location.hash }),
      })
        .then((res) => res.json())
        .then((body) => {
          if (body.message === "Successfully processed") {
            return "ok";
          } else {
            return "no";
          }
        })
        .then((data) => {
          if (data === "ok") {
            fetch("http://localhost:4000/user/googleSignIn", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                credentials: "include",
              },
              body: JSON.stringify({ data: window.location.hash }),
            })
              .then((res) => res.json())
              .then((body) => {
                if (body.accessToken) {
                  dispatch(signIn(body.accessToken, body.email, body.nickname));
                  return "ok";
                } else {
                  setAlertModalOpen(true);
                  setAlertModalComment("회원가입을 진행해 주세요");
                  return "no";
                }
              })
              .then((data) => {
                if (data === "ok") {
                  history.push("/");
                  return "ok";
                }
              })
              .catch((err) => console.error(err));
          } else {
            history.push("/signpage");
            return "no";
          }
        })
        .then((data) => {
          if (data === "no") {
            alert("이미 가입한 유저이거나 유효하지 않는 사용자 입니다.");
          }
        })
        .catch((err) => console.error(err));
    } // 구글 버튼을 누른 곳이 로그인 일 때
    else if (state === "signIn") {
      fetch("http://localhost:4000/user/googleSignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({ data: window.location.hash }),
      })
        .then((res) => res.json())
        .then((body) => {
          if (body.accessToken) {
            dispatch(signIn(body.accessToken, body.email, body.nickname));
            return "ok";
          } else {
            setAlertModalOpen(true);
            setAlertModalComment("회원가입을 진행해 주세요");
            return "no";
          }
        })
        .then((data) => {
          if (data === "ok") {
            history.push("/");
            return "ok";
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleGoogleLogin = (reqPage = "") => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: "http://localhost:3000/signpage",
      response_type: "token",
      scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
      include_granted_scopes: "true",
      state: reqPage,
    };
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  };

  const closeModal = useCallback(() => {
    setAlertModalOpen(false);
  }, [alertModalOpen]);

  const handlePageState = useCallback(() => {
    setIsSignInOn(!isSignInOn);
  }, [isSignInOn]);

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        close={closeModal}
        comment={alertModalComment}
      />
      <Navbar isSignPage={"hidden"} />
      <div className="signPage">
        <section className="signin-section">
          <SignIn
            isSignInOn={isSignInOn}
            handlePageState={handlePageState}
            handleGoogleLogin={handleGoogleLogin}
          ></SignIn>
        </section>
        <section className="signup-section">
          <SignUp
            isSignInOn={isSignInOn}
            handlePageState={handlePageState}
            handleGoogleLogin={handleGoogleLogin}
          ></SignUp>
        </section>
      </div>
    </>
  );
};
export default SignPage;
