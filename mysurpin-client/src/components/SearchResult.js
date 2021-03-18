import React from "react";

const SearchResult = (props) => {
  const { name, description, urlsCount, createdAt, modifiedAt } = props;

  return (
    <div className="searchResult">
      <div className="searchResult__name">{name}MySurpin</div>
      <div className="searchResult__description">{description}꿀팁모음</div>
      <div className="searchResult__urlsCount">{urlsCount}54</div>
      <div className="searchResult__createdAt">{createdAt}2021-03-18</div>
      <div className="searchResult__updatedAt">{modifiedAt}</div>
    </div>
  );
};

export default SearchResult;
