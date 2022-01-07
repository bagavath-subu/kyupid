import React from "react";
import Card from "../Card";
import "./style.css";

const Legend = (props) => {
  const renderLegendKeys = (stop, i) => {
    return (
      <div key={i} className="txt-s">
        <span className="legend-key" style={{ backgroundColor: stop[1] }} />
        <span>{`${stop[0].toLocaleString()}`}</span>
      </div>
    );
  };

  return (
    <>
      <Card>
        <div className="legend">
          <div className="mb6">
            <h2>{props.data.name}</h2>
            <p>{props.data.description}</p>
          </div>
          <div className="legend-list">{props.stops.map(renderLegendKeys)}</div>
        </div>
      </Card>
    </>
  );
};

export default Legend;
