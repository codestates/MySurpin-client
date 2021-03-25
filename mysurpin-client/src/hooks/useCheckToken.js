/* eslint-disable */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../actions/index";
import { useHistory } from "react-router-dom";
require("dotenv").config();

const useCheckToken = (param = [], func = () => {}) => {
  const userState = useSelector((state) => state.userReducer);
  const { user } = userState;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token && user.email) {
      const payload = JSON.stringify({
        email: user.email,
      });
      return fetch(`${process.env.REACT_APP_SERVER_URL}/user/userinfo`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: payload,
      })
        .then((res) => {
          return res.status;
        })
        .then((status) => {
          if (Number(status) !== 200) {
            dispatch(signOut());
            history.push("/signpage");
          } else {
            func();
          }
        })
        .catch((err) => console.error(err));
    }
  }, [...param]);
};

export default useCheckToken;
