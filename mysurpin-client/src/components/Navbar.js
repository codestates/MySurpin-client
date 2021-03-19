import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const userState = useSelector((state) => state.userReducer);
  const {
    user: { token },
  } = userState;

  const history = useHistory();
  console.log(history.location.pathname);

  const handleMySurpinBtn = () => {
    history.push("/surpinlists");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img
          className="navbar__logo-img"
          src="../../public/images/loupe.png"
          alt=""
        />
      </Link>
      {history.location.pathname !== "/" ? (
        <div className="hidden"></div>
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
      {token ? (
        <button className="navbar__btn" onClick={handleMySurpinBtn}>
          My Surpin
        </button>
      ) : (
        <Link to="/signpage">
          <button className="navbar__btn">LOG IN / SIGN UP</button>
        </Link>
      )}
    </div>
  );
};
export default Navbar;
