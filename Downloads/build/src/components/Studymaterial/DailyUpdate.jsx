import { useState, useEffect } from "react";
import SearchIcon from "../../Img/ri_search-line.svg";
import { MdOutlineWatchLater } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import Lottie from "lottie-react";
import Thaks from "../../Img/lf20_snmbndsh.json";
import DatePicker from "react-datepicker";
import Dates from "../../Img/Date.svg";
import LoaderComponent from "../Utils/LoaderComponent";
import EmptyContainer from "../Utils/EmptyContainer";

const initLoader = {
  isLoading: false,
  isError: false,
};

const DailyUpdate = () => {
  const [NewImages, setNewImages] = useState("");
  const [NewDate, setNewDate] = useState("");
  const [Timess, setTimess] = useState("");
  const [Token, setToken] = useState("");
  const [Click, setClick] = useState(0);
  const [Images, setImages] = useState("");
  const [Banner, setBanner] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [Datess, setDatess] = useState();
  const [Handlen, setHandlen] = useState("");
  const [Detais, setDetais] = useState("");
  const [raka, setraka] = useState([]);
  const [startDate1, setStartDate1] = useState(new Date());
  const [Edit, setEdit] = useState(0);
  const [Edit1, setEdit1] = useState(2);
  const [Edit2, setEdit2] = useState(4);
  const [Hadline, setHadline] = useState("");
  const [Details, setDetails] = useState("");
  const [Delete, setDelete] = useState("");
  const [NewArray, setNewArray] = useState([]);
  const [Imagess, setImagess] = useState();
  const [tosearch, setTosearch] = useState();
  const [searchedDailyUpdates, setSearchedDailyupdates] = useState();
  const [loader, setLoader] = useState(initLoader);
  const { isLoading } = loader;

  const Secc = async (ID) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: ID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/dailylist", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 1) {
          setNewArray(result.data);
          setNewImages(result.data[0].banner_image);
          setHadline(result.data[0].headlines);
          setDetails(result.data[0].details);
          //  setImagess(result.data[0].banner_image)
        } else {
          alert(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const Changess = async (Id) => {
    var formdata = new FormData();
    formdata.append("banner_image", Imagess);
    formdata.append("schedule_update", NewDate);
    formdata.append("headlines", Hadline);
    formdata.append("details", Details);
    formdata.append("token", Token);
    formdata.append("id", Id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://brainbucks.co.in/api/admin/daily-update-change",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const Api = async () => {
    var formdata = new FormData();
    formdata.append("banner_image", Banner);
    formdata.append("schedule_update", Datess);
    formdata.append("headlines", Handlen);
    formdata.append("details", Detais);
    formdata.append("token", Token);
    //   formdata.append("schedule_time", Timess);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/dailyupdates", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "1") {
          console.log(result.message);
          setBanner("");
          setStartDate("");
          setHandlen("");
          setDetais("");
        } else {
          alert(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // function for getting data of dailyupdates
  const Api1 = async () => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    try {
      const Res = await fetch(
        "https://brainbucks.co.in/api/admin/dailyupdatesget"
      );
      const Data = await Res.json();

      if (Data.status === 1) {
        // console.log(Data);
        setraka(Data.data);
        setSearchedDailyupdates(Data.data);
        setLoader({
          ...loader,
          isLoading: false,
        });
        // console.log(Data.message);
      } else {
        alert(Data.message);
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

  // function for deleate particular daily update
  const DeleteApi = async () => {
    try {
      const Responce = await fetch(
        `https://brainbucks.co.in/api/admin/dailydelete?id=${Delete}`
      );
      const Data = await Responce.json();
      if (Data.status === 1) {
        console.log(Data.message);
      } else {
        alert(Data.message);
      }
      console.log(Data);
    } catch (error) {
      console.log(error);
    }
  };

  const Reset = () => {};

  //function for search daily updaate
  const searchDailyUpdateFun = (x) => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: localStorage.getItem("token"),
      search: x,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://brainbucks.co.in/api/admin/search-daily-update",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log("res",result);
        if (result.status === 1) {
          setSearchedDailyupdates(result.data);
          setLoader({
            ...loader,
            isLoading: false,
          });
          //  console.log("mess",result.message);
        } else {
          // alert(result.message);
          setSearchedDailyupdates([]);
          setLoader({
            ...loader,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoader({
          ...loader,
          isLoading: false,
        });
      });
  };

  //function for handle keypress for search functionality

  const handleKeyPressforSearch = (e) => {
    const { key, target } = e;
    const { value } = target;
    setTosearch(value);
    if (key === "Enter") {
      // console.log(value);
      searchDailyUpdateFun(value);
    }
  };

  //function handle after empty data for fetch all the data of api instead of only searched data that was empty
  const handleAfterEmptyData = () => {
    setSearchedDailyupdates(raka);
  };
  useEffect(() => {
    Api1();
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div>
      <div
        className="row mb-3"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="col-10 d-flex">
          <div className="col-4">
            <h5 className="mt-1" style={{ fontWeight: 600 }}>
              Showing total{" "}
              <span style={{ color: "#cc1313" }}>
                {" "}
                {searchedDailyUpdates?.length}{" "}
              </span>
              Updates
            </h5>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-5">
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
                      onKeyPress={handleKeyPressforSearch}
                      className="border-0 w-100"
                      placeholder="Search for updates"
                      style={{
                        textDecoration: "none",
                        outline: "none",
                        color: "#272727",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <button
                  onClick={() => searchDailyUpdateFun(tosearch)}
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
        </div>
        <div className="col-2">
          <button
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight12"
            aria-controls="offcanvasRight12"
            style={{
              backgroundColor: "#2E8760",
              border: "1px solid #2E8760",
              height: "40px",
              borderRadius: "10px",
              color: "#fff",
            }}
          >
            <span className="p-2"> + Add New Update</span>
          </button>
        </div>
      </div>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight12"
        aria-labelledby="offcanvasRightLabel"
        style={{ width: "50%", borderRadius: "15px 0px 0px 0px" }}
      >
        <div class="offcanvas-header">
          <span
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{ color: "#000", fontWeight: "600" }}
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
        <div className="offcanvas-body px-5">
          <div className="row">
            <p
              style={{
                fontSize: 22,
                fontWeight: 600,
                marginLeft: "-20px",
                marginTop: "-20px",
              }}
            >
              Add New Daily Update
            </p>
            <div className="col-2"></div>
            <div className="col-8">
              <lable style={{ fontSize: 16, fontWeight: 600 }}>
                Upload Banner Image
              </lable>
              {/* <img src={Images} style={{width:"100%",height:"200px"}}/> */}
              <label
                className="filelabel1 w-100"
                style={{
                  height: "150px",
                  marginLeft: "0px",
                  backgroundColor: "#F5F5F5",
                }}
              >
                <span className="title1">
                  <img
                    className="d-flex"
                    src={Images}
                    style={{ width: "100%", height: "100px" }}
                  />
                  400px
                  <span style={{ fontSize: 20, fontWeight: 600 }}> x </span>
                  200px
                </span>
                <input
                  className="FileUpload1"
                  id="FileInput1"
                  name="booking_attachment1"
                  type="file"
                  accept=".png,.jpg"
                  onChange={(e) => {
                    setImages(URL.createObjectURL(e.target.files[0]));
                    setBanner(e.target.files[0]);
                  }}
                />
              </label>

              <span className="mt-2" style={{ fontSize: 16, fontWeight: 600 }}>
                Schedule DailyUpdate
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
                    selected={startDate}
                    onChange={(date: Date) => {
                      setStartDate(date);
                      setDatess(
                        date.getFullYear() +
                          "-" +
                          (parseInt(date.getMonth()) + 1 > 9
                            ? parseInt(date.getMonth()) + 1
                            : "0" + (parseInt(date.getMonth()) + 1)) +
                          "-" +
                          date.getDate()
                      );
                    }}
                  />
                </span>
                {/* <span className="col-4 ms-4 rounded" style={{backgroundColor:"#EFEFEF",height:"35px"}}>
                    <input className="border-0 rounded mt-1" value={Timess} type="time" style={{backgroundColor:"#EFEFEF",color:"#8A8A8A",outline:"none"}} onChange={(e)=>{
                      setTimess(e.target.value)
                    }}/>
                  </span> */}
              </div>
              <label className="mt-2" style={{ fontSize: 16, fontWeight: 600 }}>
                Headline
              </label>
              <input
                className="w-100 border-0"
                placeholder=" Headline here"
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: 5,
                  height: "40px",
                }}
                onChange={(e) => {
                  setHandlen(e.target.value);
                }}
              />
              <label className="mt-2" style={{ fontSize: 16, fontWeight: 600 }}>
                Details
              </label>
              <textarea
                className="w-100 border-0"
                placeholder="Details here"
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: 5,
                  height: "150px",
                }}
                onChange={(e) => {
                  setDetais(e.target.value);
                }}
              />
              <button
                type="submit"
                className="border-0 w-100 text-white mt-5"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                style={{
                  backgroundColor: "#2188E7",
                  height: "40px",
                  borderRadius: 7,
                }}
                onClick={() => {
                  Api();
                  Reset();
                  Api1();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{ height: "70vh", overflowY: "scroll" }}
      >
        <div className="row">
          {isLoading ? (
            <LoaderComponent />
          ) : searchedDailyUpdates?.length === 0 ? (
            <EmptyContainer
              actionName="fetch all data"
              message="data not found"
              action={handleAfterEmptyData}
            />
          ) : (
            searchedDailyUpdates?.map((res, key) => {
              return (
                <div className="col-lg-4 col-md-6 col-sm-12 mt-5" key={key}>
                  <div
                    class="card"
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      boxShadow: "0px 4px 4px rgba(57, 80, 126, 0.14);",
                    }}
                  >
                    <img
                      src={res.banner_image}
                      alt="#"
                      style={{
                        borderRadius: 10,
                        width: "100%",
                        height: "200px",
                      }}
                    />

                    <div class="card-body">
                      <p
                        class="card-title"
                        style={{
                          color: "#8a8a8a",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <MdOutlineWatchLater
                          className="me-2"
                          style={{ fontSize: "20px" }}
                        />
                        Last Update {res.schedule_update}
                      </p>
                      <div
                        style={{
                          width: "350px",
                          height: "30px",
                          // msOverflowStyle:"auto",
                          marginTop: ".5rem",
                          // marginBottom:"5rem"
                          // overflowX: "hidden"
                        }}
                      >
                        <p
                          class="card-text"
                          style={{ fontSize: "18px", display: "inline-block" }}
                        >
                          {res.headlines}
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #CC1313",
                            padding: "6px 15px",
                            borderRadius: 8,
                            color: "#cc1313",
                          }}
                          onClick={() => {
                            setDelete(res.id);
                          }}
                        >
                          Delete Update
                        </button>

                        <button
                          onClick={() => {
                            Secc(res.id);
                          }}
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight"
                          style={{
                            backgroundColor: "#21B867",
                            border: "none",
                            color: "#fff",
                            padding: "8px 15px",
                            borderRadius: 8,
                            alignItems: "center",
                          }}
                        >
                          <BsFillEyeFill
                            className="me-1 mb-1"
                            style={{ fontSize: 18 }}
                          />
                          View Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Delete button modal start */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header" style={{ border: "none" }}>
              {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
              {/* <button type="button" class="btn-close" ></button> */}
            </div>
            <div class="modal-body">
              <div style={{ display: Click === 0 ? "block" : "none" }}>
                <h3 className="text-center mb-3">Are you sure?</h3>

                <p
                  style={{
                    color: "#8a8a8a",
                    textAlign: "center",
                    fontSize: "18px",
                  }}
                >
                  Do you really want to delete this Blog?
                </p>

                <div
                  className="mt-3"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    type="button"
                    className="btn btn mx-4"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    style={{
                      backgroundColor: "#E1DDDD",
                      color: "#fff",
                      padding: "8px 30px",
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn mx-4"
                    style={{
                      backgroundColor: "#cc1313",
                      color: "#fff",
                      padding: "8px 30px",
                    }}
                    onClick={() => {
                      setClick(Click + 1);
                      DeleteApi();
                      Api1();
                    }}
                  >
                    Yes Delete
                  </button>
                </div>
              </div>
              <div style={{ display: Click === 1 ? "block" : "none" }}>
                <div
                  className="d-flex"
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Lottie animationData={Thaks} style={{ width: "40%" }} />
                </div>
                <p
                  style={{
                    textAlign: "center",
                    color: "#8a8a8a",
                    fontSize: "18px",
                  }}
                >
                  “ Update ” is successfully deleted
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    style={{
                      backgroundColor: "#2188E7",
                      color: "#fff",
                      textAlign: "center",
                      padding: "10px 40px",
                      borderRadius: "10px",
                    }}
                    onClick={() => {
                      setClick(0);
                    }}
                  >
                    ok
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete button modal end */}

      <div
        class="offcanvas offcanvas-end w-50"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{ borderRadius: "20px 5px 0px 0px" }}
      >
        <div class="offcanvas-header">
          <span
            className="col-10"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{ color: "#000", fontWeight: "600" }}
            onClick={() => setEdit(0)}
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
          <p style={{ fontWeight: "600", fontSize: 22, marginTop: "-20px" }}>
            View Daily Update
          </p>
          {NewArray?.map((res, key) => {
            return (
              <>
                <div className="row" key={key}>
                  <div className="col-3"></div>
                  <div className="col-6">
                    <div className="d-flex">
                      <p
                        className="mt-2"
                        style={{ fontWeight: "600", fontSize: 16 }}
                      >
                        Upload Banner Image
                      </p>
                      <label
                        className="filelabel2 ms-4"
                        style={{ backgroundColor: "#F5F5F5", width: "100px" }}
                      >
                        <span className="title2">Change</span>
                        <input
                          className="FileUpload2"
                          id="FileInput2"
                          name="booking_attachment2"
                          type="file"
                          onChange={(e) => {
                            setImagess(e.target.files[0]);
                            setNewImages(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                        />
                      </label>
                    </div>
                    <div className="w-100 rounded">
                      <img
                        className="border-0"
                        src={NewImages}
                        style={{ height: "200px", width: "100%" }}
                      />
                    </div>
                    <div className="d-flex mt-2">
                      <p
                        className="mt-2"
                        style={{ fontWeight: "600", fontSize: 16 }}
                      >
                        Schedule Update
                      </p>
                      <button
                        className="ms-2 rounded"
                        style={{
                          border: "1px solid #8A8A8A",
                          color: "#8A8A8A",
                          height: "35px",
                          width: "100px",
                        }}
                        onClick={() => setEdit(1)}
                      >
                        Edit
                      </button>
                    </div>

                    <div
                      className="w-100"
                      style={{ display: Edit == 0 ? "block" : "none" }}
                    >
                      <div className="d-flex">
                        <span
                          className="d-flex rounded"
                          style={{
                            backgroundColor: "#EFEFEF",
                            color: "#8A8A8A",
                            width: "200px",
                          }}
                        >
                          <img className=" ms-2 mt-1" src={Dates} alt="#" />
                          <span className="ms-1 mt-1">
                            {res.schedule_update}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div
                      className="row mt-3"
                      style={{ display: Edit == 1 ? "block" : "none" }}
                    >
                      <div className="row">
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
                            selected={startDate1}
                            onChange={(date: Date) => {
                              setStartDate1(date);
                              setNewDate(
                                date.getFullYear() +
                                  "-" +
                                  (parseInt(date.getMonth()) + 1 > 9
                                    ? parseInt(date.getMonth()) + 1
                                    : "0" + (parseInt(date.getMonth()) + 1)) +
                                  "-" +
                                  date.getDate()
                              );
                            }}
                          />
                        </span>
                      </div>
                    </div>

                    <div className="d-flex mt-2">
                      <p
                        className="mt-2"
                        style={{ fontWeight: "600", fontSize: 16 }}
                      >
                        Headline
                      </p>
                      <button
                        className="ms-2 rounded"
                        style={{
                          border: "1px solid #8A8A8A",
                          color: "#8A8A8A",
                          height: "35px",
                          width: "100px",
                        }}
                        onClick={() => setEdit1(3)}
                      >
                        Edit
                      </button>
                    </div>

                    <textarea
                      className="w-100 rounded"
                      value={Hadline}
                      disabled={Edit1 === 3 ? false : true}
                      onChange={(e) => {
                        setHadline(e.target.value);
                      }}
                      style={{ height: "60px", backgroundColor: "#F5F5F5" }}
                    />

                    <div className="d-flex mt-2">
                      <p
                        className="mt-2"
                        style={{ fontWeight: "600", fontSize: 16 }}
                      >
                        Details
                      </p>
                      <button
                        className="ms-2 rounded"
                        style={{
                          border: "1px solid #8A8A8A",
                          color: "#8A8A8A",
                          height: "35px",
                          width: "100px",
                        }}
                        onClick={() => setEdit2(5)}
                      >
                        Edit
                      </button>
                    </div>

                    <textarea
                      className="w-100 rounded"
                      value={Details}
                      disabled={Edit2 === 5 ? false : true}
                      onChange={(e) => {
                        setDetails(e.target.value);
                      }}
                      style={{ height: "160px", backgroundColor: "#F5F5F5" }}
                    />
                    <button
                      className="w-100 border-0 rounded"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                      style={{
                        backgroundColor: "#2188E7",
                        color: "#fff",
                        height: "35px",
                      }}
                      onClick={() => {
                        Changess(res.id);
                        Api1();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyUpdate;
