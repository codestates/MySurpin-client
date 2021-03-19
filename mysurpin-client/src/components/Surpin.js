/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";

const Surpin = ({ surpin }) => {
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
      <div className="surpin">
        <div className="surpin__content">
          <img
            className="surpin__content-thumbnail"
            src="https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512"
            alt="thumbnail"
          />
          <div className="surpin-title">{title}</div>
          <div className="surpin-username">{writer}</div>
          <ul className="list__tags">
            {tags.map((tag, idx) => {
              return (
                <li className="list__tag" key={idx}>
                  {tag}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Surpin;
