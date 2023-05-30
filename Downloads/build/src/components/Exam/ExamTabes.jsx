import { useEffect, useState } from "react";
import Active from "./Active";
import AddQuestion from "./AddQuestion";
import Categories from "./Categories";
import FreeTrivia from "./FreeTrivia";
import Question from "./Question";
import QuestionsData from "./QuestionsData";
import Offcanvas from "react-bootstrap/Offcanvas";

const ExamTabes = () => {
  // let Dates = new Date().toLocaleString();
  // console.log(Dates);
  const [Sales, setSales] = useState();
  const [Datas, setDatas] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const CategoriesData = 54;

  const Api = async () => {
    try {
      const Responce = await fetch(
        "https://brainbucks.co.in/api/admin/quizzelist"
      );
      const Data = await Responce.json();
      if (Data.status === 1) {
        console.log("in exam tabs",Data.message);
        setDatas(Data.data);
      } else {
        // alert(Data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSales("Categories");
    Api();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-8 mb-2">
          <div className="row">
            <div className="col-2">
              <span
                className="mt-2"
                style={{
                  fontWeight: Sales === "Categories" ? "600" : "400",
                  color: Sales === "Categories" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Categories")}
              >
                Categories
              </span>
            </div>
            <div
              className="col-3 d-flex"
              style={{ justifyContent: "space-around" }}
            >
              <span
                className="text-nowrap"
                style={{
                  fontWeight: Sales === "Active Quizzes" ? "600" : "400",
                  color: Sales === "Active Quizzes" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Active Quizzes")}
              >
                Active Quizzes
              </span>
              <span
                className="px-3"
                style={{
                  backgroundColor: "#CC1313",
                  borderRadius: 15,
                  color: "#fff",
                  width: "70px",
                  height: "30px",
                  justifyContent: "center",
                  textAlign: "center",
                  margin: "0px 0px 0px 8px",
                  marginTop: "-3px",
                }}
              >
                <p style={{ marginTop: "3px" }}>{Datas.length}</p>
              </span>
            </div>
            <div className="col-2">
              <span
                style={{
                  fontWeight:Sales === "Free Trivia" ? "600" : "400",
                  color: Sales === "Free Trivia" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Free Trivia")}
              >
                Free Trivia
              </span>
            </div>
            <div className="col-2">
              <span
                className="text-nowrap"
                style={{
                  fontWeight: Sales === "Question Bank" ? "600" : "400",
                  color: Sales === "Question Bank" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Question Bank")}
              >
                Question Bank
              </span>
            </div>
          </div>
        </div>
        <div className="col-4 mb-2">
          <div className="row" style={{ marginRight: "20px" }}>
            <div className="col-5"></div>

            <div
              className="col-7 ms-1"
              style={{
                display: Sales === "Question Bank" ? "none" : "",
                background:
                  "linear-gradient(180deg, rgba(33,184,103,1) 0%, rgba(47,132,96,1))",
                height: "40px",
                borderRadius: "7px",
                color: "#fff",
                width: "auto",
              }}
            >
              <span
                className="text-nowrap"
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "6px",
                }}
              >
                22-sep-2022 - 22-sep-2022
              </span>
            </div>
            <div
              className="col-12"
              style={{ display: Sales === "Question Bank" ? "" : "none" }}
            >
              <div className="row">
                <div className="col-6">
                  <button
                    onClick={handleShow}
                    className="border-0 w-100"
                    style={{
                      backgroundColor: "#2188E7",
                      color: "#fff",
                      height: "40px",
                      borderRadius: 7,
                    }}
                  >
                    <span className="p-2">+Add Subject</span>
                  </button>
                </div>
                <div className="col-6">
                  <button
                    onClick={handleShow1}
                    className="border-0 w-100"
                    style={{
                      borderRadius: 7,
                      background:
                        "linear-gradient(180deg, rgba(33,184,103,1) 0%, rgba(47,132,96,1) 100%)",
                      height: "40px",
                      color: "#fff",
                    }}
                  >
                    +Add Questions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="row">
          <div className="col-8">
            <div className="row">
              <div
                className="col-2"
                style={{
                  borderBottom:
                    Sales === "Categories" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-3"
                style={{
                  borderBottom:
                    Sales === "Active Quizzes" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom:
                    Sales === "Free Trivia" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom:
                    Sales === "Question Bank" ? "2px solid #000000" : "",
                }}
              ></div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
        <hr />
      </div>

      {Sales === "Categories" ? (
        <div>
          <Categories />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Active Quizzes" ? (
        <div>
          <Active />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Free Trivia" ? (
        <div>
          <FreeTrivia />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Question Bank" ? (
        <div>
          <QuestionsData />
        </div>
      ) : (
        <></>
      )}

      <Offcanvas
        className="w-50"
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ borderTopLeftRadius: 30 }}
      >
        <Offcanvas.Body>
          <Question Handle={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas
        className="w-50"
        show={show1}
        onHide={handleClose1}
        placement="end"
        style={{ borderTopLeftRadius: 30 }}
      >
        <Offcanvas.Body>
          <AddQuestion Handle={handleClose1} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ExamTabes;
