import React from "react";

const Tag = (props) => {
  const { tag } = props;
  return <span className="tag">{tag}</span>;
};

export default Tag;
