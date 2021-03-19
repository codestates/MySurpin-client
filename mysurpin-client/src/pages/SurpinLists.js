import React from "react";
import { useDispatch } from "react-redux";
import { showUserLists } from "../actions";
import Navbar from "../components/Navbar";
import Surpin from "../components/Surpin";
import Tag from "../components/Tag";

const SurpinLists = () => {
  const dispatch = useDispatch();

  const handleSurpin = (showSurpin) => {
    dispatch(showUserLists(showSurpin));
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="surpinLists">
        My Surpin Lists
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
            <li className="surpinlists__lists__list">
              <Surpin></Surpin>
            </li>
            <li className="surpinlists__lists__list">
              <Surpin></Surpin>
            </li>
            <li className="surpinlists__lists__list">
              <Surpin></Surpin>
            </li>
            <li className="surpinlists__lists__list">
              <Surpin></Surpin>
            </li>
            <li className="surpinlists__lists__list">
              <Surpin></Surpin>
            </li>
            <li className="surpinlists__lists__list">
              <Surpin></Surpin>
            </li>
            <li className="surpinlists__lists__list">
              <Surpin></Surpin>
            </li>
          </ul>
        </div>
        <button className="surpinlists__btn">Create MY SURPIN</button>
      </div>
    </>
  );
};

export default SurpinLists;
