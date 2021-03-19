import React from "react";

const SearchResult = ({ surpin }) => {
  const { title, desc, created_At, modified_At } = surpin;

  return (
    <div className="searchResult">
      <div className="searchResult__name">{title}</div>
      <div className="searchResult__description">{desc}</div>
      <div className="searchResult__urlsCount">{"생각 중"}</div>
      <div className="searchResult__createdAt">{created_At}</div>
      <div className="searchResult__updatedAt">{modified_At}</div>
    </div>
  );
};

export default SearchResult;
