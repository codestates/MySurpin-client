import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchTagLists } from "../actions/index";

const MainSection = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tag, setTag] = useState("");
  const onChangeSearchTag = (e) => {
    setTag(e.target.value);
  };

  const handleSearchTag = () => {
    const payload = JSON.stringify({
      pagenumber: 1,
      tag: tag,
    });
    return fetch(`http://localhost:4000/surpin/searchlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: payload,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 500) {
          history.push("/searchpage");
        } else if (res.status === 200) {
          dispatch(searchTagLists(res.json()));
          history.push("/searchpage");
        } else {
          alert("오류 발생!");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="mainSection">
      <div className="main__title">
        {/* <img className="main__title__logo" src="" alt=""></img> */}
        <div className="main__title__text">My Surpin</div>
      </div>
      <div className="main__ment"></div>
      <div className="main__search-bar">
        <input
          className="main__search-bar__input"
          placeholder="Which Surpin do you want to search?"
          onChange={onChangeSearchTag}
          value={tag}
        ></input>
        <button className="main__search-bar__btn" onClick={handleSearchTag}>
          검색
        </button>
      </div>
    </div>
  );
};

export default MainSection;
