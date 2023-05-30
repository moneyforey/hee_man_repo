import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import TaskSubHeader from "./TaskSubHeader";

const Task = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
          <div className="container">
            <Header />

            <TaskSubHeader />

            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
