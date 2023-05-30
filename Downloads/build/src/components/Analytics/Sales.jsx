import { useState } from "react";
import nato from "../../Img/noto.png";
import { BsArrowRight } from "react-icons/bs";
import Chat2 from "../../Img/Chart2.png";
import Chat from "../../Img/Chart2.png";
import Chat3 from "../../Img/Chat3.png";
import bin from "../../Img/bin.png";
import bin1 from "../../Img/bin1.png";
import Chart from "react-apexcharts";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const Sales = () => {
  const initOptions = {
    chart: {
      id: "bar",
    },
    stroke: {
      colors: ["red"],
      curve: "smooth",
      width: 1,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Jan 2021",
        "Feb 2021",
        "Mar 2021",
        "Apr 2021",
        "May 2021",
        "Jun 2021",
        "Jul 2021",
        "Aug 2021",
        "Sep 2021",
        "Oct 2021",
        "Nov 2021",
        "Dec 2021",
      ],
    },
  };

  const initSeries = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
    {
      name: "series-1",
      data: [80, 20, 52, 70, 60, 10, 70, 91],
    },
  ];

  const percentage = 50;
  const filColor = "#2188E7";
  const text = "20px";
  const s34 = "#fff";
  const s32 = "#303030";

  const [options, setOptions] = useState(initOptions);
  const [series, setSeries] = useState(initOptions);
  return (
    <>
      <div>
        <div className="row">
          <div className="col-ms-12 col-md-4 col-lg-4">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-3">
                  <img
                    src={nato}
                    alt="hello"
                    style={{ width: "70%", margin: "13px" }}
                  />
                </div>
                <div className="col-6">
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "13px",
                      lineHeight: "19px",
                      color: "#8A8A8A",
                    }}
                  >
                    Total Money In
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
                    ₹ 67,85,00,00,000
                  </p>
                </div>
                <div className="col-3 mt-4">
                  <BsArrowRight />
                </div>
              </div>
            </div>
          </div>
          <div className="col-ms-12 col-md-4 col-lg-4">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-3">
                  <img
                    src={Chat2}
                    alt="hello"
                    style={{ width: "70%", margin: "13px" }}
                  />
                </div>
                <div className="col-6">
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "13px",
                      lineHeight: "19px",
                      color: "#8A8A8A",
                    }}
                  >
                    Total Money Out
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
                    ₹ 12,85,00,00,000
                  </p>
                </div>
                <div className="col-3 mt-4">
                  <BsArrowRight />
                </div>
              </div>
            </div>
          </div>
          <div className="col-ms-12 col-md-4 col-lg-4">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-3">
                  <img
                    src={Chat3}
                    alt="hello"
                    style={{ width: "70%", margin: "13px" }}
                  />
                </div>
                <div className="col-6">
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "13px",
                      lineHeight: "19px",
                      color: "#8A8A8A",
                    }}
                  >
                    Total Amount Remaining
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
                    ₹ 55,85,00,00,000
                  </p>
                </div>
                <div className="col-3 mt-4">
                  <BsArrowRight />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-sm-12 col-md-8 col-lg-8">
            <div className="card">
              <Chart
                options={options}
                series={series}
                type="line"
                width="100%"
                height="380"
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">App Downloads</h5>
                <p
                  class="card-subtitle mb-2 text-muted text-center pt-2"
                  style={{ fontWeight: "600", fontSize: "14px" }}
                >
                  Total App Downloads{" "}
                  <span style={{ color: "#2E8760" }}>68,52,156</span>
                </p>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    className="mt-3"
                    label="Stroke width"
                    style={{ width: "35%", color: "#303030" }}
                  >
                    <CircularProgressbarWithChildren
                      style={{ textAlign: "center" }}
                      value={80}
                      strokeWidth={26}
                      styles={buildStyles({
                        pathColor: filColor,
                        strokeLinecap: "butt",
                        trailColor: "#47BDFF",
                        textColor: s32,
                      })}
                    >
                      {/* <RadialSeparators
             count={4}
             style={{
               background: "#292929",
               width: "1px", 
               height: `${10}%`
              
             }}
           /> */}
                      <strong>55%</strong>
                    </CircularProgressbarWithChildren>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-6">
                    <p style={{ textAlign: "center " }}>
                      <img src={bin} alt="" /> Android{" "}
                      <span style={{ color: "#2E8760" }}> +12.36% </span>
                    </p>

                    <h6
                      className="text-center  "
                      style={{ color: "#000", fontWeight: "600" }}
                    >
                      45,00,000
                    </h6>
                  </div>

                  <div className="col-6">
                    <p style={{ textAlign: "center " }}>
                      <img src={bin1} alt="" /> iOS{" "}
                      <span style={{ color: "#2E8760" }}> -2.36% </span>
                    </p>
                    <h6
                      className="text-center  "
                      style={{ color: "#000", fontWeight: "600" }}
                    >
                      18,52,156
                    </h6>
                  </div>

                  <div
                    className="mt-3"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      type="btn"
                      style={{
                        border: "1px solid #2188E7",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        width: "100%",
                        color: "#2188E7",
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
    </>
  );
};

export default Sales;
