const OffcanvasAddRoles3 = ({
  current,
  setCurrentFun,
  createRole,
  departmentName,
  startTimer,
  role,
}) => {
  return (
    <>
      {/* first page here */}
      <div style={{ display: current === 2 ? "block" : "none" }}>
        <div className="mb-5">
          <div className="progress" style={{ height: "10px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: "100%",
                background:
                  "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <p style={{ color: "#8A8A8A" }}>
            {current + 1}/3 <span sytle={{ color: "red" }}>Steps</span>
          </p>

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
                <h3>
                  New Role{" "}
                  <span
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {role.role_name}
                  </span>
                  <br />
                  will be added to{" "}
                  <span
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    Roles in
                    <br />
                    {departmentName}
                  </span>
                </h3>
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
            style={{
              backgroundColor: "#21b867",
              height: "40px",
              borderRadius: 7,
            }}
            onClick={() => {
              setCurrentFun(current);
              createRole(role);
              startTimer();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
      {/* first page end here */}
    </>
  );
};

export default OffcanvasAddRoles3;
