/* eslint-disable */
import React, { useState } from "react";
import Surpin from "../components/Surpin";
import { useSelector, useDispatch } from "react-redux";

const NewListsSection = ({ animatedItem }) => {
  const state = useSelector((state) => state.surpinReducer);
  const { newLists } = state;

  return (
    <div className="newListsSection" {...animatedItem}>
      <div className="newlists__title">New Surpins</div>
      <ul className="newlists__lists_first">
        {!newLists.surpins || newLists.surpins.length === 0 ? (
          <li className="newlists__list">Loading...</li>
        ) : (
          newLists.surpins
            .slice(0, parseInt(newLists.surpins.length / 2))
            .map((surpin, idx) => {
              return (
                <li className="newlists__list" key={idx}>
                  <Surpin surpin={surpin} key={idx}></Surpin>
                </li>
              );
            })
        )}
      </ul>
      <ul className="newlists__lists_second">
        {!newLists.surpins || newLists.surpins.length === 0 ? (
          <li className="newlists__list">Loading...</li>
        ) : (
          newLists.surpins
            .slice(
              parseInt(newLists.surpins.length / 2),
              newLists.surpins.length
            )
            .map((surpin, idx) => {
              return (
                <li className="newlists__list" key={idx}>
                  <Surpin surpin={surpin} key={idx}></Surpin>
                </li>
              );
            })
        )}
      </ul>
    </div>
  );
};

export default NewListsSection;
