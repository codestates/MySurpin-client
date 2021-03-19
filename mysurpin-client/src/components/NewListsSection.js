import React from "react";
import Surpin from "../components/Surpin";
import { useSelector } from "react-redux";

const NewListsSection = () => {
  const state = useSelector((state) => state.surpinReducer);
  const { newLists } = state;

  console.log("newLists의 상태", newLists);
  console.log("newLists.surpins", newLists.surpins);
  let fakeSurpin = [
    {
      surpinId: 1,
      title: "첫번째 서핀리스트",
      desc: "beDev",
      writer: "제원",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요"],
    },
    {
      surpinId: 2,
      title: "두번째 서핀리스트",
      desc: "beDev",
      writer: "윤택",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요"],
    },
    {
      surpinId: 3,
      title: "세번째 서핀리스트",
      desc: "beDev",
      writer: "주혜",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요"],
    },
    {
      surpinId: 4,
      title: "네번째 서핀리스트",
      desc: "beDev",
      writer: "유빈",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요"],
    },
  ];
  return (
    <div className="newListsSection">
      <div className="newlists__title">New Surpins</div>
      <ul className="newlists__lists">
        {fakeSurpin.map((surpin) => {
          return (
            <li className="newlists__list">
              <Surpin surpin={surpin}></Surpin>
            </li>
          );
        })}
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
