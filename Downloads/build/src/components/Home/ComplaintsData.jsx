import { useState } from "react";

import Chat from "../../Img/arrow-right.png";

import Chat7 from "../../Img/Rectangle.png";
// import { CChart } from "@coreui/react-chartjs";
import PIchart from "./PIchart";
import ComplainCard from "./ComplainCard";
import StarComponent from "./StarComponent";

const initSeriesD = [44, 55, 41, 17];

const initOptionsD = {
  series: [44, 55, 13, 33, 10],
  labels: ["5", "4", "3", "2", "1"],
};

const ComplaintsData = () => {
  const [options, setOption] = useState(initOptionsD);
  const checkedgold = {
    color: "#FF8E09",
    fontSize: "2rem",
    marginRight: "10px",
  };

  const checkedgoldSmall = {
    color: "#FF8E09",
    fontSize: "1rem",
    marginRight: "10px",
  };

  const checkedgold1Small = {
    color: "#EFEFEF",
    fontSize: "1rem",
    marginRight: "10px",
  };
  const checkedgold1 = {
    color: "#EFEFEF",
    fontSize: "2rem",
    marginRight: "10px",
  };
  const checked = {
    color: "#2E8760",
  };
  const checked1 = {
    color: "#EFEFEF",
  };

  return (
    <>
      <div
        style={{
          height: "75vh",
          overflowY: "scroll",
        }}
      >
        <div className="row">
          <div className="col-ms-12 col-md-3 col-lg-2">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-8 container">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "12px",
                      lineHeight: "19px",
                      color: "#000",
                    }}
                  >
                    Open
                  </p>
                  <p
                    style={{
                      marginBottom: "7px !important",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#CC1313",
                    }}
                  >
                    5658
                  </p>
                </div>
                <div className="col-3">
                  <img
                    src={Chat}
                    alt="hello"
                    style={{ width: "80%", marginTop: "30px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-ms-12 col-md-3 col-lg-2">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-8 container">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "12px",
                      lineHeight: "19px",
                      color: "#000",
                    }}
                  >
                    In Progress
                  </p>
                  <p
                    style={{
                      marginBottom: "7px !important",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#2188E7",
                    }}
                  >
                    5658
                  </p>
                </div>
                <div className="col-3">
                  <img
                    src={Chat}
                    alt="hello"
                    style={{ width: "80%", marginTop: "30px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-ms-12 col-md-3 col-lg-2">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-8 container">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "12px",
                      lineHeight: "19px",
                      color: "#000",
                    }}
                  >
                    Closed
                  </p>
                  <p
                    style={{
                      marginBottom: "7px !important",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#2E8760",
                    }}
                  >
                    565
                  </p>
                </div>
                <div className="col-3">
                  <img
                    src={Chat}
                    alt="hello"
                    style={{ width: "80%", marginTop: "30px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-4 ">
          <div className="row">
            <div className="col-sm-12 col-md-4 col-4">
              <div
                className="card"
                style={{ background: "#F1F5FF", borderRadius: "12px" }}
              >
                <p
                  className="text-center mt-2"
                  style={{
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#303030",
                  }}
                >
                  Latest Feedbacks
                </p>

                <div
                  className="mb-4"
                  style={{
                    maxHeight: "42vh",
                    overflow: "scroll",
                  }}
                >
                  <ComplainCard />
                  <ComplainCard />

                  <ComplainCard />
                  <ComplainCard />
                </div>
                <button className="border-0 btn btn-primary m-2 ">
                  View More
                </button>
              </div>
            </div>

            <div className="col-sm-12 col-md-4 col-4">
              <div
                className="card"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #D9D9D9",
                  borderRadius: "12px",
                }}
              >
                <p
                  className="text-center mt-2"
                  style={{
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "20px",
                    lineHeight: "29px",
                    color: "#303030",
                  }}
                >
                  User Feedback Breakdown
                </p>
                <PIchart options={options} />

                {options.labels?.map((el) => (
                  <div
                    className="text-center d-flex "
                    style={{
                      alignItems: "center",
                      gap: ".5rem",
                      marginLeft: "30px",
                    }}
                  >
                    {
                      <>
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: "green",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <StarComponent el={el} />
                        <span>{options.series[5 - el]}</span>
                      </>
                    }
                  </div>
                ))}
              </div>
            </div>

            <div className="col-sm-12 col-md-4 col-4">
              <div
                className="card"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #D9D9D9",
                  borderRadius: "12px",
                }}
              >
                <p
                  className="text-center mt-4"
                  style={{
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "20px",
                    lineHeight: "29px",
                    color: "#303030",
                  }}
                >
                  Average User Rating
                </p>
                <div className="text-center">
                  <span className="fa fa-star" style={checkedgold}></span>
                  <span className="fa fa-star " style={checkedgold}></span>
                  <span className="fa fa-star " style={checkedgold}></span>
                  <span className="fa fa-star" style={checkedgold1}></span>
                  <span className="fa fa-star" style={checkedgold1}></span>
                </div>
                <div className="container">
                  <p
                    className="text-center mt-3"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      color: "#303030",
                    }}
                  >
                    3.0/5
                  </p>
                  <p
                    className="mt-4"
                    style={{
                      marginLeft: "2rem",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "20px",
                      color: "#303030",
                    }}
                  >
                    Result :{" "}
                    <span
                      style={{
                        background: "#E7F3FF",
                        borderRadius: "8px",
                        padding: "9px 30px",
                        color: "#2188E7",
                      }}
                    >
                      Average
                    </span>
                  </p>
                  <button
                    type="button"
                    class="btn btn-success mt-2 mb-2"
                    style={{
                      width: "100%",
                      background:
                        "linear-gradient(180deg, #21B867 0%, #188241 100%)",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div
                className="card mt-3"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #D9D9D9",
                  borderRadius: "12px",
                }}
              >
                <p
                  className="text-center mt-3"
                  style={{
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "20px",
                    lineHeight: "29px",
                    color: "#303030",
                  }}
                >
                  Net Promoter’s Score ( NPS )
                </p>
                <div className="row mt-3">
                  <div className="col-6"></div>
                  <div className="col-6">
                    <div className="container">
                      <button
                        type="button"
                        class="btn btn-success mt-2 mb-2"
                        style={{
                          padding: "10px 25px",
                          background: "#FFFFFF",
                          border: "1px solid #2E8760",
                          borderRadius: "8px",
                          color: "#23B065",
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintsData;
