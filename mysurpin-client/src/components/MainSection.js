/* eslint-disable */
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { getTagLists } from "../actions/index";
import { useHistory } from "react-router-dom";
import AlertModal from "./AlertModal";
import useScrollEventListener from "../hooks/useScrollEventListener";
require("dotenv").config();

const MainSection = () => {
  const [tag, setTag] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [show, setShow] = useState("");

  const closeModal = useCallback(() => {
    setAlertModalOpen(false);
  }, [alertModalOpen]);

  const onChangeSearchTag = useCallback(
    (e) => {
      setTag(e.target.value);
    },
    [tag]
  );

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearchTag();
      }
    },
    [tag]
  );

  const handleSearchTag = () => {
    const payload = JSON.stringify({
      pagenumber: 1,
      tag: tag,
    });
    fetch(`${process.env.REACT_APP_SERVER_URL}/surpin/searchlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: payload,
    })
      .then((res) => {
        return res;
      })
      .then((res) => res.json())
      .then((body) => {
        if (body.message === "Unsufficient info") {
          setAlertModalOpen(true);
        } else if (body.message === "No surpin with request tag") {
          dispatch(getTagLists({}));
          history.push("/searchpage");
        } else {
          dispatch(getTagLists({ ...body, tag }));
          history.push("/searchpage");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="mainSection">
      <AlertModal
        open={alertModalOpen}
        close={closeModal}
        comment={"검색어를 입력하세요."}
      />
      <div className="main__title">
        <div className={`main__title__text ${show}`}>My Surpin</div>
      </div>
      <div className="main__ment"></div>
      <div className="main__search-bar">
        <input
          className="main__search-bar__input"
          placeholder="Which Surpin do you want to search?"
          onChange={onChangeSearchTag}
          onKeyPress={onKeyPress}
          value={tag}
        ></input>
        <button className="main__search-bar__btn" onClick={handleSearchTag}>
          {" "}
          <img src="/images/Magnifying Glass.png" alt="" />
        </button>
      </div>
      <video className="video" autoPlay muted loop>
        <source src="/Videos/surf.mp4" type="video/mp4"></source>
      </video>
    </div>
  );
};

export default MainSection;
