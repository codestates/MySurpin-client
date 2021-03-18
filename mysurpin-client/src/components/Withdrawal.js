import React from "react";

const Withdrawal = ({ isChangeInfoFormOn, handleEditUserInfo }) => {
  return (
    <div className="withdrawal">
      {isChangeInfoFormOn ? (
        <div className="withdrawl_formOff">
          <div className="widthdrawl__title"></div>
          <div className="widthdrawl__ment"></div>
          <button
            className="widthdrawl__btn"
            onClick={() => handleEditUserInfo()}
          >
            탈퇴 하러 가기...
          </button>
        </div>
      ) : (
        <div className="withdrawl_formOn">
          <div className="widthdrawl__title"></div>
          <img className="widthdrawl__img" src="" alt="" />
          <div className="widthdrawl-form">
            <input className="widthdrawl-form__password__input" type="text" />
          </div>
          <button className="widthdrawl__btn">정말 탈퇴 하기!</button>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;
