/* eslint-disable */
import React, { useCallback, useState, useEffect } from "react";
import ChangeInfo from "../components/ChangeInfo";
import Withdrawal from "../components/Withdrawal";
import Navbar from "../components/Navbar";
import useCheckToken from "../hooks/useCheckToken";
import AlertModal from "../components/AlertModal";

const EditUserInfo = () => {
  const [editState, setEditState] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalComment, setAlertModalComment] = useState("");

  const openModal = () => {
    setAlertModalOpen(true);
    setAlertModalComment("로그인 암호 만료. 다시 로그인 해주세요");
  };

  const closeModal = useCallback(() => {
    setAlertModalOpen(false);
  }, []);

  useEffect(() => {
    document.title = "Edit User Info";
  }, []);

  const handlePageState = () => {
    setEditState(!editState);
  };

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        close={closeModal}
        comment={alertModalComment}
      />
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
