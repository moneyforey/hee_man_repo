import React from "react";
import TaskCard from "./TaskCard";
import TaskTableHead from "./TaskTableHead";

const NotStarted = () => {
  return (
    <div>
      <TaskTableHead />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default NotStarted;
