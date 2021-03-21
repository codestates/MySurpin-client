/* eslint-disable */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Surpin from "../components/Surpin";
import SearchResult from "../components/SearchResult";
import { useSelector, useDispatch } from "react-redux";
import { getTagLists } from "../actions/index";

// 실험용 데이터
import { fakeData2 } from "../reducers/initialState";
// 여기까지

const SearchPage = () => {
  const searchTagState = useSelector((state) => state.surpinReducer);
  const { searchTagLists } = searchTagState;
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");

  const onChangeSearchTag = (e) => {
    setTag(e.target.value);
  };

  const handleSearchBtn = () => {
    if (tag.length === 0) {
      alert("검색어를 입력하세요");
    } else {
      dispatch(getTagLists(fakeData2));
    }
  };

  // const handleSearchBtn = () => {
  //   if (tag.length === 0) {
  //     alert("검색어를 입력하세요");
  //   } else {
  //     const payload = JSON.stringify({
  //       pagenumber: 1,
  //       tag: tag,
  //     });
  //     fetch(`http://localhost:4000/surpin/searchlists`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         credentials: "include",
  //       },
  //       body: payload,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => dispatch(getTagLists(data)));
  //   }
  // };

  return (
    <>
      <Navbar></Navbar>
      <div className="searchPage">
        <div className="searchbar">
          <input
            className="searchbar__input"
            placeholder="search for"
            value={tag}
            onChange={onChangeSearchTag}
          ></input>
          <button className="sarchbar__button" onClick={handleSearchBtn}>
            <img src="../../public/images/search.png"></img>
          </button>
        </div>
        <div className="searchpage-best-results">
          <div className="searchpage__best__title">Best Surpins</div>
          <ul className="searchpage-best-lists">
            {searchTagLists.top.map((searchTagList) => {
              return (
                <li
                  className="searchpage-best-list"
                  key={searchTagList.surpinId}
                >
                  <Surpin surpin={searchTagList}></Surpin>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="searchpage-all-results">
          <div className="searchpage__all__title">All Surpins</div>
          <div className="searchpage__all__lists">
            <div className="searchpage__all__lists__topbar">
              <div className="topbar__name">Surpin 이름</div>
              <div className="topbar__description">요약</div>
              <div className="topbar__numbOfUrls">URL 개수</div>
              <div className="topbar__createdAt">생성일</div>
            </div>
            <ul className="searchpage-all-results__lists">
              {searchTagLists.surpins.map((surpin) => {
                return (
                  <li
                    className="searchpage-all-result__list"
                    key={surpin.surpinId}
                  >
                    <SearchResult surpin={surpin}></SearchResult>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchPage;
