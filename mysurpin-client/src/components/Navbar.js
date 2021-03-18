import React from "react";

const Navbar = (props) => {
  const { isFirstPage, isLogin } = props;
  return (
    <div className="navbar">
      <img className="navbar__logo-img" src="" alt="" />
      {isFirstPage ? (
        <div className="navbar__searchbar hidden"></div>
      ) : (
        <div className="navbar__searchbar">
          <input className="navbar__searchbar__input"></input>
          <button className="navbar__searchbar__btn">
            <img
              className="navbar__searchbar__btn-img"
              src="../public/images/loupe.png"
              alt=""
            />
          </button>
        </div>
      )}
      {isLogin ? (
        <button className="navbar__btn">LOG OUT</button>
      ) : (
        <button className="navbar__btn">LOG IN / SIGN UP</button>
      )}
    </div>
  );
};

export default Navbar;
