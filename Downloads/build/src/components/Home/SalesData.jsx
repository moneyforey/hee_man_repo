import React, { useState, useEffect } from "react";
import Chat1 from "../../Img/mouth-face.png";
import Chat from "../../Img/arrow-right.png";
import Chat2 from "../../Img/money-bag.png";
import Chat3 from "../../Img/money-bag.png";
import Chat4 from "../../Img/card.png";
import Chat5 from "../../Img/card1.png";
import Chat6 from "../../Img/card2.png";
import { CChart } from "@coreui/react-chartjs";

const SalesData = () => {
  const [first, setfirst] = useState("");
  const [first1, setfirst1] = useState("");
  const [first2, setfirst2] = useState("");
  const [less_balance, setLessbalance] = useState("");

  const Api = (Token) => {
    var formdata = new FormData();
    formdata.append("token", Token);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(
      "https://brainbucks.co.in/api/admin/total-amount-dashboard",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "001") {
          // console.log(result);
          setfirst(result.total_credit);
          setfirst1(result.total_debit);
          setfirst2(result.total_remaining);
          setLessbalance(result.less_balance);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    Api(localStorage.getItem("token"));
  }, []);

  return (
    <>
      <div
        style={{
          height: "70vh",
          overflowY: "scroll",
        }}
      >
        <div className="row">
          <div className="col-ms-12 col-md-4 col-lg-4">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-3">
                  <img
                    src={Chat1}
                    alt="hello"
                    style={{ width: "70%", margin: "13px" }}
                  />
                </div>
                <div className="col-6">
                  <p
                    className="mt-2"
                    style={{
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
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#333333",
                    }}
                  >
                    ₹ {first}
                  </p>
                </div>
                <div className="col-3">
                  <img
                    src={Chat}
                    alt="hello"
                    style={{ width: "50%", marginTop: "20px" }}
                  />
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
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#333333",
                    }}
                  >
                    ₹ {first1}
                  </p>
                </div>
                <div className="col-3">
                  <img
                    src={Chat}
                    alt="hello"
                    style={{ width: "50%", marginTop: "20px" }}
                  />
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
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#333333",
                    }}
                  >
                    ₹ {first2}
                  </p>
                </div>
                <div className="col-3">
                  <img
                    src={Chat}
                    alt="hello"
                    style={{ width: "50%", marginTop: "20px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-sm-12 col-md-8 col-lg-8">
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
          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="card" style={{ border: "1px solid ##D9D9D9" }}>
              <p
                className="text-center mt-1"
                style={{
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "#000000",
                }}
              >
                Insights
              </p>
              <div className="row mt-1">
                <div className="col-sm-12 col-md-3 col-lg-3">
                  <img
                    src={Chat4}
                    alt="hello"
                    style={{ width: "70%", margin: "0px 0px 10px 10px" }}
                  />
                </div>
                <div className="col-sm-12 col-md-7 col-lg-6">
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      color: "#8A8A8A",
                      marginBottom: "1px !important",
                    }}
                  >
                    Wallets less than ₹ 100
                  </p>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#333333",
                    }}
                  >
                    {less_balance}
                  </p>
                </div>
                <div className="col-sm-12 col-md-3 col-lg-3">
                  <p
                    style={{
                      background: "#EFFCF4",
                      marginRight: "10px",
                      borderRadius: "4px",
                      padding: "2px",
                    }}
                  >
                    +152%
                  </p>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-sm-12 col-md-3 col-lg-3">
                  <img
                    src={Chat5}
                    alt="hello"
                    style={{ width: "70%", margin: "0px 0px 10px 10px" }}
                  />
                </div>
                <div className="col-sm-12 col-md-7 col-lg-6">
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      color: "#8A8A8A",
                      marginBottom: "1px !important",
                    }}
                  >
                    Revenue MOM Growth Rate
                  </p>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#333333",
                    }}
                  >
                    12%
                  </p>
                </div>
                <div className="col-sm-12 col-md-3 col-lg-3">
                  <p
                    style={{
                      background: "#FCEFEF",
                      marginRight: "10px",
                      borderRadius: "4px",
                      padding: "2px",
                    }}
                  >
                    -12%
                  </p>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-sm-12 col-md-3 col-lg-3">
                  <img
                    src={Chat6}
                    alt="hello"
                    style={{ width: "70%", margin: "0px 0px 10px 10px" }}
                  />
                </div>
                <div className="col-sm-12 col-md-7 col-lg-6">
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      color: "#8A8A8A",
                      marginBottom: "1px !important",
                    }}
                  >
                    Revenue YOY Growth Rate
                  </p>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#333333",
                    }}
                  >
                    54%
                  </p>
                </div>
                <div className="col-sm-12 col-md-3 col-lg-3">
                  <p
                    style={{
                      background: "#EFFCF4",
                      marginRight: "10px",
                      borderRadius: "4px",
                      padding: "2px",
                    }}
                  >
                    +12%
                  </p>
                </div>
              </div>
              <div>
                <div className="container mb-2">
                  <button
                    type="button"
                    class="btn btn-primary"
                    style={{ width: "100%" }}
                  >
                    View Details in Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesData;
