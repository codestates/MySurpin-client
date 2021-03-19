import React, { useState } from "react";

const ScrollBtn = () => {
  const [scrollToMain, setScrollToMain] = useState(0);
  const [scrollToBestTags, setScorllToBestTags] = useState(0);
  const [scrollToNewLists, setScrollToNewLists] = useState(0);

  const handleToMain = () => {
    setScrollToMain(window.scrollTo(0, 0));
  };

  const handleToBest = () => {
    setScorllToBestTags(window.scrollTo(0, 764));
  };

  const handleToNew = () => {
    setScrollToNewLists(window.scrollTo(0, 1551));
  };

  return (
    <div className="scroll-buttons">
      <button
        className="scroll-buttons__main"
        value={scrollToMain}
        onClick={handleToMain}
      ></button>
      <button
        className="scroll-buttons__bestTags"
        value={scrollToBestTags}
        onClick={handleToBest}
      ></button>
      <button
        className="scroll-buttons__newLists"
        value={scrollToNewLists}
        onClick={handleToNew}
      ></button>
    </div>
  );
};

export default ScrollBtn;
