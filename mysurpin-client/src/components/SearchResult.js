import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const SearchResult = ({ surpin }) => {
  const {
    surpinId,
    title,
    desc,
    writer,
    thumbnail,
    createdAt,
    modifiedAt,
    tags,
  } = surpin;
  console.log(surpin);
  return (
    <Link to={{ pathname: `/surpinmodal/${surpinId}`, surpin }}>
      <div className="searchResult">
        <div className="searchResult__name">{title}</div>
        <div className="searchResult__description">{desc}</div>
        <div className="searchResult__urlsCount">{writer}</div>
        <div className="searchResult__createdAt">
          {moment(createdAt).startOf("hour").fromNow()}
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;
