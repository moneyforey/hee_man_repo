import  { useState } from "react";

const OffCanvasforAddRoles1 = ({
  current,
  setCurrentFun,
  acessControlFun,
  setRoleName,
}) => {
  const [role, setRole] = useState("");

  return (
    <>
      {/* first page here */}
      <div style={{ display: current === 0 ? "block" : "none" }}>
        <div className="mb-5">
          <div className="progress" style={{ height: "10px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: "33.33%",
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
              <div>
                <label
                  className="col-5 mb-2"
                  style={{
                    textAlign: "start",
                    color: "#303030",
                    fontWeight: "600",
                  }}
                >
                  Enter Role
                </label>
                <br />
                <input
                  className="col-5 border-0"
                  style={{
                    textAlign: "start",
                    height: "50px",
                    backgroundColor: "#EFEFEF",
                    borderRadius: 7,
                    outline: 1,
                  }}
                  placeholder="Start typing role name"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  type="text"
                  maxLength={100}
                />
                <br />
                <span style={{ marginLeft: "200px" }}>{role.length}/100</span>
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
            onClick={() => {
              setCurrentFun(current);
              acessControlFun();
              setRoleName(role);
            }}
            style={{
              backgroundColor: "#2188E7",
              height: "40px",
              borderRadius: 7,
            }}
            disabled={role.length >= 2 ? false : true}
          >
            Proceed
          </button>
        </div>
      </div>
      {/* first page end here */}
    </>
  );
};

export default OffCanvasforAddRoles1;
