import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Withdrawal = ({ isChangeInfoFormOn, handleEditUserInfo }) => {
  const history = useHistory();
  const userState = useSelector((state) => state.userReducer);
  const {
    user: { token, email },
  } = userState;
  const [password, setPassword] = useState("");

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleWithdrawal();
    }
  };

  const handleWithdrawal = () => {
    const payload = JSON.stringify({
      email,
      password,
    });
    return fetch(`http://localhost:4000/user/withdrawal`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: payload,
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.message === "Successfully processed") {
          alert("탈퇴가 완료되었습니다.");
          history.push("/");
        } else {
          alert("정보를 다시 입력하세요.");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="withdrawal">
      {isChangeInfoFormOn ? (
        <div className="withdrawal_formOff">
          <div className="withdrawal__title">You want to leave?</div>
          <div className="withdrawal__ment">
            If you really want to leave, click button bellow
          </div>
          <button
            className="withdrawal__btn"
            onClick={() => handleEditUserInfo()}
          >
            withdrawal
          </button>
        </div>
      ) : (
        <div className="withdrawal_formOn">
          <div className="withdrawal__title">Leave Surpin</div>
          <img className="withdrawal__img" src="" alt="" />
          <div className="withdrawal-form">
            <input
              className="withdrawal-form__password__input"
              type="password"
              value={password}
              required
              placeholder="Password"
              onChange={onChangePassword}
              onKeyPress={onKeyPress}
            />
          </div>
          <button className="withdrawl__btn" onClick={handleWithdrawal}>
            leave
          </button>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;
