import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MainSection from "../components/MainSection";
import BestTagsSection from "../components/BesttagsSection";
import NewListsSection from "../components/NewListsSection";
import ScrollBtn from "../components/ScrollBtn";
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import useScrollEventListener from "../hooks/useScrollEventListener";
import { getBestTags, getNewLists } from "../actions/index";
import { useDispatch } from "react-redux";
require("dotenv").config();

const MainPage = () => {
  const dispatch = useDispatch();
  const [navBarState, setNavBarState] = useState("hidden");
  const [chartlabel, setChartlabel] = useState([]);
  const [chartdata, setChartdata] = useState([]);
  let newChartlabel = [];
  let newChartdata = [];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "My Surpin";
  }, []);

  // besttag
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/surpin/bestTags`)
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

  // newlists
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/surpin/newlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(getNewLists(data));
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChartdata = useCallback(() => {
    setChartlabel(newChartlabel);
    setChartdata(newChartdata);
  }, [newChartlabel, newChartdata]);

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
          animatedItem={useScrollEventListener(handleChartdata, 0.3)}
          chartdata={chartdata}
          chartlabel={chartlabel}
        ></BestTagsSection>
        <NewListsSection></NewListsSection>
      </ul>
    </div>
  );
};

export default MainPage;
