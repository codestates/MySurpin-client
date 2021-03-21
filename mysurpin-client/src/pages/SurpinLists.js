import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Surpin from "../components/Surpin";
import Tag from "../components/Tag";

const SurpinLists = () => {
  const { nickname } = useParams();
  const userState = useSelector((state) => state.userReducer);
  const { user } = userState;

  // usdEffect({}, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="surpinLists">
        {nickname}'s Surpin Lists
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
        {user.nickname === nickname ? (
          <Link to={{ pathname: `/surpinmodal/${nickname}` }}>
            <button className="surpinlists__btn" onClick={() => {}}>
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
