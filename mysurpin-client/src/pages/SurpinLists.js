import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import Surpin from "../components/Surpin";
import Tag from "../components/Tag";
import { showUserLists, showUserTags } from "../actions/index";

// get fakedata
import { fakeData } from "../reducers/initialState";

const fakeTags = ["다들", "힘내세요", "1", "2", "3", "4", "5", "6", "7", "8"];

const SurpinLists = () => {
  const { writer } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.userReducer);
  const { user, token, email } = userState;

  const [newShowUserLists, setNewShowUserLists] = useState(fakeData.surpins);
  const [filteredUserLists, setFilteredUserLists] = useState(fakeData.surpins);
  const [newShowUserTags, setNewShowUserTags] = useState(fakeTags);

  const handleCreateSurpin = () => {
    history.push("/surpinmodal/");
  };

  const handleFilterTags = (targetTag) => {
    if (targetTag === "all") {
      setFilteredUserLists(newShowUserLists);
    } else {
      setFilteredUserLists(
        fakeData.surpins.filter((list) => {
          return list.tags.includes(targetTag);
        })
      );
    }
  };

  useEffect(() => {
    // server API 구현되면 지울 것
    dispatch(showUserLists(fakeData));
    dispatch(showUserTags(fakeTags));
    fetch(`http://localhost:4000/surpin/showuserlists/?nickname=${writer}`, {
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

    fetch(`http://localhost:4000/tag/showusertags/?nickname=${writer}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        authentication: token,
      },
    });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="surpinLists">
        {writer}의 Surpin Lists
        <div className="surpinlists__tags">
          <div className="surpinlists__tags__title">태그별로 보기</div>
          <ul className="surpinlists__tags__tags">
            <li
              className="surpinlist__tags__tag"
              onClick={() => handleFilterTags("all")}
            >
              <Tag tag={"All"}></Tag>
            </li>
            {newShowUserTags.map((tag) => {
              return (
                <li
                  className="surpinlist__tags__tag"
                  onClick={() => handleFilterTags(tag)}
                >
                  <Tag tag={tag}></Tag>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="surpinlists__lists">
          <div className="surpinlists__lists__title">Surpins</div>
          <ul className="surpinlists__lists__lists">
            {filteredUserLists.map((surpin) => {
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
            <button className="surpinlists__btn" onClick={handleCreateSurpin}>
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
