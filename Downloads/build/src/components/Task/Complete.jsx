import React from "react";
import TaskCard from "./TaskCard";
import TaskTableHead from "./TaskTableHead";

const Complete = () => {
  return (
    <div>
      <TaskTableHead />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default Complete;
