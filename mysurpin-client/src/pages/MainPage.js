import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import MainSection from "../components/MainSection";
import BestTagsSection from "../components/BesttagsSection";
import NewListsSection from "../components/NewListsSection";
import ScrollBtn from "../components/ScrollBtn";

import { getBestTags, getNewLists } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";

const MainPage = () => {
  const mainPageState = useSelector((state) => state.surpinReducer);
  const { tags, newLists } = mainPageState;
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:4000/surpin/bestTags`)
      .then((res) => res.json())
      .then((data) => dispatch(getBestTags(data)))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 본래 사용해야 하는 함수 + 추후에 api 요청 주소 변경
  useEffect(() => {
    fetch(`http://localhost:4000/surpin/newlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(getNewLists(data)))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mainPage">
      <Navbar></Navbar>
      <ScrollBtn></ScrollBtn>
      <ul className="mainpage__sections">
        <li>
          <MainSection></MainSection>
        </li>
        <li>
          <BestTagsSection></BestTagsSection>
        </li>
        <li>
          <NewListsSection></NewListsSection>
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
