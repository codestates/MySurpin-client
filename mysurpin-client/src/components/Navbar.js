import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { signOut, getTagLists } from "../actions/index";

// fakeData 나중에 꼭 지우기 (여기부터)
import { fakeData } from "../reducers/initialState";
// fakeData 나중에 꼭 지우기 (여기까지)

const Navbar = ({ navBarState }) => {
  const userState = useSelector((state) => state.userReducer);
  const {
    user: { token, nickname },
  } = userState;
  // const searchTagState = useSelector((state) => state.surpinReducer);
  // const { searchTagLists } = searchTagState;

  const [tag, setTag] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleMySurpinBtn = () => {
    history.push(`/surpinlists/${nickname}`);
  };

  const handleLogOutBtn = () => {
    dispatch(signOut());
    history.push("/");
  };

  const onChangeSearchTag = (e) => {
    setTag(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchBtn();
    }
  };

  // 확인용 추후에 지워야 함 (시작) -- fakeData === 서버에 태그검색 결과 요청 initialState.searchTagLists
  const handleSearchBtn = () => {
    dispatch(getTagLists(fakeData));
  };
  // 지워야 함 (끝)

  // 요청 함수만 구현 작동 안됨 ㅠㅠ
  // const handleSearchBtn = () => {
  //   const payload = JSON.stringify({
  //     pagenumber: 1,
  //     tag: tag,
  //   });
  //   fetch(`http://localhost:4000/surpin/searchlists`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       credentials: "include",
  //     },
  //     body: payload,
  //   })
  //     .then((res) => res.json())
  //     .then((body) => {
  //       if (body.message) {
  //         console.log(body);
  //         dispatch(getTagLists(body));
  //       } else {
  //         alert("Bad Request");
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // };

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
            onKeyPress={onKeyPress}
            value={tag}
          ></input>
          <Link to="/searchpage">
            <button
              className="navbar__searchbar__btn"
              onClick={handleSearchBtn}
            >
              <img src="../../public/images/loupe.png" alt="" />
            </button>
          </Link>
        </div>
      )}
      {token ? (
        <div className="navbar__btns">
          <button className="navbar__btn" onClick={handleMySurpinBtn}>
            My Surpin
          </button>
          <button className="navbar__btn" onClick={handleLogOutBtn}>
            LOG OUT
          </button>
        </div>
      ) : (
        <Link to="/signpage/">
          <button className="navbar__btn">LOG IN / SIGN UP</button>
        </Link>
      )}
    </div>
  );
};
export default Navbar;
