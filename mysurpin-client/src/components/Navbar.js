import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { signOut, getTagLists } from "../actions/index";

const Navbar = ({ navBarState, isSignPage = "" }) => {
  const userState = useSelector((state) => state.userReducer);
  const {
    user: { token, nickname },
  } = userState;

  const [tag, setTag] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleMySurpinBtn = () => {
    history.push(`/surpinlists/${nickname}`);
  };

  const handleEditProfileBtn = () => {
    history.push("/edituserinfo");
  };

  const handleLogOutBtn = () => {
    dispatch(signOut());
    history.push("/");
  };

  const onChangeSearchTag = (e) => {
    setTag(e.target.value);
  };

  const handleSearchBtn = () => {
    fetch(`http://localhost:4000/surpin/searchlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({
        pagenumber: 1,
        tag,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.surpins) {
          dispatch(getTagLists(data));
          history.push("/searchpage");
        } else {
          alert("Bad Request");
        }
      })
      .catch((err) => console.error(err));
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
        <div className={`navbar__searchbar ${navBarState}`}>
          <input
            className="navbar__searchbar__input"
            onChange={onChangeSearchTag}
            value={tag}
          ></input>

          <button className="navbar__searchbar__btn" onClick={handleSearchBtn}>
            <img src="../../public/images/loupe.png" alt="" />
          </button>
        </div>
      )}
      {token ? (
        <div className="navbar__btns">
          <button
            className={`navbar__btn ${isSignPage}`}
            onClick={handleMySurpinBtn}
          >
            My Surpin
          </button>
          <button
            className={`navbar__btn ${isSignPage}`}
            onClick={handleEditProfileBtn}
          >
            Edit Profile
          </button>
          <button
            className={`navbar__btn ${isSignPage}`}
            onClick={handleLogOutBtn}
          >
            LOG OUT
          </button>
        </div>
      ) : (
        <Link className={`navbar__btn ${isSignPage}`} to="/signpage">
          <button>LOG IN / SIGN UP</button>
        </Link>
      )}
    </div>
  );
};
export default Navbar;
