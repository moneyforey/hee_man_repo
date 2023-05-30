import { useState, useEffect } from "react";
import SearchIcon from "../../Img/ri_search-line.svg";
import DatePicker from "react-datepicker";
import Dates from "../../Img/Date.svg";
import "./Active.css";
import "react-datepicker/dist/react-datepicker.css";
import ActiveQuizeEdit from "./ActiveQuizeEdit";
import Lottie from "lottie-react";
import Clebrate from "../../Img/lf20_IBRRl8.json";
import { useLocation } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { ToastContainer as Toaster, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
const initColors = {
  min: "#B1B1B1",
  max: "#B1B1B1",
};

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
      {/* <label className="form-label">{props.name} <span>{value}</span></label> */}
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

const initLoader = {
  isLoading: false,
  isError: false,
};
const initRes_Add = {
  isPending: false,
  isRejected: false,
};
const Active = () => {
  const Dt = new Date();
  const New =
    Dt.getDate() + "/" + (parseInt(Dt.getMonth()) + 1) + "/" + Dt.getFullYear();
  //  console.log(JSON.stringify(New));

  const location = useLocation();
  const [Token, setToken] = useState("");
  const [Click, setClick] = useState(0);
  const [Select, setSelect] = useState("");
  const [SelectSub, setSelectSub] = useState("");
  const [dataArray, setdataArray] = useState([]);
  const [SubCatName, setSubCatName] = useState([]);
  const [Value1, setValue1] = useState("");
  const [Range, SetRange] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [Banner, setBanner] = useState("");
  const [Question, setQuestion] = useState("");
  const [Rules, setRules] = useState("");
  const [Range1, SetRange1] = useState();
  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [Result, setResult] = useState("");
  const [Subject, setSubject] = useState([]);
  const [SubjectId, setSubjectId] = useState([]);
  const [TimePerQuestion, setTimePerQuestion] = useState(10);
  const [TotalSlots, setTotalSlots] = useState("");
  const [EnteryFee, setEnteryFee] = useState("");
  const [Banner1, setBanner1] = useState("");
  const [time, setTime] = useState(0);
  const [TotalData, setTotalData] = useState([]);
  const [Goy, setGoy] = useState(0);
  const [Image2, setImage2] = useState("");
  const [Times, setTimes] = useState("");
  const [Sedule, setSedule] = useState(New);
  const [arr, setArr] = useState([]);
  const [validquescolor, setValidQuescolor] = useState(initColors);
  const [rewardcolor1, setRewardColor1] = useState("#B1B1B1");
  const [rewardcolor2, setRewardColor2] = useState("#B1B1B1");
  const [filterCatrgory, setFilterCatrgory] = useState([]);
  const [filterSubCatrgory, setFilterSubCatrgory] = useState([]);
  const [filterSubjects, setFilterSubjects] = useState([]);
  const [Repeat, setRepeat] = useState("0");
  const [message, setmessage] = useState("");
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const [Timer, setTimers] = useState(15);
  const [ClickUp, setClickUp] = useState(false);
  const [loader, setLoader] = useState(initLoader);
  const [res_add, setRes_Add] = useState(initRes_Add);

  //required destructuring form state objects
  const { isLoading } = loader;
  const { isPending } = res_add;

  //function for on/off offcanvas
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

  //function for checking valid reward value
  const setRewardColorFun1 = (n) => {
    if (n < 10) {
      setRewardColor1("red");
    } else if (n >= 10) {
      setRewardColor1("green");
    }
  };

  //function for checking valid reward color
  const setRewardColorFun2 = (n) => {
    if (n < 10) {
      setRewardColor2("red");
    } else if (n >= 10) {
      setRewardColor2("green");
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

  //function for setting color for validatin on no of questions
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

  const handleChanges = (e, index) => {
    // console.log(e);
    const newValue = parseInt(e.target.value);
    let newValues = [...arr];
    let newData = [...TotalData];
    // decrease the first input value
    if (index === 0) {
      const diff = arr[0] - newValue;
      newValues[0] = newValue;
      newData[0].value = newValue;
      for (let i = 1; i < newValues.length; i++) {
        newValues[i] += diff / (newValues.length - 1);
        newData[i].value += diff / (newValues.length - 1);
      }
    } else {
      // find the index of the previous input
      const prevIndex = index - 1;
      // find the index of the next input
      const nextIndex = index + 1;

      // increase the next input value
      if (newValue > arr[index] && nextIndex < newValues.length) {
        const diff = newValue - arr[index];
        if (newValues[nextIndex] >= diff) {
          newValues[index] = newValue;
          newData[index].value = newValue;
          newValues[nextIndex] -= diff;
          newData[nextIndex].value = newValue;
        } else {
          newValues[index] = arr[index] + newValues[nextIndex];
          newData[index].value = arr[index] + newValues[nextIndex];
          newValues[nextIndex] = 0;
          newData[nextIndex].value = 0;
          newValues = handleChange(prevIndex, {
            target: { value: newValue },
          });
        }

        // decrease the next input value
      } else if (newValue < arr[index] && nextIndex < newValues.length) {
        const diff = TotalData[index] - newValue;
        if (newValues[nextIndex] + diff <= 100) {
          newValues[index] = newValue;
          newData[index].value = newValue;
          newValues[nextIndex] += diff;
          newData[nextIndex].value += diff;
        } else {
          const newVal = 100 - newValues[nextIndex];
          newValues[index] = newValue;
          newData[index].value = newValue;
          newValues[nextIndex] = 100 - newValues[nextIndex];
          newData[nextIndex].value = 100 - newValues[nextIndex];
          newValues = handleChange(prevIndex, {
            target: { value: newVal },
          });
        }
      }
    }

    setArr([...newValues]);
    setTotalData([...newData]);
    return newValues;
  };

  //function for validate  the sum of all the subject is 100 or not
  const funForLastvalidation = () => {
    let sum = TotalData.reduce((total, Value) => total + Value.value, 0);
    if (sum !== 100) {
      toast("Sum of Question should be 100%");
    } else {
      setClick(Click + 1);
    }
  };

  //function for getting all the categories
  const APi = async () => {
    try {
      const Responce = await fetch(
        "https://brainbucks.co.in/api/admin/categorylist"
      );
      const Data = await Responce.json();
      setCategory(Data);
      setFilterCatrgory(Data);
    } catch (error) {
      console.log(error);
    }
  };

  //function for getting all the subcatogries under the selected category
  const Api1 = async () => {
    try {
      const war = await fetch(
        `https://brainbucks.co.in/api/admin/subcategorylist?parent_id=${Select}&token=${Token}`
      );
      const response1 = await war.json();

      if (response1.status) {
        // console.log(response1.message);
        setSubCategory(response1.data);
        setFilterSubCatrgory(response1.data);
      } else {
        // alert(response1.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function  for getting all the subject under the subcategory selected
  const Api2 = async () => {
    try {
      const war1 = await fetch(
        `https://brainbucks.co.in/api/admin/subjectslist?subcategory_id=${SelectSub}`
      );
      const response2 = await war1.json();

      setSubject(response2.data);
      setFilterSubjects(response2.data);
    } catch (error) {
      console.log(error);
    }
  };

  //function for adding the new quize
  const Send = async () => {
    setRes_Add({
      ...res_add,
      isPending: true,
    });
    var formdata = new FormData();
    formdata.append("subject_id", JSON.stringify(TotalData));
    formdata.append("total_question", Question);
    formdata.append("category_id", Select);
    formdata.append("subcategory_id", SelectSub);
    formdata.append("question_time", TimePerQuestion);
    formdata.append("rule", Rules);
    formdata.append("schedule_quizze", Sedule);
    formdata.append("total_slot", TotalSlots);
    formdata.append("entry_fee", EnteryFee);
    formdata.append("quizze_image", Banner1);
    formdata.append("questions", "1,2,3");
    formdata.append("quizze_time", Times);
    formdata.append("token", Token);
    formdata.append("repeat", Repeat);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/quizzes", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        if (result.status == 1) {
          setRes_Add({
            ...res_add,
            isPending: false,
          });
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
          // setShow1(true);
          toast(result.message);
          setRes_Add({
            ...res_add,
            isPending: false,
          });
        }
      })
      .catch((error) => {
        setRes_Add({
          ...res_add,
          isPending: false,
        });
        console.log("error", error);
      });
  };

  //all the validation for form and functionality of add quiz come under come under this function
  const moveOnToLast = () => {
    if (Click === 0) {
      Result.length === 0
        ? toast("Please select the category")
        : setClick(Click + 1);
    } else if (Click === 1) {
      SubCatName.length === 0
        ? toast("Please select the sub-category")
        : setClick(Click + 1);
    } else if (Click === 2) {
      dataArray.length === 0
        ? toast("Please select the subjects")
        : setClick(Click + 1);
    } else if (Click === 4) {
      Question.length >= 1 && startDate && Times
        ? toast("Please select the subjects")
        : setClick(Click + 1);
    }
  };

  //conditions for checking the timers round and assign the value accordingly
  if (Timer == 0) {
    setShow(false);
    setTimers(15);
    setGoy(1);
    setClick(0);
    setTimeout(() => {
      setGoy(0);
    }, 100);
    setSelect("");
    setSelectSub("");
    setdataArray([]);
    setQuestion("");
    setTimePerQuestion(10);
    setTotalSlots("");
    setEnteryFee("");
    setBanner1("");
    setRules([]);
    setSubCatName([]);
    setBanner("");
    setTotalData([]);
    setTimes("");
    setRepeat("0");
    setClickUp(false);
  }

  useEffect(() => {
    APi();
    setToken(localStorage.getItem("token"));
  }, []);

  //  const handleRangeChange = (index, event) => {
  //   console.log(TotalData[index].value);
  //   const newRangeValues = [...[TotalData[index].value]];
  //   const diff = event.target.valueAsNumber - newRangeValues[index];
  //   newRangeValues[index] = event.target.valueAsNumber;

  //   if (index === 0) {
  //     // If the first input is changed, adjust the second and third inputs accordingly
  //     const secondInputDiff = -diff / 2;
  //     newRangeValues[1] = Math.max(0, newRangeValues[1] + secondInputDiff);
  //     newRangeValues[2] = Math.max(0, newRangeValues[2] - secondInputDiff);
  //   } else if (index === newRangeValues.length - 1) {
  //     // If the last input is changed, adjust the first and second inputs accordingly
  //     const secondInputDiff = diff / 2;
  //     newRangeValues[0] = Math.max(0, newRangeValues[0] + secondInputDiff);
  //     newRangeValues[1] = Math.max(0, newRangeValues[1] - secondInputDiff);
  //   } else {
  //     // If any other input is changed, adjust the adjacent inputs accordingly
  //     if (diff > 0) {
  //       // If the input is increased, decrease the next input by the same amount
  //       const nextInputDiff = -diff;
  //       newRangeValues[index + 1] = Math.max(
  //         0,
  //         newRangeValues[index + 1] + nextInputDiff
  //       );
  //     } else {
  //       // If the input is decreased, increase the previous input by the same amount
  //       const prevInputDiff = -diff;
  //       newRangeValues[index - 1] = Math.max(
  //         0,
  //         newRangeValues[index - 1] + prevInputDiff
  //       );
  //     }
  //   }

  //   // Ensure that the sum of all inputs equals 100
  //   const sum = newRangeValues.reduce((total, value) => total + value, 0);
  //   const factor = 100 / sum;
  //   setTotalData(newRangeValues.map((value) => Math.round(value * factor)));
  // };

  //  const renderRangeInputs = () => {
  //   return TotalData.map((value, index) => (
  //     <>
  //     <input
  //       key={index}
  //       type="range"
  //       min="0"
  //       max="100"
  //       step={1}
  //       value={value.value}
  //       onChange={(event) => handleRangeChange(index,event)}
  //     />
  //     <p>{value.value}</p>
  //     </>
  //   ));
  // };

  return (
    <>
      <div style={{ height: "73vh", overflowY: "scroll", overflowX: "hidden" }}>
        <ActiveQuizeEdit onpress={Goy} Handel={handleShow} />
      </div>

      <Offcanvas
        show={show}
        className="w-50"
        onHide={handleClose}
        placement="end"
        style={{ borderTopLeftRadius: 30, width: "50%" }}
      >
        <Offcanvas.Header>
          <div>
            <span
              style={{
                color: "#000",
                fontWeight: "600",
                display: Click === 8 ? "none" : "block",
                cursor: "pointer",
              }}
              onClick={() => {
                setClick(0);
                setShow(false);
                setSelect("");
                setSelectSub("");
                setdataArray([]);
                setQuestion("");
                setTimePerQuestion(10);
                setTotalSlots("");
                setEnteryFee("");
                setBanner1("");
                setClickUp(false);
                setRules([]);
                setSubCatName([]);
                setBanner("");
                setTotalData([]);
                setTimes("");
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
                marginLeft: "5px",
                fontWeight: "600",
                display: Click >= 7 ? "none" : "block",
                marginTop: 20,
              }}
            >
              Add New Quiz
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
                    width: "14%",
                    background:
                      "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div style={{ color: "#8A8A8A" }}>
                1/7 <span sytle={{ color: "#000" }}>Steps Completed</span>
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
                                setResult(res.category_name);
                                setImage2(res.category_image);
                              }}
                            />
                            <img
                              alt="#"
                              src={res.category_image}
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                              }}
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
                disabled={Result.length >= 1 ? false : true}
                className="col-5 border-0 text-white"
                onClick={() => {
                  // setClick(Click + 1);
                  moveOnToLast();
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
                2/7 <span sytle={{ color: "red" }}>Steps Completed</span>
              </p>
              <div>
                <p style={{ fontSize: 16, fontWeight: 600 }}>
                  Exam Category : <span>{Result}</span>
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
                                setSubCatName(res.subcategory);
                              }}
                            />
                            <img
                              alt="#"
                              src={Image2}
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                              }}
                            />
                            <span className="ms-3 fw-bolder">
                              {Result} {res.subcategory}
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
                disabled={SubCatName.length >= 1 ? false : true}
                className="col-5 border-0 text-white"
                onClick={() => {
                  moveOnToLast();
                  // setClick(Click + 1);
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
                3/7 <span sytle={{ color: "red" }}>Steps Completed</span>
              </p>
              <div className="row" style={{ justifyContent: "space-evenly" }}>
                <p
                  className="col-6"
                  style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
                >
                  Exam Category :
                  <span style={{ coor: "#000000" }}>{Result}</span>
                </p>
                <p
                  className="col-6"
                  style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
                >
                  Exam Sub Category :
                  <span style={{ coor: "#000000" }}>{Result}</span>
                  <span style={{ coor: "#000000" }}> {SubCatName}</span>
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
                              onChange={(e) => {
                                handleChange(e);
                              }}
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
                  // setClick(Click + 1);
                  moveOnToLast();
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
                4/7 <span sytle={{ color: "red" }}>Steps Completed</span>
              </p>
              <div className="row" style={{ justifyContent: "space-evenly" }}>
                <p
                  className="col-6"
                  style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
                >
                  Exam Category :
                  <span style={{ coor: "#000000" }}>{Result}</span>
                </p>
                <p
                  className="col-6"
                  style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
                >
                  Exam Sub Category :
                  <span style={{ coor: "#000000" }}>{Result}</span>
                  <span style={{ coor: "#000000" }}> {SubCatName}</span>
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
                className="col-5 border-0 text-white"
                onClick={() => {
                  funForLastvalidation();
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
          {/* come here */}
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
              5/7 <span sytle={{ color: "red" }}>Steps Completed</span>
            </p>
            <div className="row" style={{ justifyContent: "space-evenly" }}>
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Category :<span style={{ coor: "#000000" }}>{Result}</span>
              </p>
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Sub Category :
                <span style={{ coor: "#000000" }}>{Result}</span>
                <span style={{ coor: "#000000" }}> {SubCatName}</span>
              </p>
            </div>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="col-7 ms-2 card">
                <div>
                  <p
                    style={{ fontSize: 20, fontWeight: 600, color: "#303030" }}
                  >
                    Enter Total Number of Questions
                  </p>
                  <input
                    className="col-12 border-0 mb-3"
                    style={{
                      textAlign: "start",
                      height: "50px",
                      backgroundColor: "#EFEFEF",
                      borderRadius: 7,
                      outline: 1,
                    }}
                    min="10"
                    max="500"
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
                    <p
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#303030",
                      }}
                    >
                      Select Time Per Question
                    </p>
                    <span>10 sec</span>
                  </div>
                  <span>
                    <input
                      className="w-100"
                      type="range"
                      min="10"
                      max="60"
                      value={TimePerQuestion}
                      onChange={(e) => {
                        setTimePerQuestion(e.target.value);
                      }}
                    />
                    <span
                      className="d-flex"
                      style={{ justifyContent: "end", alignItems: "end" }}
                    >
                      <p>{TimePerQuestion}s</p>
                    </span>
                  </span>

                  <span style={{ fontSize: 16, fontWeight: 600 }}>
                    Schedule Quiz
                  </span>
                  <div className="row ">
                    <span
                      className="col-4 ms-2 d-flex rounded"
                      style={{
                        backgroundColor: "#EFEFEF",
                        overflow: "hidden",
                        height: "35px",
                      }}
                    >
                      <img className="mt-1" src={Dates} alt="#" />
                      <DatePicker
                        className="Main"
                        dateFormat="yyyy/MM/dd"
                        selected={startDate}
                        onChange={(date: Date) => {
                          setStartDate(date);
                          setSedule(
                            date.getDate() +
                              "/" +
                              (parseInt(date.getMonth()) + 1) +
                              "/" +
                              date.getFullYear()
                          );
                        }}
                      />
                    </span>
                    <span
                      className="col-4 ms-4 rounded"
                      style={{ backgroundColor: "#EFEFEF", height: "35px" }}
                    >
                      <input
                        className="border-0 rounded mt-1"
                        type="time"
                        style={{
                          backgroundColor: "#EFEFEF",
                          color: "#8A8A8A",
                          outline: "none",
                        }}
                        value={Times}
                        onChange={(e) => {
                          setTimes(e.target.value);
                        }}
                      />
                    </span>
                  </div>
                  <div className="mt-3 mb-2 d-flex">
                    <p
                      className="mt-2"
                      style={{
                        color: "#303030",
                        fontWeight: "bolder",
                        fontSize: 16,
                      }}
                    >
                      Repeat Quiz After Minutes
                      <span
                        style={{
                          color: "#303030",
                          fontWeight: 300,
                          fontSize: 16,
                        }}
                      >
                        {" "}
                        (optional)
                      </span>
                    </p>
                    <select
                      className="ms-5 rounded border-0"
                      style={{
                        background: "#EFEFEF",
                        color: "#00000",
                        height: "35px",
                        outline: "none",
                      }}
                      onChange={(e) => setRepeat(e.target.value)}
                    >
                      <option value="0">Naver Repeat</option>
                      <option value="5">5 Min</option>
                      <option value="15">15 Min</option>
                      <option value="30">30 Min</option>
                      <option value="45">45 Min</option>
                      <option value="60">60 Min</option>
                      {/* <option>1 Months</option>
                      <option>6 Months</option>
                      <option>1 years</option> */}
                    </select>
                  </div>
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
              disabled={
                Question.length >= 1 && startDate && Times ? false : true
              }
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
                  width: "84%",
                  background:
                    "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p style={{ color: "#8A8A8A" }}>
              6/7 <span sytle={{ color: "red" }}>Steps Completed</span>
            </p>
            <div className="row" style={{ justifyContent: "space-evenly" }}>
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Category :<span style={{ coor: "#000000" }}>{Result}</span>
              </p>
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Sub Category :
                <span style={{ coor: "#000000" }}>{Result}</span>
                <span style={{ coor: "#000000" }}> {SubCatName}</span>
              </p>
            </div>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="col-7 ms-2 card">
                <span style={{ fontWeight: "bolder", fontSize: 20 }}>
                  Enter Total Slots
                </span>
                <input
                  type="number"
                  min="10"
                  className="border-0"
                  style={{
                    backgroundColor: "#F5F5F5",
                    height: "40px",
                    borderRadius: 7,
                  }}
                  onChange={(e) => {
                    setTotalSlots(e.target.value);
                    // hell0
                    setRewardColorFun1(e.target.value);
                  }}
                />
                <span className="fw-600 mt-1" style={{ color: rewardcolor1 }}>
                  Minimum 10 Slots
                </span>
                <span
                  className="mt-2"
                  style={{ fontWeight: "bolder", fontSize: 16 }}
                >
                  Select Entry Fees
                </span>
                <input
                  type="number"
                  min="10"
                  className="border-0"
                  style={{
                    backgroundColor: "#F5F5F5",
                    height: "40px",
                    borderRadius: 7,
                  }}
                  onChange={(e) => {
                    setEnteryFee(e.target.value);
                    setRewardColorFun2(e.target.value);
                  }}
                />
                <span className="fw-600 mt-1" style={{ color: rewardcolor2 }}>
                  Minimum 10 BB Coins
                </span>
                <span
                  className="mt-2"
                  style={{ fontWeight: "bolder", fontSize: 16 }}
                >
                  Upload Banner Image
                </span>
                <div className="row">
                  <label
                    className="filelabel"
                    style={{
                      display: Banner.length === 2 ? "none" : "block",
                      overflow: "hidden",
                    }}
                  >
                    {Banner ? (
                      <img
                        src={Banner}
                        style={{ width: "90%", height: "150px" }}
                      />
                    ) : (
                      <h2
                        style={{
                          color: "gray",
                        }}
                      >
                        Upload file
                      </h2>
                    )}
                    <span className="title">
                      300px <span>×</span>150px
                    </span>
                    <input
                      className="FileUpload1"
                      id="FileInput"
                      type="file"
                      onChange={(e) => {
                        setBanner(
                          URL.createObjectURL(e.target.files[0]),
                          setBanner1(e.target.files[0])
                        );
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
                    <p className="ms-4 w-100">{20} sec</p>
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
              disabled={
                TotalSlots.length >= 1 &&
                EnteryFee.length >= 1 &&
                Banner.length >= 1
                  ? false
                  : true
              }
              onClick={() => {
                setClick(Click + 1);
              }}
            >
              Proceed
            </button>
          </div>

          <div style={{ display: Click === 6 ? "block" : "none" }}>
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
              7/7 <span sytle={{ color: "red" }}>Steps Completed</span>
            </p>
            <div className="row" style={{ justifyContent: "space-evenly" }}>
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Category :<span style={{ coor: "#000000" }}>{Result}</span>
              </p>
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Sub Category :
                <span style={{ coor: "#000000" }}>{Result}</span>
                <span style={{ coor: "#000000" }}> {SubCatName}</span>
              </p>
            </div>

            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="col-7 ms-2 card">
                <span style={{ fontWeight: "bolder", fontSize: 20 }}>
                  Enter Rules for Quiz
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
                <span className="fw-600 mt-1" style={{ color: "#B1B1B1" }}>
                  Use # for Seperate Rules/Line
                </span>
                <span
                  className="fw-600 mt-1"
                  style={{ color: "#B1B1B1", textAlign: "end" }}
                >
                  {Rules.length}/<span>2000</span>
                </span>

                <span
                  className="mt-2"
                  style={{ fontWeight: "bolder", fontSize: 16 }}
                >
                  Upload Banner Image
                </span>
                <div className="row">
                  <img src={Banner} style={{ width: "90%", height: "150px" }} />
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
                    <p className="ms-4 w-100">{20} sec</p>
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
              onClick={() => {
                setClick(Click + 1);
              }}
            >
              Preview Quiz
            </button>
          </div>

          <div style={{ display: Click === 7 ? "block" : "none" }}>
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
                  // disabled={ClickUp == true ? true : false}
                  onClick={() => {
                    Send();
                    setClickUp(true);
                  }}
                >
                  {isPending ? <Spinner /> : " Publish New Quiz"}
                </button>
              </span>
            </div>

            <div
              className="row mt-4"
              style={{ justifyContent: "space-evenly" }}
            >
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Category :<span style={{ coor: "#000000" }}>{Result}</span>
              </p>
              <p
                className="col-6"
                style={{ fontSize: 16, fontWeight: 600, color: "#303030" }}
              >
                Exam Sub Category :
                <span style={{ coor: "#000000" }}>{Result}</span>
                <span style={{ coor: "#000000" }}> {SubCatName}</span>
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
                  alt="#"
                />
                <span
                  className="mt-2"
                  style={{ fontSize: 18, fontWeight: 600, color: "#303030" }}
                >
                  Rules
                </span>
                <span>{Rules}</span>
                {/* <div>
                    {Rules.split("#").map((value,key)=>{
                      return(
                        <ul key={key}>{value}</ul>
                      )
                    })}
                    </div> */}
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
                    <p>{20} sec</p>
                  </span>

                  <hr />

                  <span
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <p className="fw-bolder" style={{ fontSize: 14 }}>
                      Reward
                    </p>
                    <p>{20}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: Click === 8 ? "block" : "none" }}>
            <div style={{ textAlign: "center", alignItems: "center" }}>
              <p
                className="mt-3"
                style={{ fontSize: "25px", fontWeight: "bolder" }}
              >
                Active Quiz Published
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
              {/* <NavLink to="/Exam"> */}
              <button
                className="border-0 col-4 mt-4"
                style={{
                  backgroundColor: "#0CBC8B",
                  color: "#fff",
                  height: "40px",
                  borderRadius: 7,
                }}
                onClick={() => {
                  setGoy(1);
                  setClick(0);
                  setShow(false);
                  setTimeout(() => {
                    setGoy(0);
                  }, 100);
                  setSelect("");
                  setSelectSub("");
                  setdataArray([]);
                  setQuestion("");
                  setClickUp(false);
                  setTimePerQuestion(10);
                  setTotalSlots("");
                  setEnteryFee("");
                  setBanner1("");
                  setRules([]);
                  setSubCatName([]);
                  setBanner("");
                  setTimes("");
                }}
              >
                Back to Dashboard
              </button>
              {/* </NavLink> */}
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
          style={{ backgroundColor: "#000" }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">brainbucks</strong>
            <small>1 mins ago</small>
          </Toast.Header>
          <Toast.Body className="text-white">{message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Toaster />
    </>
  );
};

export default Active;
