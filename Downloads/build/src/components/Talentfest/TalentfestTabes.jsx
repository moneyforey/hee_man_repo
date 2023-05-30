import { useState, useEffect } from "react";
import Participants from "./Participants";

const TalentfestTabes = () => {
  let Dates = new Date().toLocaleString();
  // console.log(Dates);
  const [Sales, setSales] = useState();

  useEffect(() => {
    setSales("Participants");
  }, []);

  return (
    <>
      <div className="row mt-3">
        <div className="col-9 mb-4">
          <div className="row">
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "Participants" ? "600" : "400",
                  color: Sales === "Participants" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Participants")}
              >
                Participants
              </span>
            </div>
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "Study" ? "600" : "400",
                  color: Sales === "Study" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Study")}
              >
                Study Material
              </span>
            </div>
            <div className="col-2">
              <span
                className="text-nowrap"
                style={{
                  fontWeight: Sales === "Channel" ? "600" : "400",
                  color: Sales === "Channel" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Channel")}
              >
                Channel Partner
              </span>
            </div>
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "Counsellors" ? "600" : "400",
                  color: Sales === "Counsellors" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Counsellors")}
              >
                Counsellors
              </span>
            </div>
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "Details" ? "600" : "400",
                  color: Sales === "Details" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Details")}
              >
                Details
              </span>
            </div>
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "Exam Setup" ? "600" : "400",
                  color: Sales === "Exam Setup" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Exam Setup")}
              >
                Exam Setup
              </span>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="row" style={{ marginRight: "20px" }}>
            <div className="col-2"></div>

            <div
              className="col-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(33,184,103,1) 0%, rgba(47,132,96,1))",
                height: "40px",
                borderRadius: "7px",
                color: "#fff",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "6px",
                }}
              >
                22-sep-2022 - 22-sep-2022
              </span>
            </div>
          </div>
        </div>

        {/* start here */}
        <div className="row">
          <div className="col-9">
            <div className="row">
              <div
                className="col-2"
                style={{
                  borderBottom:
                    Sales === "Participants" ? "2px solid #000000" : "",
                }}
              ></div>
               
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "Study" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "Channel" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom:
                    Sales === "Counsellors" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "Details" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom:
                    Sales === "Exam Setup" ? "2px solid #000000" : "",
                }}
              ></div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
        <hr />
      </div>



      {Sales === "Participants" ? (
        <div>
          <Participants />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Study" ? <div>Study</div> : <></>}
      {Sales === "Channel" ? <div>Channel</div> : <></>}
      {Sales === "Counsellors" ? <div>Counsellors</div> : <></>}
      {Sales === "Details" ? <div>Details</div> : <></>}
      {Sales === "Exam Setup" ? <div>Exam Setup</div> : <></>}
    </>
  );
};

export default TalentfestTabes;
