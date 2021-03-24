import React, { useCallback, useState } from "react";

const ScrollBtn = () => {
  const [scrollToMain, setScrollToMain] = useState(0);
  const [scrollToBestTags, setScorllToBestTags] = useState(0);
  const [scrollToNewLists, setScrollToNewLists] = useState(0);

  // alert("Current scroll from the top: " + window.pageYOffset);

  const handleToMain = useCallback(() => {
    setScrollToMain(
      document
        .querySelector(".mainSection")
        .scrollIntoView({ behavior: "smooth" })
    );
  }, []);

  const handleToBest = useCallback(() => {
    setScorllToBestTags(
      document
        .querySelector(".besttagsSection")
        .scrollIntoView({ behavior: "smooth" })
    );
  }, []);

  const handleToNew = useCallback(() => {
    setScrollToNewLists(
      document
        .querySelector(".newListsSection")
        .scrollIntoView({ behavior: "smooth" })
    );
  }, []);

  return (
    <div className="scroll-buttons">
      <div className="scroll-box">
        <button
          className="scroll-buttons__main"
          value={scrollToMain}
          onClick={handleToMain}
        >
          MAIN
        </button>
        <button
          className="scroll-buttons__bestTags"
          value={scrollToBestTags}
          onClick={handleToBest}
        >
          BEST
        </button>
        <button
          className="scroll-buttons__newLists"
          value={scrollToNewLists}
          onClick={handleToNew}
        >
          NEW
        </button>
      </div>
    </div>
  );
};

export default ScrollBtn;
