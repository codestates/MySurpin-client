import React, { useState, useEffect } from "react";
import UrlList from "../components/UrlList";
import Tag from "../components/Tag";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSurpin } from "../actions/index";

const SurpinModal = ({ location }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const surpinState = useSelector((state) => state.surpinReducer);
  const {
    user: { nickname, token, email },
  } = userState;
  const { showSurpin } = surpinState;
  const {
    surpinId,
    title,
    writer,
    desc,
    tags,
    thumbnail,
    created_At,
    modified_At,
  } = location.surpin;

  const [newDesc, setNewDesc] = useState(desc);
  const [newUrls, setNewUrls] = useState(showSurpin);
  const [newListname, setNewListname] = useState(title);
  const [newTags, setNewTags] = useState(tags);

  // 읽기모드, 편집모드
  const [editmode, setEditMode] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/surpin/showsurpinlist/?listId=${surpinId}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: { email: JSON.stringify(email) },
    })
      .then((res) => res.json())
      .then((data) => dispatch(showSurpin(data.urls)))
      .catch((err) => console.log(err));
  }, []);

  const editSurpin = () => {
    setEditMode(!editmode);
  };

  const createSurpin = () => {
    setEditMode(!editmode);
  };

  const handleDeleteTag = (e) => {
    setNewTags(
      newTags.filter(
        (tag) => tag != e.target.parentNode.textContent.slice(0, -1)
      )
    );
  };

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
          {editmode ? (
            <input type="text" placeholder={title}></input>
          ) : (
            <div className="sidebar__listinfo__title">{title}</div>
          )}

          <div
            className="sidebar__listinfo__writer"
            onClick={() => history.push("/surpinlists")}
          >
            {writer}
          </div>
        </div>
        {editmode ? (
          <input type="file" className="sidebar__thumbnail__input" />
        ) : (
          <></>
        )}

        <div className="sidebar__description">
          <div className="description__title">설명</div>
          {editmode ? (
            <textarea
              className="sidebar__description__text"
              placeholder={desc}
            ></textarea>
          ) : (
            <div className="description__text">{desc}</div>
          )}
        </div>
        <div className="sidebar__taglists">
          <div className="taglists__form__text">태그</div>
          {editmode ? (
            <div className="taglists__form">
              <input
                type="text"
                className="taglists__form__input"
                placeholder="태그 추가"
              />
              <button className="taglists__form__btn">+</button>
            </div>
          ) : (
            <></>
          )}

          <ul className="taglists__show">
            {newTags.map((tag) => {
              return (
                <li className="taglists__show__tag">
                  <Tag tag={tag}></Tag>
                  {editmode ? (
                    <button
                      className="tagaList__delete-btn"
                      onClick={handleDeleteTag}
                    >
                      X
                      <img className="tagList__delete-btn-img" src="" alt="" />
                    </button>
                  ) : (
                    <></>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="surpinModal__main">
        <div className="surpinModal__header">
          {writer === nickname ? (
            // 내 서핀일때 - 기존 서핀 편집
            <button className="surpinModal__edit-btn" onClick={editSurpin}>
              <img src="" alt="" />
              🖋
            </button>
          ) : (
            // 남의 서핀일때 - 새로운 서핀 생성
            <button className="surpinModal__edit-btn" onClick={createSurpin}>
              <img src="" alt="" />
              🖋
            </button>
          )}
        </div>
        <div className="surpinModal__show-contents">
          <div className="surpinModal__show-contents__topbar">
            <div className="show-contents__urlname"></div>
            <div className="show-contents__url"></div>
          </div>
          <ul className="surpinModal__url-lists">
            <li className="surpinModal__url-list">
              <UrlList urlName={"블로그"} url={"https://jooing.com"}></UrlList>
              {editmode ? (
                <button className="urlList__delete-btn">
                  X
                  <img className="urlList__delete-btn-img" src="" alt="" />
                </button>
              ) : (
                <></>
              )}
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
          <button className="surpinModal__revise-btn">저장</button>
        </div>
      </section>
    </div>
  );
};

export default SurpinModal;
