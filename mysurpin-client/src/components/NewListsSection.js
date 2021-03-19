import React from "react";
import Surpin from "../components/Surpin";
import { useSelector } from "react-redux";

const NewListsSection = () => {
  const state = useSelector((state) => state.surpinReducer);
  const { newLists } = state;

  console.log("newLists의 상태", newLists);
  console.log("newLists.surpins", newLists.surpins);
  let fakeSurpin = {
    title: "첫번째 서핀리스트",
    desc: "beDev",
    writer: "",
  };
  return (
    <div className="newListsSection">
      <div className="newlists__title">New Surpins</div>
      <ul className="newlists__lists">
        <li className="newlists__list">
          <Surpin></Surpin>
        </li>
        {/* {newLists.surpins.map((surpin) => {
          return (
            <li className="newlists__list">
              <Surpin surpin={surpin}></Surpin>
            </li>
          );
        })} */}
      </ul>
    </div>
  );
};

export default NewListsSection;
