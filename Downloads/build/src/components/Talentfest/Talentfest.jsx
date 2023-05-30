import React from "react";
import SideBar from "../SideBar/SideBar";
import TalentfestData from "./TalentfestData";

const Talentfest = () => {
  return (
    <div style={{ overflow: "hidden", backgroundColor: "#FAFDFF" }}>
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
          <div className="container">
            <TalentfestData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talentfest;
