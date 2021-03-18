import React from "react";

const MainSection = () => {
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
        ></input>
        <button className="main__search-bar__btn"></button>
      </div>
    </div>
  );
};

export default MainSection;
