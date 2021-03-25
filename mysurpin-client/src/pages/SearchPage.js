/* eslint-disable */
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Surpin from "../components/Surpin";
import SearchResult from "../components/SearchResult";
import { useSelector, useDispatch } from "react-redux";
import { getTagLists } from "../actions/index";
import useScrollEventListener from "../hooks/useScrollEventListener";
import AlertModal from "../components/AlertModal";
require("dotenv").config();

const SearchPage = () => {
  const searchTagState = useSelector((state) => state.surpinReducer);
  const { searchTagLists } = searchTagState;
  const dispatch = useDispatch();
  const [tag, setTag] = useState([]);
  const [reqCount, setReqCount] = useState(0);
  const [pagenumber, setPagenumber] = useState(1);
  const [mergedData, setMergedData] = useState(searchTagLists.surpins);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalComment, setAlertModalComment] = useState("");

  const closeModal = useCallback(() => {
    setAlertModalOpen(false);
  }, [alertModalOpen]);

  useEffect(() => {
    document.title = "SearchPage";
    window.scrollTo(0, 0);
  }, []);

  const fetchMoreLists = useCallback(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/surpin/searchlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({
        pagenumber: pagenumber,
        tag: tag,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMergedData(mergedData.concat(data.surpins));
      });

    setPagenumber((pagenumber) => pagenumber + 1);
  }, [tag, pagenumber]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleSearchBtn = useCallback(() => {
    if (tag.length === 0) {
      setAlertModalOpen(true);
      setAlertModalComment("검색어를 입력하세요.");
    } else {
      fetch(`${process.env.REACT_APP_SERVER_URL}/surpin/searchlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          pagenumber: 1,
          tag: tag,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(getTagLists(data));
        });
    }
  }, [tag, pagenumber]);

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        close={closeModal}
        comment={alertModalComment}
      />
      <Navbar></Navbar>
      <div className="searchPage">
        <div className="searchbar">
          <input
            className="searchbar__input"
            placeholder="search for..."
            value={tag}
            onKeyPress={onKeyPress}
            onChange={onChangeSearchTag}
          ></input>
          <button className="searchbar__button" onClick={handleSearchBtn}>
            <img src="/images/Magnifying Glass.png" alt=""></img>
          </button>
        </div>
        <div className="searchpage-best-results">
          <div className="searchpage__best__title">Popular Surpins</div>
          <ul className="searchpage-best-lists">
            {searchTagLists.top ? (
              searchTagLists.top.map((searchTagList, idx) => {
                return (
                  <li
                    className="searchpage-best-list"
                    key={searchTagList.surpinId}
                  >
                    <Surpin key={idx} surpin={searchTagList}></Surpin>
                  </li>
                );
              })
            ) : (
              <li className="searchpage-best-list">검색어 결과가 없습니닷!</li>
            )}
          </ul>
        </div>
        <div className="searchpage-all-results">
          <div className="searchpage__all__title">All Surpins</div>
          <div className="searchpage__all__lists">
            <div className="searchpage__all__lists__topbar">
              <div className="topbar__name">Surpin Name</div>
              <div className="topbar__description">Description</div>
              <div className="topbar__numbOfUrls">Writer</div>
              <div className="topbar__createdAt">Created At</div>
            </div>

            <ul
              className="searchpage-all-results__lists"
              {...useScrollEventListener(fetchMoreLists, 1)}
            >
              {mergedData ? (
                mergedData.map((surpin, idx) => {
                  return (
                    <li
                      className="searchpage-all-result__list"
                      key={surpin.surpinId}
                    >
                      <SearchResult key={idx} surpin={surpin}></SearchResult>
                    </li>
                  );
                })
              ) : (
                <li className="searchpage-all-result__list">
                  검색 결과가 없습니닷!
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchPage;
