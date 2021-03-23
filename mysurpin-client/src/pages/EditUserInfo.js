import React, { useCallback, useState, useEffect } from "react";
import ChangeInfo from "../components/ChangeInfo";
import Withdrawal from "../components/Withdrawal";
import Navbar from "../components/Navbar";
import useCheckToken from "../hooks/useCheckToken";
import AlertModal from "../components/AlertModal";

const EditUserInfo = () => {
  const [editState, setEditState] = useState(true);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalComment, setAlertModalComment] = useState("");

  const openModal = useCallback(() => {
    setAlertModalOpen(true);
    setAlertModalComment("로그인 암호 만료. 재 로그인 부탁~!");
  }, []);

  const closeModal = useCallback(() => {
    setAlertModalOpen(false);
  }, []);

  // 페이지 타이틀
  useEffect(() => {
    document.title = "Edit User Info";
  }, []);

  const handlePageState = () => {
    setEditState(!editState);
  };

  useCheckToken([editState], openModal);

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
