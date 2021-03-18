import React from "react";

const ChangeInfo = ({ isChangeInfoFormOn, handleEditUserInfo }) => {
  return (
    <div className="changeInfo">
      {isChangeInfoFormOn ? (
        <div className="changeinfo__formOn">
          <div className="changeinfo__title">
            <div className="changeinfo__title__text">Edit My Info</div>
            <img src="" alt="" />
          </div>
          <div className="changeinfo__form">
            <input type="text" className="email__input" placeholder="Email" />
            <input
              type="text"
              className="passwordnew__input"
              placeholder="NEW Password"
            />
            <input
              type="text"
              className="passwordcheck__input"
              placeholder="Check Password"
            />
          </div>
          <button className="changeinfo__btn">edit</button>
        </div>
      ) : (
        <div className="changeinfo__formOff">
          <div className="changeinfo__title">Change your info!</div>
          <div className="changeinfo__ment">
            change your name or password maybe you find new surpin spot
          </div>
          <button
            className="changeinfo__btn"
            onClick={() => handleEditUserInfo()}
          >
            edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ChangeInfo;
