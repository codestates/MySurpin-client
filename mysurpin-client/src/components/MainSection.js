import React from "react";

const MainSection = () => {
  return (
    <div className="mainSection">
      <div className="main__title">
        <img className="main__title__logo"></img>
        <div className="main__title__text"></div>
      </div>
      <div className="main__ment"></div>
      <div className="main__search-bar">
        <input className="main__search-bar__input"></input>
        <button className="main__search-bar__btn"></button>
      </div>
    </div>
  );
};

export default MainSection;
