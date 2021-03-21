/* eslint-disable */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Surpin from "../components/Surpin";
import SearchResult from "../components/SearchResult";
import { useSelector, useDispatch } from "react-redux";
import { getTagLists } from "../actions/index";

// 실험용 데이터
import { fakeData2 } from "../reducers/initialState";
// 여기까지

const SearchPage = () => {
  const searchTagState = useSelector((state) => state.surpinReducer);
  const { searchTagLists } = searchTagState;
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");
  const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state
  const [pagenumber, setPagenumber] = useState(1);

  const fetchMoreLists = () => {
    // 추가 데이터를 로드하는 상태로 전환
    setFetching(true);

    const payload = JSON.stringify(tag, pagenumber);

    // API로부터 받아온 페이징 데이터를 이용해 다음 데이터를 로드
    fetch(`http://localhost:4000/surpin/searchlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: payload,
    }).then((response) => {
      const fetchedData = response.data.data; // 피드 데이터 부분
      // 기존 데이터 배열과 새로 받아온 데이터 배열을 합쳐 새 배열을 만들고 state에 저장한다.
      const mergedData = tag.concat(...fetchedData);
      setTag(mergedData);
    });
    // 추가 데이터 로드 끝
    setFetching(false);
    setPagenumber((pagenumber) => pagenumber + 1);
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      fetchMoreLists();
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const onChangeSearchTag = (e) => {
    setTag(e.target.value);
  };

  const handleSearchBtn = () => {
    if (tag.length === 0) {
      alert("검색어를 입력하세요");
    } else {
      dispatch(getTagLists(fakeData2));
    }
  };

  // const handleSearchBtn = () => {
  //   if (tag.length === 0) {
  //     alert("검색어를 입력하세요");
  //   } else {
  //     const payload = JSON.stringify({
  //       pagenumber: 1,
  //       tag: tag,
  //     });
  //     fetch(`http://localhost:4000/surpin/searchlists`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         credentials: "include",
  //       },
  //       body: payload,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => dispatch(getTagLists(data)));
  //   }
  // };

  return (
    <>
      <Navbar></Navbar>
      <div className="searchPage">
        <div className="searchbar">
          <input
            className="searchbar__input"
            placeholder="search for"
            value={tag}
            onChange={onChangeSearchTag}
          ></input>
          <button className="sarchbar__button" onClick={handleSearchBtn}>
            <img src="../../public/images/search.png"></img>
          </button>
        </div>
        <div className="searchpage-best-results">
          <div className="searchpage__best__title">Best Surpins</div>
          <ul className="searchpage-best-lists">
            {searchTagLists.top.map((searchTagList) => {
              return (
                <li
                  className="searchpage-best-list"
                  key={searchTagList.surpinId}
                >
                  <Surpin surpin={searchTagList}></Surpin>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="searchpage-all-results">
          <div className="searchpage__all__title">All Surpins</div>
          <div className="searchpage__all__lists">
            <div className="searchpage__all__lists__topbar">
              <div className="topbar__name">Surpin 이름</div>
              <div className="topbar__description">요약</div>
              <div className="topbar__numbOfUrls">URL 개수</div>
              <div className="topbar__createdAt">생성일</div>
            </div>
            <ul className="searchpage-all-results__lists">
              {searchTagLists.surpins.map((surpin) => {
                return (
                  <li
                    className="searchpage-all-result__list"
                    key={surpin.surpinId}
                  >
                    <SearchResult surpin={surpin}></SearchResult>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchPage;
