import React from "react";
import "../Modal.css";
const AlertModal = (props) => {
  const { open, close, comment } = props;
  return (
    <div className={open ? "openModal alertModal" : "alertModal"}>
      {open ? (
        <section>
          <header>
            <button className="alertModal__closeBtn" onClick={close}>
              &times;
            </button>
          </header>
          <main>{comment}</main>
        </section>
      ) : null}
    </div>
  );
};

export default AlertModal;
