import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ surpin }) => {
  const {
    surpinId,
    title,
    desc,
    writer,
    thumbnail,
    created_At,
    modified_At,
    tags,
  } = surpin;

  return (
    <Link to={{ pathname: `/surpinmodal/${surpinId}`, surpin }}>
      <div className="searchResult">
        <div className="searchResult__name">{title}</div>
        <div className="searchResult__description">{desc}</div>
        <div className="searchResult__urlsCount">{"생각 중"}</div>
        <div className="searchResult__createdAt">{created_At}</div>
        <div className="searchResult__updatedAt">{modified_At}</div>
      </div>
    </Link>
  );
};

export default SearchResult;
