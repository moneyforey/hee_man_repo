import { useContext, useEffect, useState } from "react";
import Chat7 from "../../Img/Rectangle.png";
import { CChart } from "@coreui/react-chartjs";
import { AuthContext } from "../Utils/AuthContextProvider";

const UserData = () => {
  const { state } = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState({});

  //required desturctured from the above states objects
  const { token } = state;

  const getEmployeeData = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: token,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/total-employees", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setEmployeeData(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getEmployeeData(token);
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
          <div className="col-ms-12 col-md-4 col-lg-2">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-10 container">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "11px",
                      lineHeight: "19px",
                      color: "#000",
                    }}
                  >
                    Total Users
                  </p>
                  <div className="row">
                    <div className="col-6">
                      <p
                        style={{
                          marginBottom: "8px !important",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "12px",
                          color: "#000",
                        }}
                      >
                        {employeeData?.total_employees}
                      </p>
                    </div>
                    <div className="col-6">
                      <p
                        style={{
                          marginBottom: "8px !important",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "12px",
                          color: "#2E8760",
                        }}
                      >
                        56.63%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-ms-12 col-md-4 col-lg-2">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-10 container">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "11px",
                      lineHeight: "19px",
                      color: "#000",
                    }}
                  >
                    Average Efficiency
                  </p>
                  <div className="row">
                    <div className="col-6">
                      <p
                        style={{
                          marginBottom: "8px !important",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "12px",
                          color: "#000",
                        }}
                      >
                        65%
                      </p>
                    </div>
                    <div className="col-6">
                      <p
                        style={{
                          marginBottom: "8px !important",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "12px",
                          color: "#CC1313",
                        }}
                      >
                        13.5%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-ms-12 col-md-4 col-lg-2">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-10 container">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "11px",
                      lineHeight: "19px",
                      color: "#000",
                    }}
                  >
                    Total Roles
                  </p>
                  <div className="row">
                    <div className="col-6">
                      <p
                        style={{
                          marginBottom: "8px !important",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "12px",
                          color: "#000",
                        }}
                      >
                       {employeeData?.total_roles}
                      </p>
                    </div>
                    <div className="col-6">
                      <p
                        style={{
                          marginBottom: "8px !important",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "12px",
                          color: "#8A8A8A",
                        }}
                      >
                        -0%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-ms-12 col-md-4 col-lg-2">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-10 container">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "11px",
                      lineHeight: "19px",
                      color: "#000",
                    }}
                  >
                    Total Departments
                  </p>
                  <div className="row">
                    <div className="col-6">
                      <p
                        style={{
                          marginBottom: "8px !important",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "12px",
                          color: "#000",
                        }}
                      >
                       {employeeData?.total_departments}
                      </p>
                    </div>
                    <div className="col-6">
                      <p
                        style={{
                          marginBottom: "8px !important",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "12px",
                          color: "#8A8A8A",
                        }}
                      >
                        -0%
                      </p>
                    </div>
                  </div>
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
                className="text-center mt-2"
                style={{
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "#000000",
                }}
              >
                Top Performer
              </p>
              <div className="container mt">
                <div className="row mt-1">
                  <div className="col-sm-12 col-md-3 col-lg-3">
                    <div>
                      <img
                        src={Chat7}
                        alt="hello"
                        style={{
                          width: "90%",
                          margin: "0px 0px 0px 0px",
                          borderRadius: "40px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-9 col-lg-9">
                    <p
                      style={{
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "16px",
                        ineHeight: "29px",
                        color: "#000000",
                      }}
                    >
                      Vishaka Shekhawat
                    </p>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#8A8A8A",
                      }}
                    >
                      Content Curator
                    </p>
                  </div>
                </div>
                <p
                  className="mt-1"
                  style={{
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "19px",
                    textAlign: "center",
                    color: "#8A8A8A",
                  }}
                >
                  Average Performance 65%{" "}
                  <span style={{ color: "#2E8760" }}>+13.56%</span>
                </p>
                <div className="container mb-2">
                  <button
                    type="button"
                    class="btn btn-primary"
                    style={{ width: "100%" }}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
            <div className="card mt-1" style={{ border: "1px solid ##D9D9D9" }}>
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
                Top Performer
              </p>
              <div className="container mt-2">
                <div className="row ">
                  <div className="col-sm-12 col-md-3 col-lg-3">
                    <div>
                      <img
                        src={Chat7}
                        alt="hello"
                        style={{
                          width: "90%",
                          margin: "0px 0px 0px 0px",
                          borderRadius: "40px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-9 col-lg-9">
                    <p
                      style={{
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "16px",
                        ineHeight: "29px",
                        color: "#000000",
                      }}
                    >
                      Nishant Kumar
                    </p>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#8A8A8A",
                      }}
                    >
                      Content Curator
                    </p>
                  </div>
                </div>
                <p
                  className="mt-1"
                  style={{
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "19px",
                    textAlign: "center",
                    color: "#8A8A8A",
                  }}
                >
                  Average Performance 15%{" "}
                  <span style={{ color: "#CC1313" }}>-13.56%</span>
                </p>
                <div className="container mb-2">
                  <button
                    type="button"
                    class="btn btn-primary"
                    style={{ width: "100%" }}
                  >
                    View Profile
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

export default UserData;
