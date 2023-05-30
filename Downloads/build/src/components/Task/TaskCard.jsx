import { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";

const TaskCard = () => {
  const [v1, setV1] = useState("Not Started");
  return (
    <div className="card mt-3" style={{ border: "none" }}>
      <div
        className="card-body"
        style={{ border: "1px solid gray", borderRadius: "8px" }}
      >
        <div className="row">
          <div className="col-3  d-flex flex-nowrap">
            <p className="pt-1 ">Upload 250 Questions for RAS</p>
          </div>

          <div className="col-2">
            {/* <span className=' pt-1' style={{float:'left'}}></span> */}

            <select
              className="form-select border-0"
              aria-label="Disabled select example"
              value={v1}
              style={{
                width: "150px",
                backgroundColor: `${
                  v1 === "Not Started" ? "#efefef" : "#edf7ff"
                }`,
                color: `${
                  v1 === "Not Started"
                    ? "#8A8A8A"
                    : v1 === "In Progress"
                    ? "#2188E7"
                    : "#2E8760"
                }`,
              }}
              onChange={(e) => setV1(e.target.value)}
            >
              <option
                style={{
                  width: "150px",
                  backgroundColor: "#efefef",
                  color: "#8A8A8A",
                }}
                value="Not Started"
              >
                Not Started
              </option>
              <option
                style={{
                  width: "150px",
                  backgroundColor: "#edf7ff",
                  color: "#2188E7",
                }}
                value="In Progress"
              >
                In Progress
              </option>
              <option
                style={{
                  width: "150px",
                  backgroundColor: "#edf7ff",
                  color: "#2E8760",
                }}
                value="Compleated"
              >
                Compleated
              </option>
            </select>
          </div>

          <div className="col-2">
            <p className=" pt-1">Manish Faujdar</p>
          </div>
          <div className="col-2">
            <p className="text-center pt-1"> 03-sep-2023</p>
          </div>

          <div className="col-2">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#2188E7",
                  border: "none",
                  padding: "5px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                View Details <BiRightArrowAlt />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
