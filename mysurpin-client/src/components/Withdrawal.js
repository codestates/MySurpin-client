import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AlertModal from "../components/AlertModal";

const Withdrawal = ({ isChangeInfoFormOn, handleEditUserInfo }) => {
  const history = useHistory();
  const userState = useSelector((state) => state.userReducer);
  const {
    user: { token, email },
  } = userState;
  const [password, setPassword] = useState("");
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalComment, setAlertModalComment] = useState("");

  const closeModal = useCallback(() => {
    setAlertModalOpen(false);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      handleWithdrawal();
    }
  }, []);

  const handleWithdrawal = useCallback(() => {
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
          // alert("탈퇴가 완료되었습니다.");
          setAlertModalOpen(true);
          setAlertModalComment("탈퇴가 완료되었습니다.");
          history.push("/");
        } else {
          // alert("정보를 다시 입력하세요.");
          setAlertModalOpen(true);
          setAlertModalComment("정보를 다시 입력하세요.");
        }
      })
      .catch((err) => console.error(err));
  }, [email, password, token]);

  return (
    <div className="withdrawal">
      <AlertModal
        open={alertModalOpen}
        close={closeModal}
        comment={alertModalComment}
      />
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
