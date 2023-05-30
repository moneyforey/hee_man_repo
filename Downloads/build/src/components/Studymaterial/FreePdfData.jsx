import { useState, useEffect } from "react";
import imgcard17 from "../../Img/sbi.png";
import "./FreePdf.css";
import Lottie from "lottie-react";
import Clebrate from "../../Img/lf20_VuglDs.json";
import { NavLink } from "react-router-dom";

const FreePdfData = () => {
  const [Next, setNext] = useState("");
  const [Token, setToken] = useState("");
  const [Click, setClick] = useState(0);
  const [files, setFile] = useState();
  const [File1, setFile1] = useState();
  const [Name, setName] = useState("");
  const [Value, setValue] = useState("");
  const [CatId, setCatId] = useState("");
  const [categories, setCategories] = useState([]);
  const [PdfCat, setPdfCat] = useState([]);
  const [Name1, setName1] = useState("");
  const [Name2, setName2] = useState("");

  // console.log(Value);
  // console.log(File1);

  const Api = async () => {
    console.log(files)
    var formdata = new FormData();
    formdata.append("token", Token);
    formdata.append("file_path_en", files);
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
        console.log(result);
        if (result.status == 1) {
          setCatId("");
          setValue("");
          setFile1("");
          setFile("");
          setClick(Click + 1);
        } else {
          console.log(result, "in else")
        }
      })
      .catch((error) => console.log("error here", error));
  };

  const Categories12 = async () => {
    try {
      const Dar = await fetch(
        "https://brainbucks.co.in/api/admin/categorylist"
      );
      const response = await Dar.json();
      console.log(response);
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };


  //for api categoris of notes type
  const Apis = async () => {
    try {
      const Data = await fetch(
        "https://brainbucks.co.in/api/admin/notes_category"
      );
      const Responce = await Data.json();
      if (Responce.status === 1) {
         console.log(Responce);
        setPdfCat(Responce.data);
      } else {
        alert(Responce.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    Categories12();
    Apis();
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <>
      <div style={{ display: Click === 4 ? "none" : "block" }}>
        <span
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          style={{ color: "#000", fontWeight: "600" }}
          onClick={() => {
            setClick(0);
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

      <div style={{ display: Click === 0 ? "block" : "none" }}>
        <div className="progress" style={{ height: "10px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: "10%",
              background:
                "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
            }}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p>steps 1/4</p>

        <div className="text-center">
          <h4>Select PDF Category</h4>

          {PdfCat.map((res, key) => {
            return (
              <>
                <button
                  key={key}
                  type="button"
                  className="mt-3"
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #EFEFEF",
                    padding: "13px 50px",
                    borderRadius: 12,
                    width: "40%",
                  }}
                  onClick={() => {
                    setClick(Click + 1);
                    setValue(res.id);
                    setName2(res.title);
                  }}
                >
                  {res.title}
                </button>{" "}
                <br />
              </>
            );
          })}
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
                width: "50%",
                background:
                  "linear-gradient(to right, #f44cc5, #ec40cc, #e335d3, #d72adb, #c922e4)",
              }}
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <p>steps 2/4</p>

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
                  height: "190px",
                  overflowY: "scroll",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                {
                   categories?.map((res) => {
                  return (
                    <>
                      <div className="d-flex mt-3" key={res.id}>
                        <input
                          style={{ color: "#F6F6F6" }}
                          type="radio"
                          name="Select"
                          onChange={() => {
                            setCatId(res.id);
                            setName1(res.category_name);
                          }}
                        />
                        <img
                          src={res.category_image}
                          alt="#"
                          className="mx-3"
                          style={{ width: 30, height: 30, borderRadius: "50%" }}
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
              onClick={() => {
                setClick(Click + 1);
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
          <p>steps 3/4</p>

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
                  onChange={(e) => {
                    // console.log(e.target.files[0])
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
              onClick={() => {
                setClick(Click + 1);
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
      </div>

      <div style={{ display: Click === 3 ? "block" : "none" }}>
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
          <p>steps 4/4</p>

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
                  {} {}
                </span>{" "}
                will be added to{" "}
                <span style={{ fontSize: 23, fontWeight: "bolder" }}>
                  SBI PO{" "}
                </span>
              </p>
              <img
                className="mt-3 mb-3"
                src={imgcard17}
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

      <div style={{ display: Click === 4 ? "block" : "none" }}>
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
                {Name2} {Name1}
              </span>{" "}
              will be added to{" "}
              <span style={{ fontSize: 23, fontWeight: "bolder" }}>
                SBI PO{" "}
              </span>
            </p>

            <Lottie
              className="ms-5"
              animationData={Clebrate}
              loop={true}
              style={{ width: "80%" }}
            />

            {/* <NavLink to="/"> */}
            <button
              onClick={() => {
                setClick(0);
              }}
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
            {/* </NavLink> */}
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
      </div>
    </>
  );
};

export default FreePdfData;
