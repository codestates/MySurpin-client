import React from "react";

const UrlList = (props) => {
  const { name, url } = props;

  return (
    <div className="urlList">
      <div className="urlList__urlName">{name}</div>
      <div className="urlList__url">{url}</div>
    </div>
  );
};

export default UrlList;
