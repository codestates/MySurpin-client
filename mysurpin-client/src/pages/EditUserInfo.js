import React, { useState } from "react";
import ChangeInfo from "../components/ChangeInfo";
import Withdrawal from "../components/Withdrawal";

const EditUserInfo = () => {
  const [editState, setEditState] = useState(true);

  const handlePageState = () => {
    setEditState(!editState);
  };

  return (
    <div className="editUserInfo">
      <section className="changeinfo-section">
        <ChangeInfo
          isChangeInfoFormOn={editState}
          handleEditUserInfo={handlePageState}
        ></ChangeInfo>
      </section>
      <section className="widthdrawal-section">
        <Withdrawal
          isChangeInfoFormOn={editState}
          handleEditUserInfo={handlePageState}
        ></Withdrawal>
      </section>
    </div>
  );
};

export default EditUserInfo;
