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
  // const { showSurpin } = surpinState;
  // fakedata instead
  const showSurpin = [
    { urlName: "jhblog", url: "https://jooing.com" },
    { urlName: "jwblog", url: "https://jooing.com" },
    { urlName: "ybblog", url: "https://jooing.com" },
    { urlName: "ytblog", url: "https://jooing.com" },
  ];
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

  const [editmode, setEditMode] = useState(false);
  const [newListname, setNewListname] = useState(title);
  const [newDesc, setNewDesc] = useState(desc);
  const [newTags, setNewTags] = useState(tags);
  const [newUrls, setNewUrls] = useState(showSurpin);
  const [newExistTags, setNewExistTags] = useState([
    {
      name: "태그를 입력해주세요",
      contentsCount: 5,
    },
  ]);

  const [inputListname, setInputListname] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [inputUrlname, setInputUrlname] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  useEffect(() => {
    // server API 구현되면 지울 것
    dispatch(getShowSurpin(showSurpin));
    // fetch(`http://localhost:4000/tag/showexiststags/?inputText=${inputTag}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     credentials: "include",
    //   },
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   setNewExistTags(data.tags);
    // })
    // .catch((err) => console.log(err));

    // fakedata instead
    setNewExistTags({
      tags: [
        {
          name: "tag1",
          contentsCount: 5,
        },
        {
          name: "tag2",
          contentsCount: 5,
        },
        {
          name: "tag5",
          contentsCount: 5,
        },
      ],
    });
  }, [inputTag.length === 1]);

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
      .then((data) => dispatch(getShowSurpin(data.urls)))
      .catch((err) => console.log(err));
  }, []);

  const handleInputTagBtn = () => {
    setNewTags([...newTags, inputTag]);
  };

  const handleInputUrlBtn = () => {
    setNewUrls([...newUrls, { urlName: inputUrlname, url: inputUrl }]);
  };

  // PATCH editsurpin
  const editSurpin = () => {
    setEditMode(!editmode);
    const newSurpinState = {
      thumbnail: "thumbnail",
      desc: newDesc,
      tags: newTags,
      urls: newUrls,
      listname: newListname,
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
      .then((res) => {
        if (res.body.message === "edit done!") {
          alert("수정 완료");
        } else {
          alert("정보 부족");
        }
      })
      .catch((err) => console.log(err));
  };

  // POST createsurpin
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
      .then((res) => {
        if (res.body.message === "done") {
          alert("생성 완료");
        } else {
          alert("생성 실패");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSaveSurpin = () => {
    setEditMode(false);
    setNewListname(inputListname);
    setNewDesc(inputDesc);
    writer === nickname || !location.surpin ? editSurpin() : createSurpin();
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
          url.urlName + url.url !== e.target.parentNode.textContent.slice(0, -1)
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
                {newExistTags.tags.map((existTag) => {
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
            {newUrls.map((urlinfo) => {
              return (
                <li className="surpinModal__url-list">
                  <UrlList
                    urlName={urlinfo.urlName}
                    url={urlinfo.url}
                  ></UrlList>
                  {editmode ? (
                    <button
                      className="urlList__delete-btn"
                      onClick={handleDeleteUrl}
                    >
                      X
                      <img className="urlList__delete-btn-img" src="" alt="" />
                    </button>
                  ) : (
                    <></>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
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
        <div className="surpinModal__revise-btn__wrapper">
          {writer === nickname ? (
            <button
              className="surpinModal__revise-btn"
              onClick={handleSaveSurpin}
            >
              편집
            </button>
          ) : (
            <button
              className="surpinModal__revise-btn"
              onClick={handleSaveSurpin}
            >
              퍼가기
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default SurpinModal;
