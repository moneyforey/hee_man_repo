import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Clebrate from "../../Img/lf20_VuglDs.json";

const Question = (props) => {
  const [Token, setToken] = useState("");
  const [first, setfirst] = useState(0);
  const [Change, setChange] = useState("");
  const [Data, setData] = useState([]);
  const [Value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [SubCategories, setSubCategories] = useState([]);
  const [Name, setName] = useState("");
  const [dataArray, setdataArray] = useState([]);
  const [Image, setImage] = useState();
  const [Names, setNames] = useState([]);
  const [Timer, setTimers] = useState(15);

  const myFunction = (props) => {
    setfirst(first + 1);
  };

  console.log(dataArray);
  console.log(Change);

  const handleChange = (e) => {
    var updatedList = [...dataArray];

    var UpdateImg = [...Names];

    if (e.target.checked) {
      updatedList = [...dataArray, e.target.value];
      UpdateImg = [...Names, e.target.id];
    } else {
      updatedList.splice(dataArray.indexOf(e.target.value), 1);
      UpdateImg.splice(Names.indexOf(e.target.id));
    }
    setdataArray(updatedList);
    setNames(UpdateImg);
  };

  const categorylist = async () => {
    try {
      const category = await fetch(
        "https://brainbucks.co.in/api/admin/categorylist"
      );
      const Data = await category.json();
      //console.log(Data);
      setData(Data);
    } catch (error) {
      console.log(error);
    }
  };

  const Api1 = async () => {
    try {
      const war = await fetch(
        `https://brainbucks.co.in/api/admin/subcategorylist?parent_id=${Value}&token=${Token}`
      );
      const response1 = await war.json();
      if (response1.status === 1) {
        console.log(response1.message);
        console.log(response1);
        setSubCategories(response1.data);
      } else {
        // alert(response1.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(Data);
  const Sub = async () => {
    var myHeaders = new Headers();
    myHeaders.append("location", "");

    var formdata = new FormData();
    formdata.append("subject_name", Change);
    formdata.append("category_id", Value);
    formdata.append("subcategory_id", dataArray);
    formdata.append("token", Token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/subjects", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 1) {
          setfirst(first + 1);
          setdataArray([]);
          setNames([]);
          setChecked(false);
          let interval = setInterval(() => {
            setTimers((lastTimerCount) => {
              lastTimerCount <= 1 && clearInterval(interval);
              return lastTimerCount - 1;
            });
          }, 1000);
          return () => {
            clearInterval(interval);
          };
        } else {
          alert(result.message);
          setdataArray([]);
          setNames([]);
        }
      })
      .catch((error) => console.log("error", error));
  };

  if (Timer == 0) {
    props.Handle();
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    categorylist();
  }, []);
  return (
    <div>
      <div style={{ display: first >= 4 ? "none" : "" }}>
        <span
          style={{ color: "#000", fontWeight: "600" }}
          onClick={() => {
            setfirst(0);
            setChange("");
            setdataArray([]);
            setNames([]);
            props.Handle();
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
          Add New Subject
        </h3>
      </div>
      <div style={{ display: first === 0 ? "block" : "none" }}>
        <div className="mb-5">
          <div className="progress" style={{ height: "10px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: "25%",
                background:
                  "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <p style={{ color: "#8A8A8A" }}>
            1/4 <span sytle={{ color: "red" }}>Steps</span>
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
                  Enter name of Subject
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
                  placeholder="  Start typing the name of subject"
                  value={Change}
                  onChange={(e) => {
                    setChange(e.target.value);
                  }}
                  type="text"
                  maxLength={100}
                />
                <br />
                <span style={{ marginLeft: "200px" }}>{Change.length}/100</span>
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
            onClick={myFunction}
            style={{
              backgroundColor: "#2188E7",
              height: "40px",
              borderRadius: 7,
            }}
            disabled={Change.length >= 2 ? false : true}
          >
            Proceed
          </button>
        </div>
      </div>
      <div style={{ display: first === 1 ? "block" : "none" }}>
        <div className="mb-5">
          <div className="progress" style={{ height: "10px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: "25%",
                background:
                  "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <p style={{ color: "#8A8A8A" }}>
            2/4 <span sytle={{ color: "red" }}>Steps</span>
          </p>

          <div className="row">
            <div className="col-3"></div>
            <div className="col-4 card" style={{ width: "400px" }}>
              <div>
                <label
                  className="col-12 mb-2"
                  style={{
                    textAlign: "start",
                    color: "#303030",
                    fontWeight: "600",
                  }}
                >
                  Select Category
                </label>
                <br />
                <input
                  className="col-12 border-0 mb-4"
                  style={{
                    textAlign: "start",
                    height: "50px",
                    backgroundColor: "#EFEFEF",
                    borderRadius: 7,
                    outline: 1,
                  }}
                  placeholder="  Search for Exam Category"
                  type="search"
                />
                <br />

                <div
                  style={{
                    height: "160px",
                    overflowY: "scroll",
                    justifyContent: "start",
                    alignItems: "start",
                  }}
                >
                  {Data?.map((res, key) => {
                    return (
                      <div
                        className="col-12"
                        style={{ display: "flex" }}
                        key={key}
                      >
                        <input
                          type="radio"
                          style={{ width: "20px" }}
                          name="same"
                          onClick={() => {
                            setValue(res.id);
                            setName(res.category_name);
                            setImage(res.category_image);
                          }}
                        />
                        <div
                          className="ms-2"
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            justifyContent: "center",
                            overflow: "hidden",
                            marginTop: "12px",
                          }}
                        >
                          <img alt="#" src={res.category_image} width="100%" />
                        </div>
                        <p className="mt-2 ms-2">{res.category_name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <button
            className="col-6 ms-4 border-0 text-white"
            onClick={() => {
              myFunction();
              Api1();
            }}
            style={{
              backgroundColor: "#2188E7",
              height: "40px",
              borderRadius: 7,
            }}
            disabled={Name.length >= 2 ? false : true}
          >
            Proceed
          </button>
        </div>
      </div>
      <div style={{ display: first === 2 ? "block" : "none" }}>
        <div className="mb-5">
          <div className="progress" style={{ height: "10px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: "75%",
                background:
                  "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <p style={{ color: "#8A8A8A" }}>
            3/4 <span sytle={{ color: "red" }}>Steps</span>
          </p>
          <p>
            <span style={{ fontWidth: 700, fontSize: 18, color: "#303030" }}>
              Categories :{" "}
            </span>
            {Name}
          </p>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-4 card" style={{ width: "400px" }}>
              <div>
                <label
                  className="col-12 mb-2"
                  style={{
                    textAlign: "start",
                    color: "#303030",
                    fontWeight: "600",
                  }}
                >
                  Select Sub Categories
                </label>
                <br />
                <input
                  className="col-12 border-0 mb-4"
                  style={{
                    textAlign: "start",
                    height: "50px",
                    backgroundColor: "#EFEFEF",
                    borderRadius: 7,
                    outline: 1,
                  }}
                  placeholder="  Search for Exam Sub Category"
                  type="search"
                />
                <br />

                <div
                  style={{
                    height: "160px",
                    overflowY: "scroll",
                    justifyContent: "start",
                    alignItems: "start",
                  }}
                >
                  {SubCategories.map((res, key) => {
                    return (
                      <div
                        className="col-12"
                        style={{ display: "flex" }}
                        key={key}
                      >
                        {/* <input id='Sub' value={res.id} onChange={(e)=>{setValue1(res.id);
                         const Data =  Value1;

                      if (Value1) {
                        setList((ls) => [...ls, Data]);
                      }
                      }} 
                      type="checkbox"/> */}
                        <input
                          style={{ color: "#F6F6F6" }}
                          type="checkbox"
                          id={res.subcategory}
                          value={res.id}
                          name={!checked}
                          onChange={(e) => {
                            handleChange(e);
                            setChecked(false);
                          }}
                        />
                        <img
                          src={Image}
                          alt="#"
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                          }}
                        />
                        <p style={{ marginTop: "9px" }}> {res.subcategory}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <button
            className="col-6 ms-4 border-0 text-white"
            onClick={myFunction}
            style={{
              backgroundColor: "#2188E7",
              height: "40px",
              borderRadius: 7,
            }}
            disabled={Names.length >= 1 ? false : true}
          >
            Proceed
          </button>
        </div>
      </div>
      <div style={{ display: first === 3 ? "block" : "none" }}>
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
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <p style={{ color: "#8A8A8A" }}>
            4/4 <span sytle={{ color: "red" }}>Steps</span>
          </p>

          <div className="row">
            <div style={{ justifyConetnt: "center", textAlign: "center" }}>
              <div style={{ justifyConetnt: "center", textAlign: "center" }}>
                <span>
                  New Subject "<strong>{Change}</strong>"" will be created{" "}
                  <br /> in "<strong>{Name}</strong>" Exam Category with
                  following
                  <br />
                  <strong>Sub Categories</strong>
                </span>
              </div>
              <div>
                {Names.map((item) => {
                  return (
                    <>
                      {/* <img src={Image} alt="#" style={{width:"10%"}}/> */}
                      <p>{item}</p>
                    </>
                  );
                })}
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
            onClick={Sub}
            style={{
              backgroundColor: "#21B867",
              height: "40px",
              borderRadius: 7,
            }}
          >
            Confirm
          </button>
        </div>
      </div>
      <div className="mt-5" style={{ display: first >= 4 ? "block" : "none" }}>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: first > 3 ? "block" : "none",
          }}
        >
          <div style={{ textAlign: "center", alignItems: "center" }}>
            <h2 style={{ fontSize: "20px" }}>
              New Subject "<span>{Change}</span>"<br /> added Succesfully{" "}
            </h2>
          </div>
          <div
            className="d-flex"
            style={{ textAlign: "center", alignItems: "center" }}
          >
            <div className="col-3 ms-5"></div>
            <Lottie
              animationData={Clebrate}
              loop={true}
              style={{ width: "40%" }}
            />
          </div>
          <div style={{ textAlign: "center", alignItems: "center" }}>
            <button
              onClick={props.Handle}
              className="border-0 col-4 mt-4"
              style={{
                backgroundColor: "#0CBC8B",
                color: "#fff",
                height: "40px",
                borderRadius: 7,
              }}
            >
              Back to Dashboard
            </button>
          </div>
          <div
            className="mt-5"
            style={{ textAlign: "center", alignItems: "center" }}
          >
            <p style={{ color: "#8A8A8A" }}>
              This tab will automatically close in
              <span style={{ color: "#CC1313", fontSize: 20 }}> {Timer} </span>
              Seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
