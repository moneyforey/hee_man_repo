import { useState, useEffect } from "react";
import SearchIcon from "../../Img/ri_search-line.svg";
import { FaArrowRight } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { IoFilterSharp } from "react-icons/io5";
import FreePdfData from "./FreePdfData";
import Lottie from "lottie-react";
import Clebrate from "../../Img/lf20_VuglDs.json";
import PdfImg from "../../Img/pdf.svg";
import "./FreePdf1.css";
import Thaks from "../../Img/lf20_snmbndsh.json";
import Offcanvas from "react-bootstrap/Offcanvas";
import EmptyContainer from "../Utils/EmptyContainer";
import LoaderComponent from "../Utils/LoaderComponent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initLoader = {
  isLoading: false,
  isError: false,
};

const initUpdatedSTM = {
  pdf: "",
  pdf1: "",
  pdf_cat: "",
  category_id: "",
  display_name: "",
  pdf_id: "",
};

const FreePdf = () => {
  const navigate = useNavigate();
  const [ImgCat, setImgCat] = useState("");
  const [CatName, setCatName] = useState("");
  const [NameCat, setNameCat] = useState("");
  const [Token, setToken] = useState("");
  const [Click, setClick] = useState(0);
  const [demo, setDemo] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [File, setFile] = useState();
  const [File1, setFile1] = useState();
  const [Name, setName] = useState("");
  const [CatId, setCatId] = useState("");
  const [Value, setValue] = useState("");
  const [View, setView] = useState(0);
  const [het, setHet] = useState([]);
  const [IdFor, setIdFor] = useState("");
  const [hets, setHets] = useState([]);
  const [Display, setDisplay] = useState(0);
  const [Category, setCategory] = useState(0);
  const [DisplayChag, setDisplayChag] = useState("");
  const [CategoryChag, setCategoryChag] = useState("");
  const [PdfChan1, setPdfChan1] = useState("");
  const [PdfChan, setPdfChan] = useState("");
  const [DisplayChan, setDisplayChan] = useState("");
  const [ApiIds, setApiIds] = useState("");
  const [DeleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);
  const [Timers1, setTimers1] = useState(15);
  const [Notes_id, setNotes_id] = useState();
  const [toSearch, setToSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [loader, setLoader] = useState(initLoader);
  const [filterCategories, setFilteerCatories] = useState();
  const [updatedSTM, setUpdatedSTM] = useState([]);
  const [replaced_file,setReplacedFile] = useState();

  const { isLoading } = loader;
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const MyFun = () => {
    setClick(Click + 1);
  };

  //function for delete particular particular study material
  const DeleteApi = async () => {
    try {
      const Res = await fetch(
        `https://brainbucks.co.in/api/admin/studymatdelete?id=${DeleteId}`
      );
      const Data = await Res.json();
      if (Data.status == 1) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function for Add pdf from card;
  const Api = async () => {
    // console.log("inside confirmations");
    var formdata = new FormData();
    formdata.append("token", Token);
    formdata.append("file_path_en", File);
    formdata.append("notes_id", Value);
    formdata.append("category_id", CatId);
    formdata.append("file_title", Name);
    formdata.append("file_path_hi", File1);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/studymat", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 1) {
          // console.log("res in add pdf",result);
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
          //pdf work over the less then 10mb only
          toast(result.message);
          //  console.log(result);
          // console.log("inside confirmations");
        }
      })
      .catch((error) => console.log("error", error));
  };

  //function for getting all the cayegories
  const Categories12 = async () => {
    try {
      const Dar = await fetch(
        "https://brainbucks.co.in/api/admin/categorylist"
      );
      const res = await Dar.json();
      setCategories(res);
      setFilteerCatories(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("here",updatedSTM);

  //function for get particular study material by their id;
  const Api3 = async (id) => {
    try {
      const Responce  = await fetch(
        `https://brainbucks.co.in/api/admin/studymatpdf?id=${id}`
      );


      const Data = await Responce.json();
      if (Data.status == 1) {
        // console.log("stm", Data);
        setHets(Data.data);
        setUpdatedSTM(Data.data[0]);


       setUpdatedSTM({
        ...updatedSTM,
        file_path_en:null,
        file_path_hi:null
       })
        //set state for updated stm

        setIdFor(Data.data[0].notes_id);
      } else {
        alert(Data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function for update particular study material data
  const ApiSend = async (id) => {
    console.log("my data for update", updatedSTM);
    
    var myHeaders = new Headers();
    myHeaders.append("location", "");

    var formdata = new FormData();
    Object.entries(updatedSTM).forEach(([key, value]) => {
      if(value !== null){
        formdata.append(key, value);
      }  
    });

  
    //  formdata.append("pdf", PdfChan);
    // formdata.append("pdf1", PdfChan1);
    // formdata.append("pdf_cat", CategoryChag);
    // formdata.append("category_id", DisplayChan);
    // formdata.append("display_name", DisplayChag);
     formdata.append("id", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `https://brainbucks.co.in/api/admin/studymatupdate`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 1) {
          console.log(result.message)
        } else {
          console.log(result.message);
          // alert(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  //function for get all the study material
  const Api1 = async () => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    try {
      const Responce = await fetch(
        "https://brainbucks.co.in/api/admin/studymatget"
      );
      const Data = await Responce.json();
      if (Data.status === 1) {
        setDemo(Data.data);
        setSearchData(Data.data);
        setLoader({
          ...loader,
          isLoading: false,
        });
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

  //function for empty or go back to while no data found on searching
  const noDataAction = () => {
    // console.log('no data find');
    setSearchData(demo);
  };

  //function for filter categories
  const handleFilter = (search) => {
    // console.log(search.toLowerCase());
    const filterData = Categories.filter((el) => {
      if (search.length === 0) {
        return el;
      }
      return el.category_name.toLowerCase().startsWith(search.toLowerCase());
    });
    setFilteerCatories([...filterData]);
    //  console.log(filterData);
  };

  //function for getting notes by id
  const Api2 = async (VAL) => {
    try {
      const Responce = await fetch(
        `https://brainbucks.co.in/api/admin/studymatlist?notes_id=${VAL}`
      );
      const Data = await Responce.json();
      if (Data.status == 1) {
        // console.log(Data);
        setHet(Data.data);
      } else {
        alert(Data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function for search functionality
  const searchFunction = () => {
    //  console.log(toSearch);
    setLoader({
      ...loader,
      isLoading: true,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: localStorage.getItem("token"),
      search: toSearch,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/search-pdf", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        const { data } = result;
        if (!data) {
          setSearchData([]);
          setLoader({
            ...loader,
            isLoading: false,
          });
          return;
        }

        setSearchData(result.data);
        setLoader({
          ...loader,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("error", error);
        setLoader({
          ...loader,
          isLoading: false,
        });
      });
  };

  //function for handle search functionlity by using enter key on keyboard
  const handleSearchFunctionlity = (e) => {
    const { key, target } = e;
    const { value } = target;
    setToSearch(value);
    if (key === "Enter") {
      searchFunction();
    }
  };

  

  useEffect(() => {
    Categories12();
    Api1();
    setToken(localStorage.getItem("token"));
  }, []);

  // setTimeout(() => {
  //   if (Timers1 == 0) {
  //     setShow(false);
  //     Api1();
  //   }
  // }, 15);

  return (
    <div>
      <div className="row">
        <div className="col-6 d-flex">
          <div className="col-8">
            <h5 className="mt-1" style={{ fontWeight: 600 }}>
              Showing total
              <span style={{ color: "#CC1313" }}> {searchData?.length} </span>
              Free PDFs
            </h5>
          </div>
          <div className="col-4">
            <button
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              style={{
                backgroundColor: "#EDF7FF",
                border: "1px solid #2188E7",
                height: "40px",
                borderRadius: "10px",
                color: "#2188E7",
              }}
            >
              <span className="p-3"> + Add PDF</span>
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
                <div className="col-2 mt-2">
                  <img alt="SearchIcon" src={SearchIcon} />
                </div>
                <div className="col-10 mt-2 ">
                  <input
                    onKeyPress={handleSearchFunctionlity}
                    onChange={(e) => setToSearch(e.target.value)}
                    className="border-0 w-100"
                    placeholder="Search for PDF"
                    style={{
                      textDecoration: "none",
                      outline: "none",
                      color: "#272727",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-2">
              <button
                onClick={searchFunction}
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

      {/* for add pdf from the top of free pdf page offcanvas start */}
      <div
        className="offcanvas offcanvas-end w-50"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{ borderTopLeftRadius: 30, backgroundColor: "#F5F5F5" }}
      >
        <div className="offcanvas-body">
          <FreePdfData />
        </div>
      </div>
      {/* ends here */}

      <div className="container mt-4">
        <div className="row">
          {isLoading ? (
            <LoaderComponent />
          ) : searchData.length === 0 ? (
            <EmptyContainer
              message="No data found"
              action={noDataAction}
              actionName="Fetch All Data"
            />
          ) : (
            searchData?.map((res, key) => {
              return (
                <div className="col-lg-3 col-md-6 col-sm-12 my-4" key={key}>
                  <div class="card" style={{ borderRadius: 15, width: "100%" }}>
                    <div class="card-body">
                      <h4 class="card-title  align-item-center">
                        {res.title}
                        <FaArrowRight
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight2"
                          className="mt-1"
                          style={{
                            float: "right",
                            color: "#000",
                            fontSize: 17,
                          }}
                          onClick={() => {
                            setValue(res.notes_id);
                            setNameCat(res.title);
                          }}
                        />
                      </h4>

                      <p class="card-text" style={{ color: "#8A8A8A" }}>
                        Total
                        <span style={{ color: "red" }}> {res.total} </span>
                        PDFs
                      </p>

                      <div
                        className="px-2"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className="mt-2"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight4"
                          aria-controls="offcanvasRight"
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#F7F7F7",
                            padding: "7px 15px",
                            borderRadius: 10,
                          }}
                          // need to check the funtionality and errors for final save button
                          onClick={() => {
                            Api2(res.notes_id);
                            setNotes_id(res.notes_id);
                          }}
                        >
                          <AiFillEdit
                            className="me-1"
                            style={{ fontSize: 20 }}
                          />
                          Edit
                        </span>

                        <button
                          type="btn"
                          style={{
                            border: "none",
                            padding: "7px 20px",
                            borderRadius: 10,
                            backgroundColor: "#22BD69",
                            color: "#fff",
                          }}
                          onClick={() => {
                            setValue(res.notes_id);
                            setShow(true);
                          }}
                        >
                          + Add
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

      {/* offcanvas for add pdf from card */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="w-50"
        style={{ width: "50%", borderRadius: "15px 0px 0px 0px" }}
      >
        <Offcanvas.Header>
          <span
            onClick={() => {
              setClick(0);
              setShow(false);
            }}
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
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{ display: Click === 0 ? "block" : "none" }}>
            <h5 id="offcanvasRightLabel" style={{ fontWeight: 600 }}>
              Add PDF
            </h5>
            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: "33%",
                  background:
                    "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p>steps 1/3</p>

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
                    onChange={(e) => handleFilter(e.target.value)}
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
                  {filterCategories?.map((res) => {
                    return (
                      <>
                        <div className="d-flex mt-3" key={res.category_id}>
                          <input
                            style={{ color: "#F6F6F6" }}
                            type="radio"
                            name="Select"
                            id={res.id}
                            onChange={(e) => {
                              setCatId(e.target.id);
                              setCatName(res.category_name);
                              setImgCat(res.category_image);
                            }}
                          />
                          <img
                            src={res.category_image}
                            alt="#"
                            className="mx-3"
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                            }}
                          />
                          <span className="ms-2 fw-bolder mt-1">
                            {res.category_name}
                          </span>
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
                className="col-6 border-0 mt-3 text-white"
                onClick={MyFun}
                disabled={CatName.length === 0}
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
            <div>
              <h5 style={{ fontWeight: 600 }}>Add PDF</h5>
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: "75%",
                    background:
                      "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                  }}
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>steps 2/3</p>

              <div className="row">
                <div className="col-3"></div>
                <div className="card col-6" style={{ borderColor: "#EFEFEF" }}>
                  <lable
                    className="mt-2 mb-2"
                    style={{ fontWeight: "bolder", fontSize: 16 }}
                  >
                    Upload PDF
                  </lable>
                  {/* <input style={{border:"2px solid #EDEDED",backgroundColor:"#EDEDED",height:"50px"}} type="file" title='Select .pdf file' accept='.pdf'/> */}
                  {/* <label className="filelabel1 w-100" style={{height:"50px",marginLeft:"0px",backgroundColor:"#F5F5F5"}}>
                           
                           <span className="title1">
                           Select .pdf file
                           </span>
                           <input className="FileUpload1" id="FileInput1" name="booking_attachment1" type="file" accept='.pdf' onChange={(e)=>{setFile(e.target.files[0])}}/>
                       </label>  */}

                  <label
                    className="filelabel1 w-100"
                    style={{
                      height: "70px",
                      marginLeft: "0px",
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    <span className="title1">Select .pdf file</span>
                    <input
                      className="FileUpload1"
                      type="file"
                      accept=".pdf"
                      name="booking_attachment2"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </label>

                  <lable
                    className="mt-2 mb-2"
                    style={{ fontWeight: "bolder", fontSize: 16 }}
                  >
                    Upload Translated PDF{" "}
                    <span style={{ fontSize: 14, fontWeight: 400 }}>
                      (Optional)
                    </span>
                  </lable>
                  {/* <input style={{border:"2px solid #EDEDED",backgroundColor:"#EDEDED",height:"60px"}} type="file" title='Select .pdf file' accept='.pdf'/> */}
                  {/* 
               <label className="filelabel1 w-100" style={{height:"60px",marginLeft:"0px",backgroundColor:"#F5F5F5"}}>
                           
                           <span className="title1">
                           Select .pdf file
                           </span>
                           <input className="FileUpload1" id="FileInput1" name="booking_attachment2" type="file" accept='.pdf' onChange={(e)=>{setFile1(e.target.files[0])}}/>
                       </label>  */}

                  <label
                    className="filelabel1 w-100"
                    style={{
                      height: "70px",
                      marginLeft: "0px",
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    <span className="title1">Select .pdf file</span>
                    <input
                      className="FileUpload1"
                      type="file"
                      accept=".pdf"
                      name="booking_attachment2"
                      onChange={(e) => {
                        setFile1(e.target.files[0]);
                      }}
                    />
                  </label>

                  <input
                    className="mt-3 mb-3"
                    placeholder="  Enter Display Name"
                    style={{
                      border: "2px solid #EDEDED",
                      height: "45px",
                      outline: 1,
                      color: "#303030",
                    }}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
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
                  className="col-6 border-0 mt-3 text-white"
                  onClick={MyFun}
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
          </div>

          <div style={{ display: Click === 2 ? "block" : "none" }}>
            <div>
              <h5 style={{ fontWeight: 600 }}>Add PDF</h5>
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: "75%",
                    background:
                      "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                  }}
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>steps 3/3</p>

              <div className="row">
                <div className="col-3"></div>
                <div
                  className="col-6"
                  style={{
                    borderColor: "#EFEFEF",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontSize: 22 }}>
                    New PDF{" "}
                    <span style={{ fontSize: 23, fontWeight: "bolder" }}>
                      {Name} {NameCat}
                    </span>{" "}
                    will be added to{" "}
                    <span style={{ fontSize: 23, fontWeight: "bolder" }}>
                      {CatName}
                    </span>
                  </p>
                  <img
                    className="mt-3 mb-3"
                    src={ImgCat}
                    alt="#"
                    style={{ width: 120 }}
                  />
                </div>
              </div>
              <div
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  backgroundColor: "",
                }}
              >
                {/* //seen this */}
                <button
                  className="col-6 border-0 mt-3 text-white"
                  onClick={() => {
                    Api();
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
          </div>

          <div style={{ display: Click === 3 ? "block" : "none" }}>
            <div className="row">
              <div className="col-3"></div>
              <div
                className="col-6"
                style={{
                  borderColor: "#EFEFEF",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: 22 }}>
                  New PDF{" "}
                  <span style={{ fontSize: 23, fontWeight: "bolder" }}>
                    {Name} {NameCat}
                  </span>{" "}
                  will be added to{" "}
                  <span style={{ fontSize: 23, fontWeight: "bolder" }}>
                    {CatName}
                  </span>
                </p>
                {/* <img className="mt-3 mb-3" src={ImgCat} alt="#" style={{width:120}}/> */}

                <Lottie
                  className="ms-5"
                  animationData={Clebrate}
                  loop={true}
                  style={{ width: "80%" }}
                />

                <button
                  onClick={() => {
                    setShow(false);
                  }}
                  className="border-0 col-12 mt-4"
                  style={{
                    backgroundColor: "#0CBC8B",
                    color: "#fff",
                    height: "40px",
                    borderRadius: 7,
                  }}
                >
                  Back to Dashboard
                </button>

                <div
                  className="mt-5"
                  style={{ textAlign: "center", alignItems: "center" }}
                >
                  <p style={{ color: "#8A8A8A" }}>
                    This tab will automatically close in
                    <span style={{ color: "#CC1313", fontSize: 20 }}>
                      {" "}
                      {Timers1}{" "}
                    </span>
                    Seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* +Add button at top offcanvas start */}

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight2"
        aria-labelledby="offcanvasRightLabel"
        style={{ width: "50%", borderRadius: "15px 0px 0px 0px" }}
      >
        <div class="offcanvas-header">
          <span
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => {
              setClick(0);
            }}
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
          <div style={{ display: Click === 0 ? "block" : "none" }}>
            <h5 id="offcanvasRightLabel" style={{ fontWeight: 600 }}>
              Add PDF
            </h5>
            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: "33%",
                  background:
                    "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p>steps 1/3</p>

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
                  {filterCategories?.map((res, key) => {
                    return (
                      <>
                        <div className="d-flex mt-3" key={key}>
                          <input
                            style={{ color: "#F6F6F6" }}
                            type="radio"
                            name="Select"
                            id={res.id}
                            onChange={(e) => {
                              setCatId(e.target.id);
                              setCatName(res.category_name);
                              setImgCat(res.category_image);
                            }}
                          />
                          <img
                            src={res.category_image}
                            alt="#"
                            className="mx-3"
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                            }}
                          />
                          <span className="ms-2 fw-bolder mt-1">
                            {res.category_name}
                          </span>
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
                className="col-6 border-0 mt-3 text-white"
                onClick={MyFun}
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
            <div>
              <h5 style={{ fontWeight: 600 }}>Add PDF</h5>
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: "75%",
                    background:
                      "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                  }}
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>steps 2/3</p>

              <div className="row">
                <div className="col-3"></div>
                <div className="card col-6" style={{ borderColor: "#EFEFEF" }}>
                  <lable
                    className="mt-2 mb-2"
                    style={{ fontWeight: "bolder", fontSize: 16 }}
                  >
                    Upload PDF
                  </lable>
                  {/* <input style={{border:"2px solid #EDEDED",backgroundColor:"#EDEDED",height:"50px"}} type="file" title='Select .pdf file' accept='.pdf'/> */}
                  {/* <label className="filelabel1 w-100" style={{height:"50px",marginLeft:"0px",backgroundColor:"#F5F5F5"}}>
                           
                           <span className="title1">
                           Select .pdf file
                           </span>
                           <input className="FileUpload1" id="FileInput1" name="booking_attachment1" type="file" accept='.pdf' onChange={(e)=>{setFile(e.target.files[0])}}/>
                       </label>  */}

                  <label
                    className="filelabel1 w-100"
                    style={{
                      height: "70px",
                      marginLeft: "0px",
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    <span className="title1">Select .pdf file</span>
                    <input
                      className="FileUpload1"
                      type="file"
                      accept=".pdf"
                      name="booking_attachment2"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </label>

                  <lable
                    className="mt-2 mb-2"
                    style={{ fontWeight: "bolder", fontSize: 16 }}
                  >
                    Upload Translated PDF{" "}
                    <span style={{ fontSize: 14, fontWeight: 400 }}>
                      (Optional)
                    </span>
                  </lable>
                  {/* <input style={{border:"2px solid #EDEDED",backgroundColor:"#EDEDED",height:"60px"}} type="file" title='Select .pdf file' accept='.pdf'/> */}
                  {/* 
               <label className="filelabel1 w-100" style={{height:"60px",marginLeft:"0px",backgroundColor:"#F5F5F5"}}>
                           
                           <span className="title1">
                           Select .pdf file
                           </span>
                           <input className="FileUpload1" id="FileInput1" name="booking_attachment2" type="file" accept='.pdf' onChange={(e)=>{setFile1(e.target.files[0])}}/>
                       </label>  */}

                  <label
                    className="filelabel1 w-100"
                    style={{
                      height: "70px",
                      marginLeft: "0px",
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    <span className="title1">Select .pdf file</span>
                    <input
                      className="FileUpload1"
                      type="file"
                      accept=".pdf"
                      name="booking_attachment2"
                      onChange={(e) => {
                        setFile1(e.target.files[0]);
                      }}
                    />
                  </label>

                  <input
                    className="mt-3 mb-3"
                    placeholder="  Enter Display Name"
                    style={{
                      border: "2px solid #EDEDED",
                      height: "45px",
                      outline: 1,
                      color: "#303030",
                    }}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
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
                  className="col-6 border-0 mt-3 text-white"
                  onClick={MyFun}
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
          </div>

          <div style={{ display: Click === 2 ? "block" : "none" }}>
            <div>
              <h5 style={{ fontWeight: 600 }}>Add PDF</h5>
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: "75%",
                    background:
                      "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
                  }}
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>steps 3/3</p>

              <div className="row">
                <div className="col-3"></div>
                <div
                  className="col-6"
                  style={{
                    borderColor: "#EFEFEF",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontSize: 22 }}>
                    New PDF{" "}
                    <span style={{ fontSize: 23, fontWeight: "bolder" }}>
                      {Name} {NameCat}
                    </span>{" "}
                    will be added to{" "}
                    <span style={{ fontSize: 23, fontWeight: "bolder" }}>
                      {CatName}
                    </span>
                  </p>
                  <img
                    className="mt-3 mb-3"
                    src={ImgCat}
                    alt="#"
                    style={{ width: 120 }}
                  />
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
                  className="col-6 border-0 mt-3 text-white"
                  onClick={() => {
                    Api();
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
          </div>

          <div style={{ display: Click === 3 ? "block" : "none" }}>
            <div className="row">
              <div className="col-3"></div>
              <div
                className="col-6"
                style={{
                  borderColor: "#EFEFEF",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: 22 }}>
                  New PDF{" "}
                  <span style={{ fontSize: 23, fontWeight: "bolder" }}>
                    {Name} {NameCat}
                  </span>{" "}
                  will be added to{" "}
                  <span style={{ fontSize: 23, fontWeight: "bolder" }}>
                    {CatName}
                  </span>
                </p>
                {/* <img className="mt-3 mb-3" src={ImgCat} alt="#" style={{width:120}}/> */}

                <Lottie
                  className="ms-5"
                  animationData={Clebrate}
                  loop={true}
                  style={{ width: "80%" }}
                />

                <button
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  className="border-0 col-12 mt-4"
                  style={{
                    backgroundColor: "#0CBC8B",
                    color: "#fff",
                    height: "40px",
                    borderRadius: 7,
                  }}
                >
                  Back to Dashboard
                </button>

                <div
                  className="mt-5"
                  style={{ textAlign: "center", alignItems: "center" }}
                >
                  <p style={{ color: "#8A8A8A" }}>
                    This tab will automatically close in
                    <span style={{ color: "#CC1313", fontSize: 20 }}>
                      {" "}
                      {15}{" "}
                    </span>
                    Seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* +Add button offcanvas end */}

      {/* Edit button  offcanvas start */}

      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight4"
        aria-labelledby="offcanvasRightLabel"
        style={{ width: "60%", borderRadius: "20px 5px 0px 0px" }}
      >
        <div className="offcanvas-header">
          {/* <h5 id="offcanvasRightLabel4">Offcanvas right</h5> */}
          <span
            className="col-10"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{ color: "#000", fontWeight: "600" }}
            onClick={() => {
              setView(0);
              setDisplay(0);
              Api1();
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
        <div className="offcanvas-body px-5">
          <div style={{ display: View === 0 ? "block" : "none" }}>
            <h2 style={{ color: "#000" }}>Question Papers</h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className="row mx-1    "
                style={{
                  border: "1px solid #D9D9D9",
                  height: "40px",
                  borderRadius: "7px",
                  width: "60%",
                }}
              >
                <div className="col-2 mt-1">
                  <img alt="SearchIcon" src={SearchIcon} />
                </div>
                <div className="col-8 mt-1" style={{ marginLeft: "-30px" }}>
                  <input
                    className="border-0 w-100"
                    placeholder="Search for question paper PDF"
                    style={{
                      textDecoration: "none",
                      outline: "none",
                      color: "#272727",
                    }}
                  />
                </div>
              </div>

              <div className="col-3 mt-1 mx-5">
                <button
                  type="btn btn"
                  style={{
                    border: "none",
                    backgroundColor: "#EFEFEF",
                    padding: "10px 15px",
                    borderRadius: 8,
                  }}
                >
                  <IoFilterSharp className="me-3" />
                  Filters
                </button>
              </div>
            </div>

            <div className="row">
              {het.map((index, item) => {
                return (
                  <div
                    className="col-lg-6 col-sm-12 mt-5"
                    key={index.id}
                    item={item}
                  >
                    <div
                      className="card"
                      style={{ width: "100%", borderRadius: 10 }}
                    >
                      <div className="card-body">
                        <h4 className="card-title" style={{ fontWeight: 600 }}>
                          {index.file_title}
                        </h4>

                        <div
                          className="mt-2"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <p
                            className="card-text  "
                            style={{
                              backgroundColor: "#EFFFF6",
                              color: "#129C73",
                              textAlign: "left",
                              padding: "5px 2px",
                              borderRadius: 8,
                              fontWeight: 500,
                            }}
                          >
                            {"Translation Enabled"}
                          </p>
                          <p
                            className="mx-5"
                            style={{ color: "#8A8A8A", fontWeight: 500 }}
                          >
                            {index.created_at}
                          </p>
                        </div>

                        <h4 className="my-1">
                          <img
                            src={index.category_image}
                            alt="#"
                            className="me-4"
                            style={{ width: 40 }}
                          />
                          {index.category_name}
                        </h4>

                        <button
                          type="button"
                          className="mt-2"
                          style={{
                            width: "100%",
                            padding: "10px 20px",
                            borderRadius: 10,
                            fontSize: 18,
                            border: "1px solid #EFEFEF",
                            backgroundColor: "#fff",
                            color: "#2E2E2E",
                          }}
                          onClick={() => {
                            setView(View + 1);
                            Api3(index.id);
                          }}
                        >
                          {/* come here */}
                          View
                        </button>
                        <button
                          type="button"
                          className="mt-3 mb-3"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          style={{
                            width: "100%",
                            padding: "10px 20px",
                            borderRadius: 10,
                            fontSize: 18,
                            border: "1px solid #EFEFEF",
                            backgroundColor: "#FFF1F1",
                            color: "#CC1313",
                          }}
                          onClick={() => {
                            setDeleteId(index.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* offcanvas section for view section from edit offcanvas */}
          <div style={{ display: View === 1 ? "block" : "none" }}>
            {hets.map((res, key) => {
              return (
                <div className="row" key={key}>
                  <div
                    style={{
                      display: "flex",
                      // flexDirection:"column-reverse",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                      className="col-2 border-0"
                      style={{
                        border: "none",
                        borderRadius: "10px",
                        padding: "10px 12px",
                        color: "#2188E7",
                        backgroundColor: "#EDF7FF",
                        display: View === 1 ? "block" : "none",
                      }}
                      onClick={() => {
                        setDisplay(0);
                        setView(0);

                        //check weather we have to id ot other id that are come from;
                        ApiSend(res.notes_id);
                      }}
                    >
                      Save
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <span
                      className="col-3 mt-1"
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#8A8A8A",
                      }}
                    >
                      Display Name
                    </span>

                    <span className="col-3">
                      <button
                        className="border-0 w-50 rounded text-white"
                        style={{ backgroundColor: "#2E2E2E", height: "35px" }}
                        onClick={() => {
                          setDisplay(1);
                        }}
                      >
                        Edit
                      </button>
                    </span>
                  </div>

                  <span
                    className="mt-3"
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      display: Display === 1 ? "none" : "block",
                    }}
                  >
                    {res.file_title}
                  </span>

                  <input
                    className="mt-3 rounded"
                    style={{
                      height: "35px",
                      display: Display === 1 ? "block" : "none",
                    }}
                    placeholder={res.file_title}
                    //come back
                    value={DisplayChag}
                    onChange={(e) => {
                      setUpdatedSTM({
                        ...updatedSTM,
                        file_title: e.target.value,
                      });
                      setDisplayChag(e.target.value);
                      setDisplayChan(res.category_id);
                      if (View === 1) {
                        setApiIds(res.notes_id);
                      }
                    }}
                  />
                  <span
                    className="col-2 mt-5"
                    style={{ fontSize: 16, fontWeight: 600, color: "#8A8A8A" }}
                  >
                    Category
                  </span>
                  <span className="col-3 mt-5">
                    <button
                      className="border-0 w-50 rounded text-white"
                      style={{ backgroundColor: "#2E2E2E", height: "35px" }}
                      onClick={() => {
                        setCategory(1);
                      }}
                    >
                      Edit
                    </button>
                  </span>
                  <div className="d-flex">
                    <img
                      className="mt-3"
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                      }}
                      src={res.category_image}
                      alt="#"
                    />
                    <span
                      className="mt-3 ps-2"
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        display: Category === 1 ? "none" : "block",
                      }}
                    >
                      {res.category_name}
                    </span>
                  </div>
                  <input
                    className="mt-3 rounded"
                    style={{
                      height: "35px",
                      display: Category === 1 ? "block" : "none",
                    }}
                    placeholder={res.pdf_cat}
                    value={CategoryChag}
                    onChange={(e) => {
                      setUpdatedSTM({
                        ...updatedSTM,
                        pdf_cat: e.target.value,
                      });
                      setCategoryChag(e.target.value);
                    }}
                  />
                  <span className="col-12 mt-2">
                    <button
                      className="border-0 rounded"
                      style={{
                        bckgroundColor: "#E3FFF3",
                        color: "#2E8760",
                        width: "220px",
                        height: "35px",
                      }}
                    >
                      Translation Enabled
                    </button>
                  </span>

                  <span
                    className="col-12 mt-3"
                    style={{ fontSize: 16, fontWeight: 600, color: "#8A8A8A" }}
                  >
                    Original File
                  </span>
                  <span
                    className="col-6 rounded"
                    style={{
                      border: "2px solid #EFEFEF",
                      height: "80px",
                      overflow: "hidden",
                    }}
                  >
                    <span className="row  mt-4">
                      <img
                        className="col-3 mb-3"
                        src={PdfImg}
                        alt=""
                        style={{ width: "10%" }}
                      />
                      <p className="col-9" style={{ fontSize: "12px" }}>
                        {res.file_path_en}
                      </p>
                    </span>
                  </span>

                  <div className="row mt-4">
                    <div className="col-lg-3">
                      <button
                        onClick={()=>{
                          navigate(`https://brainbucks.co.in/public/Notes/${res.file_path_en}`);
                        }}
                        // download={`https://brainbucks.co.in/public/Notes/${res.file_path_en}`}
                        type="button"
                        style={{
                          border: "none",
                          borderRadius: "10px",
                          padding: "10px 12px",
                          width: "80%",
                          backgroundColor: "#EFEFEF",
                        }}
                      >
                        View PDF
                      </button>
                    </div>

                    <div className="col-lg-3">
                      <label
                        className="filelabel2"
                        style={{ backgroundColor: "#F5F5F5" }}
                      >
                        <span className="title2">Replace File</span>
                        <input
                          className="FileUpload2"
                          id="FileInput2"
                          name="booking_attachment2"
                          type="file"
                          accept=".pdf"
                          value={PdfChan}
                          onChange={(e) => {
                            setPdfChan(e.target.value);
                            setReplacedFile(e.target.files)
                            setUpdatedSTM({
                              ...updatedSTM,
                              file_path_en: e.target.files[0],
                            });
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* second pdf start */}

                  <span
                    className="col-12 mt-5"
                    style={{ fontSize: 16, fontWeight: 600, color: "#8A8A8A" }}
                  >
                    Translated File
                  </span>
                  <span
                    className="col-6 rounded"
                    style={{
                      border: "2px solid #EFEFEF",
                      height: "80px",
                      overflow: "hidden",
                    }}
                  >
                    <span className="row  mt-4">
                      <img
                        className="col-3 mb-3"
                        src={PdfImg}
                        alt=""
                        style={{ width: "10%" }}
                      />
                      <p className="col-9" style={{ fontSize: "12px" }}>
                        {res.file_path_hi}
                      </p>
                    </span>
                  </span>

                  <div className="row mt-4">
                    <div className="col-lg-3">
                      <button
                        type="button"
                        style={{
                          border: "none",
                          borderRadius: "10px",
                          padding: "10px 12px",
                          width: "80%",
                          backgroundColor: "#EFEFEF",
                        }}
                      >
                        View PDF
                      </button>
                    </div>

                    <div className="col-lg-3">
                      <label
                        className="filelabel2"
                        style={{ backgroundColor: "#F5F5F5" }}
                      >
                        <span className="title2">Replace File</span>
                        <input
                          className="FileUpload2"
                          id="FileInput2"
                          name="booking_attachment2"
                          type="file"
                          accept=".pdf"
                          value={PdfChan1}
                          onChange={(e) => {
                            // console.log()
                            setPdfChan1(e.target.value);
                            setUpdatedSTM({
                              ...updatedSTM,
                              file_path_hi: e.target.files[0],
                            });
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  {/* second pdf end */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Edit button  offcanvas end */}

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
                  Do you really want to delete this pdf
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
                  “PDF” is successfully deleted
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
                      Api2(Notes_id);
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
    </div>
  );
};
export default FreePdf;
