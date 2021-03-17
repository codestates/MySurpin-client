import React from 'react';

const SearchResult = (props) => {
  const {name, description, urlsCount, createdAt, modifiedAt} = props;

  return (
    <div className="searchResult">
      <div className="searchResult__name">{name}</div>
      <div className="searchResult__description">{description}</div>
      <div className="searchResult__urlsCount">{urlsCount}</div>
      <div className="searchResult__createdAt">{createdAt}</div>
      <div className="searchResult__updatedAt">{modifiedAt}</div>
    </div>
  );
};

export default SearchResult;