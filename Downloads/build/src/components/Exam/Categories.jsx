import { useState, useEffect } from "react";
import SearchIcon from "../../Img/ri_search-line.svg";
import Lottie from "lottie-react";
import Clebrate from "../../Img/lf20_VuglDs.json";
import { FaArrowRight } from "react-icons/fa";
import "./Categories.css";
import pro from "../../Img/Group 133.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import LoaderComponent from "../Utils/LoaderComponent";

const initLoader = {
  isLoading: false,
  isError: false,
};

const Categories = () => {
  const [AllSub, setAllSub] = useState();
  const [Token, setToken] = useState("");
  const [first, setfirst] = useState(0);
  const [Change, setChange] = useState("");
  const [Img, setImg] = useState();
  const [Subacat, setSubacat] = useState("");
  const [Cat, setCat] = useState("");
  const [check, setCheck] = useState(0);
  const [Click, setClick] = useState(0);
  const [Cat2, setCat2] = useState("");
  const [List, setList] = useState([]);
  const [List2, setList2] = useState([]);
  const [Data, setData] = useState([]);
  const [Id, setId] = useState();
  const [SubCategories, setSubCategories] = useState([]);
  const [dataArray, setdataArray] = useState([]);
  const [Img1, setImg1] = useState(pro);
  const [dataArray1, setdataArray1] = useState([]);
  const [timerCount, setTimer] = useState(15);
  const [BackTo, setBackTo] = useState([]);
  const [search, setSearch] = useState("");
  const [Timer, setTimers] = useState(15);
  const [Timer1, setTimers1] = useState(15);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [filterData, setFilterData] = useState();
  const [loader, setLoader] = useState(initLoader);
  const { isLoading } = loader;

  //function for filteration
  function updateResult() {
    const newData = Data.filter((el) => {
      if (search.length === 0) {
        return el;
      }
      return el.category_name.toLowerCase().startsWith(search.toLowerCase());
    });

    setFilterData([...newData]);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const Categories = (e) => {
    setCat(e.target.value);
  };

  const Categories2 = (e) => {
    setCat2(e.target.value);
  };
  //console.log(Id);
  const ImageFun = (event) => {
    setImg({
      picturePreview: URL.createObjectURL(event.target.files[0]),
      pictureAsFile: event.target.files[0],
    });
    setImg1(URL.createObjectURL(event.target.files[0]));
    // console.log(Img1);
  };
  // console.log("img",Img1);

  // console.log(List2);
  const AddFun = (e) => {
    e.preventDefault();

    // Chatagray.push(Cat);
    setCat("");

    const Data = { Cat };

    if (Cat) {
      setList((ls) => [...ls, Data]);
    }
  };

  const AddFun2 = (e) => {
    e.preventDefault();

    // Chatagray.push(Cat);
    setCat2("");

    const Data2 = Cat2;

    if (Cat2) {
      setList2((ls) => [...ls, Data2]);
    }
  };

  const handleChange1 = (e) => {
    var updatedList1 = [...dataArray1];

    if (e.target.checked) {
      updatedList1 = [...dataArray1, e.target.value];
    } else {
      updatedList1.splice(dataArray1.indexOf(e.target.value), 1);
    }
    setdataArray1(updatedList1);
  };

  const handleChange = (e) => {
    var updatedList = [...dataArray];
    if (e.target.checked) {
      updatedList = [...dataArray, e.target.value];
    } else {
      updatedList.splice(dataArray.indexOf(e.target.value), 1);
    }
    setdataArray(updatedList);
  };

  const Range = (event) => {
    setChange(event.target.value);
  };

  const myFunction = () => {
    setfirst(first + 1);
  };

  const Api = async () => {
    // const ArrData = JSON.parse(JSON.stringify(List));
    var myHeaders = new Headers();
    myHeaders.append("location", "");

    var formdata = new FormData();
    formdata.append("category_name", Change);
    formdata.append("category_image", Img.pictureAsFile);
    formdata.append("subcategory", dataArray1);
    formdata.append("token", Token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/category", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status == 1) {
          setBackTo(result.status);
          setImg1(pro);
          setdataArray1([]);
          setList([]);
          setfirst(first + 1);
          let interval = setInterval(() => {
            setTimers((lastTimerCount) => {
              lastTimerCount <= 1 && clearInterval(interval);
              return lastTimerCount - 1;
            });
          }, 1000);
          return () => {
            clearInterval(interval);
          };
        }
      })
      .catch((error) => console.log("error", error));
  };

  // if(Hello=="hello"){
  //   let interval = setInterval(() => {
  //     setTimers(lastTimerCount => {
  //           lastTimerCount <= 1 && clearInterval(interval)
  //           return lastTimerCount - 1
  //         })
  //     }, 1000) ;

  // }

  const New = async (ids) => {
    try {
      const war = await fetch(
        `https://brainbucks.co.in/api/admin/all-subcategorylist?parent_id=${ids}&token=${Token}`
      );
      const response1 = await war.json();
      // console.log(response1);
      if (response1.status == 1) {
        setSubCategories(response1.data);
      } else {
        // alert(response1.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Categories12 = async () => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    try {
      const Dar = await fetch(
        "https://brainbucks.co.in/api/admin/categorylist"
      );
      const response = await Dar.json();

      // console.log(response);

      setData(response);
      setFilterData(response);

      setLoader({
        ...loader,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      setLoader({
        ...loader,
        isLoading: false,
      });
    }
    setfirst(0);
    setChange("");
    setImg("");
  };

  useEffect(() => {
    Categories12();
  }, []);

  const MutiSub = async () => {
    var myHeaders = new Headers();
    myHeaders.append("location", "");

    var formdata = new FormData();
    formdata.append("subcategory", dataArray);
    formdata.append("token", Token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://brainbucks.co.in/api/admin/addsubcat?parent_id=" + Id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 1) {
          setdataArray([]);
          setClick(Click + 1);
          let interval = setInterval(() => {
            setTimers1((lastTimerCount) => {
              lastTimerCount <= 1 && clearInterval(interval);
              return lastTimerCount - 1;
            });
          }, 1000);
          return () => {
            clearInterval(interval);
          };
        } else {
          // alert(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const SETUPFDATE = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
      parent_id: Id,
      token: Token,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/editsubcat", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  if (Timer == 0) {
    setShow(false);
    setTimers(15);
    Categories12();
    setfirst(0);
  }

  if (Timer1 == 0) {
    setShow1(false);
    setTimers1(15);
    Categories12();
    setClick(0);
  }

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

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <>
      {/* for main page */}
      <div className="row">
        <div className="col-6 d-flex">
          <div className="col-8">
            <h5 className="mt-1">
              Showing total <span style={{ color: "red" }}>{Data.length}</span>{" "}
              Exam Categories
            </h5>
          </div>
          <div className="col-4">
            <button
              onClick={handleShow}
              style={{
                backgroundColor: "#EDF7FF",
                border: "1px solid #2188E7",
                height: "40px",
                borderRadius: "10px",
                color: "#2188E7",
              }}
            >
              <span className="p-3"> +Add Category</span>
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
                    value={search}
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

      {/* for addcategory offcanvas */}

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ borderTopLeftRadius: 30, width: "50%" }}
      >
        <Offcanvas.Header>
          <div>
            <span
              style={{ color: "#000", fontWeight: "600", cursor: "pointer" }}
              onClick={() => {
                setfirst(0);
                handleClose();
              }}
            >
              {first > 3 ? (
                ""
              ) : (
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
              )}
            </span>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ marginTop: "-20px" }}>
          <h6 style={{ fontSize: 20, fontWeight: "600" }}>
            {first >= 4 ? "" : "Add New Exam Category"}
          </h6>
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
                      Enter Name of Exam Category
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
                      placeholder="Start typing the name of Exam"
                      value={Change}
                      onChange={(e) => setChange(e.target.value)}
                      type="text"
                      maxLength={50}
                    />
                    <br />
                    <span style={{ marginLeft: "200px" }}>
                      {Change.length}/50
                    </span>
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
                disabled={Change.length >= 1 ? false : true}
                style={{
                  backgroundColor: "#2188E7",
                  height: "40px",
                  borderRadius: 7,
                }}
              >
                process
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
                    width: "50%",
                    background:
                      "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>steps 2/4</p>

              <div className="row">
                <div style={{ justifyConetnt: "center", textAlign: "center" }}>
                  <div>
                    <label
                      className="col-5 mb-2"
                      style={{
                        color: "#303030",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Upload Category Image
                    </label>
                    <br />
                    <label
                      className="filelabel21"
                      style={{
                        overflow: "hidden",
                        borderRadius: "50%",
                        marginLeft: "70px",
                      }}
                    >
                      <span className="title">
                        {/* to add image to the categoty */}
                        <img
                          src={Img1}
                          style={{
                            width: "20%",
                            height: "100px",
                            borderRadius: "50%",
                          }}
                        />
                      </span>
                      <input
                        className="FileUpload21"
                        id="FileInput"
                        type="file"
                        onChange={ImageFun}
                      />
                    </label>
                    {/* <input
                      type="file"
                      className="col-5 border-0"
                      style={{
                        textAlign: "start",
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                        backgroundColor: "#EFEFEF",
                        outline: 1,
                      }}
                      onChange={ImageFun}
                    /> */}
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
              {/* button to add image to the category */}
              <button
                className="col-5 border-0 text-white"
                disabled={Img1.length >= 1 ? false : true}
                onClick={myFunction}
                style={{
                  backgroundColor: "#2188E7",
                  height: "40px",
                  borderRadius: 7,
                }}
              >
                process
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
              <p>steps 3/4</p>

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
                      Add Sub Categories
                    </label>
                    <br />
                    <input
                      className="col-3 border-0"
                      style={{
                        textAlign: "start",
                        height: "50px",
                        backgroundColor: "#EFEFEF",
                        borderRadius: 7,
                        outline: 1,
                      }}
                      placeholder="  Enter name of Sub Categories"
                      value={Cat}
                      onChange={Categories}
                    />
                    <button
                      className="col-2 ms-2 border-0"
                      style={{
                        backgroundColor: "#2188E7",
                        color: "#fff",
                        textAlign: "center",
                        height: "50px",
                        borderRadius: 7,
                      }}
                      onClick={AddFun}
                    >
                      +Add
                    </button>
                  </div>
                  {/* {AddFunS=="add"?(
              
              Categories.map((res,key)=>{
                return(
                  <>
                  <div key={key} className="h-50">
              <input type="checkbox" />
              <p>{Categories[0]}</p>
            </div>
            </>
          )
              })
            )   
              
              :(<></>)} */}
                  {List.map((res, key) => {
                    return (
                      <>
                        <div key={key} className="row">
                          <div className="col-3"></div>
                          <div className="col-9 d-flex">
                            <input
                              className="ms-4"
                              type="checkbox"
                              value={res.Cat}
                              onClick={(e) => {
                                handleChange1(e);
                              }}
                            />
                            <p className="mt-3 ms-4">{res.Cat}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
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
                disabled={dataArray1.length >= 1 ? false : true}
                onClick={myFunction}
                style={{
                  backgroundColor: "#2188E7",
                  height: "40px",
                  borderRadius: 7,
                }}
              >
                proceed
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
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>steps 4/4</p>

              <div className="row">
                <div style={{ justifyConetnt: "center", textAlign: "center" }}>
                  <div>
                    <label
                      className="col-5 mb-2"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      New Exam Category &nbsp;
                      <span style={{ fontWeight: "600", fontSize: "18px" }}>
                        {Change}
                      </span>
                      &nbsp; will be created with following
                    </label>
                    <br />
                    <p>
                      {List.map((res) => {
                        return (
                          <>
                            <p>{res.Cat}</p>
                          </>
                        );
                      })}
                    </p>
                    <br />
                    <img
                      src={Img1}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                      alt="Cat img"
                    />
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
                disabled={check == 0 ? false : true}
                onClick={() => {
                  Api();
                  setCheck(check + 1);
                }}
                style={{
                  backgroundColor: "#2188E7",
                  height: "40px",
                  borderRadius: 7,
                }}
              >
                Confirm
              </button>
            </div>
          </div>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: first > 3 ? "block" : "none",
            }}
          >
            <div style={{ textAlign: "center", alignItems: "center" }}>
              <p style={{ fontSize: "20px" }}>
                New Exam Categories "<span>{Change}</span>"<br /> added
                Succesfully
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
              {/* <NavLink to="/Home"> */}
              <button
                className="border-0 col-4 mt-4"
                style={{
                  backgroundColor: "#0CBC8B",
                  color: "#fff",
                  height: "40px",
                  borderRadius: 7,
                }}
                onClick={() => {
                  Categories12();
                  handleClose();
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

      {/*  */}

      <div
        className="mt-3"
        style={{ height: "70vh", overflowY: "scroll", overflowX: "hidden" }}
      >
        <div className="row">
          {isLoading ? (
            <LoaderComponent />
          ) : (
            filterData?.map((res1, key1) => {
              return (
                <>
                  <div key={key1} className="col-4 mt-3">
                    <span
                      className="card"
                      onClick={async () => {
                        setId(res1.id);
                        setSubacat(res1);
                        New(res1.id);
                        setAllSub(res1.sub_category);
                        handleShow1();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex ps-2">
                        <span className="col-2">
                          <div
                            className="mt-2"
                            style={{
                              width: "40px",
                              height: "40px",
                              border: "1px solid #D9D9D9",
                              borderRadius: "50px",
                              justifyContent: "center",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              alt="#"
                              src={res1.category_image}
                              width="100%"
                            />
                          </div>
                        </span>
                        <div className="col-8 mt-2">
                          <span className="ml-5">
                            <p
                              style={{
                                marginBottom: "1px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                fontSize: "20px",
                                color: "#000000",
                              }}
                            >
                              {res1.category_name}
                            </p>
                            <p
                              style={{
                                marginTop: "-10px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "16px",
                                color: "#8A8A8A",
                              }}
                            >
                              sub-categories-
                              <span
                                style={{
                                  color: "red",
                                  fontStyle: "normal",
                                  fontWeight: "400",
                                  fontSize: "16px",
                                  color: "#CC1313",
                                }}
                              >
                                {res1.sub_category}
                              </span>
                            </p>
                          </span>
                        </div>
                        <span
                          className="col-2 mt-3"
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FaArrowRight />
                        </span>
                      </div>
                    </span>
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>

      <Offcanvas
        show={show1}
        onHide={handleClose1}
        placement="end"
        style={{ borderTopLeftRadius: 30, width: "50%" }}
      >
        <Offcanvas.Header>
          <div>
            <span
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => {
                setClick(0);
                Categories12("");
                setClick(0);
                setList2([]);
                handleClose1();
              }}
              style={{
                color: "#000",
                fontWeight: "600",
                display: Click === 2 ? "none" : "block",
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
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{ display: Click === 0 ? "block" : "none" }}>
            <div className="row">
              <div className="col-2">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img alt="#" src={Subacat.category_image} width="100%" />
                </div>
              </div>
              <div className="col-8">
                <h2>{Subacat.category_name}</h2>
              </div>
              <div className="col-2">
                <button
                  onClick={() => {
                    handleClose1();
                    New(Id);
                  }}
                  className="border-0 w-100"
                  style={{
                    color: "#2188E7",
                    backgroundColor: "#EAF5FF",
                    borderRadius: 10,
                    height: "35px",
                  }}
                >
                  Save
                </button>
              </div>
            </div>
            <div>
              <div className="col-6 d-flex ms-5">
                <p className="mt-2">
                  Sub Categories <span style={{ color: "red" }}>{AllSub}</span>
                </p>
                <button
                  className="border-0 ms-5 text-nowrap"
                  style={{
                    color: "#2188E7",
                    backgroundColor: "#EAF5FF",
                    borderRadius: 10,
                    height: "35px",
                  }}
                  onClick={() => {
                    setClick(Click + 1);
                  }}
                >
                  +Add Subcategory
                </button>
              </div>
            </div>
            <p
              className="ms-5"
              style={{ color: "#000000", fontWeight: 600, fontSize: 16 }}
            >
              Sub Categories
            </p>
            <hr />
            {SubCategories?.map((res, key) => {
              return (
                <div key={key} className="ms-5 mt-2 d-flex">
                  <input
                    className="mt-1"
                    type="checkbox"
                    defaultChecked={res.status == 0 ? false : true}
                    onChange={() => {
                      SETUPFDATE(res.id);
                    }}
                    style={{ height: "20px", width: "20px" }}
                  />
                  <p
                    className="ms-4"
                    style={{
                      color: "#000000",
                      fontWeight: "600",
                      fontSize: 20,
                    }}
                  >
                    {res.subcategory}
                  </p>
                </div>
              );
            })}
          </div>
          <div style={{ display: Click === 1 ? "block" : "none" }}>
            <div className="row">
              <div className="col-2">
                <div
                  className=""
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img alt="#" src={Subacat.category_image} width="100%" />
                </div>
              </div>
              <div className="col-8">
                <h2>{Subacat.category_name}</h2>
              </div>
              <div className="col-2">
                {/* <button
                  className="border-0 w-100"
                  style={{
                    color: "#2188E7",
                    backgroundColor: "#EAF5FF",
                    borderRadius: 10,
                    height: "35px",
                  }}
                >
                  Save
                </button> */}
              </div>
            </div>
            <div className="row">
              <div
                className="mt-5"
                style={{ justifyConetnt: "center", textAlign: "center" }}
              >
                <div>
                  <label
                    className="col-5 mb-2"
                    style={{
                      textAlign: "start",
                      color: "#303030",
                      fontWeight: "600",
                    }}
                  >
                    Add Sub Categories
                  </label>
                  <br />
                  <input
                    className="col-3 border-0"
                    style={{
                      textAlign: "start",
                      height: "50px",
                      backgroundColor: "#EFEFEF",
                      borderRadius: 7,
                      outline: 1,
                    }}
                    placeholder="  Enter name of Sub Categories"
                    value={Cat2}
                    onChange={Categories2}
                  />
                  <button
                    className="col-2 ms-2 border-0"
                    style={{
                      backgroundColor: "#2188E7",
                      color: "#fff",
                      textAlign: "center",
                      height: "50px",
                      borderRadius: 7,
                    }}
                    onClick={AddFun2}
                  >
                    +Add
                  </button>
                </div>

                {List2.map((res, key) => {
                  return (
                    <>
                      <div key={key} className="row">
                        <div className="col-3"></div>
                        <div className="col-9 d-flex">
                          <input
                            className="ms-4"
                            type="checkbox"
                            value={res}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                          <p className="mt-3 ms-4">{res}</p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div
              className="mt-5"
              style={{
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <button
                className="col-5 border-0 text-white"
                disabled={dataArray.length >= 1 ? false : true}
                onClick={() => {
                  setClick(Click + 1);
                  MutiSub();
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
            <div style={{ textAlign: "center", alignItems: "center" }}>
              <p style={{ fontSize: "20px" }}>
                New Exam Categories "<span>{Subacat.category_name}</span>"<br />{" "}
                added Succesfully
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
                className="border-0 col-4 mt-4"
                style={{
                  backgroundColor: "#0CBC8B",
                  color: "#fff",
                  height: "40px",
                  borderRadius: 7,
                }}
                onClick={() => {
                  Categories12("");
                  handleClose1();
                  setClick(0);
                  setList2([]);
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
                <span style={{ color: "#CC1313", fontSize: 20 }}>
                  {" "}
                  {Timer1}{" "}
                </span>
                Seconds
              </p>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* <div
        class="offcanvas offcanvas-end w-50"
        style={{ borderTopLeftRadius: 30 }}
        tabindex="-1"
        id="offcanvasRight2"
        aria-labelledby="offcanvasRightLabel2"
      >
        <div class="offcanvas-header">
          <span
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={()=>{setClick(0);
                  Categories12("");
                  setClick(0);
                  setList2([]);}}
            style={{ color: "#000", fontWeight: "600",display:Click===2?"none":"block"}}
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
        <div class="offcanvas-body">
          <div style={{ display: Click === 0 ? "block" : "none" }}>
            <div className="row">
              <div className="col-2">
                <div
              
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img alt="#" src={Subacat.category_image} width="100%" />
                </div>
              </div>
              <div className="col-8">
                <h2>{Subacat.category_name}</h2>
              </div>
              <div className="col-2">
                <button
                 data-bs-dismiss="offcanvas"
                 aria-label="Close"
                 className="border-0 w-100"
                  style={{
                    color: "#2188E7",
                    backgroundColor: "#EAF5FF",
                    borderRadius: 10,
                    height: "35px",
                  }}
                >
                  Save
                </button>
              </div>
            </div>
            <div>
              <div className="col-6 d-flex ms-5">
                <p className="mt-2">
                  Sub Categories <span style={{ color: "red" }}>{AllSub}</span>
                </p>
                <button
                  className="border-0 ms-5 text-nowrap"
                  style={{
                    color: "#2188E7",
                    backgroundColor: "#EAF5FF",
                    borderRadius: 10,
                    height: "35px",
                  }}
                  onClick={() => {
                    setClick(Click + 1);
                  }}
                >
                  +Add Subcategory
                </button>
              </div>
            </div>
            <p
              className="ms-5"
              style={{ color: "#000000", fontWeight: 600, fontSize: 16 }}
            >
              Sub Categories
            </p>
            <hr />
            {SubCategories?.map((res, key) => {
              return (
                <div key={key} className="ms-5 mt-2 d-flex">
                  <input
                    className="mt-1"
                    type="checkbox"
                    defaultChecked={res.status==0?false:true}
                    onChange={() =>{SETUPFDATE(res.id)}}
                    style={{ height: "20px", width: "20px", }}
                  />
                  <p
                    className="ms-4"
                    style={{
                      color: "#000000",
                      fontWeight: "600",
                      fontSize: 20,
                    }}
                  >
                    {res.subcategory}
                  </p>
                </div>
              );
            })}
          </div>
          <div style={{ display: Click === 1 ? "block" : "none" }}>
            <div className="row">
              <div className="col-2">
                <div
                  className=""
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img alt="#" src={Subacat.category_image} width="100%" />
                </div>
              </div>
              <div className="col-8">
                <h2>{Subacat.category_name}</h2>
              </div>
              <div className="col-2">
                <button
                  className="border-0 w-100"
                  style={{
                    color: "#2188E7",
                    backgroundColor: "#EAF5FF",
                    borderRadius: 10,
                    height: "35px",
                  }}
                >
                  Save
                </button> 
              </div>
            </div>
            <div className="row">
              <div
                className="mt-5"
                style={{ justifyConetnt: "center", textAlign: "center" }}
              >
                <div>
                  <label
                    className="col-5 mb-2"
                    style={{
                      textAlign: "start",
                      color: "#303030",
                      fontWeight: "600",
                    }}
                  >
                    Add Sub Categories
                  </label>
                  <br />
                  <input
                    className="col-3 border-0"
                    style={{
                      textAlign: "start",
                      height: "50px",
                      backgroundColor: "#EFEFEF",
                      borderRadius: 7,
                      outline: 1,
                    }}
                    placeholder="  Enter name of Sub Categories"
                    value={Cat2}
                    onChange={Categories2}
                  />
                  <button
                    className="col-2 ms-2 border-0"
                    style={{
                      backgroundColor: "#2188E7",
                      color: "#fff",
                      textAlign: "center",
                      height: "50px",
                      borderRadius: 7,
                    }}
                    onClick={AddFun2}
                  >
                    +Add
                  </button>
                </div>

                {List2.map((res, key) => {
                  return (
                    <>
                      <div key={key} className="row">
                        <div className="col-3"></div>
                        <div className="col-9 d-flex">
                          <input className="ms-4" type="checkbox" value={res} onChange={(e)=>{handleChange(e)}}/>
                          <p className="mt-3 ms-4">{res}</p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div
              className="mt-5"
              style={{
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <button
                className="col-5 border-0 text-white"
                disabled={dataArray.length>=1?false:true}
                onClick={() => {
                  setClick(Click + 1);
                  MutiSub();
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
          <div style={{ textAlign: "center", alignItems: "center" }}>
              <p style={{ fontSize: "20px" }}>
                New Exam Categories "<span>{Subacat.category_name}</span>"<br /> added
                Succesfully
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
            data-bs-dismiss="offcanvas"
            aria-label="Close"
                  className="border-0 col-4 mt-4"
                  style={{
                    backgroundColor: "#0CBC8B",
                    color: "#fff",
                    height: "40px",
                    borderRadius: 7,
                  }}
                 onClick={()=>{
                  Categories12("");
                  setClick(0);
                  setList2([]);
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
                <span style={{ color: "#CC1313", fontSize: 20 }}> {15} </span>
                Seconds
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Categories;

// setChecked(!checked);setZeros(1);
