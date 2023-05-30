import { useState, useEffect, useContext } from "react";
import SearchIcon from "../../Img/ri_search-line.svg";
import NotificationIcon from "../../Img/pajamas_notifications.svg";
import Images from "../../Img/blank-profile-picture-973460__340.webp";
import Overview from "./Overview";
import { AuthContext } from "../Utils/AuthContextProvider";
import Transitions from "./Transitions";
import Expenses from "./Expenses";
import InCome from "./InCome";

const SalesData = () => {
  const { logoutFun } = useContext(AuthContext);
  let notification = 40;
  let Dates = new Date().toLocaleString();
  console.log(Dates);
  const [Sales, setSales] = useState();

  useEffect(() => {
    setSales("Overview");
  }, []);

  return (
    <div>
      <div
        className="row mt-3 mb-2 ms-1"
        style={{ overflowY: "none", postition: "fixed" }}
      >
        <div className="col-6">
          <div className="row">
            <div className="col-8" style={{ backgroundColor: "#fff" }}>
              <div
                className="row"
                style={{
                  border: "1px solid #D9D9D9",
                  height: "40px",
                  borderRadius: "7px",
                }}
              >
                <div className="col-2 mt-1">
                  <img alt="SearchIcon" src={SearchIcon} />
                </div>
                <div className="col-10 mt-1" style={{ marginLeft: "-20px" }}>
                  <input
                    className="border-0 w-100"
                    placeholder="Search within Sales"
                    style={{
                      textDecoration: "none",
                      outline: "none",
                      color: "#272727",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
        <div className="col-6">
          <div
            className="d-flex"
            style={{
              justifyContent: "end",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <div
              className="d-flex"
              style={{
                width: "80px",
                height: "40px",
                borderRadius: 20,
                border: "1px solid #D9D9D9",
                justifyContent: "center",
                backgroundColor: "#F5F5F5",
              }}
            >
              <div className="mt-1">
                <img alt="#" src={NotificationIcon} />
              </div>
              <div
                className="ms-3"
                style={{
                  width: "35px",
                  marginTop: "1px",
                  height: "35px",
                  borderRadius: "50%",
                  border: "1px solid #D9D9D9",
                  justifyContent: "center",
                  backgroundColor: "#CC1313",
                }}
              >
                <p
                  style={{
                    justifyContent: "center",
                    marginTop: "5px",
                    justifyItems: "center",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  {notification} +{" "}
                </p>
              </div>
            </div>
            <div
              className="d-flex ms-4"
              style={{ justifyContent: "space-between", marginRight: "30px" }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img alt="" src={Images} width="100%" />
              </div>
              <div class="nav-item dropdown ms-2 mt-2 ">
                <span
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></span>
                <ul class="dropdown-menu" style={{ backgroundColor: "#000" }}>
                  <li class="dropdown-item text-white">View Profile</li>
                  <hr style={{ color: "#fff" }} />
                  <li class="dropdown-item text-white">View Task</li>
                  <hr style={{ color: "#fff" }} />
                  <li class="dropdown-item text-white">
                    <span onClick={() => logoutFun()}>Log-Out</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-9 mb-4">
          <div className="row">
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "Overview" ? "600" : "400",
                  color: Sales === "Overview" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Overview")}
              >
                Overview
              </span>
            </div>
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "Insights" ? "600" : "400",
                  color: Sales === "Insights" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Insights")}
              >
                Insights
              </span>
            </div>
            <div className="col-3">
              <span
                style={{
                  fontWeight: Sales === "Transactions" ? "600" : "400",
                  color: Sales === "Transactions" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Transactions")}
              >
                Latest Transactions
              </span>
            </div>
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "Expenses" ? "600" : "400",
                  color: Sales === "Expenses" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Expenses")}
              >
                Expenses
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


        
        <div className="row">
          <div className="col-9">
            <div className="row">
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "Overview" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "Insights" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-3"
                style={{
                  borderBottom:
                    Sales === "Transactions" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "Expenses" ? "2px solid #000000" : "",
                }}
              ></div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
        <hr />
      </div>



      {Sales === "Overview" ? (
        <div>
          <Overview />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Insights" ? (
        <div>
          <InCome />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Transactions" ? (
        <div>
          <Transitions />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Expenses" ? (
        <div>
          <Expenses />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SalesData;
