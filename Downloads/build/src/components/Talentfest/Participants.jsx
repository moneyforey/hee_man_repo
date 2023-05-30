import React, { useState } from "react";
import SearchIcon from "../../Img/ri_search-line.svg";
import All from "./All";
import Unpaid from "./Unpaid";
import Paid from "./Paid";

import { RiFileExcel2Fill } from "react-icons/ri";

const Participants = () => {
  const [count, setcount] = useState("All");
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 ">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h6 className="pt-2" style={{ fontWeight: "600" }}>
              Showing total<span style={{ color: "#cc1313" }}> 523000</span>{" "}
              Participants
            </h6>

            <button
              className="ms-3"
              style={{
                color: "#2188e7",
                border: "1px solid #2188e7",
                padding: "8px 15px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              {" "}
              +Add Participants
            </button>
          </div>
        </div>

        <div className="col-6">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-6" style={{ backgroundColor: "#fff" }}>
              <div
                className="row"
                style={{
                  border: "1px solid #D9D9D9",
                  height: "40px",
                  borderRadius: "7px",
                }}
              >
                <div className="col-2 mt-2">
                  <img alt="SearchIcon" src={SearchIcon} />
                </div>
                <div className="col-10 mt-2 ">
                  <input
                    className="border-0 w-100"
                    placeholder="Search for Participant"
                    style={{
                      textDecoration: "none",
                      outline: "none",
                      color: "#272727",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-2">
              <button
                className="border-0 bg-white"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(35,176,101,1) 0%, rgba(46,135,96,1) 100%)",
                  color: "#fff",
                  height: "40px",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  marginLeft: "-20px",
                  padding: "10px 10px 10px 10px",
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-3 mt-3">
          <div
            style={{
              backgroundColor: "#f5f5f5",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "8px",
            }}
          >
            <span
              onClick={() => {
                setcount("All");
              }}
              style={{
                background: "linear-gradient(180deg, #21B867 0%, #188241 100%)",
                padding: "10px 12px",
                color: "#fff",
                borderRadius: "8px",
              }}
            >
              All
            </span>
            <span
              onClick={() => {
                setcount("Unpaid");
              }}
              style={{
                padding: "10px 12px",
                color: "#000",
                borderRadius: "8px",
              }}
            >
              Unpaid
            </span>
            <span
              onClick={() => {
                setcount("Paid");
              }}
              style={{
                padding: "10px 12px",
                color: "#000",
                borderRadius: "8px",
              }}
            >
              paid
            </span>
          </div>
        </div>

        <div className="col-2  mt-3">
          <div>
            <button
              style={{
                border: "1px solid #21B867",
                backgroundColor: "#fff",
                padding: "10px 15px",
                borderRadius: "8px",
                color: "#21B867",
              }}
            >
              {" "}
              <RiFileExcel2Fill className="me-2" style={{ color: "#21B867" }} />
              Export
            </button>
          </div>
        </div>

        <div className="col-4 mt-3"></div>

        <div className="col-3 mt-2">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p className="pt-3">Entries per page</p>

            <select
              class="form-select ms-3"
              aria-label="Default select example"
              style={{ width: "80px" }}
            >
              <option selected>50</option>
              <option value="1">100</option>
              <option value="2">200</option>
              <option value="3">500</option>
              <option value="4">100</option>
              <option value="5">All</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {count === "All" ? (
            <>
              {" "}
              <All />
            </>
          ) : (
            <> </>
          )}
          {count === "Unpaid" ? (
            <>
              <Unpaid />
            </>
          ) : (
            <></>
          )}
          {count === "Paid" ? (
            <>
              <Paid />
            </>
          ) : (
            <> </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Participants;
