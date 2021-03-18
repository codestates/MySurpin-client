import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { isFirstPage, isLogin } = props;

  return (
    <div className="navbar">
      <Link to="/">
        <img
          className="navbar__logo-img"
          src="../../public/images/loupe.png"
          alt=""
        />
      </Link>
      {isFirstPage ? (
        <div className="navbar__searchbar hidden"></div>
      ) : (
        <div className="navbar__searchbar">
          <input className="navbar__searchbar__input"></input>
          <Link to="/searchpage">
            <button className="navbar__searchbar__btn">
              <img src="../../public/images/loupe.png" alt="" />
            </button>
          </Link>
        </div>
      )}
      {isLogin ? (
        <button className="navbar__btn">LOG OUT</button>
      ) : (
        <Link to="/signpage">
          <button className="navbar__btn">LOG IN / SIGN UP</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
