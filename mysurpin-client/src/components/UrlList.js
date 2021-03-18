import React from "react";

const UrlList = (props) => {
  const { urlName, url } = props;

  return (
    <div className="urlList">
      <input className="urlList__urlName" type="checkbox" />
      <div className="urlList__urlName">{urlName}</div>
      <div className="urlList__url">{url}</div>
      <button className="urlList__delete-btn">
        <img className="urlList__delete-btn-img" src="" alt="" />
      </button>
    </div>
  );
};

export default UrlList;
