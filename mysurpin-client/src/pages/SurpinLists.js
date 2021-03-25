/* eslint-disable */
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import Surpin from "../components/Surpin";
import Tag from "../components/Tag";
import { showUserLists, showUserTags } from "../actions/index";
require("dotenv").config();

const SurpinLists = () => {
  const { writer } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.userReducer);
  const { user, token, email } = userState;

  const [newShowUserLists, setNewShowUserLists] = useState([]);
  const [filteredUserLists, setFilteredUserLists] = useState([]);
  const [newShowUserTags, setNewShowUserTags] = useState([]);

  useEffect(() => {
    document.title = "Surpin Lists";
  }, []);

  const handleCreateSurpin = useCallback(() => {
    history.push("/surpinmodal/");
  }, []);

  const handleFilterTags = useCallback(
    (targetTag) => {
      if (targetTag === "all") {
        setFilteredUserLists(newShowUserLists);
      } else {
        setFilteredUserLists(
          newShowUserLists.filter((list) => {
            return list.tags.includes(targetTag);
          })
        );
      }
    },
    [filteredUserLists, newShowUserLists, newShowUserTags]
  );

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/surpin/showuserlists?nickname=${writer}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          authentication: token,
        },
        body: JSON.stringify({ email }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(showUserLists(data));
        setNewShowUserLists(data.surpins);
        setFilteredUserLists(data.surpins);
      });

    fetch(
      `${process.env.REACT_APP_SERVER_URL}/tag/showusertags?nickname=${writer}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          authentication: token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(showUserTags(data));
        setNewShowUserTags(data.tags);
      });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="surpinLists">
        <div className="surpinLists__title"> {writer}의 Surpin Lists</div>
        {user.nickname === writer ? (
          <Link to={{ pathname: `/surpinmodal/${writer}` }}>
            <button className="surpinlists__btn" onClick={handleCreateSurpin}>
              + New Supin
            </button>
          </Link>
        ) : (
          <div></div>
        )}
        <div className="surpinlists__tags">
          <div className="surpinlists__tags__title">태그별로 보기</div>
          <ul className="surpinlists__tags__tags">
            <li
              className="surpinlist__tags__tag"
              onClick={() => handleFilterTags("all")}
            >
              <Tag tag={"All"}></Tag>
            </li>
            {newShowUserTags.map((tag, idx) => {
              return (
                <li
                  key={idx}
                  className="surpinlist__tags__tag"
                  onClick={() => handleFilterTags(tag.tagName)}
                >
                  <Tag key={idx} tag={tag.tagName}></Tag>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="surpinlists__lists">
          <div className="surpinlists__lists__title">Surpins</div>
          <ul className="surpinlists__lists__lists">
            {filteredUserLists.map((surpin, idx) => {
              return (
                <li key={idx} className="surpinlists__lists__list">
                  <Surpin key={idx} surpin={surpin}></Surpin>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SurpinLists;
