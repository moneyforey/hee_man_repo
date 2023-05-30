import SideBar from "../SideBar/SideBar";
import AnalyticsData from "./AnalyticsData";

const Analytics = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
          <div className="container">
            <AnalyticsData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
