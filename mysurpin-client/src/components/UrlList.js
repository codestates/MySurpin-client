import React from "react";

const UrlList = (props) => {
  const { urlName, url } = props;

  return (
    <div className="urlList">
      <input className="urlList__checkbox" type="checkbox" />
      <div className="urlList__urlName">{urlName}</div>
      <div className="urlList__url">{url}</div>
    </div>
  );
};

export default UrlList;
