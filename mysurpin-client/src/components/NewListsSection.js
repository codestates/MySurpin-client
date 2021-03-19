// import React from "react";
// import Surpin from "../components/Surpin";

// 여기서 부터
import React, { useEffect } from "react";
import Surpin from "../components/Surpin";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, getNewLists } from "../actions/index";
import store from "../store/store";
// 여기까지 제거

const NewListsSection = () => {
  // 여기서 부터
  // const practiceState = useSelector((state) => state.practiceReducer);
  const surpinState = useSelector((state) => state.surpinReducer);
  const dispatch = useDispatch();
  // console.log("되니??", surpinState);

  useEffect(() => {
    fetch("http://3.36.72.17:3000/JewonYeon/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        pagenumber: 1,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(getNewLists(data));
      })
      .catch((err) => console.log(err));
  }, []);
  // 여기까지 제거

  useEffect(() => {
    dispatch(fetchData());
  });

  return (
    <div className="newListsSection">
      <div className="newlists__title">New Surpins</div>
      <ul className="newlists__lists">
        <li className="newlists__list">
          <Surpin></Surpin>
        </li>
      </ul>
    </div>
  );
};

export default NewListsSection;
