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
        <div className="surpin-bold">“</div>
        <div className="surpin-title">
          {title}
          <ul className="list__tags">
            {tags ? (
              tags.map((tag) => <li className="list__tag">{`#${tag}`}</li>)
            ) : (
              <li />
            )}
          </ul>
        </div>
        <div className="surpin-username">{writer}</div>

        <div
          className="surpin__img"
          style={{
            backgroundImage: `url(https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512)`,
            backgroundSize: `cover`,
          }}
        ></div>
        <button className="surpin__addBtn">+</button>
      </div>
    </Link>
  );
};

export default Surpin;
