import { useState, useEffect } from "react";
import "./Active.css";
import "react-datepicker/dist/react-datepicker.css";
import Lottie from "lottie-react";
import Clebrate from "../../Img/lf20_IBRRl8.json";
//import { NavLink } from "react-router-dom";
import FreeTrivaEdit from "./FreeTrivaEdit";
import { json, NavLink } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { ToastContainer as Toaster, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import axios from "axios";

function Slider(props) {
  const [value, setValue] = useState(props.value);

  function handleChange(event) {
    const newValue = parseInt(event.target.value);
    const oldValue = value;
    const total = props.total - oldValue + newValue;

    if (total <= 100) {
      setValue(newValue);
      props.onChange(props.id, newValue);
    } else {
      setValue(100 - props.total + oldValue);
      props.onChange(props.id, 100 - props.total + oldValue);
    }
  }

  setTimeout(() => {
    setValue(props.value);
  }, 1);

  return (
    <div className="slider">
      <input
        type="range"
        className="w-100 ranges"
        min={0}
        max={100}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

const initColors = {
  min: "#B1B1B1",
  max: "#B1B1B1",
};

const FreeTrivia = () => {
  const [ClickUp, setClickUp] = useState(false);
  const [Token, setToken] = useState("");
  const [Click, setClick] = useState(0);
  const [Select, setSelect] = useState("");
  const [SelectSub, setSelectSub] = useState("");
  const [dataArray, setdataArray] = useState([]);
  const [Value1, setValue1] = useState();
  const [Range, SetRange] = useState();
  const [Trv, setTrv] = useState(10);
  const [Banner, setBanner] = useState("");
  const [Image, setImage] = useState("");
  const [Question, setQuestion] = useState("");
  const [Rules, setRules] = useState("");
  const [Range1, SetRange1] = useState();
  const [Range11, SetRange11] = useState(50);
  const [Replace, setReplace] = useState();
  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [Subject, setSubject] = useState([]);
  const [Id, setId] = useState([]);
  const [BB, setBB] = useState("");
  const [CategoryImg, setCategoryImg] = useState("");
  const [SubCat, setSubCat] = useState("");
  const [Goy, setGoy] = useState(0);
  const [ValCat, setValCat] = useState("");
  const [TotalData, setTotalData] = useState([]);
  const [arr, setArr] = useState([]);
  const [SubjectId, setSubjectId] = useState([]);
  const [validquescolor, setValidQuescolor] = useState(initColors);
  const [rewardcolor, setRewardColor] = useState("#B1B1B1");
  const [filterCatrgory, setFilterCatrgory] = useState([]);
  const [filterSubCatrgory, setFilterSubCatrgory] = useState([]);
  const [filterSubjects, setFilterSubjects] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setmessage] = useState("");
  const [show1, setShow1] = useState(false);
  const [Timer, setTimers] = useState(15);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function for the filteration of category for searching
  async function updateResultCategoty(search) {
    const newData = await Category.filter((el) => {
      if (search.length === 0) {
        return el;
      }
      return el.category_name.toLowerCase().startsWith(search.toLowerCase());
    });
    setFilterCatrgory([...newData]);
  }

  // function for the filteration of subcategory for searching
  async function updateResultSubCategoty(search) {
    // console.log(SubCategory);
    const newData = await SubCategory.filter((el) => {
      if (search.length === 0) {
        return el;
      }
      return el.subcategory.toLowerCase().startsWith(search.toLowerCase());
    });
    setFilterSubCatrgory([...newData]);
  }

  // function for the filteration of subject for searching
  async function updateResultSubject(search) {
    const newData = await Subject.filter((el) => {
      if (search.length === 0) {
        return el;
      }
      return el.subject_name.toLowerCase().startsWith(search.toLowerCase());
    });
    setFilterSubjects([...newData]);
  }

  const handleChange = (e) => {
    let subjects = [...TotalData];
    var updatedList = [...dataArray];
    var updatedId = [...SubjectId];

    if (e.target.checked) {
      updatedList = [...dataArray, e.target.value];
      updatedId = [...SubjectId, e.target.id];
      subjects.push({ id: e.target.id, name: e.target.value, value: "" });
    } else {
      updatedList.splice(dataArray.indexOf(e.target.value), 1);
      updatedId.splice(SubjectId.indexOf(e.target.id), 1);
      subjects.pop({ id: e.target.id, name: e.target.value, value: "" });
    }
    //  len = subjects.length+1;
    setdataArray(updatedList);
    setSubjectId(updatedId);
    setTotalData(subjects);
  };

  function handleChangeName(id, value) {
    const newSubjects = TotalData.map((subject) => {
      if (subject.id === id) {
        return { ...subject, value };
      } else {
        return subject;
      }
    });

    setTotalData(newSubjects);
  }

  //function for checking validation for question  composition
  const funForLastvalidation = () => {
    let sum = TotalData.reduce((total, Value) => total + Value.value, 0);
    if (sum !== 100) {
      toast("Sum of Question shold be 100%");
    } else {
      setClick(Click + 1);
    }
  };

  const addvalueToArray = () => {
    var len = TotalData.length;
    let reqArr = [];
    TotalData.map((value, ind) => {
      ind === 0 ? (value.value = 100) : (value.value = 0);
    });

    for (let i = 0; i < TotalData.length; i++) {
      if (i === 0) {
        reqArr[i] = 100;
      } else {
        reqArr[i] = 0;
      }
    }
    setTotalData([...TotalData]);
    setArr([...reqArr]);
  };

  const setRewardColorFun = (n) => {
    if (n > 50) {
      setRewardColor("red");
    } else if (n > 0 && n <= 50) {
      setRewardColor("green");
    }
  };

  // const handleChanges = (e,index) => {
  //   console.log(e);
  //   const newValue = parseInt(e.target.value);
  //   let newValues = [...arr];
  //   let newData = [...TotalData];
  //   // decrease the first input value
  //   if(index === 0) {
  //     const diff = arr[0] - newValue;
  //     newValues[0] = newValue;
  //     newData[0].value = newValue;
  //     for (let i = 1; i < newValues.length; i++) {
  //       newValues[i] += diff / (newValues.length - 1);
  //       newData[i].value += diff / (newValues.length - 1);
  //     }
  //   } else {
  //     // find the index of the previous input
  //     const prevIndex = index - 1;
  //     // find the index of the next input
  //     const nextIndex = index + 1;

  //     // increase the next input value
  //     if (newValue > arr[index] && nextIndex < newValues.length) {
  //       const diff = newValue - arr[index];
  //       if(newValues[nextIndex] >= diff) {
  //         newValues[index] = newValue;
  //         newData[index].value = newValue;
  //         newValues[nextIndex] -= diff;
  //         newData[nextIndex].value = newValue;
  //       } else {
  //         newValues[index] = arr[index] + newValues[nextIndex];
  //         newData[index].value = arr[index] + newValues[nextIndex];
  //         newValues[nextIndex] = 0;
  //         newData[nextIndex].value = 0;
  //         newValues = handleChange(prevIndex, {
  //           target: { value: newValue },
  //         });
  //       }

  //     // decrease the next input value
  //     } else if (newValue < arr[index] && nextIndex < newValues.length) {
  //       const diff = TotalData[index] - newValue;
  //       if (newValues[nextIndex] + diff <= 100) {
  //         newValues[index] = newValue;
  //         newData[index].value = newValue;
  //         newValues[nextIndex] += diff;
  //         newData[nextIndex].value += diff;
  //       } else {
  //         const newVal = 100 - newValues[nextIndex];
  //         newValues[index] = newValue;
  //         newData[index].value = newValue;
  //         newValues[nextIndex] = 100 - newValues[nextIndex];
  //         newData[nextIndex].value = 100 - newValues[nextIndex];;
  //         newValues = handleChange(prevIndex, {
  //           target: { value: newVal },
  //         });
  //       }
  //     }
  //   }

  //   setArr([...newValues]);
  //   setTotalData([...newData]);
  //   return newValues;
  // };

  // console.log(TotalData);

  const APi = async () => {
    try {
      const Responce = await fetch(
        "https://brainbucks.co.in/api/admin/categorylist"
      );
      const Data = await Responce.json();
      // console.log("data",Data);
      setCategory(Data);
      setFilterCatrgory(Data);
    } catch (error) {
      console.log(error);
    }
  };

  const Api1 = async () => {
    try {
      const war = await fetch(
        `https://brainbucks.co.in/api/admin/subcategorylist?parent_id=${Select}&token=${Token}`
      );
      const response1 = await war.json();
      if (response1.status === 1) {
        // console.log("id data",response1.data);
        setSubCategory(response1.data);
        setFilterSubCatrgory(response1.data);
      } else {
        // alert(response1.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Api2 = async () => {
    try {
      const war1 = await fetch(
        `https://brainbucks.co.in/api/admin/subjectslist?subcategory_id=${SelectSub}`
      );
      const response2 = await war1.json();
      if (response2.status === 1) {
        // console.log(response2.message);
        setSubject(response2.data);
        setFilterSubjects(response2.data);
      } else {
        // alert(response2.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const NoofQuesValidation = (n) => {
    if (n < 10) {
      setValidQuescolor({
        ...validquescolor,
        min: "red",
        max: "#B1B1B1",
      });
    } else if (n >= 10 && n <= 500) {
      setValidQuescolor({
        ...validquescolor,
        min: "green",
        max: "green",
      });
    } else if (n > 500) {
      setValidQuescolor({
        ...validquescolor,
        max: "red",
        min: "#B1B1B1",
      });
    } else {
      setValidQuescolor({
        ...validquescolor,
        min: "#B1B1B1",
        max: "#B1B1B1",
      });
    }
  };

  const SendFree = async () => {
    var myHeaders = new Headers();
    myHeaders.append("location", "");

    var formdata = new FormData();
    formdata.append("category_id", Select);
    formdata.append("subcategory_id", SelectSub);
    formdata.append("subject_id", JSON.stringify(TotalData));
    formdata.append("total_question", Question);
    formdata.append("rules", Rules);
    formdata.append("rewards", BB);
    formdata.append("trivia_image", Image);
    formdata.append("min_score", Range11);
    formdata.append("question_time", Trv);
    formdata.append("token", Token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/freetrv", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 1) {
          setClick(Click + 1);

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
          setmessage(result.message);
          setShow1(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  setTimeout(() => {
    if (Timer == 0) {
      setShow(false);
      setGoy(1);
      setClick(0);
      setTimeout(() => {
        setGoy(0);
      }, 100);
      setTotalData([]);
      setTimers(15);
      setImage("");
      setBanner("");
      setRules("");
      setBB("");
      SetRange11(50);
      setTrv(10);
      setQuestion("");
      setRewardColor("#B1B1B1");
      setClickUp(false);
    }
  }, 16);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    APi();
  }, []);

  return (
    <div>
      <Offcanvas
        show={show}
        className="w-50"
        onHide={handleClose}
        placement="end"
        style={{ borderTopLeftRadius: 30 }}
      >
        <Offcanvas.Header>
          <div>
            <span
              style={{
                color: "#000",
                fontWeight: "600",
                display: Click === 7 ? "none" : "block",
              }}
              onClick={() => {
                setClick(0);
                setShow(false);
                setTotalData([]);
                setTimers(15);
                setImage("");
                setBanner("");
                setRules("");
                setBB("");
                SetRange11(50);
                setTrv(10);
                setQuestion("");
                setRewardColor("#B1B1B1");
                setClickUp(false);
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
              style={{
                marginLeft: "6px",
                fontWeight: "600",
                display: Click >= 6 ? "none" : "block",
              }}
            >
              Add New Free Trivia
            </h3>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ marginTop: "-20px" }}>
          <div style={{ display: Click === 0 ? "block" : "none" }}>
            <div className="mb-5">
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: "17%",
                    background:
                      "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p style={{ color: "#8A8A8A" }}>
                1/6 <span sytle={{ color: "red" }}>Steps Completed</span>
              </p>

              <div className="row">
                <div className="col-3"></div>
                <div
                  className="card col-6"
                  style={{ justifyConetnt: "center", textAlign: "center" }}
                >
                  <div>
                    <label
                      className="col-12 mb-2 mt-3"
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
                      className="col-12 border-0 mb-3"
                      style={{
                        textAlign: "start",
                        height: "50px",
                        backgroundColor: "#EFEFEF",
                        borderRadius: 7,
                        outline: 1,
                      }}
                      placeholder="  Search for Category"
                      type="search"
                      onKeyUp={(e) => updateResultCategoty(e.target.value)}
                    />
                    <br />
                  </div>
                  <div
                    style={{
                      height: "160px",
                      overflowY: "scroll",
                      justifyContent: "start",
                      alignItems: "start",
                    }}
                  >
                    {filterCatrgory?.map((res, key) => {
                      return (
                        <>
                          <div className="d-flex mt-3" key={key}>
                            <input
                              style={{ color: "#F6F6F6" }}
                              type="radio"
                              name="Select"
                              onClick={() => {
                                setSelect(res.id);
                                setValCat(res.category_name);
                                setCategoryImg(res.category_image);
                              }}
                            />
                            <img
                              alt="#"
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                              }}
                              src={res.category_image}
                            />
                            <span className="ms-3 fw-bolder">
                              {res.category_name}
                            </span>
                          </div>
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
                disabled={ValCat.length >= 1 ? false : true}
                className="col-5 border-0 text-white"
                onClick={() => {
                  setClick(Click + 1);
                  Api1();
                }}
                style={{
                  backgroundColor: "#2188E7",
                  height: "40px",
                  borderRadius: 7,
                }}
              >
                Proceed
              </button>
            </div>
          </div>

          <div style={{ display: Click === 1 ? "block" : "none" }}>
            <div className="mb-5">
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: "28%",
                    background:
                      "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p style={{ color: "#8A8A8A" }}>
                2/6 <span sytle={{ color: "red" }}>Steps Completed</span>
              </p>
              <div>
                <p style={{ fontSize: 16, fontWeight: 600 }}>
                  Exam Category : <span>{ValCat}</span>
                </p>
              </div>
              <div className="row">
                <div className="col-3"></div>
                <div
                  className="card col-6"
                  style={{ justifyConetnt: "center", textAlign: "center" }}
                >
                  <div>
                    <label
                      className="col-12 mb-2 mt-3"
                      style={{
                        textAlign: "start",
                        color: "#303030",
                        fontWeight: "600",
                      }}
                    >
                      Select Sub Category
                    </label>
                    <br />
                    <input
                      className="col-12 border-0 mb-3"
                      style={{
                        textAlign: "start",
                        height: "50px",
                        backgroundColor: "#EFEFEF",
                        borderRadius: 7,
                        outline: 1,
                      }}
                      placeholder="  Search for Sub Category"
                      type="search"
                      onKeyUp={(e) => updateResultSubCategoty(e.target.value)}
                    />
                    <br />
                  </div>
                  <div
                    style={{
                      height: "160px",
                      overflowY: "scroll",
                      justifyContent: "start",
                      alignItems: "start",
                    }}
                  >
                    {filterSubCatrgory?.map((res, key) => {
                      return (
                        <>
                          <div className="d-flex mt-3" key={key}>
                            <input
                              style={{ color: "#F6F6F6" }}
                              type="radio"
                              name="Select"
                              onClick={() => {
                                setSelectSub(res.id);
                                setSubCat(res.subcategory);
                              }}
                            />
                            <img
                              alt="#"
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                              }}
                              src={CategoryImg}
                            />
                            <span className="ms-3 fw-bolder">
                              {ValCat} {res.subcategory}
                            </span>
                          </div>
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
                disabled={SubCat.length >= 1 ? false : true}
                className="col-5 border-0 text-white"
                onClick={() => {
                  setClick(Click + 1);
                  Api2();
                }}
                style={{
                  backgroundColor: "#2188E7",
                  height: "40px",
                  borderRadius: 7,
                }}
              >
                Proceed
              </button>
            </div>
          </div>

          <div style={{ display: Click === 2 ? "block" : "none" }}>
            <div className="mb-5">
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: "42%",
                    background:
                      "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p style={{ color: "#8A8A8A" }}>
                3/6 <span sytle={{ color: "red" }}>Steps Completed</span>
              </p>
              <div className="row">
                <p
                  className="col-6"
                  style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
                >
                  Exam Category :
                  <span style={{ coor: "#000000" }}>{ValCat}</span>
                </p>
                <p
                  className="col-6"
                  style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
                >
                  Exam Sub Category :
                  <span style={{ coor: "#000000" }}>
                    {" "}
                    {ValCat} {SubCat}{" "}
                  </span>
                </p>
              </div>
              <div className="row">
                <div className="col-3"></div>
                <div
                  className="card col-6"
                  style={{ justifyConetnt: "center", textAlign: "center" }}
                >
                  <div>
                    <label
                      className="col-12 mb-2 mt-3"
                      style={{
                        textAlign: "start",
                        color: "#303030",
                        fontWeight: "600",
                      }}
                    >
                      Select Subjects
                    </label>
                    <br />
                    <input
                      className="col-12 border-0 mb-3"
                      style={{
                        textAlign: "start",
                        height: "50px",
                        backgroundColor: "#EFEFEF",
                        borderRadius: 7,
                        outline: 1,
                      }}
                      placeholder="  Search for Subject"
                      type="search"
                      onKeyUp={(e) => updateResultSubject(e.target.value)}
                    />
                    <br />
                  </div>
                  <div
                    style={{
                      height: "160px",
                      overflowY: "scroll",
                      justifyContent: "start",
                      alignItems: "start",
                    }}
                  >
                    {filterSubjects?.map((res, key) => {
                      return (
                        <>
                          <div className="d-flex mt-3" key={key}>
                            <input
                              style={{ color: "#F6F6F6" }}
                              type="checkbox"
                              id={res.id}
                              value={res.subject_name}
                              name="Select"
                              onChange={(e) => handleChange(e)}
                            />
                            <span className="ms-3 fw-bolder">
                              {res.subject_name}
                            </span>
                          </div>
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
                disabled={dataArray.length >= 1 ? false : true}
                className="col-5 border-0 text-white"
                onClick={() => {
                  setClick(Click + 1);
                  setValue1(100 / dataArray.length);
                  addvalueToArray();
                }}
                style={{
                  backgroundColor: "#2188E7",
                  height: "40px",
                  borderRadius: 7,
                }}
              >
                Proceed
              </button>
            </div>
          </div>

          <div style={{ display: Click === 3 ? "block" : "none" }}>
            <div className="mb-5">
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: "56%",
                    background:
                      "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p style={{ color: "#8A8A8A" }}>
                4/6 <span sytle={{ color: "red" }}>Steps Completed</span>
              </p>
              <div className="row">
                <p
                  className="col-6"
                  style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
                >
                  Exam Category :
                  <span style={{ coor: "#000000" }}> {ValCat} </span>
                </p>
                <p
                  className="col-6"
                  style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
                >
                  Exam Sub Category :
                  <span style={{ coor: "#000000" }}>
                    {" "}
                    {ValCat} {ValCat}{" "}
                  </span>
                </p>
              </div>
              <div className="row">
                <div className="col-3"></div>
                <div
                  className="card col-6"
                  style={{ justifyConetnt: "center", textAlign: "center" }}
                >
                  <div>
                    <label
                      className="col-12 mb-2 mt-3"
                      style={{
                        textAlign: "start",
                        color: "#303030",
                        fontWeight: "600",
                      }}
                    >
                      Select Question Composition
                    </label>
                    <br />
                  </div>
                  <div
                    style={{
                      height: "200px",
                      overflowY: "scroll",
                      justifyContent: "start",
                      alignItems: "start",
                    }}
                  >
                    {TotalData?.map((Value, index) => {
                      return (
                        <>
                          <div className="mt-3" style={{ textAlign: "start" }}>
                            <div
                              className="d-flex"
                              style={{ justifyContent: "space-between" }}
                            >
                              <span
                                className="ms-3 fw-bolder"
                                style={{ fontSize: 14 }}
                              >
                                {Value.name}
                              </span>
                              <span style={{ marginLeft: "190px" }}>
                                {parseInt(Value.value)}%
                              </span>
                              <br />
                            </div>

                            {/* <input
                            className="w-100 ranges"
                            type="range"
                            name="rangeInput"
                            key={index}
                            value={Value.value}
                            onChange={(e)=>{ 
                                handleChanges(e,index)
                                SetRange(e.target.value);
                                SetRange1(100/(dataArray.length-1)-Range) 
                              }
                              }
                          /> */}

                            <Slider
                              key={Value.id}
                              id={Value.id}
                              name={Value.name}
                              value={Value.value}
                              total={TotalData.reduce(
                                (total, Value) => total + Value.value,
                                0
                              )}
                              onChange={handleChangeName}
                            />
                          </div>
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
                disabled={false}
                className="col-5 border-0 text-white"
                onClick={() => {
                  // come here
                  funForLastvalidation();
                  // setClick(Click + 1);
                }}
                style={{
                  backgroundColor: "#2188E7",
                  height: "40px",
                  borderRadius: 7,
                }}
              >
                Proceed
              </button>
            </div>
          </div>

          <div style={{ display: Click === 4 ? "block" : "none" }}>
            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: "70%",
                  background:
                    "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p style={{ color: "#8A8A8A" }}>
              5/6 <span sytle={{ color: "red" }}>Steps Completed</span>
            </p>
            <div className="row" style={{ justifyContent: "space-evenly" }}>
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Category :
                <span style={{ coor: "#000000" }}> {ValCat}</span>
              </p>
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Sub Category :
                <span style={{ coor: "#000000" }}>
                  {" "}
                  {ValCat} {SubCat}
                </span>
              </p>
            </div>

            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="col-7 ms-2 card">
                <div>
                  <span
                    style={{ fontSize: 18, fontWeight: 600, marginTop: "10px" }}
                  >
                    Enter Total Number of Questions
                  </span>
                  <input
                    className="col-12 border-0 mb-3"
                    style={{
                      textAlign: "start",
                      height: "50px",
                      backgroundColor: "#EFEFEF",
                      borderRadius: 7,
                      outline: 1,
                    }}
                    value={Question}
                    type="number"
                    onChange={(e) => {
                      setQuestion(e.target.value);
                      NoofQuesValidation(e.target.value);
                    }}
                  />
                  <div className="d-flex" style={{ fontSize: 12 }}>
                    <span
                      className="fw-600 mt-1"
                      style={{ color: validquescolor.min }}
                    >
                      Minimum 10 Questions
                    </span>
                    <span
                      className="ms-3 fw-600 mt-1"
                      style={{ color: validquescolor.max }}
                    >
                      Maximum 500 Questions
                    </span>
                  </div>
                  <div
                    className="d-flex mt-2"
                    style={{ fontSize: 13, justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600 }}>
                      Schedule Trivia
                    </span>
                    <span>min 10 sec</span>
                  </div>
                  <span>
                    <input
                      className="w-100"
                      type="range"
                      min={10}
                      max={60}
                      value={Trv}
                      onChange={(e) => setTrv(e.target.value)}
                    />
                    <span className="col-12" style={{ textAlign: "end" }}>
                      <p>{Trv}s</p>
                    </span>
                  </span>

                  <span
                    className="col-12"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="row">
                      <p
                        className="col-10"
                        style={{ fontSize: 16, fontWeight: 600 }}
                      >
                        Select Minimum Reward Percentage
                      </p>
                      <p className="col-2">50%</p>
                    </div>
                  </span>
                  <span>
                    <input
                      className="w-100"
                      type="range"
                      min={50}
                      max={100}
                      value={Range11}
                      onChange={(e) => SetRange11(e.target.value)}
                    />
                    <span className="col-12" style={{ textAlign: "end" }}>
                      <p>{Range11}%</p>
                    </span>
                  </span>
                  <span
                    style={{ fontSize: 16, fontWeight: 600, marginTop: "10px" }}
                  >
                    Enter Reward
                  </span>
                  <input
                    className="col-12 border-0 mb-3"
                    style={{
                      textAlign: "start",
                      height: "50px",
                      backgroundColor: "#EFEFEF",
                      borderRadius: 7,
                      outline: 1,
                    }}
                    value={BB}
                    type="number"
                    onChange={(e) => {
                      setBB(e.target.value);
                      setRewardColorFun(e.target.value);
                    }}
                  />

                  <span className="fw-600  mb-1" style={{ color: rewardcolor }}>
                    Maximum 50 BB Coins
                  </span>
                </div>
              </div>
              <div className="col-4 card" style={{ height: "180px" }}>
                {TotalData.map((res, key) => {
                  return (
                    <>
                      <div
                        className="mt-3"
                        key={key}
                        style={{ textAlign: "start" }}
                      >
                        <div
                          className="d-flex w-100"
                          style={{ justifyContent: "space-between" }}
                        >
                          <span
                            className="ms-3 fw-bolder"
                            style={{ fontSize: 14 }}
                          >
                            {res.name}
                          </span>
                          <span>{res.value}%</span>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            <button
              className="border-0 col-7 mt-3 rounded"
              style={{
                backgroundColor: "#2188E7",
                color: "#fff",
                height: "35px",
              }}
              disabled={Question.length >= 1 && BB.length >= 1 ? false : true}
              onClick={() => {
                setClick(Click + 1);
              }}
            >
              Proceed
            </button>
          </div>

          <div style={{ display: Click === 5 ? "block" : "none" }}>
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
              6/6 <span sytle={{ color: "red" }}>Steps Completed</span>
            </p>
            <div className="row" style={{ justifyContent: "space-evenly" }}>
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Category :<span style={{ coor: "#000000" }}>{ValCat}</span>
              </p>
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Sub Category :
                <span style={{ coor: "#000000" }}> {ValCat} </span>
                <span style={{ coor: "#000000" }}> {SubCat} </span>
              </p>
            </div>

            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="col-7 ms-2 card">
                <span style={{ fontWeight: "bolder", fontSize: 20 }}>
                  Enter Rules for Free Trivia
                </span>
                <textarea
                  className="border-0"
                  value={Rules}
                  onChange={(event) => {
                    setRules(event.target.value);
                  }}
                  placeholder="Start Typing the Rules"
                  style={{
                    backgroundColor: "#F5F5F5",
                    height: "150px",
                    borderRadius: 7,
                    outline: 1,
                    overflow: "hidden",
                  }}
                />
                <span
                  className="fw-600 mt-1"
                  style={{ color: "#B1B1B1", textAlign: "end" }}
                >
                  {Rules.length}/<span>2000</span>
                </span>
                {/* //come back here */}
                <span className="mt-2 col-12">
                  <div className="row mb-2">
                    <p
                      className="col-7"
                      style={{ fontWeight: "bolder", fontSize: 16 }}
                    >
                      Upload Banner Image
                    </p>
                    {/* <button className="col-5 border-0" style={{backgroundColor:"#EDF7FF",color:"#2188E7",borderRadius:7,display:(Replace==="replace")||(Banner.length===0)?"none":"block"}} 
                    onClick={()=>{setReplace("replace")}}>Replace Image</button> */}
                  </div>
                </span>
                {/* <div className="row">
                  <img src={Banner} style={{width:"90%",height:"150px",display:Banner.length===0||Replace==="replace"?"none":"block",}}/>
                            <label className="filelabel" style={{display:Banner.length>=2||Replace==="replace"?"none":"block",overflow:"hidden"}}>
                           
                                <span className="title">
                                   300px <span sytle={{}}>×</span>150px
                                </span>
                                <input className="FileUpload1" id="FileInput" name="booking_attachment" type="file" onChange={(e)=>{setBanner(URL.createObjectURL(e.target.files[0]));setImage(e.target.files[0])}}/>
                            </label> 
                  </div> */}
                <div className="row">
                  <label
                    className="filelabel"
                    style={{
                      display: Banner.length === 2 ? "none" : "block",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={Banner}
                      style={{ width: "90%", height: "150px" }}
                    />
                    <span className="title">
                      300px <span sytle={{}}>×</span>150px
                    </span>
                    <input
                      className="FileUpload1"
                      id="FileInput"
                      type="file"
                      onChange={(e) => {
                        setBanner(URL.createObjectURL(e.target.files[0]));
                        setImage(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="col-4 card">
                {TotalData.map((res, key) => {
                  return (
                    <>
                      <div
                        className="mt-3"
                        key={key}
                        style={{ textAlign: "start" }}
                      >
                        <div
                          className="d-flex w-100"
                          style={{ justifyContent: "space-between" }}
                        >
                          <span
                            className="ms-3 fw-bolder"
                            style={{ fontSize: 14 }}
                          >
                            {res.name}
                          </span>
                          <span>{res.value}%</span>
                        </div>
                      </div>
                    </>
                  );
                })}
                <hr />
                <div className="row">
                  <p className="col-7 fw-bolder" style={{ fontSize: 14 }}>
                    <p className="ms-3">Total Questions</p>
                  </p>
                  <span className="col-5">
                    <p className="ms-5">{Question}</p>
                  </span>
                  <p className="col-6 ms-3 fw-bolder" style={{ fontSize: 14 }}>
                    Time/Question
                  </p>
                  <span className="col-5">
                    <p className="ms-4 w-100">{Trv} sec</p>
                  </span>
                  <p className="col-7 fw-bolder" style={{ fontSize: 14 }}>
                    <p className="ms-3"> Reward</p>
                  </p>
                  <span className="col-5">
                    <p className="ms-4 w-100">{BB}</p>
                  </span>
                </div>
              </div>
            </div>
            <button
              className="border-0 col-7 mt-3 rounded"
              style={{
                backgroundColor: "#2188E7",
                color: "#fff",
                height: "35px",
              }}
              disabled={Rules.length >= 1 && Banner.length >= 1 ? false : true}
              onClick={() => {
                setClick(Click + 1);
              }}
            >
              Preview Quiz
            </button>
          </div>

          <div style={{ display: Click === 6 ? "block" : "none" }}>
            <div
              className="d-flex"
              style={{ justifyContent: "space-between", marginTop: "-10px" }}
            >
              <span style={{ fontSize: 25, fontWeight: 600, color: "#303030" }}>
                Preview
              </span>
              <span>
                <button
                  className="border-0"
                  style={{
                    backgroundColor: "#2188E7",
                    color: "#fff",
                    width: "150px",
                    height: "35px",
                    borderRadius: 7,
                  }}
                  disabled={ClickUp == true ? true : false}
                  onClick={() => {
                    setClickUp(true);
                    SendFree();
                  }}
                >
                  Publish Free Trivia
                </button>
              </span>
            </div>

            <div
              className="row mt-2"
              style={{ justifyContent: "space-evenly" }}
            >
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Category :<span style={{ coor: "#000000" }}>{ValCat}</span>
              </p>
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Sub Category :
                <span style={{ coor: "#000000" }}> {ValCat} </span>
                <span style={{ coor: "#000000" }}> {SubCat} </span>
              </p>
            </div>

            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="col-7 ms-2 card ">
                <span
                  className="mt-1"
                  style={{ fontSize: 18, fontWeight: 600, color: "#303030" }}
                >
                  Question Composition
                </span>
                {TotalData.map((res, key) => {
                  return (
                    <>
                      <div
                        className="mt-3"
                        key={key}
                        style={{ textAlign: "start" }}
                      >
                        <div
                          className="d-flex"
                          style={{ justifyContent: "space-between" }}
                        >
                          <span
                            className="ms-3 fw-bolder"
                            style={{ fontSize: 14 }}
                          >
                            {res.name}
                          </span>
                          <span style={{ marginLeft: "190px" }}>
                            {res.value}%
                          </span>
                          <br />
                        </div>

                        <input
                          className="w-100"
                          type="range"
                          name="rangeInput"
                          value={res.value}
                        />
                      </div>
                    </>
                  );
                })}
                <span
                  className="mt-2"
                  style={{ fontSize: 18, fontWeight: 600, color: "#303030" }}
                >
                  Banner Image
                </span>
                <img
                  className="rounded mt-1 mb-1"
                  src={Banner}
                  style={{ width: "100%", height: "150px" }}
                />
                <span
                  className="mt-2"
                  style={{ fontSize: 18, fontWeight: 600, color: "#303030" }}
                >
                  Rules
                </span>
                {Rules}
              </div>
              <div className="col-4 card" style={{ height: "200px" }}>
                <div className="row">
                  <span
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <p className="fw-bolder" style={{ fontSize: 14 }}>
                      Total Questions
                    </p>
                    <p>{Question}</p>
                  </span>

                  <span
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <p className="fw-bolder" style={{ fontSize: 14 }}>
                      Time/Question
                    </p>
                    <p>{Range11} sec</p>
                  </span>

                  <hr />

                  <span
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <p className="fw-bolder" style={{ fontSize: 14 }}>
                      Reward
                    </p>
                    <p>{BB}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: Click === 7 ? "block" : "none" }}>
            <div style={{ textAlign: "center", alignItems: "center" }}>
              <p
                className="mt-3"
                style={{ fontSize: "25px", fontWeight: "bolder" }}
              >
                Free Trivia Published
                <br />
                Successfully
              </p>
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
                className="border-0 col-4 mt-4  "
                type="button"
                style={{
                  backgroundColor: "#0CBC8B",
                  color: "#fff",
                  height: "40px",
                  borderRadius: 7,
                }}
                onClick={() => {
                  setShow(false);
                  setGoy(1);
                  setClick(0);
                  setTimeout(() => {
                    setGoy(0);
                  }, 100);
                  setCategoryImg("");
                  setValCat("");
                  setSelect("");
                  setSubCat("");
                  setSelectSub("");
                  setdataArray([]);
                  setQuestion("");
                  setClickUp(false);
                }}
              >
                Back To Dashboard
              </button>
            </div>
            <div
              className="mt-5"
              style={{ textAlign: "center", alignItems: "center" }}
            >
              <p style={{ color: "#8A8A8A" }}>
                This tab will automatically close in
                <span style={{ color: "#CC1313", fontSize: 20 }}>
                  {" "}
                  {Timer}{" "}
                </span>
                Seconds
              </p>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShow1(false)}
          show={show1}
          delay={8000}
          autohide
          style={{ backgroundColor: "#f27474" }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">brainbucks</strong>
            <small>Just Now</small>
          </Toast.Header>
          <Toast.Body className="text-white">{message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div style={{ overflowY: "scroll", height: "72vh", overflowX: "hidden" }}>
        <FreeTrivaEdit onpress={Goy} Handel={handleShow} />
      </div>

      <Toaster />
    </div>
  );
};

export default FreeTrivia;
