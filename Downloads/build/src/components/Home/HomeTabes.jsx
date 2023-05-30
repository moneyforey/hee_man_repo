import { useEffect, useState } from "react";
import ExamAndQuiz from "./ExamAndQuiz";
import SalesData from "./SalesData";
import UserData from "./UserData";
import ComplaintsData from "./ComplaintsData";
import TasksData from "./TasksData";
const HomeTabes = () => {
  let Dates = new Date().toLocaleString();
  const [Sales, setSales] = useState();

  useEffect(() => {
    setSales("sales");
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-8 mb-4">
          <div className="row">
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "sales" ? "600" : "400",
                  color: Sales === "sales" ? "#33334d" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("sales")}
              >
                Sales
              </span>
            </div>
            <div className="col-3">
              <span
                style={{
                  fontWeight: Sales === "Exams" ? "600" : "400",
                  color: Sales === "Exams" ? "#33334d" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Exams")}
              >
                Exams & Quiz
              </span>
            </div>
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "Users" ? "600" : "400",
                  color: Sales === "Users" ? "#33334d" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Users")}
              >
                Users
              </span>
            </div>
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "Complaints" ? "600" : "400",
                  color: Sales === "Complaints" ? "#33334d" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Complaints")}
              >
                Complaints
              </span>
            </div>
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "pointer" ? "600" : "400",
                  color: Sales === "Tasks" ? "#33334d" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Tasks")}
              >
                Tasks
              </span>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="row" style={{ marginRight: "20px" }}>
            <div className="col-5"></div>

            <div
              className="col-7"
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
                22sep2022 : 22sep2022
              </span>
            </div>
          </div>
        </div>

        {/* start here */}
        <div className="row">
          <div className="col-8">
            <div className="row">
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "sales" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-3"
                style={{
                  borderBottom: Sales === "Exams" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "Users" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom:
                    Sales === "Complaints" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "Tasks" ? "2px solid #000000" : "",
                }}
              ></div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
        <hr />

        {/* <hr/> */}
      </div>
      {Sales === "sales" ? (
        <div>
          <SalesData />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Exams" ? (
        <div>
          <ExamAndQuiz />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Users" ? (
        <div>
          <UserData />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Complaints" ? (
        <div>
          <ComplaintsData />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Tasks" ? (
        <div>
          <TasksData />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default HomeTabes;
