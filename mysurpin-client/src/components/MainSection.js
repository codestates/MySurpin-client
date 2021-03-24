import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { getTagLists } from "../actions/index";
import { useHistory } from "react-router-dom";
import AlertModal from "./AlertModal";
import useScrollEventListener from "../hooks/useScrollEventListener";

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
    fetch(`http://localhost:4000/surpin/searchlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: payload,
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((res) => res.json())
      .then((body) => {
        console.log(body.message);
        if (body.message === "Unsufficient info") {
          // alert("검색어 입력 하세요. (궁서체)");
          setAlertModalOpen(true);
        } else if (body.message === "No surpin with request tag") {
          dispatch(getTagLists({}));
          history.push("/searchpage");
        } else {
          dispatch(getTagLists(body));
          history.push("/searchpage");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleTitleScroll = () => {
    setShow("scroll-to-top");
  };

  return (
    <div
      className="mainSection"
      {...useScrollEventListener(handleTitleScroll, 1)}
    >
      <AlertModal
        open={alertModalOpen}
        close={closeModal}
        comment={"검색어를 제대로 입력하세요."}
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
          검색
        </button>
      </div>
      <video className="video" autoPlay muted loop>
        {/* <div className="video__shadow"></div> */}
        <source src="/Videos/surf.mp4" type="video/mp4"></source>
      </video>
    </div>
  );
};

export default MainSection;
