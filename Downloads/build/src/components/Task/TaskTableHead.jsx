import React from "react";

const TaskTableHead = () => {
  return (
    <div className="row">
      <div className="col-12">
        <table className="table mt-3">
          <thead>
            <tr style={{ border: "none", color: "#8a8a8a" }}>
              <th scope="col" className="col-3" style={{ border: "none" }}>
                Issue
              </th>
              <th scope="col" className="col-2" style={{ border: "none" }}>
                Status
              </th>
              <th scope="col" className="col-2" style={{ border: "none" }}>
                Owner
              </th>
              <th scope="col" className="col-2" style={{ border: "none" }}>
                Due Date
              </th>
              <th scope="col" className="col-2" style={{ border: "none" }}></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default TaskTableHead;
