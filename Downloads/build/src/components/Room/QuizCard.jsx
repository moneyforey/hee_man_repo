import { useState } from "react";
import { Card, Offcanvas, ProgressBar } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import DatesImg from "../../Img/Date.svg";
import Image4 from "../../Img/carbon_trophy-filled.svg";
import Image3 from "../../Img/bb coin 1.svg";
import Wallet from "../../Img/Wallet.svg";
import { HiArrowNarrowLeft } from "react-icons/hi";
import clock from "../../Img/clock.svg";

const QuizCard = ({ data }) => {
  //  console.log("quiz card",data);

  const {
    title,
    datetime,
    category_image,
    prizes,
    filled_slots,
    total_slots,
    winners,
    participants,
    income,
    total_questions,
    distributed,
    collected,
    entry_fee,
    max_reward
  } = data;

  const [show, setShow] = useState(false);

  // const [detailedHistory,setDetailedHistory] = useState({});

  const filterData = (id) => {
    // const detailedData = paginatedData.filter((el)=> id === el.id);
    // setDetailedHistory(detailedData[0]);
    // console.log(id,":",detailedData[0]);
    // setShow(true)
  };

  // useEffect(()=>{
  // //    Histry(id,currentPage);
  // },[])

  return (
    <div
      className="row mt-2 ms-2"
      //  key={res.id}
    >
      <Card className="col-8">
        <Card.Body>
          <Card.Title
            className="d-flex"
            style={{ borderBottom: "1px solid #EFEFEF" }}
          >
            <span className="col-2">
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
                <img alt="#" src={category_image} width="100%" />
              </div>
            </span>
            <div className="col-8 mt-2">
              <span className="ml-2">
                <p style={{ fontSize: 16, fontWeight: 600 }}>{title}</p>
              </span>
            </div>
            
            <span
              className="col-2 "
              // onClick={()=>{
              //   filterData(res.id)
              // }}
              onClick={() => setShow(true)}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaArrowRight />
            </span>
          </Card.Title>
          <Card.Text>
            <div className="row">
              <div className="col-2 d-flex">
                <img alt="#" src={Image3} style={{ width: 25 }} />
                {/* come here */}
                <p className="mt-3 ms-2">{entry_fee}</p>
              </div>
              <div className="col-4 d-flex">
                <img alt="#" src={Image4} style={{ width: 25 }} />
                <p className="mt-3 ms-2">{max_reward}</p>
              </div>
              <div className="col-6 d-flex">
                <img src={DatesImg} alt="#" style={{ width: 25 }} />
                <div
                  className="mt-3 ms-2"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#333333",
                    marginTop: 10,
                  }}
                >
                  {datetime}
                </div>
              </div>
            </div>

            <div className="mt-2 mb-3">
              <div className="col-4 d-flex">
                <img alt="#" src={Wallet} style={{ width: 25 }} />
                <div
                  className="ms-2"
                  style={{ fontSize: 16, fontWeight: 600, color: "#333333" }}
                >
                  <span style={{ color: "#2188E7" }}>{filled_slots}</span>/
                  {total_slots}
                </div>
              </div>
              <ProgressBar
                now={filled_slots}
                max={total_slots}
                style={{ height: "12px" }}
              />
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* //offcanvas for Details */}

      <Offcanvas
        show={show}
        placement="end"
        style={{
          width: "50%",
          borderTopLeftRadius: 30,
        }}
      >
        <Offcanvas.Header>
          <span
            onClick={() => setShow(false)}
            style={{ color: "#000", fontWeight: "600", cursor: "pointer" }}
          >
            <HiArrowNarrowLeft size="30px" />
          </span>
          {/* <p style={{fontSize:20}}>The changes will reflected on 12:01 AM</p> */}
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className="row ">
            <div className="col-2">
              <img
                alt="#"
                src={category_image}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className="col-6">
              <p style={{ fontSize: 20, fontWeight: 600 }}>{title}</p>
            </div>
          </div>
          <div className="row mt-2">
            <span className="col-1"></span>
            <span className="col-3 d-flex no-wrep">
              <img src={DatesImg} alt="#" style={{ width: 25 }} />
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#8A8A8A",
                }}
                className="mt-3 ms-2"
              >
                {datetime.split(" ")[0]}
              </p>
            </span>

            <span className="col-3 d-flex no-wrep">
              <img src={clock} alt="#" style={{ width: 25 }} />
              <p
                className="mt-3 ms-2 "
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#8A8A8A",
                }}
              >
                {datetime.split(" ")[1]}
              </p>
            </span>
          </div>

          <div className="row">
            <span
              className="col-2"
              style={{
                fontSize: 16,
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              details
            </span>
          </div>
          <div className="row">
            <div
              className="col-2 mt-2"
              style={{
                borderBottom: "1px solid #000000",
              }}
            ></div>
          </div>
          <hr style={{ marginTop: "0px" }} />

          <div>
            <div
              className="row"
              style={{
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "24px",
                marginTop: "1rem",
                color: "#333333",
              }}
            >
              <div className="col-3">Total Question</div>
              <div className="col-2">{total_questions}</div>
            </div>

            <div
              style={{
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "24px",
                marginTop: "1rem",
                color: "#2E8760",
              }}
              className="row"
            >
              <div className="col-3">Income</div>
              <div className="col-2">{income}</div>
            </div>

            <div
              style={{
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "24px",
                marginTop: "1rem",
                color: "#2188E7",
              }}
              className="row"
            >
              <div className="col-3">Collected</div>
              <div className="col-2">{collected}</div>
            </div>

            <div
              style={{
                marginTop: "1rem",
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "24px",

                color: "#CC1313",
              }}
              className="row"
            >
              <div className="col-3">Distributed</div>
              <div className="col-2">{distributed}</div>
            </div>
          </div>

          <div
            className="col-2 d-flex"
            style={{
              marginTop: "1rem",
            }}
          >
            <img alt="#" src={Image3} style={{ width: 25 }} />
            <p
              style={{
                color: "#fed143",
              }}
              className="mt-3 ms-2"
            >
              {entry_fee}
            </p>
          </div>

          <div className="mt-2 mb-3">
            <div className="col-4 d-flex">
              <img alt="#" src={Wallet} style={{ width: 25 }} />
              <div
                className="ms-2"
                style={{ fontSize: 16, fontWeight: 600, color: "#333333" }}
              >
                <span style={{ color: "#2188E7" }}>{filled_slots}</span>/
                {total_slots}
              </div>
            </div>
            <ProgressBar
              now={filled_slots}
              max={total_slots}
              style={{ height: "12px" }}
            />
          </div>

          <div
            styele={{
              marginTop: "1rem",
            }}
          >
            <h5
              style={{
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "24px",
                color: "#333333",
              }}
            >
              Winners
            </h5>

            {winners.length === 0 ? (
              <h5>updated soon...</h5>
            ) : (
              winners?.map((el, ind) => (
                <div
                  className="no-wrap"
                  styele={{
                    marginTop: ".5rem",
                  }}
                >
                  <span>{ind + 1}</span>
                  <p>{el.name}</p>
                </div>
              ))
            )}
          </div>

          <div
            styele={{
              marginTop: "1rem",
            }}
          >
            <h5
              style={{
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "24px",
                color: "#333333",
              }}
            >
              Participants
            </h5>

            {participants.length === 0 ? (
              <h5>No Participants</h5>
            ) : (
              participants?.map((el, ind) => (
                <div
                  className="d-flex no-wrap"
                  styele={{
                    marginTop: ".5rem",
                  }}
                >
                  <span>{ind + 1}. </span>
                  <p>{el.name}</p>
                </div>
              ))
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default QuizCard;
