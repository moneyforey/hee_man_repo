import React from "react";
import TaskCard from "./TaskCard";
import TaskTableHead from "./TaskTableHead";

const MyTask = () => {
  return (
    <div>
      <TaskTableHead />
      <div style={{ overflowY: "scroll", height: "50vh" }}>
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  );
};

export default MyTask;
