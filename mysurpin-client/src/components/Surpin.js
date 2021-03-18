import React from "react";

const Surpin = (props) => {
  const { tags } = props;
  return (
    <div className="surpin">
      <div className="surpin__content">
        <img className="surpin__content-thumbnail" src="" alt="" />
        <div className="surpin-title"></div>
        <div className="surpin-username"></div>
        <ul className="list__tags">
          <li className="list__tag">{tags}</li>
        </ul>
      </div>
    </div>
  );
};

export default Surpin;
