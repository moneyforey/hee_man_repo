import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Indu from "../../Img/Group 65.png";
import Bulk from "../../Img/Group 66.png";
import Translate from "../../Img/Translate.png";
import Lottie from "lottie-react";
import Any from "../../Img/Any.json";
import Trans1 from "../../Img/Trans.json";
import File from "../../Img/file.json";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import TranslateIm from "../../Img/icons8.svg";
import Dlf10 from "../../Img/dlf10_g9gACcXlja.json";
// import { Span } from "./Span";
// import InputDiv from "./InputDiv";
//import { Input } from './InputTrans';
import "./AddQuestion.css";
import QuestionComp from "./QuestionComp";
// import "../../css/";

const AddQuestiontoSub = (props) => {
  const { SubjectName, subjectIds } = props;
  const init = [];
  const [Token, setToken] = useState("");
  const [first, setfirst] = useState(1);
  const [Hadding, setHadding] = useState("Please Wait While We");
  const [Hadding1, setHadding1] = useState("Analyse Your Questions");
  const [Pra, setPra] = useState("Do not referesh or Close this Screen");
  const [Lotties, setLotties] = useState(Any);
  const [click, setclick] = useState(false);
  const [Da, setDa] = useState(0);
  const [Question, setQuestion] = useState({});
  const [Opa, setOpa] = useState([]);
  //   const [SubjectName, setSubjectName] = useState("");
  const [file, setFile] = useState();

  //const [Subject, setSubject] = useState([]);
  const [SubjectId, setSubjectId] = useState(subjectIds);
  const [XlInput, setXlInput] = useState("");
  const [Que, setQue] = useState([]);

  const [aOpt, setAOpt] = useState([]);
  const [randome, setrandome] = useState(init);
  const [total_question, setTotalQuestions] = useState("");
  const [repeated_questions, setRepaetedQuestions] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      value: [],
    },
    {
      id: 1,
      value: [],
    },
  ]);

  console.log(SubjectId);

  var OpaData = new Array(aOpt);
  const newOpt = [];
  const fileName = XlInput.name;

  click ? (
    setTimeout(() => {
      if (Da === 0) {
        setPra("Do not referesh or Close this Screen");
        setHadding("Please wait, while we ");
        setHadding1("Translate Questions");
        setLotties(Trans1);
        setDa(1);
      } else if (Da === 1) {
        setPra("This can take a while, do not refresh or close this tab.");
        setHadding("Questions Analysed ");
        setHadding1("Successfully, Preparing Report");
        setLotties(File);
        setDa(2);
      } else {
        setfirst(4);
        setclick(false);
      }
    }, 3000)
  ) : (
    <></>
  );

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const Api1 = () => {
    var formdata = new FormData();
    formdata.append("subject_id", SubjectId);
    formdata.append("file", XlInput);
    formdata.append("token", Token);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/upload-questions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { data, total_questions, unique_questions } = result;
        console.log("result questions", result);
        setQue(data);
        setTotalQuestions(total_questions);
        setRepaetedQuestions(total_questions - unique_questions);
      })
      .catch((error) => console.log("error", error));
  };

  const Api2 = async () => {
    var formdata = new FormData();
    formdata.append("question_id", props.subjectIds);
    formdata.append("token", Token);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://brainbucks.co.in/api/admin/get-single-question",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "001") {
          setQuestion(result.data.question);
          setAOpt(JSON.parse(result.data.options));
          setOpa(JSON.parse(result.data.options));
        }
      })
      .catch((error) => console.log("error", error));
  };

  const percentage = 70;

  const hori = {
    borderLeft: "1px solid #D9D9D9",
    height: "300px",
    marginLeft: "40px",
  };

  const myFunction = () => {
    setfirst(first + 1);
  };

  const MySecond = () => {
    setfirst(first - 1);
  };

  useEffect(() => {
    localStorage.setItem("language", "hi");
    // APi();
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            display:
              first === 2 ||
              first === 2 ||
              first === 3 ||
              first === 4 ||
              first === 6
                ? "none"
                : "",
          }}
        >
          <span
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => {
              setfirst(1);
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
          <div
            className="d-flex mb-2"
            style={{ justifyContent: "space-between" }}
          >
            <h3
              className="mt-2"
              style={{ marginLeft: "0px", fontWeight: "600", color: "#303030" }}
            >
              Add Questions
            </h3>

            <button
              className="border-0"
              style={{
                display: first === 5 ? "block" : "none",
                color: "#2188E7",
                borderRadius: 10,
                width: "160px",
                backgroundColor: "#EDF7FF",
              }}
              onClick={() => {
                setfirst(first + 2);
              }}
            >
              Save & Publish
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
              1/4 <span sytle={{ color: "red" }}>Steps Completed</span>
            </p>

            <div className="row">
              <div className="col-2"></div>
              <div className="col-4">
                <img
                  src={Indu}
                  alt="#"
                  style={{ width: "80%", height: "140px" }}
                />
                {/* <p>View Sample Format</p> */}
                <h3 className="col-12">Add Individual Questions</h3>
                <p>View Sample Format</p>
                <button
                  className="col-12 border-0"
                  style={{
                    backgroundColor: "#E79821",
                    color: "#fff",
                    height: "40px",
                    borderRadius: 7,
                  }}
                >
                  +Add Questions
                </button>
              </div>
              <span className="col-1" style={hori}></span>
              <div className="col-4" style={{ marginTop: "-30px" }}>
                <label
                  className="filelabel10"
                  style={{ overflow: "hidden", borderRadius: "50%" }}
                >
                  <img src={Bulk} style={{ width: "100%", height: "140px" }} />

                  <span className="title">
                    300px <span sytle={{}}>×</span>150px
                  </span>
                  <input
                    className="FileUpload10"
                    id="FileInput"
                    type="file"
                    onChange={(e) => {
                      setXlInput(e.target.files[0]);
                    }}
                    accept=".xlsx"
                  />
                </label>
                {/* <img src={Bulk} alt='#' style={{width:"70%"}}/> */}
                {/* <input type="file" accept=".xlx" style={{height:"160px",width:"160px",borderRadius:"50%"}}/> */}
                <h3 className="col-12">Upload Bulk Questions</h3>
                <p>{fileName ? fileName : "Upload file"}</p>

                {/* btn for add bulk questions */}
                <button
                  disabled={fileName ? false : true}
                  onClick={() => {
                    myFunction();
                    Api1();
                  }}
                  className="col-12 border-0"
                  style={{
                    backgroundColor: "#2188E7",
                    color: "#fff",
                    height: "40px",
                    borderRadius: 7,
                  }}
                >
                  +Add Questions
                </button>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: first === 2 ? "block" : "none" }}>
        <div style={{ justifyContent: "center", textAlign: "center" }}>
          <img alt="#" src={Translate} width="50%" />
          <p style={{ fontSize: "26px", fontWeight: 600 }}>
            Do You want to Translate
            <br />
            the Questions to Hindi ?
          </p>
          <div>
            <button
              className="border-0 text-white"
              onClick={() => {
                myFunction();
                setclick(true);
              }}
              style={{
                backgroundColor: "#2188E7",
                borderRadius: 10,
                width: "100px",
                height: "40px",
              }}
            >
              Yes
            </button>
            <button
              className="border-0 ms-5"
              onClick={() => {
                myFunction();
                setclick(true);
              }}
              style={{
                backgroundColor: "#D9D9D9",
                color: "#8A8A8A",
                borderRadius: 10,
                width: "100px",
                height: "40px",
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3" style={{ display: first === 3 ? "block" : "none" }}>
        <div
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            animationData={Lotties}
            style={{ width: "50%", marginLeft: "160px" }}
          />
          <p className="mt-3" style={{ fontSize: "26px", fontWeight: 600 }}>
            {Hadding}
            <br />
            {Hadding1}
          </p>
          <p>{Pra}</p>
        </div>
      </div>

      <div style={{ display: first === 4 ? "block" : "none" }}>
        <div
          className="mt-5"
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "26px", fontWeight: 600 }}>Report Generated</p>
          {/* come here     */}
          <div
            style={{ width: "20%", alignItems: "center", marginLeft: "40%" }}
          >
            <CircularProgressbarWithChildren
              value={total_question - repeated_questions}
              styles={{
                // Customize the root svg element
                root: {},
                // Customize the path, i.e. the "completed progress"
                path: {
                  // Path color
                  stroke: `#367CFF`,
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'

                  strokeWidth: "10px",
                  // Customize transition animation
                  transition: "stroke-dashoffset 0.5s ease 0s",
                  // Rotate the path
                  transform: "rotate(0.50turn)",
                  transformOrigin: "center center",
                },
                // Customize the circle behind the path, i.e. the "total progress"
                trail: {
                  // Trail color
                  stroke: "#FF8E09",
                  strokeWidth: "10px",
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "round",
                  // Rotate the trail
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                },
                // Customize the text

                // Customize background - only used when the `background` prop is true
                background: {
                  fill: "rgb(16, 227, 163)",
                  backgroundColor: "rgb(16, 227, 163)",
                  strokeWidth: "10px",
                },
              }}
            ></CircularProgressbarWithChildren>
          </div>
          <p className="mt-5 fs-500" style={{ color: "#303030", fontSize: 16 }}>
            Total Questions Uploaded
            <span
              style={{ color: "#000000", fontSize: 20, fontWeight: "bolder" }}
            >
              {" "}
              {total_question}
            </span>
          </p>
          <div className="row">
            <div className="col-4"></div>
            <div className="col-6 d-flex">
              <span
                className="col-1 mt-1"
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#367CFF",
                }}
              ></span>
              <p className="col-11" style={{ marginLeft: "-40px" }}>
                Unique Questions
                <span style={{ color: "#367CFF" }}>
                  {" "}
                  {total_question - repeated_questions}
                </span>
              </p>
            </div>
            <div className="col-4"></div>
            <div className="col-6 d-flex">
              <span
                className="col-1 mt-1"
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#FF8E09",
                }}
              ></span>
              <p className="col-11" style={{ marginLeft: "-40px" }}>
                Repeated Questions
                <span style={{ color: "#FF8E09" }}> {repeated_questions}</span>
              </p>
            </div>
          </div>
          <div className="mt-5">
            <button
              className="border-0"
              style={{
                color: "#fff",
                backgroundColor: "#2188E7",
                borderRadius: 7,
                width: "250px",
                height: "40px",
              }}
              onClick={myFunction}
            >
              + Preview Questions
            </button>
          </div>
          <p className="mt-3">
            This tab will automatically close in
            <span style={{ color: "red" }}> 15 </span>Seconds
          </p>
        </div>
      </div>

      <div style={{ display: first === 5 ? "block" : "none" }}>
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
        <p style={{ color: "#8A8A8A" }}>
          2/4 <span sytle={{ color: "red" }}>Steps Compleated</span>
        </p>
        <div style={{ justifyContent: "center", textAlign: "center" }}>
          <h3 style={{ fontWeight: "600" }}>Preview Questions</h3>
        </div>

        {Que?.map((res, key) => (
          //quetion component for particular question
          <QuestionComp res={res} ind={key} />
        ))}
      </div>

      <div style={{ display: first === 6 ? "block" : "none" }}>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
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
          <span>
            {" "}
            <button
              className="border-0"
              style={{
                backgroundColor: "#EDF7FF",
                color: "#2188E7",
                width: "120px",
                borderRadius: 7,
                height: "30px",
              }}
              onClick={() => {
                MySecond();
                OpaData();
              }}
            >
              Save
            </button>
          </span>
        </div>
        <div className="row mt-3">
          <span
            className="col-1"
            style={{ fontSize: 20, fontWeight: "bolder" }}
          >
            Q1
          </span>
          <span className="col-4"></span>
          <span className="col-7">
            <span className="row" style={{ justifyContent: "space-between" }}>
              <button
                className="col-6 border-0"
                style={{
                  backgroundColor: "#E3FFF3",
                  color: "#2E8760",
                  height: "30px",
                  borderRadius: 4,
                }}
              >
                Translation Enabled
              </button>
              {/* <button className='col-4 border-0' style={{backgroundColor:"#EFEFEF",color:"#8A8A8A",height:"30px",borderRadius:4}}>Id #curaff785236</button> */}
              <button
                className="col-1 border-0"
                style={{
                  backgroundColor: "#1F1F1F",
                  height: "30px",
                  borderRadius: 4,
                }}
              >
                <img alt="translate" src={TranslateIm} />
              </button>
            </span>
          </span>
        </div>

        <div className="mt-3">
          <input
            className="w-100 border-0 fw-bold mt-3"
            style={{ border: "1px solid blue" }}
            value={Question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            placeholder={Question}
          />
        </div>
        <div
          className="mt-3 "
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <img src={file} width="20%" />
        </div>
        <div
          className="mt-3 "
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <input
            type="file"
            onChange={handleChange}
            accept="*/image"
            multiple
          />
        </div>
      </div>

      <div style={{ display: first === 7 ? "block" : "none" }}>
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
          3/4 <span sytle={{ color: "red" }}>Steps Completed</span>
        </p>
        <div style={{ justifyContent: "center", textAlign: "center" }}>
          <p style={{ fontWeight: "300", fontSize: "20px" }}>
            <span style={{ color: "#121212", fontWeight: "600" }}>
              {total_question}{" "}
            </span>
            Questions will be uploaded to <br />
            <span style={{ fontWeight: "600", color: "#121212" }}>
              {" "}
              {SubjectName}
            </span>
          </p>
        </div>
        <div
          className="d-flex mt-5"
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <button
            className="border-0"
            style={{
              backgroundColor: "#0CBC8B",
              color: "#fff",
              width: "120px",
              height: "35px",
              borderRadius: 5,
            }}
            onClick={myFunction}
          >
            Confirm
          </button>
          <button
            className="border-0 ms-5"
            style={{
              color: "#8A8A8A",
              width: "120px",
              backgroundColor: "#EFEFEF",
              height: "35px",
              borderRadius: 5,
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      <div style={{ display: first === 8 ? "block" : "none" }}>
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
          4/4
          <span sytle={{ color: "red" }}>Steps Completed</span>
        </p>

        <div
          className="d-flex"
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: "300", fontSize: "20px" }}>
            {" "}
            <span style={{ color: "#121212", fontWeight: "600" }}>
              {total_question}{" "}
            </span>{" "}
            Questions uploaded to <br />
            <span style={{ color: "#121212", fontWeight: "600" }}>
              {" "}
              {SubjectName}
            </span>{" "}
            succesfully
          </p>
        </div>

        <div
          className="d-flex"
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            marginTop: "-30px",
          }}
        >
          <Lottie animationData={Dlf10} style={{ width: "50%" }}></Lottie>
        </div>
        <span
          className="d-flex"
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <NavLink to="/Exam">
            <button
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
          </NavLink>
        </span>
        <span
          className="mt-5"
          style={{ textAlign: "center", alignItems: "center" }}
        >
          <p style={{ color: "#8A8A8A" }}>
            This tab will automatically close in
            <span style={{ color: "#CC1313", fontSize: 20 }}> {15} </span>
            Seconds
          </p>
        </span>
      </div>
    </>
  );
};

export default AddQuestiontoSub;
