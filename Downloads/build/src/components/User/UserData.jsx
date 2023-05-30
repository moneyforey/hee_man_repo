import React, { useEffect, useState } from "react";
import { BiFilter } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import "./userdata.css";
import Just from "../../Img/Just.svg";
import Just1 from "../../Img/Just1.svg";
import { MdEmail } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import State from "../../Img/state.svg";
import { GiModernCity } from "react-icons/gi";
import { FaMapPin } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { ImHome3 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ImWhatsapp } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserCard from "./UserCard";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Spinner } from "react-bootstrap";
import data from "./CountryData.json";
import LoaderComponent from "../Utils/LoaderComponent";

// user before fill the form
const initUser = {
  name: "",
  qualification: "",
  institute_name: "",
  contact: "",
  emergency_contact: "",
  email: "",
  dob: "",
  resume: "",
  father_name: "",
  father_profession: "",
  father_intuition: "",
  father_contact: "",
  father_whatsapp: "",
  father_email: "",
  father_dob: "",
  mother_name: "",
  mother_profession: "",
  mother_intuition: "",
  mother_contact: "",
  mother_whatsapp: "",
  mother_email: "",
  mother_dob: "",
  country: "",
  state: "",
  city: "",
  pincode: "",
  locality: "",
  flat_number: "",
  department_id: "",
  role_id: "",
  salary: "",
  token: localStorage.getItem("token"),
};

const initLoading = {
  isLoading: false,
  isError: false,
};

const UserData = () => {
  const [user, setUser] = useState(initUser);
  const [Value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [departments, setDeparments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [noofUsers, setNoOfUsers] = useState(0);
  const [timer, setTimer] = useState(2);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selctCountry, setSelectCountry] = useState({});
  const [selectState, setSelectState] = useState([]);
  const { country_and_states } = data;
  const [loader, setLoader] = useState(initLoading);
  const { isLoading, isError } = loader;

  const {
    name,
    qualification,
    institute_name,
    contact,
    emergency_contact,
    email,
    dob,
    resume,
    father_name,
    father_profession,
    father_intuition,
    father_contact,
    father_whatsapp,
    father_email,
    father_dob,
    mother_name,
    mother_profession,
    mother_intuition,
    mother_contact,
    mother_whatsapp,
    mother_email,
    mother_dob,
    country,
    state,
    city,
    pincode,
    locality,
    flat_number,
    department_id,
    role_id,
    salary,
    token,
  } = user;

  // function for navigation
  const navigatetoDepartment = () => {
    navigate("/department");
  };

  const Validate = () => {
    if (Value === 0) {
      if (
        name == "" ||
        qualification == "" ||
        institute_name == "" ||
        contact == "" ||
        emergency_contact == "" ||
        email == "" ||
        dob == "" ||
        resume == "" 
      ) {
        toast("fill all the fields");
      } else {
        setValue((prev) => prev + 1);
      }
    } else if (Value === 1) {
      if (
        father_name == "" ||
        father_profession == "" ||
        father_intuition == "" ||
        father_contact == "" ||
        father_whatsapp == "" ||
        father_email == "" ||
        father_dob == "" ||
        mother_name == "" ||
        mother_profession == "" ||
        mother_intuition == "" ||
        mother_contact == "" ||
        mother_whatsapp == "" ||
        mother_email == "" ||
        mother_dob == ""
      ) {
        toast("Please fill all the fields");
      } else {
        setValue((prev) => prev + 1);
        setSelectCountry(country_and_states.country);
      }
    } else if (Value === 2) {
      if (
        country == "" ||
        state == "" ||
        city == "" ||
        pincode == "" ||
        locality == "" ||
        flat_number == ""
      ) {
        toast("Please fill all the fields");
      } else {
        setValue((prev) => prev + 1);
      }
    } else if (Value === 3) {
      if (department_id == "" || role_id == "" || salary == "") {
        toast("Please fill all the fields");
      } else {
        let res = addUser();
        console.log("response after sucessfull added ", res);
        if (res === 1) {
          setShow(false);
          setUser(initUser);
        }
      }
    }
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

  //for getting all the users
  const getUsers = async () => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    try {
      let res = await axios.post(
        `https://brainbucks.co.in/api/admin/get-users`,
        {
          token: localStorage.getItem("token"),
        }
      );
      console.log(res.data);
      if (res.data.status === 1) {
        setUsers(res.data.data);
        setNoOfUsers(res.data.data.length);
        setLoader({
          ...loader,
          isLoading: false,
        });
      } else {
        setLoader({
          ...loader,
          isLoading: false,
        });
      }
    } catch (err) {
      console.log(err);
      setLoader({
        ...loader,
        isLoading: false,
      });
    }
  };

  // function for change data in inputs
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    type === "file"
      ? setUser({
          ...user,
          [name]: files[0],
        })
      : setUser({
          ...user,
          [name]: value,
        });
  };

  //function for get departments
  const getDepartments = async () => {
    try {
      let res = await axios.post(
        "https://brainbucks.co.in/api/admin/get-departments-roles",
        {
          token: localStorage.getItem("token"),
        }
      );
      setDeparments(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //function for handle state on the basis of selected of country
  const handleSelectedCountry = (e) => {
    const { value } = e.target;
    const { states } = country_and_states;
    // console.log(value,className,key);
    let countrycode = value.split("(")[1].slice(0, -1);
    const slectedState = states[countrycode];
    setSelectState([...slectedState]);
  };

  //function for get departments
  const getRoles = async (id) => {
    try {
      let res = await axios.post(
        "https://brainbucks.co.in/api/admin/get-departments-roles",
        {
          token: localStorage.getItem("token"),
          id: id,
        }
      );
      // console.log(res.data.dta);
      setRoles(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // function for final creation of user
  const addUser = async () => {
    var formdata = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formdata.append(key, value);
    });
    setLoading(true);
    try {
      let res = await axios.post(
        `https://brainbucks.co.in/api/admin/add-user`,
        formdata
      );

      if (res.data.status === 1) {
        setLoading(false);
        setError(false);
        toast(res.data.message);
        setShow(false);
      } else {
        setLoading(false);
        setError(true);
        toast(res.data.message);
      }

      return res.data.status;
    } catch (err) {
      setError(true);
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="row pb-3">
        <div className="col-lg-4 col-sm-12">
          <h2 className="mt-4">
            Showing total
            <span style={{ color: "#cc1313", fontWeight: 600 }}>
              {" "}
              {noofUsers}{" "}
            </span>
            Users
          </h2>
        </div>

        <div className="col-lg-2 col-sm-12">
          <button
            type="button"
            className=" mt-4"
            style={{
              fontSize: 18,
              backgroundColor: "#EFEFEF",
              padding: "8px 17px",
              border: "none",
              borderRadius: 10,
            }}
          >
            <BiFilter /> Filters
          </button>
        </div>

        <div className="col-lg-2 col-sm-12"></div>

        <div className="col-lg-1 col-sm-12">
          <button
            type="button"
            className=" mt-4"
            style={{
              fontSize: 18,
              backgroundColor: "#EDF7FF",
              padding: "8px 17px",
              border: "1px solid #2188E7",
              borderRadius: 10,
              color: "#2188E7",
            }}
            onClick={navigatetoDepartment}
          >
            Departments
          </button>
        </div>

        <div className="col-lg-1 col-sm-12"></div>

        <div className="col-lg-2 col-sm-12">
          <button
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            onClick={() => setShow(true)}
            className=" mt-4"
            style={{
              fontSize: 18,
              backgroundColor: "#2F8460",
              padding: "8px 17px",
              border: "none",
              borderRadius: 10,
              color: "#fff",
            }}
          >
            + Add User
          </button>
        </div>
      </div>

      {/* offcanvas start  */}

      <Offcanvas
        show={show}
        placement="end"
        style={{
          width: "60%",
          borderTopLeftRadius: "20px",
          overflow: "hidden",
        }}
      >
        <Offcanvas.Header
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1.5rem",
            margin: "1rem",
            marginBottom: ".25rem",
          }}
        >
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              setValue(0);
              setUser(initUser);
              setShow(false);
            }}
          ></button>
          <h5 id="offcanvasRightLabel" style={{ fontWeight: 600 }}>
            Add User
          </h5>
        </Offcanvas.Header>
        <div className="offcanvas-body">
          {/* <arrow steps start */}

          <div className="container">
            <div className="wrapper">
              <div
                className="arrow-steps clearfix"
                style={{ position: "fixed", zIndex: 1 }}
              >
                <div className={Value >= 0 ? "step current" : "step"}>
                  <span> Personal Details</span>
                </div>
                <div className={Value >= 1 ? "step current" : "step"}>
                  <span>Family Details</span>
                </div>
                <div className={Value >= 2 ? "step current" : "step"}>
                  <span> Residential Details</span>
                </div>
                <div className={Value >= 3 ? "step current" : "step"}>
                  <span>Role Assigning</span>
                </div>
              </div>
            </div>
          </div>

          {Value === 0 ? (
            <>
              <div className="col-lg-12 col-sm-12 my-5">
                <div className="d-flex mx-5" style={{ backgroundColor: "" }}>
                  <span style={{ marginTop: "30px" }}>
                    <FaUserAlt style={{ color: "#eee" }} />
                  </span>
                  <input
                    placeholder="Enter Your Name"
                    className="mt-4 w-100"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    style={{
                      padding: "8px 12px",
                      color: "#000",
                      width: "100%",
                      borderBottom: "2px solid #eee",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      outline: 1,
                    }}
                  />
                  <br />
                </div>
                <div className="d-flex mx-5">
                  <span style={{ marginTop: "25px" }}>
                    <img src={Just} alt="###" style={{ width: "20px" }} />
                  </span>
                  <input
                    placeholder="Educational Qualification"
                    name="qualification"
                    value={qualification}
                    onChange={handleChange}
                    className="mt-3 w-100"
                    style={{
                      padding: "8px 12px",
                      color: "#000",
                      width: "100%",
                      borderBottom: "2px solid #eee",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      outline: 1,
                    }}
                  />
                  <br />
                </div>
                <div className="d-flex mx-5">
                  <span style={{ marginTop: "25px" }}>
                    <img src={Just1} alt="###" style={{ width: "20px" }} />
                  </span>
                  <input
                    placeholder="Name of Institution"
                    name="institute_name"
                    value={institute_name}
                    onChange={handleChange}
                    className="mt-3 w-100"
                    style={{
                      padding: "8px 12px",
                      color: "#000",
                      width: "100%",
                      borderBottom: "2px solid #eee",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      outline: 1,
                    }}
                  />
                  <br />
                </div>
                <div
                  className="d-flex mx-4"
                  style={{ justifyContent: "space-around" }}
                >
                  <div className="col-5 d-flex">
                    <span
                      className="mt-3"
                      style={{
                        border: "1px solid #eee",
                        backgroundColor: "#FAF8F8",
                        height: "40px",
                      }}
                    >
                      <p className="mt-2">+91</p>
                    </span>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        placeholder="Contact Number"
                        className="mt-3 w-100"
                        name="contact"
                        value={contact}
                        onChange={handleChange}
                        style={{
                          padding: "8px 12px",
                          color: "#000",
                          width: "100%",
                          border: "2px solid #F2F2F2",
                          height: "40px",
                        }}
                      />
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                        }}
                      >
                        {contact.length !== 10
                          ? "contact should contain 10 digit"
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="col-5 d-flex ">
                    <span
                      className="mt-3"
                      style={{
                        border: "1px solid #eee",
                        backgroundColor: "#FAF8F8",
                        height: "40px",
                      }}
                    >
                      <p className="mt-2">+91</p>
                    </span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <input
                        placeholder="Emergency Contact Number"
                        className="mt-3 w-100"
                        name="emergency_contact"
                        value={emergency_contact}
                        onChange={handleChange}
                        style={{
                          padding: "8px 12px",
                          color: "#000",
                          width: "100%",
                          border: "2px solid #F2F2F2",
                          height: "40px",
                        }}
                      />
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                        }}
                      >
                        {emergency_contact.length !== 10
                          ? "contact should contain 10 digit"
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex mx-5">
                  <span style={{ marginTop: "25px" }}>
                    <MdEmail color="#808080" />
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <input
                      placeholder="Enter E-mail"
                      className="mt-3 w-100"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      style={{
                        padding: "8px 12px",
                        color: "#000",
                        width: "100%",
                        borderBottom: "2px solid #eee",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        outline: 1,
                      }}
                    />
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {!email.includes("@") ? "email should contain @" : ""}
                    </span>
                  </div>
                  <br />
                </div>
                <div className="d-flex mx-5">
                  <span style={{ marginTop: "25px" }}>
                    <FaBirthdayCake color="#808080" />
                  </span>
                  <input
                    placeholder="Date of Birth :      DD / MM / YYYY"
                    name="dob"
                    value={dob}
                    onChange={handleChange}
                    className="mt-3 w-100"
                    type="date"
                    style={{
                      padding: "8px 12px",
                      color: "#000",
                      width: "100%",
                      borderBottom: "2px solid #eee",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      outline: 1,
                    }}
                  />
                  <br />
                </div>

                <div
                  style={{
                    width: "60%",
                    margin: "auto",
                    marginTop: "30",
                    height: "40px",
                  }}
                >
                  <label className="filelabel10">
                    <MdFileUpload color="#808080" />
                    <span className="title" style={{ color: "#808080" }}>
                      {resume.name ? resume.name : "Upload Resume"}
                    </span>
                    <input
                      name="resume"
                      onChange={handleChange}
                      type="file"
                      className="FileUpload10"
                      id="FileInput"
                      accept=".pdf"
                    />
                  </label>
                </div>

                <div
                  className="row mt-4"
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  {/* <div style={{justifyContent:"center",alignItems:"center"}}> */}
                  <button
                    className="border-0"
                    style={{
                      width: "200px",
                      height: "40px",
                      backgroundColor: "#2188E7",
                      color: "#fff",
                      borderRadius: 10,
                    }}
                    onClick={() => {
                      console.log(user);
                      Validate();
                    }}
                  >
                    process
                  </button>
                  {/* </div> */}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {Value === 1 ? (
            <>
              <div
                style={{ height: "75vh", overflow: "scroll", marginTop: 20 }}
              >
                <div className="col-lg-12 col-sm-12 my-5">
                  <div
                    style={{ justifyContent: "center", textAlign: "center" }}
                  >
                    <h3>Father’s Details</h3>
                  </div>
                  <div className="d-flex mx-5" style={{ backgroundColor: "" }}>
                    <span style={{ marginTop: "30px" }}>
                      <FaUserAlt style={{ color: "#eee" }} />
                    </span>
                    <input
                      placeholder="Enter Father Name"
                      name="father_name"
                      value={father_name}
                      onChange={handleChange}
                      className="mt-4 w-100"
                      style={{
                        padding: "8px 12px",
                        color: "#000",
                        width: "100%",
                        borderBottom: "2px solid #eee",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        outline: 1,
                      }}
                    />
                    <br />
                  </div>
                  <div className="d-flex mx-5">
                    <span style={{ marginTop: "25px" }}>
                      <img src={Just} alt="###" style={{ width: "20px" }} />
                    </span>
                    <input
                      placeholder="Enter Profession"
                      name="father_profession"
                      value={father_profession}
                      onChange={handleChange}
                      className="mt-3 w-100"
                      style={{
                        padding: "8px 12px",
                        color: "#000",
                        width: "100%",
                        borderBottom: "2px solid #eee",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        outline: 1,
                      }}
                    />
                    <br />
                  </div>
                  <div className="d-flex mx-5">
                    <span style={{ marginTop: "25px" }}>
                      <img src={Just1} alt="###" style={{ width: "20px" }} />
                    </span>
                    <input
                      placeholder="Name of Intuition"
                      className="mt-3 w-100"
                      name="father_intuition"
                      value={father_intuition}
                      onChange={handleChange}
                      style={{
                        padding: "8px 12px",
                        color: "#000",
                        width: "100%",
                        borderBottom: "2px solid #eee",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        outline: 1,
                      }}
                    />
                    <br />
                  </div>
                  <div
                    className="d-flex mx-4"
                    style={{ justifyContent: "space-around" }}
                  >
                    <div className="col-5 d-flex">
                      <span
                        className="mt-3"
                        style={{
                          border: "1px solid #eee",
                          backgroundColor: "#FAF8F8",
                          height: "40px",
                        }}
                      >
                        <select style={{ height: "40px", outline: 1 }}>
                          <option>+91</option>
                          <option>+92</option>
                          <option>+93</option>
                        </select>
                      </span>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          placeholder="Contact Number"
                          className="mt-3 w-100"
                          name="father_contact"
                          value={father_contact}
                          onChange={handleChange}
                          style={{
                            padding: "8px 12px",
                            color: "#000",
                            width: "100%",
                            border: "2px solid #F2F2F2",
                            height: "40px",
                          }}
                        />
                        <span
                          style={{
                            color: "red",
                            fontSize: "10px",
                          }}
                        >
                          {father_contact.length !== 10
                            ? "contact should contain 10 digit"
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div
                      className="col-5 d-flex "
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <span
                        className="mt-3"
                        style={{
                          border: "1px solid #eee",
                          backgroundColor: "#FAF8F8",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          alignContent: "center",
                          padding: ".25rem",
                        }}
                      >
                        <ImWhatsapp size="20px" color="#bdbdbd" />
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          placeholder="Whatsapp Number"
                          name="father_whatsapp"
                          value={father_whatsapp}
                          onChange={handleChange}
                          className="mt-3 w-100"
                          style={{
                            padding: "8px 12px",
                            color: "#000",
                            width: "100%",
                            border: "2px solid #F2F2F2",
                            height: "40px",
                          }}
                        />

                        <span
                          style={{
                            color: "red",
                            fontSize: "10px",
                          }}
                        >
                          {father_whatsapp.length !== 10
                            ? "contact should contain 10 digit"
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mx-5">
                    <span style={{ marginTop: "25px" }}>
                      <MdEmail color="#808080" />
                    </span>
                    <input
                      placeholder="Enter E-mail"
                      className="mt-3 w-100"
                      name="father_email"
                      value={father_email}
                      onChange={handleChange}
                      style={{
                        padding: "8px 12px",
                        color: "#000",
                        width: "100%",
                        borderBottom: "2px solid #eee",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        outline: 1,
                      }}
                    />
                    <br />
                  </div>
                  <div className="d-flex mx-5">
                    <span style={{ marginTop: "25px" }}>
                      <FaBirthdayCake color="#808080" />
                    </span>
                    <input
                      placeholder="Date of Birth :      DD / MM / YYYY"
                      name="father_dob"
                      value={father_dob}
                      type="date"
                      onChange={handleChange}
                      className="mt-3 w-100"
                      style={{
                        padding: "8px 12px",
                        color: "#000",
                        width: "100%",
                        borderBottom: "2px solid #eee",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        outline: 1,
                      }}
                    />
                    <br />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-12 my-5">
                  <div
                    style={{ justifyContent: "center", textAlign: "center" }}
                  >
                    <h3>Mother’s Details</h3>

                    {/* come here */}
                  </div>
                  <div className="d-flex mx-5" style={{ backgroundColor: "" }}>
                    <span style={{ marginTop: "30px" }}>
                      <FaUserAlt style={{ color: "#eee" }} />
                    </span>
                    <input
                      placeholder="Enter Name"
                      className="mt-4 w-100"
                      name="mother_name"
                      value={mother_name}
                      onChange={handleChange}
                      style={{
                        padding: "8px 12px",
                        color: "#000",
                        width: "100%",
                        borderBottom: "2px solid #eee",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        outline: 1,
                      }}
                    />
                    <br />
                  </div>
                  <div className="d-flex mx-5">
                    <span style={{ marginTop: "25px" }}>
                      <img src={Just} alt="###" style={{ width: "20px" }} />
                    </span>
                    <input
                      placeholder="Enter Profession"
                      name="mother_profession"
                      value={mother_profession}
                      onChange={handleChange}
                      className="mt-3 w-100"
                      style={{
                        padding: "8px 12px",
                        color: "#000",
                        width: "100%",
                        borderBottom: "2px solid #eee",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        outline: 1,
                      }}
                    />
                    <br />
                  </div>
                  <div className="d-flex mx-5">
                    <span style={{ marginTop: "25px" }}>
                      <img src={Just1} alt="###" style={{ width: "20px" }} />
                    </span>
                    <input
                      placeholder="Name of Intuition"
                      name="mother_intuition"
                      value={mother_intuition}
                      onChange={handleChange}
                      className="mt-3 w-100"
                      style={{
                        padding: "8px 12px",
                        color: "#000",
                        width: "100%",
                        borderBottom: "2px solid #eee",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        outline: 1,
                      }}
                    />
                    <br />
                  </div>
                  <div
                    className="d-flex mx-4"
                    style={{ justifyContent: "space-around" }}
                  >
                    <div className="col-5 d-flex">
                      <span
                        className="mt-3"
                        style={{
                          border: "1px solid #eee",
                          backgroundColor: "#FAF8F8",
                          height: "40px",
                        }}
                      >
                        <select style={{ height: "40px", outline: 1 }}>
                          <option>+91</option>
                          <option>+92</option>
                          <option>+93</option>
                        </select>
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          placeholder="Contact Number"
                          className="mt-3 w-100"
                          name="mother_contact"
                          value={mother_contact}
                          onChange={handleChange}
                          style={{
                            padding: "8px 12px",
                            color: "#000",
                            width: "100%",
                            border: "2px solid #F2F2F2",
                            height: "40px",
                          }}
                        />
                        <span
                          style={{
                            color: "red",
                            fontSize: "10px",
                          }}
                        >
                          {mother_contact.length !== 10
                            ? "contact should contain 10 digit"
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div
                      // className="col-5 d-flex "
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        className="mt-3"
                        style={{
                          border: "1px solid #eee",
                          backgroundColor: "#FAF8F8",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          alignContent: "center",
                          padding: ".25rem",
                        }}
                      >
                        <ImWhatsapp size="20px" color="#bdbdbd" />
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          name="mother_whatsapp"
                          value={mother_whatsapp}
                          onChange={handleChange}
                          placeholder="Contact Number"
                          className="mt-3 w-100"
                          style={{
                            padding: "8px 12px",
                            color: "#000",
                            width: "100%",
                            border: "2px solid #F2F2F2",
                            height: "40px",
                          }}
                        />
                        <span
                          style={{
                            color: "red",
                            fontSize: "10px",
                          }}
                        >
                          {mother_whatsapp.length !== 10
                            ? "contact should contain 10 digit"
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mx-5">
                    <span style={{ marginTop: "25px" }}>
                      <MdEmail color="#808080" />
                    </span>
                    <input
                      placeholder="Enter E-mail"
                      className="mt-3 w-100"
                      name="mother_email"
                      value={mother_email}
                      onChange={handleChange}
                      style={{
                        padding: "8px 12px",
                        color: "#000",
                        width: "100%",
                        borderBottom: "2px solid #eee",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        outline: 1,
                      }}
                    />
                    <br />
                  </div>
                  <div className="d-flex mx-5">
                    <span style={{ marginTop: "25px" }}>
                      <FaBirthdayCake color="#808080" />
                    </span>
                    <input
                      placeholder="Date of Birth :      DD / MM / YYYY"
                      className="mt-3 w-100"
                      name="mother_dob"
                      value={mother_dob}
                      type="date"
                      onChange={handleChange}
                      style={{
                        padding: "8px 12px",
                        color: "#000",
                        width: "100%",
                        borderBottom: "2px solid #eee",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        outline: 1,
                      }}
                    />
                    <br />
                  </div>
                </div>
              </div>
              <div
                className="row mt-4"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                {/* <div style={{justifyContent:"center",alignItems:"center"}}> */}
                <button
                  className="border-0"
                  style={{
                    width: "200px",
                    height: "40px",
                    backgroundColor: "#2188E7",
                    color: "#fff",
                    borderRadius: 10,
                  }}
                  onClick={() => {
                    Validate();
                    console.log(user);
                  }}
                >
                  process
                </button>
                {/* </div> */}
              </div>
            </>
          ) : (
            <></>
          )}

          {Value === 2 ? (
            <>
              <div className="col-lg-12 col-sm-12 my-5">
                <div className="d-flex mx-5" style={{ backgroundColor: "" }}>
                  <span style={{ marginTop: "30px" }}>
                    <GiWorld style={{ color: "#BDBDBD" }} />
                  </span>
                  <select
                    name="country"
                    className="mt-4 w-100"
                    onChange={handleChange}
                    onClick={handleSelectedCountry}
                    style={{
                      padding: "8px 12px",
                      color: "#000",
                      width: "100%",
                      borderBottom: "2px solid #eee",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      outline: 1,
                    }}
                  >
                    <option value=""> Select Country</option>
                    {
                      // country_list.map((el)=><option key={el} value={el}>{el}</option>)
                      Object.entries(selctCountry).map(
                        ([countryID, countryName]) => (
                          <option
                            key={countryID}
                            value={`${countryName}(${countryID})`}
                          >
                            {countryName}
                          </option>
                        )
                      )
                    }
                  </select>
                </div>
                <div className="d-flex mx-5">
                  <span style={{ marginTop: "25px" }}>
                    <img src={State} alt="" style={{ width: "20px" }} />
                  </span>
                  <select
                    name="state"
                    // value={state}
                    onChange={handleChange}
                    className="mt-4 w-100"
                    style={{
                      padding: "8px 12px",
                      color: "#000",
                      width: "100%",
                      borderBottom: "2px solid #eee",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      outline: 1,
                    }}
                  >
                    <option value="">Select State</option>
                    {selectState.map((el) => (
                      <option key={el.code} value={el.name}>
                        {el.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex mx-5">
                  <span style={{ marginTop: "25px" }}>
                    <GiModernCity style={{ color: "#BDBDBD" }} />
                  </span>
                  <input
                    name="city"
                    value={city}
                    onChange={handleChange}
                    placeholder="City"
                    className="mt-3 w-100"
                    style={{
                      padding: "8px 12px",
                      color: "#000",
                      width: "100%",
                      borderBottom: "2px solid #eee",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      outline: 1,
                    }}
                  />
                  <br />
                </div>

                <div className="d-flex mx-5">
                  <span style={{ marginTop: "25px" }}>
                    <FaMapPin color="#808080" />
                  </span>
                  <input
                    placeholder="Pincode"
                    className="mt-3 w-100"
                    name="pincode"
                    value={pincode}
                    onChange={handleChange}
                    style={{
                      padding: "8px 12px",
                      color: "#000",
                      width: "100%",
                      borderBottom: "2px solid #eee",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      outline: 1,
                    }}
                  />
                  <br />
                </div>

                <div className="d-flex mx-5">
                  <span style={{ marginTop: "25px" }}>
                    <ImLocation2 color="#808080" />
                  </span>
                  <input
                    placeholder="Locality"
                    className="mt-3 w-100"
                    name="locality"
                    value={locality}
                    onChange={handleChange}
                    style={{
                      padding: "8px 12px",
                      color: "#000",
                      width: "100%",
                      borderBottom: "2px solid #eee",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      outline: 1,
                    }}
                  />
                  <br />
                </div>
                <div className="d-flex mx-5">
                  <span style={{ marginTop: "25px" }}>
                    <ImHome3 color="#808080" />
                  </span>
                  <input
                    placeholder="Enter House Number / Flat Number"
                    className="mt-3 w-100"
                    name="flat_number"
                    value={flat_number}
                    onChange={handleChange}
                    style={{
                      padding: "8px 12px",
                      color: "#000",
                      width: "100%",
                      borderBottom: "2px solid #eee",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      outline: 1,
                    }}
                  />
                  <br />
                </div>
              </div>
              <div
                className="row mt-4"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                {/* <div style={{justifyContent:"center",alignItems:"center"}}> */}
                <button
                  className="border-0"
                  style={{
                    width: "200px",
                    height: "40px",
                    backgroundColor: "#2188E7",
                    color: "#fff",
                    borderRadius: 10,
                  }}
                  onClick={() => {
                    // setValue(Value + 1);
                    Validate();
                    console.log(user);
                    // here
                    getDepartments();
                  }}
                >
                  process
                </button>
              </div>
            </>
          ) : (
            <></>
          )}

          {Value === 3 ? (
            <>
              <div style={{ marginTop: "80px" }}>
                <div className="row ms-3">
                  <div className="col-6">
                    <select
                      name="department_id"
                      onChange={handleChange}
                      onClick={(e) => getRoles(e.target.value)}
                      className="w-75"
                      style={{
                        border: "1px solid #BDBDBD",
                        height: "40px",
                        borderRadius: 5,
                      }}
                    >
                      <option value="">select department</option>
                      {departments?.map((el) => (
                        <option value={el.id}>{el.department_name}</option>
                      ))}
                    </select>
                  </div>

                  {/* finally reached */}
                  <div className="col-6">
                    <select
                      name="role_id"
                      onChange={handleChange}
                      className="w-75"
                      style={{
                        border: "1px solid #BDBDBD",
                        height: "40px",
                        borderRadius: 5,
                      }}
                    >
                      <option value="">select role</option>
                      {roles?.map((el) => (
                        <option value={el.id}>{el.role_name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-6 mt-3">
                    <div className="row">
                      <div className="col-6">
                        <span
                          style={{
                            fontSize: 18,
                            fontFamily: 800,
                            color: "#BDBDBD",
                          }}
                        >
                          In hand Salary
                        </span>
                      </div>
                      <div
                        className="col-6"
                        style={{
                          justifyContent: "space-around",
                          alignItems: "space-around",
                        }}
                      >
                        <button
                          className="border-0"
                          style={{
                            backgroundColor: "#2188E7",
                            borderRadius: 3,
                            height: 35,
                            color: "#fff",
                            width: "80px",
                          }}
                        >
                          Yearly
                        </button>
                        <button
                          className="border-0"
                          style={{
                            height: "35px",
                            borderRadius: 5,
                            marginLeft: "30px",
                          }}
                        >
                          Monthly
                        </button>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <span
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 3,
                          border: "2px solid #BDBDBD",
                          height: 36,
                          width: "80%",
                          marginLeft: "13px",
                        }}
                      >
                        <select
                          style={{
                            borderRadius: 3,
                            border: "2px solid #BDBDBD",
                            height: 35,
                            marginLeft: "-13px",
                          }}
                        >
                          <option>₹</option>
                          <option>$</option>
                        </select>
                        <input
                          name="salary"
                          value={salary}
                          onChange={handleChange}
                          className="border-0"
                          style={{ outline: "none" }}
                          placeholder="   10,00000"
                        />
                      </span>
                    </div>
                  </div>

                  <div className="col-6" style={{ marginTop: "65px" }}>
                    <button
                      className="border-0"
                      style={{
                        backgroundColor: "#F0F0F0",
                        borderRadius: 5,
                        color: "#000",
                        height: "40px",
                        width: "200px",
                        fontSize: 18,
                        fontWeight: 500,
                      }}
                    >
                      + Add Instrument
                    </button>
                  </div>

                  {/* <div className="col-6 mt-3">
                    <div className="row">
                      <div className="col-6">
                        <span
                          style={{
                            fontSize: 18,
                            fontFamily: 800,
                            color: "#BDBDBD",
                          }}
                        >
                          House Rent
                        </span>
                      </div>
                      <div
                        className="col-6"
                        style={{ justifyContent: "space-between" }}
                      >
                        <button
                          className="border-0"
                          style={{
                            backgroundColor: "#2188E7",
                            borderRadius: 3,
                            height: "35px",
                            color: "#fff",
                            width: "80px",
                          }}
                        >
                          Yearly
                        </button>
                        <button
                          className="border-0"
                          style={{ height: "35px", borderRadius: 5,marginLeft:"30px" }}
                        >
                          Monthly
                        </button>
                      </div>
                      <div className="row mt-3">
                      <span style={{justifyContent:"center",alignItems:"center",borderRadius:3,border:"2px solid #BDBDBD",height:36,width:"85%",marginLeft: "13px"}}>
                        <select style={{borderRadius:3,border:"2px solid #BDBDBD",height:35,marginLeft:"-13px"}}>
                          <option>₹</option>
                          <option>$</option>
                        </select>
                        <input className="border-0" style={{outline:"none"}} placeholder="     10,00000"/>
                      </span>
                    </div>
                    </div>
                  </div>*/}
                </div>
                <div
                  className="row ps-4"
                  style={{
                    marginTop: "150px",
                    justifyContent: "space-between",
                    alignItems: "space-between",
                  }}
                >
                  <div className="col-6">
                    <p
                      style={{
                        color: "#000000",
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      Date of Joining : 10 Jan 2023
                    </p>
                  </div>
                  <div className="col-6">
                    <p
                      style={{
                        color: "#000000",
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      Total Yearly CTC : 10,00000
                    </p>
                  </div>
                </div>
                <div
                  className="row"
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <button
                    className="border-0"
                    onClick={() => {
                      console.log(user);
                      Validate();
                    }}
                    disabled={loading ? true : false}
                    style={{
                      backgroundColor: "#2188E7",
                      width: "200px",
                      color: "#fff",
                      borderRadius: 5,
                      height: 35,
                    }}
                  >
                    {loading ? <Spinner /> : "+Add User"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {/* </div> */}

        {/* offcanvas end */}
      </Offcanvas>

      {/* users are mapped here */}
      <div style={{ height: "81vh", overflowY: "scroll" }}>
        <div className="row">
          {isLoading ? (
            <LoaderComponent />
          ) : (
            users?.map((res, key) => <UserCard res={res} key={key} />)
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserData;
