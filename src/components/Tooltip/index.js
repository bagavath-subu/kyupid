import React from "react";

const Tooltip = ({ feature }) => {
  let {
    properties: { id, name, totalUsers, revenue, genderRatio },
  } = feature;

  return (
    <div id={`tooltip-${id}`}>
      <strong>Area Name:</strong> {name}
      <br />
      <strong>Number of Users:</strong> {totalUsers}
      <br />
      <strong>Revenue:</strong> {revenue}
      <br />
      <strong>Gender Ratio:</strong> {genderRatio}
    </div>
  );
};

export default Tooltip;
