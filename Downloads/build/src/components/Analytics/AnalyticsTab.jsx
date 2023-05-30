import { useState } from "react";
import Chart from "react-apexcharts";

var initOptions = {
  series: [44, 55, 41, 17, 15],
  chart: {
    type: "line",
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

const initSeries = [
  {
    name: "Credit",
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
  {
    name: "Debit",
    data: [80, 20, 52, 70, 60, 10, 70, 91],
  },
];

const initSeriesD = [44, 55, 41, 17];

const initOptionsD = {
  series: [44, 55, 13, 33],
  labels: ["Market", "Net Profit", "Prize", "Other"],
};

const initLabels = [, "B", "C", "D", "E"];

const AnalyticsTab = () => {
  const percentage = 50;
  const filColor = "#2188E7";
  const text = "20px";
  const s34 = "#fff";
  const s32 = "#303030";

  const [series, setSeries] = useState(initSeries);
  const [options, setOptions] = useState(initOptions);
  const [optionsd, setOptionsd] = useState(initOptionsD);
  const [seriesd, setSeriesd] = useState(initSeriesD);
  const [labels, setLabels] = useState(initLabels);

  return (
    <>
      <div
        className="row mt-1"
        style={{
          maxHeight: "70vh",
          overflowY: "scroll",
        }}
      >
        <div className="col-sm-12 col-md-8 col-lg-8">
          <div className="card">
            <Chart
              options={options}
              series={series}
              type="line"
              width="100%"
              height="370"
            />
          </div>
        </div>

        <div className="col-sm-12 col-md-4 col-lg-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-center" style={{ fontWeight: "600" }}>
                Revenue Breakdown
              </h5>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  className="mt-3"
                  label="Stroke width"
                  style={{ width: "35%", color: "#303030" }}
                >
                  <Chart
                    options={optionsd}
                    series={optionsd.series}
                    labels={labels}
                    type="donut"
                    width="380"
                  />

                  {/* <CircularProgressbarWithChildren style={{textAlign:'center'}}
value={80}
strokeWidth={26}
styles={buildStyles({
    pathColor: filColor, 
    strokeLinecap: "butt",
    trailColor: "#47BDFF", 
    textColor: s32,
})}>
<strong>55%</strong>
</CircularProgressbarWithChildren >
</div> */}
                </div>

                <div className="row mt-3">
                  <div className="col-6">
                    <div
                      style={{
                        border: "1px solid #efefef",
                        padding: "2px 3px",
                        borderRadius: "8px",
                      }}
                    >
                      <h6 style={{ textAlign: "center ", color: "#808080" }}>
                        {/* <img src={tok} alt="#" className='me-2' style={{width:'25px ', height:'25px'}}/> */}
                        Money - In
                        {"->"}
                        {/* <BsArrowRight className='ms-2' style={{color:'#000', fontSize:'22px'}}/>  */}
                      </h6>

                      <h6
                        className="text-center  "
                        style={{ color: "#000", fontWeight: "600" }}
                      >
                        ₹ 65,89,00,00,000
                      </h6>
                    </div>

                    <div className="mt-2">
                      <p
                        className="text-center d-flex"
                        style={{ alignItems: "center", gap: ".25rem" }}
                      >
                        {/* <img src={tok2} alt="#"/>  */}
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#008ffb",
                          }}
                        ></div>
                        Marketing
                      </p>
                      <p
                        className="text-center me-4 d-flex"
                        style={{ alignItems: "center", gap: ".25rem" }}
                      >
                        {/* <img src={tok3} alt="#"/>  */}
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#ff4560",
                          }}
                        ></div>
                        Other
                      </p>
                    </div>
                  </div>

                  <div className="col-6">
                    <div
                      style={{
                        border: "1px solid #efefef",
                        padding: "2px 3px",
                        borderRadius: "8px",
                      }}
                    >
                      <h6 style={{ textAlign: "center ", color: "#808080" }}>
                        {/* <img src={chart2} alt="#" className='me-2' style={{width:'30px ', height:'30px'}}/> */}
                        Money - Out
                        {/* <BsArrowRight className='ms-2' style={{color:'#000', fontSize:'22px'}}/>  */}
                        {"->"}
                      </h6>

                      <h6
                        className="text-center"
                        style={{ color: "#000", fontWeight: "600" }}
                      >
                        ₹ 12,85,00,00,000
                      </h6>
                    </div>

                    <div className="mt-2">
                      <p
                        className="text-center d-flex"
                        style={{ alignItems: "center", gap: ".25rem" }}
                      >
                        {/* <img src={tok4} alt="#"/>  */}
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#feb019",
                          }}
                        ></div>
                        Prize Pool
                      </p>

                      <p
                        className="text-center d-flex"
                        style={{ alignItems: "center", gap: ".25rem" }}
                      >
                        {/* <img src={tok5} alt="#"/>  */}
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#00e396",
                          }}
                        ></div>
                        Net Profit
                      </p>
                    </div>
                  </div>

                  <div
                    className="mt-1"
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

        <div className="row " style={{ marginTop: "-25px" }}>
          <h5>Projected Growth</h5>
          <div className="col-2">
            <div
              class="card"
              style={{ border: "none", borderLeft: "5px solid #2188E7" }}
            >
              <div
                class="card-body"
                style={{ lineHeight: "10px", backgroundColor: "#EFF8FF" }}
              >
                <h6 class="" style={{ fontWeight: "600" }}>
                  Revenue
                </h6>
                <p
                  class="card-text"
                  style={{ color: "#2188E7", fontWeight: "600" }}
                >
                  +456%
                </p>
                <p class="card-text" style={{ color: "#8a8a8a" }}>
                  CAGE%
                </p>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div
              class="card"
              style={{ border: "none", borderLeft: "5px solid #E72121" }}
            >
              <div
                class="card-body"
                style={{ lineHeight: "10px", backgroundColor: "#FFEFEF" }}
              >
                <h6 class="" style={{ fontWeight: "600" }}>
                  Marketing{" "}
                </h6>
                <p
                  class="card-text"
                  style={{ color: "#E72121", fontWeight: "600" }}
                >
                  +56%
                </p>
                <p class="card-text" style={{ color: "#8a8a8a" }}>
                  YOY
                </p>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div
              class="card"
              style={{ border: "none", borderLeft: "5px solid #2E8760" }}
            >
              <div
                class="card-body"
                style={{ lineHeight: "10px", backgroundColor: "#EFFFF1" }}
              >
                <h6 class="" style={{ fontWeight: "600" }}>
                  Profitability{" "}
                </h6>
                <p
                  class="card-text"
                  style={{ color: "#2E8760", fontWeight: "600" }}
                >
                  +5600%
                </p>
                <p class="card-text" style={{ color: "#8a8a8a" }}>
                  YOY
                </p>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div
              class="card"
              style={{ border: "none", borderLeft: "5px solid #E7C721" }}
            >
              <div
                class="card-body"
                style={{ lineHeight: "10px", backgroundColor: "#FFFDEF" }}
              >
                <h6 class="" style={{ fontWeight: "600" }}>
                  Performance{" "}
                </h6>
                <p
                  class="card-text"
                  style={{ color: "#E7C721", fontWeight: "600" }}
                >
                  -6%
                </p>
                <p class="card-text" style={{ color: "#8a8a8a" }}>
                  YOY
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsTab;
