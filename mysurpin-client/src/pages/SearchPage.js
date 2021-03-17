import React from "react";
import Navbar from "../components/Navbar";
import Surpin from "../components/Surpin";
import SearchResult from "../components/SearchResult";

const SearchPage = () => {
  return (
    <div className="searchBar">
      <Navbar></Navbar>
      <div className="searchbar">
        <input className="sarchbar__input"></input>
        <button className="sarchbar__button">
          <img src=""></img>
        </button>
      </div>
      <div className="searchpage-best-results">
        <div className="searchpage__best__title"></div>
        <ul className="searchpage-best-lists">
          <li className="searchpage-best-list">
            <Surpin></Surpin>
          </li>
        </ul>
      </div>
      <div className="searchpage-all-results">
        <div className="searchpage__all__title"></div>
        <div className="searchpage__all__lists">
          <ul className="searchpage-all-results__lists">
            <li className="searchpage-all-result__list">
              <SearchResult></SearchResult>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
