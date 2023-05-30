import { useState, useEffect } from "react";
import Image1 from "../../Img/ic_round-category.svg";
import Image2 from "../../Img/mdi_subtasks.svg";
import Image3 from "../../Img/bb coin 1.svg";
import Image4 from "../../Img/carbon_trophy-filled.svg";
// import { FaArrowRight } from "react-icons/fa";
import SearchIcon from "../../Img/ri_search-line.svg";
import LoaderComponent from "../Utils/LoaderComponent";
import TriviaHistory from "./TriviaHistory";
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

const initLoading = {
  isLoading: false,
  isError: false,
};
const initHeader = {
  name: "",
  icon: "",
};
const FreeTrivaEdit = (props) => {
  const [Token, setToken] = useState("");
  const [Overview, setOverview] = useState("");
  const [Data, setData] = useState([]);
  const [Data1, setData1] = useState([]);
  const [Rule, setRule] = useState("");
  const [Reward, setReward] = useState("");
  const [Question, setQuestion] = useState("");
  const [QuestionTime, setQuestionTime] = useState("");
  const [Chage2, setChage2] = useState(0);
  const [Chage3, setChage3] = useState(0);
  const [Chage4, setChage4] = useState(0);
  const [Chage5, setChage5] = useState(0);
  const [BannerShow, setBannerShow] = useState("");
  const [bannerImage, setbannerImage] = useState("");
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [Fire1, setFire1] = useState("");
  const [Fire2, setFire2] = useState("");
  const [Fire3, setFire3] = useState("");
  const [Fire4, setFire4] = useState("");
  const [Fire5, setFire5] = useState([]);
  const [Fire6, setFire6] = useState("");
  const [ChangesNo, setChangesNo] = useState("");
  const [loader, setLoader] = useState(initLoading);
  const { isLoading, isError } = loader;
  const [HistryData, setHistryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [last_page, setLastPage] = useState();
  const [header, setHeader] = useState(initHeader);

  //function for history of free trivia;
  const Histry = async (id) => {
    var formdata = new FormData();
    formdata.append("token", Token);
    formdata.append("id", id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`https://brainbucks.co.in/api/admin/trivia-history`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 1) {
          setHistryData(result.data);
          // console.log("hello",result.data);
          setLastPage(result.data.last_page);
        }
      })
      .catch((error) => console.log(error));
  };

  const Api = async () => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    try {
      const Responce = await fetch(
        "https://brainbucks.co.in/api/admin/freetrvget"
      );
      const Data = await Responce.json();
      if (Data.status === 1) {
        // console.log("data1",Data.data)
        setData(Data.data);
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
      // console.log(Data);
    } catch (error) {
      console.log(error);
      setLoader({
        ...loader,
        isLoading: false,
      });
    }
  };



  //function for action passing in empty container;
  const actionToFetchBack=()=>{
    setFilterData(Data)
  }

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

  //function for filterations
  function updateResult() {
    const newData = Data.filter((el) => {
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

  const functionSave = (id) => {
    sendUpdate(id);
  };

  const Api1 = async (ID) => {
    try {
      const Response = await fetch(
        `https://brainbucks.co.in/api/admin/freetrvedit?id=${ID}`
      );
      const Data = await Response.json();
      console.log("free trivia data", Data);
      if (Data.status === 1) {
        // console.log("data",Data);

        setData1(Data.data);
        setRule(Data.data[0].rules);
        setReward(Data.data[0].rewards);
        setQuestion(Data.data[0].total_question);
        setQuestionTime(Data.data[0].question_time);
        setBannerShow(Data.data[0].trivia_image);
        setFire1(Data.data[0].quizze_image);
        setFire2(Data.data[0].category.category_name);
        setFire3(Data.data[0].subcategory.subcategory);
        setFire4(Data.data[0].id);
        setFire5(JSON.parse(Data.data[0].subject_id));
        setFire6(Data.data[0].category.category_image);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendUpdate = async (id) => {
    var formdata = new FormData();
    formdata.append("id", id);
    formdata.append("subject_id", JSON.stringify(Fire5));
    formdata.append("total_question", Question);
    formdata.append("question_time", QuestionTime);
    formdata.append("rules", Rule);
    formdata.append("reward", Reward);
    formdata.append("trivia_image", bannerImage);
    formdata.append("token", Token);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://brainbucks.co.in/api/admin/free-trivia-update",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 1) {
          // console.log(result);
          toast(result.message);
        } else {
          toast(result.message);
          // console.log(result.message)
        }
      })
      .catch((error) => console.log("error", error));
  };

  if (props.onpress > 0) {
    Api();
  }

  useEffect(() => {
    setOverview("Overview");
    Api();
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-6 d-flex">
          <div className="col-8">
            <h5 className="mt-1">
              Showing total <span style={{ color: "red" }}>{Data.length} </span>
              Free Trivia
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
              <span className="p-3"> + Add Trivia</span>
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
                    placeholder="Search for Trivia"
                    style={{
                      textDecoration: "none",
                      outline: "none",
                      color: "#272727",
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleSearchFunctionlity}
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
        ) : ( filterData.length===0?<EmptyContainer message='No Data Found' action={actionToFetchBack} actionName='Fetch All Data'/>:
          filterData.map((res, key) => {
            return (
              <>
                <div className="col-md-4 col-sm-12 col-xl-4 mt-3" key={key}>
                  <div className="card">
                    <div className="d-flex">
                      <div className="col-2">
                        <img
                          className="mt-3 ms-3"
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
                          {res.category.category_name}{" "}
                          {res.subcategory.subcategory}
                        </p>
                      </span>
                    </div>
                    <hr style={{ marginTop: "-10px" }} />
                    <div>
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
                          <p className="mt-2 ms-2">0</p>
                        </div>
                        <div className="d-flex">
                          <img alt="#" src={Image4} />
                          <p className="mt-2 ms-2">{res.rewards}</p>
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
                            }}
                          >
                            View Details
                          </button>
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
                              setHeader({
                                ...header,
                                name: res.category.category_name,
                                icon: res.category_image,
                              });
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

      {/* for view deatils trivia */}
      <div
        className="offcanvas offcanvas-end w-50"
        tabindex="-1"
        id="offcanvasRight7"
        aria-labelledby="offcanvasRightLabel"
        style={{ borderTopLeftRadius: 30 }}
      >
        <div className="offcanvas-header">
          <span
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{ color: "#000", fontWeight: "600" }}
            onClick={() => {
              setQuestionTime("");
              setOverview("Overview");
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
          <p style={{ fontSize: 20 }}>The changes will reflected on 12:01 AM</p>
        </div>
        <div className="offcanvas-body m-2">
          {Data1.map((res, key) => {
            return (
              <>
                <div key={key}>
                  <div className="row">
                    <div className="col-2">
                      <img
                        alt="#"
                        src={res.category.category_image}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div className="col-8">
                      <p style={{ fontSize: 20, fontWeight: 600 }}>
                        {res.category.category_name}{" "}
                        {res.subcategory.subcategory}
                      </p>
                    </div>
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
                      5 Mins
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
                      2560/12500
                    </button>
                  </div>

                  <div className="row">
                    <span
                      className="col-2"
                      onClick={() => {
                        setOverview("Overview");
                      }}
                      style={
                        Overview === "Overview"
                          ? { fontSize: 16, fontWeight: 600, cursor: "pointer" }
                          : { cursor: "pointer" }
                      }
                    >
                      Overview
                    </span>
                    <span
                      className="col-2"
                      onClick={() => {
                        setOverview("History");
                      }}
                      style={
                        Overview === "History"
                          ? { fontSize: 16, fontWeight: 600, cursor: "pointer" }
                          : { cursor: "pointer" }
                      }
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
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                        />
                        <input
                          className="col-8 border-0"
                          style={{ fontSize: 20, fontWeight: "600" }}
                          placeholder={res.category.category_name}
                          disabled={true}
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
                        {/* <img className='col-2' alt='#' src="" style={{width:"40px",height:"40px",borderRadius:"50%"}}/> */}
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
                      {JSON.parse(res.subject_id).map((res) => {
                        return (
                          <>
                            <div className="row mt-2">
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
                                className="col-6"
                                type="range"
                                value={res.value}
                                id={res.id}
                                name={res.name}
                              />
                            </div>
                          </>
                        );
                      })}
                      {/* <div className='row mt-4'>
                            <p className='col-2 mt-1' style={{fontSize:16,fontWeight:600,color:"#303030"}}>Next Quiz</p>
                            <button className='col-2 rounded' style={{border:"1px solid #000000",height:"40px"}}>Change</button>
                        </div>
                        <div className="row ">
                  
                        <span className="col-2 ms-2 d-flex rounded"  style={{backgroundColor:"#EFEFEF",overflow:"hidden",height:"35px"}}>
                        <img className="mt-1" src={Dates} alt="#"/>
                        <DatePicker className="Main" selected={startDate} onChange={(date:Date) => setStartDate(date)}/>
                        </span>
                        <span className="col-2 ms-4 rounded" style={{backgroundColor:"#EFEFEF",height:"35px"}}>
                            <input className="border-0 rounded mt-1" type="time" style={{backgroundColor:"#EFEFEF",color:"#8A8A8A",outline:"none"}} />
                        </span>
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
                          Rules
                        </p>
                      </div>
                      <textarea
                        className="col-6 rounded"
                        disabled={Chage2 % 2 === 0 ? true : false}
                        style={{ height: "200px" }}
                        value={Rule}
                        onChange={(e) => {
                          setRule(e.target.value);
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
                      </div>
                      <div className="col-6 rounded">
                        <img
                          className="w-100 rounded"
                          alt=""
                          src={BannerShow}
                          style={{ height: "200px" }}
                        />
                      </div>
                      {/* <div className='row mt-4'>
                            <p className='col-3 mt-1' style={{fontSize:16,fontWeight:600,color:"#303030"}}>Total Slots</p>
                            <button className='col-2 rounded' style={{border:"1px solid #000000",height:"40px"}}>Change</button>
                        </div>
                        <input className='col-6 border-0' style={{fontSize:20,fontWeight:"600",backgroundColor:"#"}} placeholder="500" disabled={true} /> */}
                      <div className="row mt-4">
                        <p
                          className="col-3 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Reward
                        </p>
                      </div>
                      <input
                        className="col-6 border-0"
                        type="number"
                        style={{
                          fontSize: 20,
                          fontWeight: "600",
                          backgroundColor: "#",
                        }}
                        disabled={Chage3 % 2 === 0 ? true : false}
                        value={Reward}
                        onChange={(e) => {
                          setReward(e.target.value);
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
                        className="col-6 border-0"
                        type="number"
                        style={{
                          fontSize: 20,
                          fontWeight: "600",
                          backgroundColor: "#",
                        }}
                        disabled={Chage4 % 2 === 0 ? true : false}
                        value={Question}
                        onChange={(e) => {
                          setQuestion(e.target.value);
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
                        {/* here */}
                      </div>
                      <input
                        className="col-6 "
                        type="range"
                        min={10}
                        max={60}
                        disabled={Chage5 % 2 === 0 ? true : false}
                        value={QuestionTime}
                        onChange={(e) => {
                          setQuestionTime(e.target.value);
                        }}
                      />
                      {/* <div className='row mt-4'>
                            <p className='col-4 mt-1' style={{fontSize:16,fontWeight:600,color:"#303030"}}>Repeat Quiz After</p>
                            <select className='col-2 rounded' style={{border:"1px solid #000000",height:"40px"}}>
                                <option>
                                    Never
                                </option>
                            </select>
                        </div> */}
                    </>
                  ) : (
                    <></>
                  )}
                  {Overview === "History" ? (
                    <>
                      <TriviaHistory
                        header={header}
                        last_page={last_page}
                        Data={HistryData}
                      />
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

      {/* offcanvas for edit particular freetriviA */}
      <div
        className="offcanvas offcanvas-end w-50"
        tabindex="-1"
        id="offcanvasRight8"
        aria-labelledby="offcanvasRightLabe8"
        style={{ borderTopLeftRadius: 30 }}
      >
        <div className="offcanvas-header">
          <span
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{ color: "#000", fontWeight: "600" }}
            onClick={() => {
              setOverview("Overview");
              setHeader(initHeader);
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
          <p style={{ fontSize: 20 }}>The changes will reflected on 12:01 AM</p>
        </div>
        <div className="offcanvas-body m-2">
          {Data1.map((res, key) => {
            return (
              <>
                <div key={key}>
                  <div className="row">
                    <div className="col-2">
                      <img
                        alt="#"
                        src={res.category.category_image}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div className="col-8">
                      <p style={{ fontSize: 20, fontWeight: 600 }}>
                        {res.category.category_name}{" "}
                        {res.subcategory.subcategory}
                      </p>
                    </div>
                    <button
                      className="col-2 border-0 rounded"
                      style={{ backgroundColor: "#EAF5FF", color: "#2188E7" }}
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
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
                      5 Mins
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
                      2560/12500
                    </button>
                  </div>

                  <div className="row">
                    <span
                      className="col-2"
                      onClick={() => {
                        setOverview("Overview");
                      }}
                      style={
                        Overview === "Overview"
                          ? { fontSize: 16, fontWeight: 600, cursor: "pointer" }
                          : { cursor: "pointer" }
                      }
                    >
                      Overview
                    </span>
                    <span
                      className="col-2"
                      onClick={() => {
                        setOverview("History");
                      }}
                      style={
                        Overview === "History"
                          ? { fontSize: 16, fontWeight: 600, cursor: "pointer" }
                          : { cursor: "pointer" }
                      }
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
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                        />
                        <input
                          className="col-8 border-0"
                          style={{ fontSize: 20, fontWeight: "600" }}
                          placeholder={res.category.category_name}
                          disabled={true}
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
                        {/* <img className='col-2' alt='#' src="" style={{width:"40px",height:"40px",borderRadius:"50%"}}/> */}
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
                          </>
                        );
                      })}

                      {/* <div className='row mt-2'>
                        <div className='d-flex'>
                        <p className='col-5' style={{fontSize:16,fontWeight:600,color:"#303030"}}>Current Affairs</p>
                        <p className='col-1'>33%</p>
                        </div>
                            <input className='col-6 ' type="range" />
                        </div> */}
                      {/* <div className='row mt-4'>
                            <p className='col-2 mt-1' style={{fontSize:16,fontWeight:600,color:"#303030"}}>Next Quiz</p>
                            <button className='col-2 rounded' style={{border:"1px solid #000000",height:"40px"}}>Change</button>
                        </div>
                        <div className="row ">
                  
                        <span className="col-2 ms-2 d-flex rounded"  style={{backgroundColor:"#EFEFEF",overflow:"hidden",height:"35px"}}>
                        <img className="mt-1" src={Dates} alt="#"/>
                        <DatePicker className="Main" selected={startDate} onChange={(date:Date) => setStartDate(date)}/>
                        </span>
                        <span className="col-2 ms-4 rounded" style={{backgroundColor:"#EFEFEF",height:"35px"}}>
                            <input className="border-0 rounded mt-1" type="time" style={{backgroundColor:"#EFEFEF",color:"#8A8A8A",outline:"none"}} />
                        </span>
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
                          Rules
                        </p>
                      </div>
                      <textarea
                        className="col-6 rounded"
                        disabled={false}
                        style={{ height: "200px" }}
                        value={Rule}
                        onChange={(e) => {
                          setRule(e.target.value);
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
                        {/* <button className='col-2 rounded' style={{border:"1px solid #000000",height:"40px"}}>Change</button> */}
                        <label
                          className="filelabel2 col-2"
                          style={{ backgroundColor: "#F5F5F5" }}
                          onClick={() => {
                            setbannerImage("");
                          }}
                        >
                          <span className="title2">Change</span>
                          <input
                            className="FileUpload2"
                            id="FileInput2"
                            name="booking_attachment2"
                            type="file"
                            accept=".png,.jpg"
                            onChange={(e) => {
                              setbannerImage(e.target.files[0]);
                              setBannerShow(
                                URL.createObjectURL(e.target.files[0])
                              );
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
                      {/* <div className='row mt-4'>
                            <p className='col-3 mt-1' style={{fontSize:16,fontWeight:600,color:"#303030"}}>Total Slots</p>
                            <button className='col-2 rounded' style={{border:"1px solid #000000",height:"40px"}}>Change</button>
                        </div>
                        <input className='col-6 border-0' style={{fontSize:20,fontWeight:"600",backgroundColor:"#"}} placeholder="500" disabled={true} /> */}
                      <div className="row mt-4">
                        <p
                          className="col-3 mt-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#303030",
                          }}
                        >
                          Reward
                        </p>
                      </div>
                      <input
                        className="col-6 "
                        type="number"
                        style={{
                          fontSize: 20,
                          fontWeight: "600",
                          backgroundColor: "#",
                        }}
                        disabled={false}
                        value={Reward}
                        onChange={(e) => {
                          setReward(e.target.value);
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
                        type="number"
                        style={{
                          fontSize: 20,
                          fontWeight: "600",
                          backgroundColor: "#",
                        }}
                        disabled={false}
                        value={Question}
                        onChange={(e) => {
                          setQuestion(e.target.value);
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
                          Time Per Question :- {QuestionTime}
                        </p>
                        {/* here */}
                      </div>
                      <input
                        className="col-6 "
                        type="range"
                        min={10}
                        max={60}
                        disabled={false}
                        value={QuestionTime}
                        onChange={(e) => {
                          setQuestionTime(e.target.value);
                        }}
                      />
                      {/* <div className='row mt-4'>
                            <p className='col-4 mt-1' style={{fontSize:16,fontWeight:600,color:"#303030"}}>Repeat Quiz After</p>
                            <select className='col-2 rounded' style={{border:"1px solid #000000",height:"40px"}}>
                                <option>
                                    Never
                                </option>
                            </select>
                        </div> */}
                    </>
                  ) : (
                    <></>
                  )}
                  {Overview === "History" ? (
                    <>
                      <TriviaHistory
                        header={header}
                        last_page={last_page}
                        Data={HistryData}
                      />
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
    </div>
  );
};

export default FreeTrivaEdit;
