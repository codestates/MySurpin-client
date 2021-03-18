import React from "react";
import Navbar from "../components/Navbar";
import Surpin from "../components/Surpin";
import SearchResult from "../components/SearchResult";
const SearchPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="searchPage">
        <div className="searchbar">
          <input className="sarchbar__input" placeholder="search for"></input>
          <button className="sarchbar__button">
            <img src="../../public/images/search.png"></img>
          </button>
        </div>
        <div className="searchpage-best-results">
          <div className="searchpage__best__title">Best Surpins</div>
          <ul className="searchpage-best-lists">
            <li className="searchpage-best-list">
              <Surpin></Surpin>
            </li>
          </ul>
        </div>
        <div className="searchpage-all-results">
          <div className="searchpage__all__title">All Surpins</div>
          <div className="searchpage__all__lists">
            <div className="searchpage__all__lists__topbar">
              <div className="topbar__name"></div>
              <div className="topbar__description"></div>
              <div className="topbar__numbOfUrls"></div>
              <div className="topbar__createdAt"></div>
            </div>
            <ul className="searchpage-all-results__lists">
              <li className="searchpage-all-result__list">
                <SearchResult></SearchResult>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchPage;
