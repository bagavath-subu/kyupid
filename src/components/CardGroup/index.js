import React from "react";
import "./style.css";

const CardGroup = ({ column = false, children, spaceBetween = false }) => {
  return (
    <>
      <div
        className={`card-group ${column ? "flex-column" : ""} ${
          spaceBetween ? "space-between" : ""
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default CardGroup;
