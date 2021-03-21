import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Surpin from "../components/Surpin";
import Tag from "../components/Tag";
import { showUserLists } from "../actions/index";

// get fakedata
import { fakeData } from "../reducers/initialState";

const SurpinLists = () => {
  const { writer } = useParams();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const { user, token, email } = userState;

  const [newShowUserLists, setNewShowUserLists] = useState(fakeData);

  useEffect(() => {
    fetch(`http://localhost:4000/surpin/showuserlists/${writer}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        authentication: token,
      },
      body: { email },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(showUserLists(data));
        setNewShowUserLists(data);
      });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="surpinLists">
        {writer}'s Surpin Lists
        <div className="surpinlists__tags">
          <div className="surpinlists__tags__title">태그별로 보기</div>
          <ul className="surpinlists__tags__tags">
            <li className="surpinlist__tags__tag">
              <Tag tag={"tag"}></Tag>
            </li>
            <li className="surpinlist__tags__tag">
              <Tag tag={"good"}></Tag>
            </li>
            <li className="surpinlist__tags__tag">
              <Tag tag={"서핀리스트"}></Tag>
            </li>
            <li className="surpinlist__tags__tag">
              <Tag tag={"surpin"}></Tag>
            </li>
            <li className="surpinlist__tags__tag">
              <Tag tag={"해시태그"}></Tag>
            </li>
            <li className="surpinlist__tags__tag">
              <Tag tag={"tag"}></Tag>
            </li>
          </ul>
        </div>
        <div className="surpinlists__lists">
          <div className="surpinlists__lists__title">Surpins</div>
          <ul className="surpinlists__lists__lists">
            {newShowUserLists.surpins.map((surpin) => {
              return (
                <li className="surpinlists__lists__list">
                  <Surpin surpin={surpin}></Surpin>
                </li>
              );
            })}
          </ul>
        </div>
        {user.nickname === writer ? (
          <Link to={{ pathname: `/surpinmodal/${writer}` }}>
            <button className="surpinlists__btn" onClick={() => {}}>
              Supin 추가하기
            </button>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default SurpinLists;
