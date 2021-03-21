import React, { useState } from "react";
import Surpin from "../components/Surpin";
import { useSelector, useDispatch } from "react-redux";
import { getNewLists } from "../actions/index";

const NewListsSection = ({ animatedItem }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.surpinReducer);
  const { newLists } = state;
  const [pagenumber, setPagenumber] = useState("");

  const handleNewLists = () => {
    const payload = JSON.stringify({
      pagenumber,
    });
    return fetch(`http://localhost:4000/surpin/newlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: payload,
    })
      .then((res) => res.json())
      .then(() => dispatch(getNewLists(pagenumber)))
      .catch((err) => console.error(err));
  };

  let fakeData = {
    surpinCount: 1,
    surpinCountPerPage: 10,
    surpins: [
      {
        surpinId: 1,
        title: "첫번째 서핀리스트",
        desc: "beDev",
        writer: "제원",
        thumbnail:
          "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
        created_At: "21-03-10 12:00:00",
        modified_At: "21-03-10 12:00:00",
        tags: ["다들", "힘내세요", 1],
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
        tags: ["다들", "힘내세요", 2],
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
        tags: ["다들", "힘내세요", 3],
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
        tags: ["다들", "힘내세요", 4],
      },
      {
        surpinId: 5,
        title: "다섯번째 서핀리스트",
        desc: "beDev",
        writer: "제원",
        thumbnail:
          "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
        created_At: "21-03-10 12:00:00",
        modified_At: "21-03-10 12:00:00",
        tags: ["다들", "힘내세요", 5],
      },
      {
        surpinId: 6,
        title: "여섯번째 서핀리스트",
        desc: "beDev",
        writer: "윤택",
        thumbnail:
          "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
        created_At: "21-03-10 12:00:00",
        modified_At: "21-03-10 12:00:00",
        tags: ["다들", "힘내세요", 6],
      },
      {
        surpinId: 7,
        title: "일곱번째 서핀리스트",
        desc: "beDev",
        writer: "jooing",
        thumbnail:
          "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
        created_At: "21-03-10 12:00:00",
        modified_At: "21-03-10 12:00:00",
        tags: ["다들", "힘내세요", 7],
      },
      {
        surpinId: 8,
        title: "여덟번째 서핀리스트",
        desc: "beDev",
        writer: "유빈",
        thumbnail:
          "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
        created_At: "21-03-10 12:00:00",
        modified_At: "21-03-10 12:00:00",
        tags: ["다들", "힘내세요", 8],
      },
    ],
    top: [
      {
        surpinId: 6,
        title: "여섯번째 서핀리스트",
        desc: "beDev",
        writer: "윤택",
        thumbnail:
          "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
        created_At: "21-03-10 12:00:00",
        modified_At: "21-03-10 12:00:00",
        tags: ["다들", "힘내세요", 6],
      },
      {
        surpinId: 1,
        title: "첫번째 서핀리스트",
        desc: "beDev",
        writer: "제원",
        thumbnail:
          "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
        created_At: "21-03-10 12:00:00",
        modified_At: "21-03-10 12:00:00",
        tags: ["다들", "힘내세요", 1],
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
        tags: ["다들", "힘내세요", 2],
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
        tags: ["다들", "힘내세요", 3],
      },
      {
        surpinId: 8,
        title: "여덟번째 서핀리스트",
        desc: "beDev",
        writer: "유빈",
        thumbnail:
          "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
        created_At: "21-03-10 12:00:00",
        modified_At: "21-03-10 12:00:00",
        tags: ["다들", "힘내세요", 8],
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
        tags: ["다들", "힘내세요", 4],
      },
      {
        surpinId: 5,
        title: "다섯번째 서핀리스트",
        desc: "beDev",
        writer: "제원",
        thumbnail:
          "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
        created_At: "21-03-10 12:00:00",
        modified_At: "21-03-10 12:00:00",
        tags: ["다들", "힘내세요", 5],
      },
      {
        surpinId: 7,
        title: "일곱번째 서핀리스트",
        desc: "beDev",
        writer: "jooing",
        thumbnail:
          "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
        created_At: "21-03-10 12:00:00",
        modified_At: "21-03-10 12:00:00",
        tags: ["다들", "힘내세요", 7],
      },
    ],
  };

  // 추후에 새 리스트가 없을 경우 페이지 만들기
  return (
    <div className="newListsSection">
      <div className="newlists__title">New Surpins</div>
      <ul className="newlists__lists" {...animatedItem}>
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
