import { useState, useEffect } from "react";
import Image1 from "../../Img/ic_round-category.svg";
import Image2 from "../../Img/mdi_subtasks.svg";
import Image3 from "../../Img/bb coin 1.svg";
import Image4 from "../../Img/carbon_trophy-filled.svg";
import Image5 from "../../Img/mdi_clock-outline.svg";
import DatePicker from "react-datepicker";
import Dates from "../../Img/Date.svg";
// import { FaArrowRight } from "react-icons/fa";
import SearchIcon from "../../Img/ri_search-line.svg";
import ProgressBar from "react-bootstrap/ProgressBar";
import Wallet from "../../Img/Wallet.svg";
// import Card from 'react-bootstrap/Card';
// import DatesImg from "../../Img/Date.svg";
import LoaderComponent from "../Utils/LoaderComponent";
import QuizHistory from "./QuizHistory";
import { toast } from "react-toastify";
import EmptyContainer from "../Utils/EmptyContainer";

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
    <div className="slider w-50">
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

const ActiveQuizeEdit = (props) => {
  const [Overview, setOverview] = useState("");
  const [Token, setToken] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [Datas, setDatas] = useState([]);
  const [Data1, setData1] = useState([]);
  const [Edit3, setEdit3] = useState("");
  const [Edit4, setEdit4] = useState("");
  const [Edit5, setEdit5] = useState("");
  const [Edit6, setEdit6] = useState("");
  const [Edit7, setEdit7] = useState();
  const [bannerImage, setbannerImage] = useState("");
  const [BannerShow, setBannerShow] = useState("");
  const [TotalData, setTotalData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [Fire1, setFire1] = useState("");
  const [Fire2, setFire2] = useState("");
  const [Fire3, setFire3] = useState("");
  const [Fire4, setFire4] = useState("");
  const [Fire5, setFire5] = useState([]);
  const [Fire6, setFire6] = useState("");
  const [filled, setFilled] = useState();
  const [ChangesNo, setChangesNo] = useState("");
  const [HistryData, setHistryData] = useState([]);
  const [last_page, setLastPage] = useState();
  const [loader, setLoader] = useState(initLoader);
  const { isLoading } = loader;

  //function for getting the history of particular quiz
  const Histry = async (id) => {
    var formdata = new FormData();
    formdata.append("token", Token);
    formdata.append("id", id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`https://brainbucks.co.in/api/admin/quizz-history`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 1) {
          setHistryData(result.data);
          setLastPage(result.data.last_page);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // function for filteration
  function updateResult() {
    const newData = Datas.filter((el) => {
      if (search.length === 0) {
        return el;
      }
      return el.category.category_name
        .toLowerCase()
        .startsWith(search.toLowerCase());
    });
    setFilterData([...newData]);
  }

  //function for handle search functionlity on Enter Key
  const handleSearchFunctionlity = (e) => {
    const { key, target } = e;
    const { value } = target;
    setSearch(value);
    if (key === "Enter") {
      //  console.log("search",search);
      updateResult();
    }

    // console.log(key);
  };

  //function for
  function handleChangeName(id, value) {
    const newSubjects = Fire5.map((subject) => {
      if (subject.id === id) {
        return { ...subject, value };
      } else {
        return subject;
      }
    });

    setFire5([...newSubjects]);
  }

  //final function for save the changes to database
  const functionSave = (id) => {
    SendQuize(id);
  };

  const handleChange = (e) => {
    let subjects = [...TotalData];

    if (e.target.change) {
      subjects.push({
        id: e.target.id,
        name: e.target.name,
        value: e.target.value,
      });
    }

    setTotalData(subjects);
  };

  //function for hit the api for getting the quizs
  const Api = async () => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    try {
      const Responce = await fetch(
        "https://brainbucks.co.in/api/admin/quizzelist"
      );
      const Data = await Responce.json();
      if (Data.status === 1) {
        //  console.log(Data);
        setDatas(Data.data);
        setFilterData(Data.data);
        setLoader({
          ...loader,
          isLoading: false,
        });
      } else {
        // alert(Data.message);
        setLoader({
          ...loader,
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
      setLoader({
        ...loader,
        isLoading: false,
      });
    }
  };

  //function for getting the data of darticular quiz
  const Api1 = async (ID) => {
    try {
      const Responce = await fetch(
        `https://brainbucks.co.in/api/admin/quizzeget?id=${ID}`
      );
      const Data = await Responce.json();

      if (Data.status === 1) {
        // console.log("data id",Data);
        setData1(Data.data);
        setEdit3(Data.data[0].rules);
        setEdit4(Data.data[0].total_slot);
        setEdit7(Data.data[0].question_time);
        setEdit5(Data.data[0].entry_fee);
        setEdit6(Data.data[0].total_question);
        setEdit7(Data.data[0].question_time);
        setBannerShow(Data.data[0].quizze_image);
        setFire1(Data.data[0].quizze_image);
        setFire2(Data.data[0].category.category_name);
        setFire3(Data.data[0].subcategory.subcategory);
        setFire4(Data.data[0].id);
        setFire5(JSON.parse(Data.data[0].subject_id));
        setFire6(Data.data[0].category.category_image);
      } else {
        toast(Data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function for the hit the api for updating the particular quiz;
  const SendQuize = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("location", "");
    var formdata = new FormData();
    formdata.append("subject_id", JSON.stringify(Fire5));
    formdata.append("id", id);
    formdata.append("question_time", Edit7);
    formdata.append("total_slot", Edit4);
    formdata.append("total_question", Edit6);
    formdata.append("rule", Edit3);
    formdata.append("schedule_quizze", startDate);
    formdata.append("entry_fee", Edit5);
    formdata.append("quizze_image", bannerImage);
    formdata.append("token", Token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/quizzeup", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //  console.log("eidteddata",result);
        if (result.status === 1) {
          toast(result.message);
        } else {
          toast(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };



  //function for action passing in empty container;
  const actionToFetchBack=()=>{
    setFilterData(Datas)
  }

  if (props.onpress > 0) {
    Api();
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setOverview("Overview");
    Api();
  }, []);

  return (
    <div>


      
      <div className="row">
        <div className="col-6 d-flex">
          <div className="col-8">
            <h5 className="mt-1">
              Showing total
              <span style={{ color: "red" }}> {Datas.length} </span>
              Active Quizzes
            </h5>
          </div>
          <div className="col-4">
            <button
              onClick={props.Handel}
              style={{
                backgroundColor: "#EDF7FF",
                border: "1px solid #2188E7",
                height: "40px",
                borderRadius: "10px",
                color: "#2188E7",
              }}
            >
              <span className="p-3"> + Add Quiz</span>
            </button>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-6">
              <div
                className="row"
                style={{
                  border: "1px solid #D9D9D9",
                  height: "40px",
                  borderRadius: "7px",
                }}
              >
                <div className="col-2 mt-1">
                  <img alt="SearchIcon" src={SearchIcon} />
                </div>
                <div className="col-10 mt-1 ">
                  <input
                    className="border-0 w-100"
                    placeholder="Search for Exam Category"
                    style={{
                      textDecoration: "none",
                      outline: "none",
                      color: "#272727",
                    }}
                    onKeyPress={handleSearchFunctionlity}
                    onChange={(e) => setSearch(e.target.value)}
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
                }}
                onClick={updateResult}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {isLoading ? (
          <LoaderComponent />
        ) : (
          filterData.length === 0?<EmptyContainer actionName='Fetch All Data' action={actionToFetchBack} message='No Data Found'/>:
          filterData?.map((res, key) => {
            return (
              <>
                <div className="col-md-4 col-sm-12 col-xl-4 mt-3" key={key}>
                  <div className="card">
                    <div className="d-flex">
                      <div className="col-2">
                        <img
                          className="ms-3 mt-3"
                          alt="#"
                          src={res.category_image}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      <span className="col-10 ">
                        <p
                          className="mt-3"
                          style={{
                            color: "#000000",
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          {res.category.category_name}
                          &nbsp;
                          {res.subcategory.subcategory}
                        </p>
                      </span>
                    </div>
                    <div
                      className="d-flex ms-5 mb-1"
                      style={{ marginTop: "-10px" }}
                    >
                      <p className="mt-1">Repetition</p>
                      <button
                        className="border-0 ms-3  rounded"
                        style={{
                          width: "90px",
                          height: "30px",
                          backgroundColor: "#E9FFF5",
                          color: "#188241",
                        }}
                      >
                        {res.repeat_time == 0
                          ? "No Repeat"
                          : res.repeat_time + " mins"}
                      </button>
                    </div>

                    <hr style={{ marginTop: "-10px" }} />

                    <div>
                      <div className="d-flex">
                        <img className="ms-3 mb-2" src={Image5} alt="" />
                        <p className="mt-1 ms-3">{res.active_time}</p>
                      </div>
                      <div className="container" style={{ marginTop: "-20px" }}>
                        <div className="d-flex">
                          <img style={{}} alt="#" src={Image1} />
                          <p
                            className="ms-2"
                            style={{
                              color: "#000000",
                              fontSize: 16,
                              fontWeight: "bold",
                              marginTop: "11PX",
                            }}
                          >
                            {res.category.category_name}
                          </p>
                        </div>
                        <div className="ms-5 d-flex">
                          <img
                            style={{ marginTop: "-50px" }}
                            alt="#"
                            src={Image2}
                          />
                          <p
                            style={{
                              color: "#000000",
                              fontSize: 12,
                              fontWeight: "bold",
                              marginTop: "-10px",
                            }}
                          >
                            {res.subcategory.subcategory}
                          </p>
                        </div>
                        <div className="d-flex">
                          <img alt="#" src={Image3} />
                          <p className="mt-2 ms-2">{res.entry_fee}</p>
                        </div>
                        <div className="d-flex">
                          <img alt="#" src={Image4} />
                          <p className="mt-2 ms-2">{res.rewards}</p>
                        </div>
                        <div className="d-flex">
                          <img src={Wallet} />
                          <div
                            className="ms-2"
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "#333333",
                            }}
                          >
                            <span style={{ color: "#2188E7" }}>
                              {res.filled}
                            </span>
                            /{res.total_slot}
                          </div>
                        </div>
                        <div className="mt-2 mb-3">
                          <ProgressBar
                            now={res.filled}
                            max={res.total_slot}
                            style={{ height: "12px" }}
                          />
                        </div>
                        <div
                          className="row"
                          style={{ justifyContent: "space-around" }}
                        >
                          <button
                            className="col-5 mb-3 border-0 rounded"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight7"
                            aria-controls="offcanvasRight7"
                            style={{
                              color: "#fff",
                              backgroundColor: "#333333",
                              height: "35px",
                            }}
                            onClick={() => {
                              Api1(res.id);
                              Histry(res.id);
                              setFilled(res.filled);
                            }}
                          >
                            View Details
                          </button>
                          {/* come here */}
                          <button
                            className="col-5 mb-3 border-0 rounded"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight8"
                            aria-controls="offcanvasRight8"
                            style={{
                              color: "#000000",
                              backgroundColor: "#EFEFEF",
                              height: "35px",
                              fontWeight: 500,
                            }}
                            onClick={() => {
                              Api1(res.id);
                              Histry(res.id);
                              setFilled(res.filled);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>

      {/* offcanvas7 for viewdwtails of quiz */}
      <div
        class="offcanvas offcanvas-end w-50"
        tabindex="-1"
        id="offcanvasRight7"
        aria-labelledby="offcanvasRightLabel"
        style={{ borderTopLeftRadius: 30 }}
      >
        <div class="offcanvas-header">
          <span
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{ color: "#000", fontWeight: "600" }}
            onClick={() => setOverview("Overview")}
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
        </div>
        <div class="offcanvas-body m-2">
          {/* //mapping for particular Quiz */}
          {Data1.map((res, key) => {
            return (
              <>
                <div key={key}>
                  <div className="row">
                    <div className="col-2">
                      <img
                        alt="#"
                        src={res.quizze_image}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div className="col-8">
                      <p style={{ fontSize: 20, fontWeight: 600 }}>
                        {res.category.category_name}-
                        {res.subcategory.subcategory}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <span className="col-1"></span>
                    <span
                      className="col-1"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p
                        className=""
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#8A8A8A",
                        }}
                      >
                        Repetition
                      </p>
                    </span>
                    <button
                      className="col-2 ms-5 rounded border-0"
                      style={{ backgroundColor: "#E9FFF5", color: "#188241" }}
                    >
                      {res.repeat_time == 0
                        ? "No Repeat"
                        : res.repeat_time + " mins"}
                    </button>
                    <button
                      className="col-2 rounded border-0 ms-1"
                      style={{ color: "#FFBD00" }}
                    >
                      {res.total_question}
                    </button>
                    <button
                      className="col-2 rounded border-0 ms-1"
                      style={{ color: "#C922E4" }}
                    >
                      {res.rewards}
                    </button>
                    <button
                      className="col-2 rounded border-0 ms-1"
                      style={{ color: "#2188E7" }}
                    >
                      {filled}/{res.total_slot}
                    </button>
                  </div>

                  <div className="row">
                    <span
                      className="col-2"
                      onClick={() => {
                        setOverview("Overview");
                      }}
                      style={{
                        fontSize: 16,
                        fontWeight: Overview === "Overview" ? "600" : "",
                        cursor: "pointer",
                      }}
                    >
                      Overview
                    </span>
                    <span
                      className="col-2"
                      onClick={() => {
                        setOverview("History");
                      }}
                      style={{
                        fontSize: 16,
                        fontWeight: Overview === "History" ? "600" : "",
                        cursor: "pointer",
                      }}
                    >
                      History
                    </span>
                  </div>
                  <div className="row">
                    <div
                      className="col-2 mt-2"
                      style={{
                        borderBottom:
                          Overview === "Overview" ? "1px solid #000000" : "",
                      }}
                    ></div>
                    <div
                      className="col-2"
                      style={{
                        borderBottom:
                          Overview === "History" ? "1px solid #000000" : "",
                      }}
                    ></div>
                  </div>
                  <hr style={{ marginTop: "0px" }} />

                  {Overview === "Overview" ? (
                    <>
                      <div className="row">
                        <p
                          className="col-3 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Exam Category
                        </p>
                      </div>
                      <div className="row">
                        <img
                          className="col-2"
                          alt="#"
                          src={res.category.category_image}
                          style={{
                            width: "auto",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />

                        <input
                          className="col-8 border-0"
                          style={{ fontSize: 20, fontWeight: "600" }}
                          disabled={true}
                          placeholder={res.category.category_name}
                        />
                      </div>
                      <div className="row mt-2">
                        <p
                          className="col-4 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Exam Sub Category
                        </p>
                      </div>
                      <div className="row">
                        <input
                          className="col-8 border-0"
                          style={{ fontSize: 20, fontWeight: "600" }}
                          placeholder={res.subcategory.subcategory}
                          disabled={true}
                        />
                      </div>
                      <div className="row mt-4">
                        <p
                          className="col-4 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Question Composition
                        </p>
                      </div>
                      <div className="row mt-2">
                        {JSON.parse(res.subject_id).map((res) => {
                          return (
                            <>
                              <div className="d-flex">
                                <p
                                  className="col-5"
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: "#303030",
                                  }}
                                >
                                  {res.name}
                                </p>
                                <p className="col-1">{res.value}%</p>
                              </div>

                              <input
                                disabled={true}
                                className="col-6"
                                type="range"
                                maxLength={100}
                                value={res.value}
                              />
                            </>
                          );
                        })}
                      </div>
                      {/* <div className="row mt-2">
                        <div className="d-flex">
                          <p
                            className="col-5"
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "#303030",
                            }}
                          >
                           {res.subject_id.id}
                          </p>
                          <p className="col-1">33%</p>
                        </div>

                        <input className="col-6 " type="range" />
                      </div> */}
                      <div className="row mt-4">
                        <p
                          className="col-2 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Next Quiz
                        </p>
                      </div>
                      <div className="row ">
                        <span
                          className="col-4 ms-2 d-flex rounded"
                          style={{
                            backgroundColor: "tranparent",
                            overflow: "hidden",
                            height: "35px",
                          }}
                        >
                          <img className="mt-1" src={Dates} alt="#" />
                          <span className="mt-1">{res.active_time}</span>
                        </span>
                        {/* <span
                          className="col-2 ms-4 rounded"
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
                          />
                        </span> */}
                      </div>
                      <div className="row mt-4">
                        <p
                          className="col-2 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Rules
                        </p>
                      </div>
                      <textarea
                        className="col-6 rounded"
                        style={{ height: "200px" }}
                        value={Edit3}
                        onChange={(e) => {
                          setEdit3(e.target.value);
                        }}
                        disabled
                      />
                      <div className="row mt-4">
                        <p
                          className="col-3 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Banner Image
                        </p>
                      </div>
                      <div className="col-6 rounded">
                        <img
                          className="w-100 rounded"
                          alt=""
                          src={BannerShow}
                          style={{ height: "200px" }}
                        />
                      </div>
                      <div className="row mt-4">
                        <p
                          className="col-3 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Total Slots
                        </p>
                      </div>
                      <input
                        className="col-6 border-0"
                        style={{
                          fontSize: 20,
                          fontWeight: "600",
                          backgroundColor: "#",
                        }}
                        disabled={true}
                        value={Edit4}
                      />
                      <div className="row mt-4">
                        <p
                          className="col-3 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Entery Fee
                        </p>
                      </div>
                      <input
                        className="col-6 border-0"
                        style={{
                          fontSize: 20,
                          fontWeight: "600",
                          backgroundColor: "#",
                        }}
                        disabled={true}
                        value={Edit5}
                        onChange={(e) => {
                          setEdit5(e.target.value);
                        }}
                      />
                      <div className="row mt-4">
                        <p
                          className="col-4 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Total Number of Question
                        </p>
                      </div>
                      <input
                        disabled={true}
                        className="col-6 border-0"
                        style={{
                          fontSize: 20,
                          fontWeight: "600",
                          backgroundColor: "#",
                        }}
                        value={Edit6}
                        onChange={(e) => {
                          setEdit6(e.target.value);
                        }}
                      />
                      <div className="row mt-4">
                        <p
                          className="col-4 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Time Per Question
                        </p>
                        <p>{res.question_time}</p>
                      </div>
                      <input
                        className="col-6 "
                        type="range"
                        disabled={true}
                        value={res.question_time}
                      />
                      <div className="row mt-4">
                        <p
                          className="col-4 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Repeat Quiz After
                        </p>
                        <p className="col-2 rounded">
                          {res.repeat_time == 0
                            ? "No Repeat"
                            : res.repeat_time + " mins"}
                        </p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {Overview === "History" ? (
                    <>
                      <QuizHistory last_page={last_page} Data={HistryData} />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>

      {/* offcanvas8 here for edit the particular active quiz */}

      <div
        class="offcanvas offcanvas-end w-50"
        tabindex="-1"
        id="offcanvasRight8"
        aria-labelledby="offcanvasRightLabel"
        style={{ borderTopLeftRadius: 30 }}
      >
        <div class="offcanvas-header">
          <span
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{ color: "#000", fontWeight: "600", cursor: "pointer" }}
            onClick={() => setOverview("Overview")}
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
          <p style={{ fontSize: 20 }}>The changes will reflected on 12:01 AM</p>
        </div>
        <div class="offcanvas-body m-2">
          {/* //mapping for particular Quiz */}

          <div className="">
            <div className="row ">
              <div className="col-2">
                <img
                  alt="#"
                  src={Fire6}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="col-6">
                <p style={{ fontSize: 20, fontWeight: 600 }}>
                  {Fire2}
                  &nbsp;
                  {Fire3}
                </p>
              </div>

              <button
                className="col-2 border-0 rounded"
                style={{ backgroundColor: "#E9FFF5", color: "#188241" }}
                onClick={() => functionSave(Fire4)}
              >
                Save
              </button>
            </div>
            <div className="row mt-2">
              <span className="col-1"></span>
              <span className="col-1">
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#8A8A8A",
                  }}
                >
                  Repetition
                </p>
              </span>
              <button
                className="col-2 ms-5 rounded border-0"
                style={{ backgroundColor: "#E9FFF5", color: "#188241" }}
              >
                {Data1[0]?.quiz_repeat === 0
                  ? "No Repeat"
                  : Data1[0]?.quiz_repeat}
              </button>
              <button
                className="col-2 rounded border-0 ms-1"
                style={{ color: "#FFBD00" }}
              >
                {Data1[0]?.total_question}
              </button>
              <button
                className="col-2 rounded border-0 ms-1"
                style={{ color: "#C922E4" }}
              >
                {Data1[0]?.rewards}
              </button>
              <button
                className="col-2 rounded border-0 ms-1"
                style={{ color: "#2188E7" }}
              >
                {filled}/{Data1[0]?.total_slot}
              </button>
            </div>

            <div className="row">
              <span
                className="col-2"
                onClick={() => {
                  setOverview("Overview");
                }}
                style={{
                  fontSize: 16,
                  fontWeight: Overview === "Overview" ? "600" : "",
                  cursor: "pointer",
                }}
              >
                Overview
              </span>
              <span
                className="col-2"
                onClick={() => {
                  setOverview("History");
                }}
                style={{
                  fontSize: 16,
                  fontWeight: Overview === "History" ? "600" : "",
                  cursor: "pointer",
                }}
              >
                History
              </span>
            </div>
            <div className="row">
              <div
                className="col-2 mt-2"
                style={{
                  borderBottom:
                    Overview === "Overview" ? "1px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom:
                    Overview === "History" ? "1px solid #000000" : "",
                }}
              ></div>
            </div>
            <hr style={{ marginTop: "0px" }} />

            {Overview === "Overview" ? (
              <>
                <div className="row">
                  <p
                    className="col-3 mt-1"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#303030",
                    }}
                  >
                    Exam Category
                  </p>
                </div>
                <div className="row">
                  <img
                    className="col-2"
                    alt="#"
                    src={Fire6}
                    style={{
                      width: "auto",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />

                  <input
                    disabled={true}
                    className="col-8 border-0"
                    style={{ fontSize: 20, fontWeight: "600" }}
                    placeholder={Fire2}
                  />
                </div>
                <div className="row mt-2">
                  <p
                    className="col-4 mt-1"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#303030",
                    }}
                  >
                    Exam Sub Category
                  </p>
                </div>
                <div className="row">
                  <input
                    disabled={true}
                    className="col-8 border-0"
                    style={{ fontSize: 20, fontWeight: "600" }}
                    placeholder={Fire3}
                  />
                </div>
                <div className="row mt-4">
                  <p
                    className="col-4 mt-1"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#303030",
                    }}
                  >
                    Question Composition
                  </p>
                </div>
                <div className="row mt-2">
                  {Fire5?.map((res) => {
                    return (
                      <>
                        <div className="d-flex">
                          <p
                            className="col-5"
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "#303030",
                            }}
                          >
                            {res.name}
                          </p>
                          <p className="col-1">{res.value}%</p>
                        </div>

                        <Slider
                          key={res.id}
                          id={res.id}
                          name={res.name}
                          value={res.value}
                          total={Fire5.reduce(
                            (total, Value) => total + Value.value,
                            0
                          )}
                          onChange={handleChangeName}
                        />

                        {/* <input className="col-6" type="range"
                                      
                                     value={res.value} id={res.id} name={res.name} onChange={handleChange} /> */}
                      </>
                    );
                  })}
                </div>

                <div className="row mt-4">
                  <p
                    className="col-2 mt-1"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#303030",
                    }}
                  >
                    Next Quiz
                  </p>
                </div>
                <div className="row ">
                  <span
                    className="col-2 ms-2 d-flex rounded"
                    style={{
                      backgroundColor: "#EFEFEF",
                      overflow: "hidden",
                      height: "35px",
                    }}
                  >
                    <img className="mt-1" src={Dates} alt="#" />
                    <DatePicker
                      className="Main"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </span>
                  <span
                    className="col-2 ms-4 rounded"
                    style={{
                      backgroundColor: "#EFEFEF",
                      height: "35px",
                      border: "1px solid #252525",
                    }}
                  >
                    <input
                      className="border-0 rounded mt-1"
                      type="time"
                      style={{
                        backgroundColor: "#EFEFEF",
                        color: "#8A8A8A",
                      }}
                    />
                  </span>
                </div>
                <div className="row mt-4">
                  <p
                    className="col-2 mt-1"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#303030",
                    }}
                  >
                    Rules
                  </p>
                </div>
                <textarea
                  className="col-6 rounded"
                  style={{ height: "200px" }}
                  value={Edit3}
                  onChange={(e) => {
                    setEdit3(e.target.value);
                  }}
                />
                <div className="row mt-4">
                  <p
                    className="col-3 mt-1"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#303030",
                    }}
                  >
                    Banner Image
                  </p>
                  <label
                    className="filelabel2 col-2"
                    style={{ backgroundColor: "#F5F5F5" }}
                    onClick={() => {}}
                  >
                    <span className="title2">upload</span>
                    <input
                      className="FileUpload2"
                      id="FileInput2"
                      name="booking_attachment2"
                      type="file"
                      accept=".png,.jpg"
                      onChange={(e) => {
                        setbannerImage(e.target.files[0]);
                        setBannerShow(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </label>
                </div>
                <div className="col-6 rounded">
                  <img
                    className="w-100 rounded"
                    alt=""
                    src={BannerShow}
                    style={{ height: "200px" }}
                  />
                </div>
                <div className="row mt-4">
                  <p
                    className="col-3 mt-1"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#303030",
                    }}
                  >
                    Total Slots
                  </p>
                </div>
                <input
                  className="col-6 "
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    backgroundColor: "#",
                  }}
                  value={Edit4}
                  onChange={(e) => {
                    setEdit4(e.target.value);
                  }}
                />
                <div className="row mt-4">
                  <p
                    className="col-3 mt-1"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#303030",
                    }}
                  >
                    Entery Fee
                  </p>
                </div>
                <input
                  className="col-6 "
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    backgroundColor: "#",
                  }}
                  value={Edit5}
                  onChange={(e) => {
                    setEdit5(e.target.value);
                  }}
                />
                <div className="row mt-4">
                  <p
                    className="col-4 mt-1"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#303030",
                    }}
                  >
                    Total Number of Question
                  </p>
                </div>
                <input
                  className="col-6 "
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    backgroundColor: "#",
                  }}
                  value={Edit6}
                  onChange={(e) => {
                    setEdit6(e.target.value);
                  }}
                />
                <div className="row mt-4">
                  <p
                    className="col-4 mt-1"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#303030",
                    }}
                  >
                    Time Per Question
                  </p>
                  {Edit7}
                </div>
                <input
                  className="col-6 "
                  type="range"
                  min={10}
                  max={60}
                  value={Edit7}
                  onChange={(e) => {
                    setEdit7(e.target.value);
                  }}
                />
                <div className="row mt-4">
                  <p
                    className="col-4 mt-1"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#303030",
                    }}
                  >
                    Repeat Quiz After
                  </p>
                  <select
                    className="col-2 rounded"
                    style={{
                      border: "1px solid #000000",
                      height: "30px",
                    }}
                    onChange={(e) => {
                      setChangesNo(e.target.value);
                    }}
                  >
                    <option value={0}>No Repeat</option>
                    <option value={5}>5 min.</option>
                    <option value={15}>15 min.</option>
                    <option value={30}>30 min.</option>
                    <option value={45}>45 min.</option>
                    <option value={60}>60 min.</option>
                  </select>
                </div>
              </>
            ) : (
              <></>
            )}

            {Overview === "History" ? (
              <>
                <QuizHistory last_page={last_page} Data={HistryData} />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveQuizeEdit;
