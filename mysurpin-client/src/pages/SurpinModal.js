import React from "react";
import UrlList from "../components/UrlList";

const SurpinModal = () => {
  return (
    <div className="surpinModal">
      <section className="surpinModal__sidebar">
        <div className="sidebar__listinfo__thumbnail">
          <div className="sidebar__listinfo__title"></div>
          <div className="sidebar__listinfo__writer"></div>
        </div>
        <input type="file" className="sidebar__thumbnail__input" />
        <div className="sidebar__description">
          <div className="sidebar__description__title"></div>
          <div className="sidebar__description__text"></div>
          {/* <textarea className="sidebar__description__text"></textarea> edit mode */}
        </div>
        <div className="sidebar__taglists">
          <div className="sidebar__taglists__form">
            <div className="taglists__form__text"></div>
            <input type="text" className="taglists__form__input" />
            <button className="taglists__form__btn"></button>
          </div>
          <ul className="sidebar__taglists__show">
            <li className="taglists__show__tag"></li>
          </ul>
        </div>
      </section>

      <section className="surpinModal__main">
        <div className="surpinModal__header">
          <button className="surpinModal__edit-btn">
            <img src="" alt="" />
          </button>
        </div>
        <div className="surpinModal__show-contents">
          <div className="surpinModal__show-contents__topbar">
            <div className="show-contents__urlname"></div>
            <div className="show-contents__url"></div>
          </div>
          <ul className="surpinModal__url-lists">
            <li>
              <UrlList></UrlList>
            </li>
          </ul>
        </div>
        <div className="surpinModal__input-contents">
          <input type="text" className="input-content__urlname" />
          <input type="text" className="input-content__url" />
          <button className="input-content__btn"></button>
        </div>
        <div className="surpinModal__revise-btn__wrapper">
          <button className="surpinModal__revise-btn"></button>
        </div>
      </section>
    </div>
  );
};

export default SurpinModal;
