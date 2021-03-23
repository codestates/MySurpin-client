import React, { useState, useEffect } from "react";
import ChangeInfo from "../components/ChangeInfo";
import Withdrawal from "../components/Withdrawal";
import Navbar from "../components/Navbar";
import useCheckToken from "../hooks/useCheckToken";

const EditUserInfo = () => {
  const [editState, setEditState] = useState(true);

  // 페이지 타이틀
  useEffect(() => {
    document.title = "Edit User Info";
  }, []);

  const handlePageState = () => {
    setEditState(!editState);
  };

  useCheckToken([editState]);
  return (
    <>
      <Navbar isSignPage={"hidden"} />
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
    </>
  );
};

export default EditUserInfo;
