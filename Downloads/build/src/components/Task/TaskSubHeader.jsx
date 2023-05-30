import React, { useState } from "react";
import MyTask from "./MyTask";
import InProgress from "./InProgress";
import NotStarted from "./NotStarted";
import Complete from "./Complete";

const TaskSubHeader = () => {
  const [Sales, setSales] = useState("MyTasks");
  const [Datas, setDatas] = useState([]);

  return (
    <>
      <div className="row">
        <div className="col-8 mb-2">
          <div className="row">
            <div
              className="col-2 d-flex"
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <span
                className="mt-2"
                style={{
                  fontWeight: "lighter",
                  color: Sales === "MyTasks" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("MyTasks")}
              >
                My Tasks
              </span>

              <span
                className="px-3"
                style={{
                  backgroundColor: "#CC1313",
                  borderRadius: "50%",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {Datas.length}
              </span>
            </div>

            <div
              className="col-3 d-flex"
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <span
                className="text-nowrap"
                style={{
                  fontWeight: "lighter",
                  color: Sales === "NotStarted" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("NotStarted")}
              >
                Not Started
              </span>
              <span
                className="px-3"
                style={{
                  backgroundColor: "#CC1313",
                  borderRadius: "50%",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <p style={{ marginTop: "3px",textAlign:"center" }}>*/}
                {Datas.length}
                {/* </p> */}
              </span>
            </div>

            <div
              className="col-2 d-flex"
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <span
                className="text-nowrap"
                style={{
                  fontWeight: "lighter",
                  color: Sales === "InProgress" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("InProgress")}
              >
                In Progress
              </span>

              <span
                className="px-3"
                style={{
                  backgroundColor: "#CC1313",
                  borderRadius: "50%",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: ".25rem",
                }}
              >
                {Datas.length}
              </span>
            </div>

            <div
              className="col-2 d-flex"
              style={{
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <span
                className="text-nowrap"
                style={{
                  fontWeight: "lighter",
                  color: Sales === "Complete" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Complete")}
              >
                Complete
              </span>

              <span
                className="px-3"
                style={{
                  backgroundColor: "#CC1313",
                  borderRadius: "50%",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {Datas.length}
              </span>
            </div>
          </div>
        </div>

        <div className="col-4 mb-2">
          <div className="row" style={{ marginRight: "20px" }}>
            <div className="col-5"></div>

            <div
              className="col-7 ms-1"
              style={{
                display: Sales === "Question Bank" ? "none" : "",
                background:
                  "linear-gradient(180deg, rgba(33,184,103,1) 0%, rgba(47,132,96,1))",
                height: "40px",
                borderRadius: "7px",
                color: "#fff",
                width: "auto",
              }}
            >
              <span
                className="text-nowrap"
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "6px",
                }}
              >
                22-sep-2022 - 22-sep-2022
              </span>
            </div>
            <div
              className="col-12"
              style={{ display: Sales === "Question Bank" ? "" : "none" }}
            >
              <div className="row">
                <div className="col-6">
                  <button
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    className="border-0 w-100"
                    style={{
                      backgroundColor: "#2188E7",
                      color: "#fff",
                      height: "40px",
                      borderRadius: 7,
                    }}
                  >
                    <span className="p-2">+Add Subject</span>
                  </button>
                </div>
                <div className="col-6">
                  <button
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight1"
                    aria-controls="offcanvasRight1"
                    className="border-0 w-100"
                    style={{
                      borderRadius: 7,
                      background:
                        "linear-gradient(180deg, rgba(33,184,103,1) 0%, rgba(47,132,96,1) 100%)",
                      height: "40px",
                      color: "#fff",
                    }}
                  >
                    +Add Questions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="row">
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "MyTasks" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-3"
                style={{
                  borderBottom:
                    Sales === "NotStarted" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom:
                    Sales === "InProgress" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "Complete" ? "2px solid #000000" : "",
                }}
              ></div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
        <hr />
      </div>

      {Sales === "MyTasks" ? (
        <div>
          <MyTask />
        </div>
      ) : (
        <></>
      )}
      {Sales === "NotStarted" ? (
        <div>
          <NotStarted />
        </div>
      ) : (
        <></>
      )}
      {Sales === "InProgress" ? (
        <div>
          <InProgress />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Complete" ? (
        <div>
          <Complete />
        </div>
      ) : (
        <></>
      )}

      <div
        className="offcanvas offcanvas-end w-50"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{ borderTopLeftRadius: 30 }}
      >
        <div className="offcanvas-body">{/* <Question/>  */}</div>
      </div>
      <div
        className="offcanvas offcanvas-end w-50"
        tabindex="-1"
        id="offcanvasRight1"
        aria-labelledby="offcanvasRightLabel1"
        style={{ borderTopLeftRadius: 30 }}
      >
        <div className="offcanvas-body">{/* <AddQuestion/> */}</div>
      </div>
    </>
  );
};

export default TaskSubHeader;
