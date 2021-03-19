import React from "react";
import Surpin from "../components/Surpin";
import { useSelector } from "react-redux";

const NewListsSection = () => {
  const state = useSelector((state) => state.surpinReducer);
  const { newLists } = state;

  console.log("newLists의 상태", newLists);
  console.log("newLists.surpins", newLists.surpins);

  // 추후에 새 리스트가 없을 경우 페이지 만들기
  return (
    <div className="newListsSection">
      <div className="newlists__title">New Surpins</div>
      <ul className="newlists__lists">
        {!newLists.surpins || newLists.surpins.length === 0 ? (
          <li className="newlists__list">Loading...</li>
        ) : (
          newLists.surpins.map((surpin) => {
            return (
              <li className="newlists__list" key={surpin.surpinId}>
                <Surpin surpin={surpin} key={surpin.surpinId}></Surpin>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default NewListsSection;
