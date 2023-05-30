import { useState } from "react";

import Chat from "../../Img/arrow-right.png";

import Chat3 from "../../Img/mdi_assignment-late.png";
import Chat4 from "../../Img/mdi_assignment-turned-in.png";
import Chat5 from "../../Img/fluent_status-24-filled.png";
import Chat6 from "../../Img/mdi_user_1.png";
import { CChart } from "@coreui/react-chartjs";
import PIchart from "./PIchart";

const initSeriesD = [44, 55, 41, 17];

const initOptionsD = {
  series: [44, 55, 13, 33, 10],
  labels: ["5", "4", "3", "2", "1"],
};

const TasksData = () => {
  const [options, setOption] = useState(initOptionsD);
  return (
    <>
      <div
        style={{
          height: "70vh",
          overflowY: "scroll",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-ms-12 col-md-8 col-lg-8">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-lg-6">
                    <div className="card">
                      <p className="text-center">Task Breakdown</p>

                      <PIchart options={options} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-lg-6">
                    <div className="container">
                      <div
                        className="card"
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #EFEFEF",
                          borderRadius: "5px",
                        }}
                      >
                        <div className="container">
                          <div className="row">
                            <div className="col-sm-12 col-lg-10">
                              <p
                                className="mt-3"
                                style={{
                                  fontStyle: "normal",
                                  fontWeight: "600",
                                  fontSize: "16px",
                                  color: "#303030",
                                }}
                              >
                                Total Tasks Assigned{" "}
                                <span style={{ color: "#CC1313" }}> 5698 </span>
                              </p>
                            </div>
                            <div className="col-sm-12 col-lg-2">
                              <img
                                src={Chat}
                                alt="hello"
                                style={{ width: "80%", margin: "13px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" mt-4">
                        <div className="row">
                          <div className="col-sm-12 col-lg-6">
                            <div className="card">
                              <div className="container">
                                <p
                                  style={{
                                    marginBottom: "1px",
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    color: "#303030",
                                  }}
                                >
                                  Not Started{" "}
                                  <span style={{ marginLeft: "10px" }}>
                                    {" "}
                                    <img
                                      src={Chat}
                                      alt="hello"
                                      style={{ width: "20%" }}
                                    />
                                  </span>
                                </p>
                                <p
                                  style={{
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: "#333333",
                                  }}
                                >
                                  596
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 col-lg-6">
                            <div className="card">
                              <div className="container">
                                <p
                                  style={{
                                    marginBottom: "1px",
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    color: "#303030",
                                  }}
                                >
                                  In-Progress{" "}
                                  <span style={{ marginLeft: "10px" }}>
                                    {" "}
                                    <img
                                      src={Chat}
                                      alt="hello"
                                      style={{ width: "20%" }}
                                    />
                                  </span>
                                </p>
                                <p
                                  style={{
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: "#2188E7",
                                  }}
                                >
                                  1056
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" mt-4">
                        <div className="row">
                          <div className="col-sm-12 col-lg-6">
                            <div className="card">
                              <div className="container">
                                <p
                                  style={{
                                    marginBottom: "1px",
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    color: "#303030",
                                  }}
                                >
                                  Over Due{" "}
                                  <span style={{ marginLeft: "10px" }}>
                                    {" "}
                                    <img
                                      src={Chat}
                                      alt="hello"
                                      style={{ width: "20%" }}
                                    />
                                  </span>
                                </p>
                                <p
                                  style={{
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: "#CC1313",
                                  }}
                                >
                                  596
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 col-lg-6">
                            <div className="card">
                              <div className="container">
                                <p
                                  style={{
                                    marginBottom: "1px",
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    color: "#303030",
                                  }}
                                >
                                  Completed{" "}
                                  <span style={{ marginLeft: "10px" }}>
                                    {" "}
                                    <img
                                      src={Chat}
                                      alt="hello"
                                      style={{ width: "20%" }}
                                    />
                                  </span>
                                </p>
                                <p
                                  style={{
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: "#21B867",
                                  }}
                                >
                                  596
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="card">
                      <CChart
                        type="line"
                        data={{
                          labels: [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                          ],
                          datasets: [
                            {
                              label: "My First dataset",
                              backgroundColor: "rgba(220, 220, 220, 0.2)",
                              borderColor: "rgba(220, 220, 220, 1)",
                              pointBackgroundColor: "rgba(220, 220, 220, 1)",
                              pointBorderColor: "#fff",
                              data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                            },
                            {
                              label: "My Second dataset",
                              backgroundColor: "rgba(151, 187, 205, 0.2)",
                              borderColor: "rgba(151, 187, 205, 1)",
                              pointBackgroundColor: "rgba(151, 187, 205, 1)",
                              pointBorderColor: "#fff",
                              data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-ms-12 col-md-4 col-lg-4">
              <div className="card" style={{ height: "39.5rem" }}>
                <div className="container">
                  <div className="row">
                    <div className="col-sm 12 col-lg-9">
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "20px",
                          color: "#303030",
                          float: "right",
                        }}
                      >
                        My Tasks
                      </p>
                    </div>
                    <div className="col-sm-12 col-lg-3">
                      <p
                        className="text-center mt-1"
                        style={{
                          background: "#EDF7FF",
                          borderRadius: "5px",
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "#2188E7",
                        }}
                      >
                        +Add
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-12 col-lg-3">
                      <span
                        style={{
                          borderBottom: "1px solid #000",
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "10px",
                          lineHeight: "19px",
                          color: "#000000",
                        }}
                      >
                        All
                      </span>
                    </div>
                    <div className="col-sm-12 col-lg-3">
                      <span
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "10px",
                          lineHeight: "19px",
                          color: "#8A8A8A",
                        }}
                      >
                        Not Started
                      </span>
                    </div>
                    <div className="col-sm-12 col-lg-3">
                      <span
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "10px",
                          lineHeight: "19px",
                          color: "#8A8A8A",
                        }}
                      >
                        In-Progress
                      </span>
                    </div>
                    <div className="col-sm-12 col-lg-3">
                      <span
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "10px",
                          lineHeight: "19px",
                          color: "#8A8A8A",
                        }}
                      >
                        Completed
                      </span>
                    </div>
                  </div>
                  <hr style={{ margin: "0px 0px !important" }}></hr>

                  <p
                    className="mt-3"
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "18px",
                      color: "#333333",
                    }}
                  >
                    Upload 250 Questions for RAS
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "16px",
                      color: "#333333",
                    }}
                  >
                    <span>
                      {" "}
                      <img src={Chat6} alt="hello" style={{ width: "6%" }} />
                    </span>{" "}
                    Abhishek Singhal
                  </p>
                  <div className="row">
                    <div className="col-sm-12 col-lg-1">
                      <img
                        src={Chat5}
                        alt="hello"
                        style={{ width: "1.2rem" }}
                      />
                    </div>
                    <div className="col-sm-12 col-lg-6">
                      <div style={{ width: "68%" }}>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          style={{
                            width: "86% !important",
                            backgroundColor: "#d6d6d6",
                            padding: "3px 8px",
                            fontSize: "13px",
                          }}
                        >
                          <option selected>Not Started</option>
                          <option value="1">Completed</option>
                          <option value="2">In Progress</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2" style={{ color: "#2E8760" }}>
                    <span>
                      <img src={Chat4} alt="hello" style={{ width: "6%" }} />
                    </span>
                    03-Sep-2022 | 12:30
                  </p>
                  <p className="mt-2" style={{ color: "#F63636" }}>
                    <span>
                      <img src={Chat3} alt="hello" style={{ width: "6%" }} />
                    </span>
                    03-Sep-2022 | 12:30
                  </p>

                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        style={{
                          width: "100%",
                          background: "#1F1F1F",
                          borderRadius: "10px",
                        }}
                      >
                        View Details
                      </button>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        style={{
                          width: "100%",
                          background: "rgb(243 242 242)",
                          borderRadius: "10px",
                          border: "none",
                          color: "#000",
                        }}
                      >
                        Modify
                      </button>
                    </div>
                  </div>
                </div>
                <hr></hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksData;
