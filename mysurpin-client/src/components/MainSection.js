import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchTagLists } from "../actions/index";

const MainSection = () => {
  const searchTagState = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();
  const [searchTag, setSearchTag] = useState("");
  const onChangeSearchTag = (e) => {
    setSearchTag(e.target.value);
  };

  const handleSearchTag = () => {
    fetch("http://localhost/4000", {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    })
      .then((data) => data.json())
      .then((res) => console.log(res));
    // .then((res) => dispatch(searchTagLists(res)));
  };
  // const handleSearchTag = () => {
  //   fetch("http://localhost/4000/searchlists", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       withCredentials: true,
  //     },
  //     body: {
  //       tag: searchTag,
  //     },
  //   })
  //     .then((data) => data.json())
  //     .then((res) => console.log(res));
  //   // .then((res) => dispatch(searchTagLists(res)));
  // };

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
          value={searchTag}
        ></input>
        {/* <Link to="/searchpage"> */}
        <button className="main__search-bar__btn" onClick={handleSearchTag}>
          검색
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default MainSection;
