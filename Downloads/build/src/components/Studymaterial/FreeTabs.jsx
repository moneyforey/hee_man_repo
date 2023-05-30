import { useState, useEffect } from "react";
import FreePdf from "./FreePdf";
import DailyUpdate from "./DailyUpdate";

const FreeTabs = () => {
  const [Sales, setSales] = useState();

  useEffect(() => {
    setSales("Free PDF");
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-8 mb-2">
          <div className="row">
            <div className="col-2">
              <span
                className="mt-2"
                style={{
                  fontWeight: Sales === "Free PDF" ? "600" : "400",
                  color: Sales === "Free PDF" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Free PDF")}
              >
                Free PDF
              </span>
            </div>
            <div
              className="col-2 d-flex"
              style={{ justifyContent: "space-around" }}
            >
              <span
                style={{
                  fontWeight: Sales === "Live Classes" ? "600" : "400",
                  color: Sales === "Live Classes" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Live Classes")}
              >
                Live Classes
              </span>
            </div>
            <div className="col-2 text-nowrap">
              <span
                style={{
                  fontWeight: Sales === "Daily Updates" ? "600" : "400",
                  color: Sales === "Daily Updates" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Daily Updates")}
              >
                Daily Updates
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-8">
            <div className="row">
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "Free PDF" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom:
                    Sales === "Live Classes" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom:
                    Sales === "Daily Updates" ? "2px solid #000000" : "",
                }}
              ></div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
        <hr />
        {Sales === "Free PDF" ? (
          <div>
            <FreePdf />
          </div>
        ) : (
          <></>
        )}
        {Sales === "Live Classes" ? <div>Live Classes</div> : <></>}
        {Sales === "Daily Updates" ? (
          <div>
            <DailyUpdate />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FreeTabs;
