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
    console.log("=== useEffect, BestTags ===");
    fetch(`http://localhost:4000/surpin/bestTags`)
      .then((res) => res.json())
      .then((data) => dispatch(getBestTags(data)))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("=== useEffect, NewLists ===");
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

  console.log("newLists의 상태", newLists);
  console.log("tags의 상태", tags);
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
