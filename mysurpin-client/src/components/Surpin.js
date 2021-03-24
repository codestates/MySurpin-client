/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";

const Surpin = ({ surpin }) => {
  let {
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
            {tags.length ? (
              tags
                .slice(0, 3)
                .map((tag) => <li className="list__tag">{`#${tag}`}</li>)
            ) : (
              <li />
            )}
          </ul>
        </div>
        <div className="surpin-username">{writer}</div>

        <div
          className="surpin__img"
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: `cover`,
          }}
        ></div>
        <button className="surpin__addBtn" onClick={() => {}}>
          +
        </button>
      </div>
    </Link>
  );
};

export default Surpin;
