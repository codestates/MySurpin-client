import React from "react";

const UrlList = (props) => {
  const { name, url } = props;

  return (
    <div className="urlList">
      <input className="urlList__checkbox" type="checkbox" />
      <div className="urlList__urlName">{name}</div>
      <div className="urlList__url">{url}</div>
    </div>
  );
};

export default UrlList;
