import React from "react";

const Withdrawal = ({ isChangeInfoFormOn }) => {
  return (
    <div className="withdrawal">
      {isChangeInfoFormOn ? (
        <div className="withdrawal_formOff">
          <div className="withdrawal__title">You want to leave?</div>
          <div className="withdrawal__ment">
            If you really want to leave, click button below
          </div>
          <button className="withdrawal__btn">withdrawal</button>
        </div>
      ) : (
        <div className="withdrawal_formOn">
          <div className="withdrawal__title">Leave Surpin</div>
          <img className="withdrawal__img" src="" alt="" />
          <div className="withdrawal-form">
            <input
              className="withdrawal-form__password__input"
              type="text"
              placeholder="Password"
            />
          </div>
          <button className="withdrawl__btn">leave</button>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;
