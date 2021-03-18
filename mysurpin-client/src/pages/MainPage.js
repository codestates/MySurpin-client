import React from "react";
import Navbar from "../components/Navbar";
import MainSection from "../components/MainSection";
import BestTagsSection from "../components/BesttagsSection";
import NewListsSection from "../components/NewListsSection";
import ScrollBtn from "../components/ScrollBtn";

const MainPage = () => {
  return (
    <div className="mainPage">
      <Navbar></Navbar>
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
      <ScrollBtn></ScrollBtn>
    </div>
  );
};

export default MainPage;
