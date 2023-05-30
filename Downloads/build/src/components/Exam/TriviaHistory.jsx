import { Card, Offcanvas } from "react-bootstrap";
import Image3 from "../../Img/bb coin 1.svg";
// import clock from "../../Img/clock.svg";
import Image4 from "../../Img/carbon_trophy-filled.svg";
import { FaArrowRight } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import Wallet from "../../Img/Wallet.svg";
import DatesImg from "../../Img/Date.svg";
import Pagination from "../Utils/Pagination";
import { useEffect, useState } from "react";
import LoaderComponent from "../Utils/LoaderComponent";
import { toast } from "react-toastify";
import { HiArrowNarrowLeft } from "react-icons/hi";

const initLoader = {
  isLoading: false,
  isError: false,
};

const TriviaHistory = ({ Data, last_page, header }) => {
  const [loader, setLoader] = useState(initLoader);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [detailedHistory, setDetailedHistory] = useState({});
  const [show, setShow] = useState(false);
  const id = Data?.data[0].id;
  const { name, icon } = header;
  const { isLoading, isError } = loader;

  //function for get history data by id and page
  const Histry = (id, x) => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    var formdata = new FormData();
    formdata.append("token", localStorage.getItem("token"));
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
          if (result.message == "There are no history found..") {
            toast(result.message);
            setLoader({
              ...loader,
              isLoading: false,
            });
          } else {
            setPaginatedData(result.data.data);
            console.log(result.data.data);
            setLoader({
              ...loader,
              isLoading: false,
            });
          }
        } else {
          console.log(result);
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

  const handelPageChange = (x) => {
    setCurrentPage(x);
    Histry(id, x);
  };

  const filterData = (id) => {
    const detailedData = paginatedData.filter((el) => id === el.id);
    setDetailedHistory(detailedData[0]);
    // console.log(id, ":", detailedData[0]);
    setShow(true);
  };

  useEffect(() => {
    Histry(id, currentPage);
  }, []);

  return (
    <>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={last_page}
        pageSize={1}
        onPageChange={handelPageChange}
      />

      <div style={{ height: "600px", overflowY: "scroll" }}>
        {isLoading ? (
          <LoaderComponent />
        ) : (
          paginatedData?.map((res, key) => {
            return (
              <>
                <div className="row mt-2 ms-2" key={key}>
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
                            <img alt="#" src={icon} width="100%" />
                          </div>
                        </span>
                        <div className="col-8 mt-2">
                          <span className="ml-2">
                            <p style={{ fontSize: 16, fontWeight: 600 }}>
                              {name}
                            </p>
                          </span>
                        </div>
                        <span
                          className="col-2 "
                          onClick={() => {
                            filterData(res.id);
                          }}
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
                            <p className="mt-3 ms-2">{0}</p>
                          </div>
                          <div className="col-4 d-flex">
                            <img alt="#" src={Image4} style={{ width: 25 }} />
                            <p className="mt-3 ms-2">{res.rewards}</p>
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
                              {res.session_date}
                            </div>
                          </div>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>

                {/* //offcanvas for Details */}

                <Offcanvas
                  show={show}
                  placement="end"
                  style={{
                    width: "50%",
                    borderTopLeftRadius: 30,
                    paddingLeft: "1.5rem",
                  }}
                >
                  <Offcanvas.Header>
                    <span
                      onClick={() => setShow(false)}
                      style={{
                        color: "#000",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
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
                          src={icon}
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <p style={{ fontSize: 20, fontWeight: 600 }}>{name}</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <span className="col-1"></span>
                      <span className="col-3 d-flex">
                        <img src={DatesImg} alt="#" style={{ width: 25 }} />
                        <p
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#8A8A8A",
                          }}
                          className="mt-3 ms-2"
                        >
                          {detailedHistory?.session_date}
                        </p>
                      </span>

                      {/* <span className="col-3 d-flex">
                    <img src={clock} alt="#" style={{width:25}}/>
                      <p
                      className="mt-3 ms-2"
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#8A8A8A",
                        }}
                      >
                         {String(String(detailedHistory?.created_at).split(" ")[1]).split(":").slice(0,-1).join(":")}
                      </p>
                    </span> */}
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
                        <div className="col-2">
                          {detailedHistory?.total_question}
                        </div>
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
                        <div className="col-2">{detailedHistory?.income}</div>
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
                        <div className="col-2">
                          {detailedHistory?.collected}
                        </div>
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
                        <div className="col-2">
                          {detailedHistory?.distributed}
                        </div>
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
                        {detailedHistory?.entry_fee}
                      </p>
                    </div>
                    <div className="mt-2 mb-3">
                      <div className="col-4 d-flex">
                        <img alt="#" src={Wallet} style={{ width: 25 }} />
                        <div
                          className="ms-2"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#333333",
                          }}
                        >
                          <span style={{ color: "#2188E7" }}>
                            {detailedHistory?.filled_slots}
                          </span>
                          /{detailedHistory.total_slots}
                        </div>
                      </div>
                      <ProgressBar
                        now={detailedHistory?.filled_slots}
                        max={detailedHistory?.total_slots}
                        style={{ height: "12px", width: "500px" }}
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

                      {/* {
                              detailedHistory?.winners?.map((el,ind)=><div className="no-wrap" styele={{
                                marginTop:".5rem"
                                 
                               }}>
                                <span>{ind+1}</span>
                                 <p>{el.name}</p>
                              </div>)
                            } */}
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

                      {
                        // detailedHistory?.participants
                        // ?.map((el,ind)=><div className="d-flex no-wrap" styele={{
                        //   marginTop:".5rem"
                        //  }}>
                        //   <span>{ind+1}.{" "}</span>
                        //    <p>{el.name}</p>
                        // </div>)
                      }
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
              </>
            );
          })
        )}
      </div>
    </>
  );
};

export default TriviaHistory;
