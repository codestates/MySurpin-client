import React, { useState } from "react";
import { Link } from "react-router-dom";

const MainSection = () => {
  const [searchTag, setSearchTag] = useState("");
  const onChangeSearchTag = (e) => {
    setSearchTag(e.target.value);
  };

  const handleSearchTag = () => {
    fetch("https://api.mysurpin.com/surpin/searchlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        tag: searchTag,
      },
    });
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
          value={searchTag}
        ></input>
        <Link to="/searchpage">
          <button className="main__search-bar__btn">검색</button>
        </Link>
      </div>
    </div>
  );
};

export default MainSection;
