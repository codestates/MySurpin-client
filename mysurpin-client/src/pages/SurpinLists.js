import React from "react";
import Navbar from "../components/Navbar";
import NewListSection from "../components/NewListsSection";

const SurpinLists = () => {
  return (
    <div className="SurpinLists">
      <Navbar></Navbar>
      <div className="surpinlists__tags">
        <div className="surpinlists__tags__title"></div>
        <ul className="surpinlists__tags__tags">
          <li className="surpinlist__tags__tag"></li>
        </ul>
      </div>
      <div className="surpinlists__lists">
        <div className="surpinlists__lists__title"></div>
        <ul className="surpinlists__lists__lists">
          <li className="surpinlists__lists__list">
            <NewListSection></NewListSection>
          </li>
        </ul>
      </div>
      <button className="surpinlists__btn"></button>
    </div>
  );
};

export default SurpinLists;
