import React from "react";

const StarComponent = ({ el }) => {
  const checkedgoldSmall = {
    color: "#FF8E09",
    fontSize: "1rem",
    marginRight: "10px",
  };

  const checkedgold1Small = {
    color: "#EFEFEF",
    fontSize: "1rem",
    marginRight: "10px",
  };

  const stack = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= +el) {
      stack.push(<span className="fa fa-star" style={checkedgoldSmall}></span>);
    } else {
      stack.push(
        <span className="fa fa-star" style={checkedgold1Small}></span>
      );
    }
  }

  return (
    <>
      {stack.map((x) => {
        return x;
      })}
    </>
  );
};

export default StarComponent;
