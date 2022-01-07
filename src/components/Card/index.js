import React from "react";
import "./style.css";
import Skeleton from "react-loading-skeleton";

const Card = ({ title, value, children, fluid }) => {
  return (
    <>
      <div className={`card ${fluid ? "fluid" : ""}`}>
        {children ? (
          children
        ) : (
          <>
            {value ? (
              <>
                <h4>{title}</h4>
                <h1>{value}</h1>
              </>
            ) : (
              <>
                <Skeleton height="20px" />
                <br />
                <Skeleton height="40px" />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Card;
