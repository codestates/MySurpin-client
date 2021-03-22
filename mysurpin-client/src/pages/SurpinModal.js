import React, { useState, useEffect } from "react";
import UrlList from "../components/UrlList";
import Tag from "../components/Tag";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getShowSurpin } from "../actions/index";

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
  } = location.surpin || {
    surpinId: 0,
    title: "New Surpin",
    writer: nickname,
    desc: "no description",
    tags: [],
    thumbnail: "thumbnail",
    created_At: "",
    modified_At: "",
  };

  const [editmode, setEditMode] = useState(false);
  const [newListname, setNewListname] = useState(title);
  const [newDesc, setNewDesc] = useState(desc);
  const [newTags, setNewTags] = useState([]);
  const [newUrls, setNewUrls] = useState([]);
  const [newExistTags, setNewExistTags] = useState(["tag"]);

  const [inputListname, setInputListname] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [inputUrlname, setInputUrlname] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  console.log(newExistTags);
  console.log(inputTag.length);

  useEffect(() => {
    console.log("찾아라!", inputTag.length);
    if (inputTag.length > 0) {
      fetch(`http://localhost:4000/tag/showexiststags?inputText=${inputTag}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("existtag", data);
          setNewExistTags(data.tags);
        })
        .catch((err) => console.log(err));
    }
  }, [inputTag]);

  useEffect(() => {
    fetch(`http://localhost:4000/surpin/showsurpin?listId=${surpinId}`, {
      method: "POST",
      mode: "cors",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewUrls(data.urls);
        dispatch(getShowSurpin(data.urls));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputTagBtn = () => {
    setNewTags([...newTags, inputTag]);
  };

  const handleInputUrlBtn = () => {
    setNewUrls([...newUrls, { name: inputUrlname, url: inputUrl }]);
  };

  const createSurpin = () => {
    setEditMode(!editmode);
    const newSurpinState = {
      thumbnail: "thumbnail",
      desc: newDesc,
      tags: newTags,
      urls: newUrls,
      listname: newListname,
    };
    fetch(`http://localhost:4000/surpin/createmysurpin`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ ...newSurpinState, email }),
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.message === "done") {
          alert("생성 완료");
        } else {
          alert("생성 실패");
        }
      })
      .catch((err) => console.log(err));
  };

  const editSurpin = (desc, listname) => {
    setEditMode(!editmode);

    const newSurpinState = {
      thumbnail: "thumbnail",
      listname,
      desc,
      tags: newTags,
      urls: newUrls,
    };

    fetch(`http://localhost:4000/surpin/editmysurpin`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ ...newSurpinState, listId: surpinId, email }),
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.message === "edit done!") {
          alert("수정 완료");
        } else {
          alert("정보 부족");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveSurpin = () => {
    fetch(`http://localhost:4000/surpin/removemysurpin`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ listId: surpinId, email }),
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.message === "Successfully processed") {
          alert("삭제 완료");
          history.goBack();
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSaveSurpin = () => {
    setEditMode(false);
    setNewListname(inputListname);
    setNewDesc(inputDesc);
    if (!location.surpin || writer !== nickname) createSurpin();
    else editSurpin(inputDesc, inputListname);
  };

  const handleDeleteTag = (e) => {
    setNewTags(
      newTags.filter(
        (tag) => tag != e.target.parentNode.textContent.slice(0, -1)
      )
    );
  };

  const handleDeleteUrl = (e) => {
    setNewUrls(
      newUrls.filter(
        (url) =>
          url.name + url.url !== e.target.parentNode.textContent.slice(0, -1)
      )
    );
  };

  return (
    <div className="surpinModal">
      <button className="surpinModal__back-btn" onClick={() => history.go(-2)}>
        {"<"}
      </button>
      <section className="surpinModal__sidebar">
        <div className="sidebar__listinfo__thumbnail">
          {editmode ? (
            <input
              type="text"
              placeholder={title}
              onChange={(e) => setInputListname(e.target.value)}
              value={inputListname}
            ></input>
          ) : (
            <div className="sidebar__listinfo__title">{newListname}</div>
          )}

          <div
            className="sidebar__listinfo__writer"
            onClick={() => history.push(`/surpinlists/${writer}`)}
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
              onChange={(e) => setInputDesc(e.target.value)}
              value={inputDesc}
            ></textarea>
          ) : (
            <div className="description__text">{newDesc}</div>
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
                onChange={(e) => setInputTag(e.target.value)}
                value={inputTag}
                list="existTagsList"
              />
              <datalist id="existTagsList">
                {newExistTags.map((existTag) => {
                  return <option value={existTag.name}> </option>;
                })}
              </datalist>
              <button
                className="taglists__form__btn"
                onClick={handleInputTagBtn}
              >
                +
              </button>
            </div>
          ) : (
            <></>
          )}

          <ul className="taglists__show">
            {newTags.length > 1
              ? newTags.map((tag) => {
                  return (
                    <li className="taglists__show__tag">
                      <Tag tag={tag}></Tag>
                      {editmode ? (
                        <button
                          className="tagaList__delete-btn"
                          onClick={handleDeleteTag}
                        >
                          X
                          <img
                            className="tagList__delete-btn-img"
                            src=""
                            alt=""
                          />
                        </button>
                      ) : (
                        <></>
                      )}
                    </li>
                  );
                })
              : console.log("no tags")}
          </ul>
        </div>
      </section>

      <section className="surpinModal__main">
        <div className="surpinModal__header">
          {writer === nickname ? (
            // 내 서핀일때 - 기존 서핀 편집
            <button
              className="surpinModal__edit-btn"
              onClick={() => setEditMode(!editmode)}
            >
              <img src="" alt="" />
              내서핀 편집
            </button>
          ) : (
            // 남의 서핀일때 - 새로운 서핀 생성
            <button
              className="surpinModal__edit-btn"
              onClick={() => setEditMode(!editmode)}
            >
              <img src="" alt="" />
              서핀 퍼가기
            </button>
          )}
        </div>
        <div className="surpinModal__show-contents">
          <div className="surpinModal__show-contents__topbar">
            <div className="show-contents__urlname"></div>
            <div className="show-contents__url"></div>
          </div>
          <ul className="surpinModal__url-lists">
            {newUrls.length > 1
              ? newUrls.map((urlinfo) => {
                  return (
                    <li className="surpinModal__url-list">
                      <UrlList name={urlinfo.name} url={urlinfo.url}></UrlList>
                      {editmode ? (
                        <button
                          className="urlList__delete-btn"
                          onClick={handleDeleteUrl}
                        >
                          X
                        </button>
                      ) : (
                        <></>
                      )}
                    </li>
                  );
                })
              : console.log("no urls")}
          </ul>
        </div>
        {editmode ? (
          <div className="surpinModal__input-contents">
            <input
              type="text"
              className="input-content__urlname"
              placeholder="name"
              onChange={(e) => setInputUrlname(e.target.value)}
              value={inputUrlname}
            />
            <input
              type="text"
              className="input-content__url"
              placeholder="url"
              onChange={(e) => setInputUrl(e.target.value)}
              value={inputUrl}
            />
            <button className="input-content__btn" onClick={handleInputUrlBtn}>
              +
            </button>
          </div>
        ) : (
          <></>
        )}

        <div className="surpinModal__revise-btn__wrapper">
          {writer === nickname && editmode ? (
            <button
              className="surpinModal__revise-btn"
              onClick={handleSaveSurpin}
            >
              편집완료
            </button>
          ) : (
            <button
              className="surpinModal__revise-btn"
              onClick={handleSaveSurpin}
            >
              새로만들기
            </button>
          )}
        </div>

        <div className="surpinModal__revise-btn__wrapper">
          {writer === nickname ? (
            <button
              className="surpinModal__revise-btn"
              onClick={handleRemoveSurpin}
            >
              삭제
            </button>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
};

export default SurpinModal;
