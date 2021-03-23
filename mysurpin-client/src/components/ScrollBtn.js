import React, { useCallback, useState } from "react";

const ScrollBtn = () => {
  const [scrollToMain, setScrollToMain] = useState(0);
  const [scrollToBestTags, setScorllToBestTags] = useState(0);
  const [scrollToNewLists, setScrollToNewLists] = useState(0);

  // alert("Current scroll from the top: " + window.pageYOffset);

  const handleToMain = useCallback(() => {
    setScrollToMain(window.scrollTo({ behavior: "smooth", top: "location" }));
  }, []);

  const handleToBest = useCallback(() => {
    setScorllToBestTags(
      document
        .querySelector(".scroll-buttons__bestTags")
        .scrollIntoView({ behavior: "smooth" })
    );
  }, []);

  const handleToNew = useCallback(() => {
    setScrollToNewLists(
      window.scrollTo({ top: 2500, left: 0, behavior: "smooth" })
    );
  }, []);

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
