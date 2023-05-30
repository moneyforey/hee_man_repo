import React from "react";
import Dlf10 from "../../Img/dlf10_g9gACcXlja.json";
import Lottie from "lottie-react";

const OffCanvasAddRoles4 = ({
  current,
  role,
  departmentName,
  setShowFun,
  timer,
}) => {
  return (
    <>
      <div style={{ display: current === 3 ? "block" : "none" }}>
        <div className="mb-5">
          <div className="row">
            <div style={{ justifyConetnt: "center", textAlign: "center" }}>
              {/* main content here */}

              <div
                style={{
                  textAlign: "center",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "36px",
                  lineSeight: "44px",
                  color: "#303030",
                  margin: "115px 100px 50px 100px",
                }}
              >
                <h4>
                  New Role{" "}
                  <span style={{ fontWeight: "600" }}>{role.role_name}</span>
                  <br />
                  added to{" "}
                  <span style={{ fontWeight: "600" }}>{departmentName}</span>
                </h4>

                <div
                  className="d-flex"
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                    marginTop: "-30px",
                  }}
                >
                  <Lottie
                    animationData={Dlf10}
                    style={{ width: "50%" }}
                  ></Lottie>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "",
          }}
        >
          <button
            className="col-5 border-0 text-white"
            onClick={() => setShowFun()}
            style={{
              backgroundColor: "#21b867",
              height: "40px",
              borderRadius: 7,
            }}
          >
            Back to Dashboard
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            color: "#afafaf",
          }}
        >
          This will automatically close in{" "}
          <span
            style={{
              color: "red",
            }}
          >
            {timer}
          </span>{" "}
          seconds
        </p>
      </div>
      {/* first page end here */}
    </>
  );
};

export default OffCanvasAddRoles4;
