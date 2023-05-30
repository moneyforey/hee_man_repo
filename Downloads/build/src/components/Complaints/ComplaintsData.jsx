import { useContext } from "react";
import NotificationIcon from "../../Img/pajamas_notifications.svg";
import Images from "../../Img/blank-profile-picture-973460__340.webp";
import ComplaintsHomeData from "./ComplaintsHomeData";
import { AuthContext } from "../Utils/AuthContextProvider";

const ComplaintsData = () => {
  const { logoutFun } = useContext(AuthContext);

  const notification = 40;

  return (
    <>
      <div
        className="row mt-3 mb-2 ms-1"
        style={{ overflowY: "none", postition: "fixed" }}
      >
        <div className="col-6">
          <div className="row ">
            <div className="col-12">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h5 className="pt-2">
                  Showing total<span style={{ color: "#cc1313" }}> 564 </span>
                  Complaints
                </h5>

                <button
                  className="ms-4"
                  style={{
                    backgroundColor: "#FFEDED",
                    border: "1px solid #cc1313",
                    color: "#cc1313",
                    padding: "8px 15px",
                    borderRadius: "8px",
                  }}
                >
                  +Create Ticket
                </button>
              </div>
            </div>
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

      <div className="row">
        <div className="col-12">
          <ComplaintsHomeData />
        </div>
      </div>
    </>
  );
};

export default ComplaintsData;
