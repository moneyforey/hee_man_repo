import React from "react";

const RangeInputDiv = ({ value, handleChanges, ind }) => {
  console.log(ind, value);
  return (
    <input
      name={ind}
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => handleChanges(e, ind)}
    />
  );
};

export default RangeInputDiv;
