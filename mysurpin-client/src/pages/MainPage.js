import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MainSection from "../components/MainSection";
import BestTagsSection from "../components/BesttagsSection";
import NewListsSection from "../components/NewListsSection";
import ScrollBtn from "../components/ScrollBtn";
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import useScrollEventListener from "../hooks/useScrollEventListener";
import { getBestTags, getNewLists } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";

const MainPage = () => {
  const mainPageState = useSelector((state) => state.surpinReducer);
  const dispatch = useDispatch();
  const { tags, newLists } = mainPageState;
  const [navBarState, setNavBarState] = useState("hidden");
  const [chartlabel, setChartlabel] = useState([]);
  const [chartdata, setChartdata] = useState([]);
  let newChartlabel = [];
  let newChartdata = [];
  useEffect(() => {
    fetch(`http://localhost:4000/surpin/bestTags`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getBestTags(data));
        data.tags.map((tag) => {
          newChartlabel.push(tag.name);
          newChartdata.push(tag.countOfTag);
        });
        setChartdata(Array(data.tags.length).fill(0));
        setChartlabel(Array(data.tags.length).fill(0));
      })
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

  const handleChartdata = () => {
    setChartlabel(newChartlabel);
    setChartdata(newChartdata);
    // setChartdata([12, 19, 3, 5, 2, 3]);
  };

  useEffect(() => {
    window.addEventListener("scroll", getCurrentScroll);
    return () => window.removeEventListener("scroll", getCurrentScroll);
  });

  const getCurrentScroll = () => {
    if ((window.scrollY / document.body.clientHeight) * 100 < 33) {
      setNavBarState("hidden");
    } else if ((window.scrollY / document.body.clientHeight) * 100 > 33) {
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
          chartlabel={chartlabel}
        ></BestTagsSection>
        <NewListsSection
          animatedItem={useScrollFadeIn("up", 1.5, 0)}
        ></NewListsSection>
      </ul>
    </div>
  );
};

export default MainPage;
