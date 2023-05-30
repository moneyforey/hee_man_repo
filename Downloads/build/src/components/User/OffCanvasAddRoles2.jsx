import React, { useState } from "react";
import AccesbilityPanelComp from "./AccesbilityPanelComp";

const OffCanvasAddRoles2 = ({
  current,
  setCurrentFun,
  acessControls,
  handlesubpanelchange,
  handleRemoveSubpanel,
  addSubpanelByChoosinPanel,
  setControlSubCategory,
  removeSubPanelsByPanel,
}) => {
  return (
    <>
      {/* first page here */}
      <div style={{ display: current === 1 ? "block" : "none" }}>
        <div className="mb-5">
          <div className="progress" style={{ height: "10px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: "66.66%",
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

              <div>
                <h5
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "29px",
                    color: "#303030",
                    textAlign: "left",
                  }}
                >
                  Manage Access Control
                </h5>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#1f1f1f",
                    color: "#a0aba9",
                    padding: "1rem",
                    borderRadius: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h6>Panels</h6>
                    <h6>Editing</h6>
                  </div>

                  <hr />
                  <div
                    style={{
                      height: "350px",
                      overflowY: "scroll",
                    }}
                  >
                    {acessControls?.map((el) => (
                      <AccesbilityPanelComp
                        key={el.id}
                        el={el}
                        handlesubpanelchange={handlesubpanelchange}
                        handleRemoveSubpanel={handleRemoveSubpanel}
                        addSubpanelByChoosinPanel={addSubpanelByChoosinPanel}
                        removeSubPanelsByPanel={removeSubPanelsByPanel}
                      />
                    ))}
                  </div>
                </div>

                <div></div>
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
              backgroundColor: "#2188E7",
              height: "40px",
              borderRadius: 7,
            }}
            onClick={() => {
             
              setCurrentFun(current);
              setControlSubCategory();
            }}
          >
            Proceed
          </button>
        </div>
      </div>
      {/* first page end here */}
    </>
  );
};

export default OffCanvasAddRoles2;
