import React from "react";
import UrlList from "../components/UrlList";
import Tag from "../components/Tag";
import { useHistory } from "react-router-dom";

const SurpinModal = ({ location }) => {
  const history = useHistory();
  const {
    surpinId,
    title,
    desc,
    writer,
    thumbnail,
    created_At,
    modified_At,
    tags,
  } = location.surpin;

  console.log(
    surpinId,
    title,
    desc,
    writer,
    thumbnail,
    created_At,
    modified_At,
    tags
  );

  return (
    <div className="surpinModal">
      <button
        className="surpinModal__back-btn"
        onClick={() => history.goBack()}
      >
        {"<"}
      </button>
      <section className="surpinModal__sidebar">
        <div className="sidebar__listinfo__thumbnail">
          <div className="sidebar__listinfo__title">{title}</div>
          <div
            className="sidebar__listinfo__writer"
            onClick={() => history.push("/surpinlists")}
          >
            {writer}
          </div>
        </div>
        <input type="file" className="sidebar__thumbnail__input" />
        <div className="sidebar__description">
          <div className="description__title">설명</div>
          <div className="description__text">{desc}</div>
          {/* <textarea className="sidebar__description__text"></textarea> edit mode */}
        </div>
        <div className="sidebar__taglists">
          <div className="taglists__form__text">태그</div>
          <div className="taglists__form">
            <input
              type="text"
              className="taglists__form__input"
              placeholder="태그 추가"
            />
            <button className="taglists__form__btn">+</button>
          </div>
          <ul className="taglists__show">
            <li className="taglists__show__tag">
              <Tag tag={"design"}></Tag>
            </li>
            <li className="taglists__show__tag">
              <Tag tag={"good"}></Tag>
            </li>
            <li className="taglists__show__tag">
              <Tag tag={"mooyaho"}></Tag>
            </li>
            <li className="taglists__show__tag">
              <Tag tag={"tag"}></Tag>
            </li>
            <li className="taglists__show__tag">
              <Tag tag={"tags"}></Tag>
            </li>
            <li className="taglists__show__tag">
              <Tag tag={"list"}></Tag>
            </li>
          </ul>
        </div>
      </section>

      <section className="surpinModal__main">
        <div className="surpinModal__header">
          <button className="surpinModal__edit-btn">
            <img src="" alt="" />
            🖋
          </button>
        </div>
        <div className="surpinModal__show-contents">
          <div className="surpinModal__show-contents__topbar">
            <div className="show-contents__urlname"></div>
            <div className="show-contents__url"></div>
          </div>
          <ul className="surpinModal__url-lists">
            <li className="surpinModal__url-list">
              <UrlList urlName={"블로그"} url={"https://jooing.com"}></UrlList>
            </li>
            <li className="surpinModal__url-list">
              <UrlList urlName={"블로그"} url={"https://jooing.com"}></UrlList>
            </li>
            <li className="surpinModal__url-list">
              <UrlList urlName={"블로그"} url={"https://jooing.com"}></UrlList>
            </li>
            <li className="surpinModal__url-list">
              <UrlList urlName={"블로그"} url={"https://jooing.com"}></UrlList>
            </li>
            <li className="surpinModal__url-list">
              <UrlList urlName={"블로그"} url={"https://jooing.com"}></UrlList>
            </li>
            <li className="surpinModal__url-list">
              <UrlList urlName={"블로그"} url={"https://jooing.com"}></UrlList>
            </li>
            <li className="surpinModal__url-list">
              <UrlList urlName={"블로그"} url={"https://jooing.com"}></UrlList>
            </li>
            <li className="surpinModal__url-list">
              <UrlList urlName={"블로그"} url={"https://jooing.com"}></UrlList>
            </li>
            <li className="surpinModal__url-list">
              <UrlList urlName={"블로그"} url={"https://jooing.com"}></UrlList>
            </li>
            <li className="surpinModal__url-list">
              <UrlList urlName={"블로그"} url={"https://jooing.com"}></UrlList>
            </li>
            <li className="surpinModal__url-list">
              <UrlList urlName={"블로그"} url={"https://jooing.com"}></UrlList>
            </li>
          </ul>
        </div>
        <div className="surpinModal__input-contents">
          <input
            type="text"
            className="input-content__urlname"
            placeholder="name"
          />
          <input type="text" className="input-content__url" placeholder="url" />
          <button className="input-content__btn">+</button>
        </div>
        <div className="surpinModal__revise-btn__wrapper">
          <button className="surpinModal__revise-btn">revise</button>
        </div>
      </section>
    </div>
  );
};

export default SurpinModal;
