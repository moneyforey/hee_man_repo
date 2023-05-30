import SideBar from "../SideBar/SideBar";
import SalesData from "./SalesData";

const Sales = () => {
  return (
    <div style={{ overflow: "hidden", backgroundColor: "#fafdff" }}>
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
          <div className="container">
            <SalesData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
