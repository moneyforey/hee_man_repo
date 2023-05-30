import { useContext, useEffect, useState } from "react";
import Chat from "../../Img/arrow-right.png";
import Chat6 from "../../Img/Rectangle_22.png";
import Chat7 from "../../Img/Rectangle_20.png";
import { CChart } from "@coreui/react-chartjs";
import { AuthContext } from "../Utils/AuthContextProvider";

const ExamAndQuiz = () => {
  const { state } = useContext(AuthContext);
  const [first, setfirst] = useState("");
  const [first1, setfirst1] = useState("");
  const [first2, setfirst2] = useState("");
  const [first3, setfirst3] = useState("");
  const [least_played, setLeastPalyed] = useState({});
  const [most_played, setMostPlayed] = useState({});
  const [graphData, setGraphData] = useState([]);

  const { token } = state;

  const Api = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: token,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/total-exams", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setfirst(result.total_categories);
        setfirst1(result.total_subcat);
        setfirst2(result.total_subjects);
        setfirst3(result.total_live_quizzes);
        setLeastPalyed(result.least_played);
        setMostPlayed(result.most_played);
      })
      .catch((error) => console.log("error", error));
  };
 

  const getGraphData = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: token,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/quiz-graph", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setGraphData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const months = graphData?.map((el) => el.month);
  const registered = graphData?.map((el) => el.registered_members_count);
  const participated = graphData?.map((el) => el.participated_members_count);

  useEffect(() => {
    Api(token);
    getGraphData(token);
  }, []);

  return (
    <>
      <div
        style={{
          height: "70vh",
          overflowY: "scroll",
        }}
      >
        <div className="row">
          <div className="col-ms-12 col-md-4 col-lg-3">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-8 container">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "15px",
                      lineHeight: "19px",
                      color: "#000",
                    }}
                  >
                    Exam Categories
                  </p>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#CC1313",
                    }}
                  >
                    {first}
                  </p>
                </div>
                <div className="col-3">
                  <img
                    src={Chat}
                    alt="hello"
                    style={{ width: "70%", marginTop: "28px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-ms-12 col-md-4 col-lg-3">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-8 container">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "15px",
                      lineHeight: "19px",
                      color: "#000",
                    }}
                  >
                    Exam Sub - Categories
                  </p>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#2188E7",
                    }}
                  >
                    {first1}
                  </p>
                </div>
                <div className="col-3">
                  <img
                    src={Chat}
                    alt="hello"
                    style={{ width: "70%", marginTop: "28px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-ms-12 col-md-4 col-lg-3">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-8 container">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "15px",
                      lineHeight: "19px",
                      color: "#000",
                    }}
                  >
                    Total Subjects
                  </p>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#2E8760",
                    }}
                  >
                    {first2}
                  </p>
                </div>
                <div className="col-3">
                  <img
                    src={Chat}
                    alt="hello"
                    style={{ width: "70%", marginTop: "28px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-ms-12 col-md-4 col-lg-3">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-8 container">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "15px",
                      lineHeight: "19px",
                      color: "#000",
                    }}
                  >
                    Total Live Quiz
                  </p>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#C922E4",
                    }}
                  >
                    {first3}
                  </p>
                </div>
                <div className="col-3">
                  <img
                    src={Chat}
                    alt="hello"
                    style={{ width: "70%", marginTop: "28px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-sm-12 col-md-8 col-lg-8">
            <div className="card">
              <CChart
                type="line"
                data={{
                  labels: [
                   ...months
                  ],
                  datasets: [
                    {
                      label: "Participents",
                      backgroundColor: "rgba(220, 220, 220, 0.2)",
                      borderColor: "rgba(220, 220, 220, 1)",
                      pointBackgroundColor: "rgba(220, 220, 220, 1)",
                      pointBorderColor: "#fff",
                      data: [...participated],
                    },
                    {
                      label: "Registered",
                      backgroundColor: "rgba(151, 187, 205, 0.2)",
                      borderColor: "rgba(151, 187, 205, 1)",
                      pointBackgroundColor: "rgba(151, 187, 205, 1)",
                      pointBorderColor: "#fff",
                      data: [...registered],
                    },
                  ],
                }}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="card" style={{ border: "1px solid ##D9D9D9" }}>
              <p
                className="text-center mt-3"
                style={{
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "#000000",
                }}
              >
                Most Played
              </p>
              <div className="container mt-2">
                <div
                  className="card"
                  style={{ background: "#FFFFFF", border: "1px solid #EFEFEF" }}
                >
                  <div className="row mt-1">
                    <div className="col-sm-12 col-md-3 col-lg-3">
                      <img
                        src={most_played.category_image}
                        alt="hello"
                        style={{ width: "70%", margin: "15px 0px 10px 10px" }}
                      />
                    </div>
                    <div className="col-sm-12 col-md-9 col-lg-9">
                      <p
                        style={{
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "18px",
                          ineHeight: "29px",
                          color: "#000000",
                        }}
                      >
                        {most_played.title}
                      </p>
                      <p
                        style={{
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "16px",
                          color: "#333333",
                        }}
                      >
                        Total Participants
                        <span style={{ color: "#2E8760" }}>
                          {" "}
                          {most_played.total_played}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p
                className="text-center mt-4"
                style={{
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "#000000",
                }}
              >
                Least Played
              </p>
              <div className="container mt-2 mb-4">
                <div
                  className="card"
                  style={{ background: "#FFFFFF", border: "1px solid #EFEFEF" }}
                >
                  <div className="row mt-1">
                    <div className="col-sm-12 col-md-3 col-lg-3">
                      <img
                        src={least_played.category_image}
                        alt="hello"
                        style={{ width: "70%", margin: "15px 0px 10px 10px" }}
                      />
                    </div>
                    <div className="col-sm-12 col-md-9 col-lg-9">
                      <p
                        style={{
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "18px",
                          ineHeight: "29px",
                          color: "#000000",
                        }}
                      >
                        {least_played.title}
                      </p>
                      <p
                        style={{
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "16px",
                          color: "#333333",
                        }}
                      >
                        Total Participants{" "}
                        <span style={{ color: "#CC1313" }}>
                          {" "}
                          {least_played.total_played}{" "}
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamAndQuiz;
