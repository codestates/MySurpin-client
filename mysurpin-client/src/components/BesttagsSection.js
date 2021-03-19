import React from "react";
import { useSelector } from "react-redux";

const BesttagsSection = () => {
  const state = useSelector((state) => state.surpinReducer);
  const { tags } = state;
  console.log("tags의 상태", tags);

  return (
    <div className="besttagsSection">
      <div className="besttags__title">Best Tags</div>
      <div className="besttags__chart"></div>
    </div>
  );
};

export default BesttagsSection;
