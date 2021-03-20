/* eslint-disable */
import React from "react";
import Navbar from "../components/Navbar";
import Surpin from "../components/Surpin";
import SearchResult from "../components/SearchResult";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const searchTagState = useSelector((state) => state.surpinReducer);
  const { searchTagLists } = searchTagState;

  return (
    <>
      <Navbar></Navbar>
      <div className="searchPage">
        <div className="searchbar">
          <input className="searchbar__input" placeholder="search for"></input>
          <button className="sarchbar__button">
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
