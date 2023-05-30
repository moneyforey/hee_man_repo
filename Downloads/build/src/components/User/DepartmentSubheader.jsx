import React, { useState } from "react";
import { useParams } from "react-router-dom";
import OffCanvasforAddRoles1 from "./OffCanvasforAddRoles1";
import OffCanvasAddRoles2 from "./OffCanvasAddRoles2";
import OffcanvasAddRoles3 from "./OffcanvasAddRoles3";
import axios from "axios";
import OffCanvasAddRoles4 from "./OffCanvasAddRoles4";
import Offcanvas from "react-bootstrap/Offcanvas";

const initRole = {
  token: localStorage.getItem("token"),
  role_name: "",
  control_subcategory: [],
  department_id: "",
};

const DepartmentSubheader = ({
  addDepartments = "",
  no_of_departments = "",
  departmentName = "",
  createRole,
}) => {
  const [department, setDepartment] = useState("");
  const [current, setCurrent] = useState(0);
  const [acessControls, setAccessControls] = useState([]);
  const { id } = useParams();
  const [element, setElement] = useState([]);
  const [reqsub, setreqSub] = useState({});
  const [role, setRole] = useState(initRole);
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(15);

  //function for set show from the end offcanvas component
  const setShowFun = () => {
    setShow(false);
  };

  //function for setting role name from offcanvas1
  const setRoleName = (name) => {
    setRole({
      ...role,
      role_name: name,
      department_id: id,
    });
  };

  //function for adding control_subcategory array from offcanvas2
  const setControlSubCategory = () => {
    setRole({
      ...role,
      control_subcategory: JSON.stringify(element),
    });
  };

  // function for starttimer for the last offcanvas of add role
  const startTimer = () => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  };

  //conditions for close offcanvas while timer became 0
  if (timer === 0) {
    setShowFun();
    setTimer(15);
    return;
  }

  //function for adding the subpannel while checked the particular subpanel
  const handlesubpanelchange = (y, x) => {
    let newReq = {
      id: y,
      edit_status: x,
    };
    setreqSub({
      ...newReq,
    });
    const newEle = element.filter((el) => el.id !== y);
    setElement([...newEle, newReq]);
  };

  //function for removing the subpannel while checked the particular subpanel
  const handleRemoveSubpanel = (z) => {
    const newEle = element.filter((el) => el.id !== z);
    setElement([...newEle]);
  };

  //function for adding the subpannel while checked the particular panel
  const addSubpanelByChoosinPanel = (els) => {
    console.log(els);
    const reData = element.filter((el) => els.includes(el.id));
    console.log("reData", reData);
    const newEle = [...element, ...els];
    // setElement([...newEle]);
  };

  //function for removing the subpannel while checked the particular panel
  const removeSubPanelsByPanel = (els) => {
    //  console.log('els',els);
    const removedArray = element.filter((el) => !els.includes(el.id));
    console.log("rem", removedArray);
    // setElement([...removedArray])
  };

  // console.log(element);

  const setCurrentFun = (n) => {
    setCurrent(n + 1);
  };

  //function for getting panel for manipulations
  const getControlAccess = async () => {
    try {
      let res = await axios.post(
        `https://brainbucks.co.in/api/admin/get-controles-list`,
        {
          token: localStorage.getItem("token"),
        }
      );
      setAccessControls(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
          padding: "0 1rem 0 1rem",
        }}
      >
        {id ? (
          <>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "24px",
                lineHeight: "29px",
                Color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              {departmentName}
            </p>
            <button
              type="button"
              className="btn btn-light"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              style={{
                fontSize: 18,
                backgroundColor: "#EDF7FF",
                padding: "8px 17px",
                border: "1px solid #2188E7",
                borderRadius: 10,
                color: "#2188E7",
              }}
              onClick={() => setShow(true)}
            >
              +Add Role
            </button>
          </>
        ) : (
          <>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "24px",
                lineHeight: "29px",
                Color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              Showing total{" "}
              <span
                style={{
                  color: "#d33d3d",
                }}
              >
                {no_of_departments}
              </span>{" "}
              Departments
            </p>
            <button
              type="button"
              className="btn btn-light"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{
                fontSize: 18,
                backgroundColor: "#EDF7FF",
                padding: "8px 17px",
                border: "1px solid #2188E7",
                borderRadius: 10,
                color: "#2188E7",
              }}
            >
              +Add Department
            </button>
          </>
        )}
      </div>
      <hr
        style={{
          color: "#D9D9D9",
        }}
      />

      {/* modal for add department*/}

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              padding: "1rem",
            }}
          >
            <div
              className="modal-header"
              style={{
                border: "none",
              }}
            >
              <h5 className="modal-title" id="exampleModalLabel">
                Add Department
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <div>
                <h6>Enter name of Department</h6>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#efefef",
                    padding: ".5rem",
                    borderRadius: "5px",
                  }}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="start typing the name of Department"
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <br />
                  <p>{department.length}/100</p>
                </div>
              </div>

              <button
                disabled={department.length >= 1 ? false : true}
                onClick={() => addDepartments(department)}
                type="button"
                className="btn btn-primary"
              >
                +Create Department
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal end here */}

      {/* offcanvas for adding roles */}
      <Offcanvas
        show={show}
        placement="end"
        style={{ borderTopLeftRadius: 30, padding: 30, width: "50%" }}
      >
        {/* <div  style={{ borderTopLeftRadius: 30,padding:30 }}  className="offcanvas offcanvas-end w-50"  tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"> */}
        <Offcanvas.Header>
          <div style={{ display: current >= 3 ? "none" : "" }}>
            <span
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{ color: "#000", fontWeight: "600", cursor: "pointer" }}
              onClick={() => {
                setCurrent(0);
                setRole(initRole);
                setShow(false);
              }}
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M27.4913 9.40793C27.616 9.28337 27.7149 9.13547 27.7825 8.97267C27.85 8.80987 27.8849 8.63535 27.885 8.45909C27.8851 8.28283 27.8505 8.10827 27.7831 7.94539C27.7158 7.7825 27.617 7.63448 27.4924 7.50977C27.3679 7.38505 27.22 7.2861 27.0572 7.21854C26.8944 7.15099 26.7199 7.11617 26.5436 7.11606C26.3673 7.11595 26.1928 7.15056 26.0299 7.21791C25.867 7.28527 25.719 7.38404 25.5943 7.5086L17.4999 15.6029L9.40793 7.5086C9.15607 7.25673 8.81446 7.11523 8.45827 7.11523C8.10207 7.11523 7.76047 7.25673 7.5086 7.5086C7.25673 7.76047 7.11523 8.10207 7.11523 8.45827C7.11523 8.81446 7.25673 9.15607 7.5086 9.40793L15.6029 17.4999L7.5086 25.5919C7.38389 25.7166 7.28496 25.8647 7.21747 26.0276C7.14997 26.1906 7.11523 26.3652 7.11523 26.5416C7.11523 26.718 7.14997 26.8926 7.21747 27.0556C7.28496 27.2185 7.38389 27.3666 7.5086 27.4913C7.76047 27.7431 8.10207 27.8846 8.45827 27.8846C8.63464 27.8846 8.80928 27.8499 8.97222 27.7824C9.13517 27.7149 9.28322 27.616 9.40793 27.4913L17.4999 19.3969L25.5943 27.4913C25.8461 27.7428 26.1876 27.884 26.5436 27.8838C26.8996 27.8836 27.2409 27.742 27.4924 27.4901C27.744 27.2382 27.8852 26.8967 27.885 26.5408C27.8848 26.1848 27.7431 25.8435 27.4913 25.5919L19.3969 17.4999L27.4913 9.40793Z"
                  fill="black"
                />
              </svg>
            </span>
            <h3
              className="mt-2"
              style={{ marginLeft: "0px", fontWeight: "600", color: "#303030" }}
            >
              Add Role
            </h3>
          </div>
        </Offcanvas.Header>

        <div class="offcanvas-body">
          <OffCanvasforAddRoles1
            current={current}
            setCurrentFun={setCurrentFun}
            acessControlFun={getControlAccess}
            setRoleName={setRoleName}
          />

          <OffCanvasAddRoles2
            current={current}
            setCurrentFun={setCurrentFun}
            acessControls={acessControls}
            handlesubpanelchange={handlesubpanelchange}
            handleRemoveSubpanel={handleRemoveSubpanel}
            addSubpanelByChoosinPanel={addSubpanelByChoosinPanel}
            removeSubPanelsByPanel={removeSubPanelsByPanel}
            setControlSubCategory={setControlSubCategory}
          />

          <OffcanvasAddRoles3
            current={current}
            setCurrentFun={setCurrentFun}
            departmentName={departmentName}
            createRole={createRole}
            role={role}
            startTimer={startTimer}
          />

          <OffCanvasAddRoles4
            current={current}
            role={role}
            departmentName={departmentName}
            setShowFun={setShowFun}
            timer={timer}
          />
        </div>
        {/* </div> */}
      </Offcanvas>

      {/* offcanvas mapping end here */}
    </div>
  );
};

export default DepartmentSubheader;
