import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MainSection from "../components/MainSection";
import BestTagsSection from "../components/BesttagsSection";
import NewListsSection from "../components/NewListsSection";
import ScrollBtn from "../components/ScrollBtn";
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import useScrollEventListener from "../hooks/useScrollEventListener.js.js";
import { getBestTags, getNewLists } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";

// fakeData 나중에 꼭 지우기 (여기부터)
import { fakeData } from "../reducers/initialState";
// fakeData 나중에 꼭 지우기 (여기까지)

const MainPage = () => {
  const mainPageState = useSelector((state) => state.surpinReducer);
  const dispatch = useDispatch();
  const { tags, newLists } = mainPageState;
  const [navBarState, setNavBarState] = useState("hidden");

  useEffect(() => {
    fetch(`http://localhost:4000/surpin/bestTags`)
      .then((res) => res.json())
      .then((data) => dispatch(getBestTags(data)))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 본래 사용해야 하는 함수 + 추후에 api 요청 주소 변경
  // useEffect(() => {
  //   console.log("=== useEffect, NewLists ===");
  //   fetch(`http://localhost:4000/surpin/newlists`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       credentials: "include",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => dispatch(getNewLists(data)))
  //     .catch((err) => console.log(err));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // 나중에 꼭 지우기 (여기부터)
  useEffect(() => {
    dispatch(getNewLists(fakeData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 나중에 꼭 지우기 (여기까지)
  const [chartdata, setChartdata] = useState(["0", "0", "0", "0", "0", "0"]);

  const handleChartdata = () => {
    setChartdata([12, 19, 3, 5, 2, 3]);
  };

  useEffect(() => {
    window.addEventListener("scroll", getCurrentScroll);
    return () => window.removeEventListener("scroll", getCurrentScroll);
  });

  const getCurrentScroll = () => {
    if ((window.scrollY / document.body.clientHeight) * 100 < 33) {
      console.log("navbar__searchbar hidden");
      setNavBarState("hidden");
    } else if ((window.scrollY / document.body.clientHeight) * 100 > 33) {
      console.log("navbar__searchbar");
      setNavBarState("");
    }
  };

  return (
    <div className="mainPage">
      <Navbar navBarState={navBarState}></Navbar>
      <ScrollBtn></ScrollBtn>
      <ul className="mainpage__sections">
        <MainSection></MainSection>
        <BestTagsSection
          animatedItem={useScrollEventListener(handleChartdata)}
          chartdata={chartdata}
        ></BestTagsSection>
        <NewListsSection
          animatedItem={useScrollFadeIn("up", 1.5, 0)}
        ></NewListsSection>
      </ul>
    </div>
  );
};

export default MainPage;
