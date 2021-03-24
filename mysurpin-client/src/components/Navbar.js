import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { signOut, getTagLists, getGoogleToken } from "../actions/index";
import AlertModal from "./AlertModal";
require("dotenv").config();

const Navbar = ({ navBarState, isSignPage = "" }) => {
  const userState = useSelector((state) => state.userReducer);
  const {
    user: { token, nickname, email },
  } = userState;

  const [tag, setTag] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalComment, setAlertModalComment] = useState("");
  const [showBtns, setShowBtns] = useState("hidden");

  const closeModal = useCallback(() => {
    setAlertModalOpen(false);
  }, [alertModalOpen]);

  const handleMySurpinBtn = () => {
    history.push(`/surpinlists/${nickname}`);
  };

  const handleEditProfileBtn = useCallback(() => {
    history.push("/edituserinfo");
  }, []);

  const handleLogOutBtn = () => {
    dispatch(signOut());
    dispatch(getGoogleToken(""));
    history.push("/");
    const payload = JSON.stringify({
      email,
    });
    return fetch(`${process.env.REACT_APP_SERVER_URL}/user/signout`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: payload,
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.error(err));
  };

  const onChangeSearchTag = useCallback(
    (e) => {
      setTag(e.target.value);
    },
    [tag]
  );

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearchBtn();
      }
    },
    [tag]
  );

  const handleSearchBtn = () => {
    const payload = JSON.stringify({
      pagenumber: 1,
      tag: tag,
    });
    fetch(`${process.env.REACT_APP_SERVER_URL}/surpin/searchlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: payload,
    })
      .then((res) => {
        return res;
      })
      .then((res) => res.json())
      .then((body) => {
        if (body.message === "Unsufficient info") {
          setAlertModalOpen(true);
          setAlertModalComment("검색어를 입력하세요.");
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

  return (
    <div className="navbar">
      <AlertModal
        open={alertModalOpen}
        close={closeModal}
        comment={alertModalComment}
      />
      <Link to="/">
        <img className="navbar__logo-img" src="/images/mysurpin.png" alt="" />
      </Link>
      <div className="navbar__utils">
        {history.location.pathname !== "/" ? (
          <div className="hidden"></div>
        ) : (
          <div className={`navbar__searchbar ${navBarState}`}>
            <input
              className="navbar__searchbar__input"
              placeholder="Search"
              onChange={onChangeSearchTag}
              onKeyPress={onKeyPress}
              value={tag}
            ></input>

            <button
              className="navbar__searchbar__btn"
              onClick={handleSearchBtn}
            >
              {/* <img src="/images/loupe.png" alt="" /> */}
            </button>
          </div>
        )}
        {token ? (
          <>
            <div className="navbar__btns">
              <button
                className="navbar__btn__show-all"
                onClick={() => {
                  if (showBtns === "") setShowBtns("hidden");
                  else setShowBtns("");
                }}
              >
                My Info
                <div className="wave -one"></div>
                <div className="wave -two"></div>
                <div className="wave -three"></div>
              </button>
              <button
                className={`navbar__btn ${isSignPage} ${showBtns}`}
                onClick={handleMySurpinBtn}
              >
                My Surpin
              </button>
              <button
                className={`navbar__btn ${isSignPage} ${showBtns}`}
                onClick={handleEditProfileBtn}
              >
                Edit Profile
              </button>
              <button
                className={`navbar__btn ${isSignPage} ${showBtns}`}
                onClick={handleLogOutBtn}
              >
                LOG OUT
              </button>
            </div>
          </>
        ) : (
          <Link className={`navbar__btn ${isSignPage}`} to="/signpage">
            <button className="navbar__btn">LOG IN | SIGN UP</button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
