import React from "react";
import Navbar from "../components/Navbar";
import NewListSection from "../components/NewListsSection";

const SearchPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="searchbar">
        <input className="sarchbar__input"></input>
        <button className="sarchbar__button"></button>
      </div>
      <div className="searchpage-best-results">
        <ul className="searchpage-best-lists">
          <li className="searchpage-best-list">
            <NewListSection></NewListSection>
          </li>
        </ul>
      </div>
      <div className="searchpage-all-results">
        <div className="searchpage__all__title"></div>
        <div className="searchpage__all__lists">
          <ul className="searchpage-all-results">
            <li className="searchpage-all-result">
              <div className="name"></div>
              <div className="description"></div>
              <div className="numbOfUrls"></div>
              <div className="createdAt"></div>
              <div className="modifiedAt"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
