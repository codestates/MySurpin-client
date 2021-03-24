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
  // const googleTokenState = useSelector((state) => state.userReducer);
  // const { googleToken } = googleTokenState;

  useEffect(() => {
    console.log("일단 확인한다!", window.location.hash);
    if (window.location.hash.length > 0) {
      console.log("리덕스에 저장!", window.location.hash);
      dispatch(getGoogleToken(window.location.hash));
      if (!isSignInOn) {
        history.push("/signpage");
      } else {
        fetch("http://localhost:4000/user/googlesignin", {
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
            if (body.accessToken) {
              console.log(body);
              let email = "";
              dispatch(getGoogleToken(""));
              dispatch(signIn(body.accessToken, email, body.nickname));
              history.push("/");
            } else {
              setAlertModalOpen(true);
              setAlertModalComment("회원가입을 진행해 주세요");
            }
          });
      }
    }
  }, []);

  useEffect(() => {
    document.title = "SignPage";
  }, []);

  const closeModal = useCallback(() => {
    setAlertModalOpen(false);
  }, [alertModalOpen]);

  const handlePageState = useCallback(() => {
    setIsSignInOn(!isSignInOn);
  }, [isSignInOn]);

  // useEffect(() => {
  //   // 자동으로 회원 가입 가능하게?
  //   console.log("나와랏", window.location.hash);
  //   console.log("너의 상태는?", !signIn);
  //   if (window.location.hash !== "" && !signIn) {
  //     fetch("http://localhost:4000/user/googleSignUp", {
  //       //googleSignUp or googleSignIn 상황에 따라 다르게 요청해야 함
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         credentials: "include",
  //       },
  //       body: JSON.stringify({ data: window.location.hash }),
  //     })
  //       .then((res) => res.json())
  //       // .then((body) => {
  //       //   console.log("웨 안나옴???", body);
  //       //   alert(body);
  //       //   return body;
  //       // })
  //       // .then((body) => {
  //       //   if (body.message !== "Successfully processed") {
  //       //     setAlertModalOpen(true);
  //       //     setAlertModalComment("존재하는 유저입니다.");
  //       //   } else if (body.message !== "Successfully processed") {
  //       //     setAlertModalOpen(true);
  //       //     setAlertModalComment("로그인을 진행해주세요.");
  //       //   }
  //       // })
  //       .catch((err) => console.log(err));
  //   }
  // }, []);

  const handleGoogleLogin = () => {
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
      state: "",
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
