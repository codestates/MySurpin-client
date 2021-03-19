import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userEdit } from "../actions/index";

const ChangeInfo = ({ isChangeInfoFormOn, handleEditUserInfo }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const { user } = userState;

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  const handleChangeInfo = () => {
    if (user.email === email && password === checkpassword) {
      const payload = JSON.stringify({
        email,
        password,
        nickname,
      });
      return fetch(`https://api.mysurpin.com/user/useredit 여기로`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: payload,
      })
        .then((res) => {
          if (res.body.accessToken) {
            dispatch(userEdit(res.body.accessToken, email, password, nickname));
            alert("정보가 변경되었습니다.");
          } else {
            alert("Bad Request");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="changeInfo">
      {isChangeInfoFormOn ? (
        <div className="changeinfo__formOn">
          <div className="changeinfo__title">
            <div className="changeinfo__title__text">Edit My Info</div>
            <img src="" alt="" />
          </div>
          <div className="changeinfo__form">
            <input
              type="text"
              className="email__input"
              placeholder="Email 본인확인을 위해 입력해주세요 (변경불가)"
              value={email}
              onChange={onChangeEmail}
            />
            <input
              type="text"
              className="nickname__input"
              placeholder={"닉네임"}
              value={nickname}
              onChange={onChangeNickname}
            />
            <input
              type="password"
              className="passwordnew__input"
              placeholder={"NEW Password"}
              value={password}
              onChange={onChangePassword}
            />
            <input
              type="password"
              className="passwordcheck__input"
              placeholder="Check Password"
              value={checkpassword}
              onChange={onChangeCheckPassword}
            />
          </div>
          <button className="changeinfo__btn" onClick={handleChangeInfo}>
            edit
          </button>
        </div>
      ) : (
        <div className="changeinfo__formOff">
          <div className="changeinfo__title">Change your info!</div>
          <div className="changeinfo__ment">
            change your name or password maybe you find new surpin spot
          </div>
          <button className="changeinfo__btn" onClick={handleEditUserInfo}>
            edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ChangeInfo;
