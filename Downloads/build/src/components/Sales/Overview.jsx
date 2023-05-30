import { useState, useEffect, useContext } from "react";
import nato from "../../Img/noto.jpg";
import { BsArrowRight } from "react-icons/bs";
import Chat2 from "../../Img/chart2.jpg";
import Chat3 from "../../Img/chart3.jpg";
import bin from "../../Img/bin1.jpg";
import bin1 from "../../Img/bin.jpg";
import Chart from "react-apexcharts";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import Chat1 from "../../Img/mouth-face.png";
import Chat31 from "../../Img/money-bag.png";
import { Button, Form, Modal, Offcanvas } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AuthContext } from "../Utils/AuthContextProvider";
import Pagination from "../Utils/Pagination";
import LoaderComponent from "../Utils/LoaderComponent";
import { toast } from "react-toastify";

const initLoader = {
  isLoading: false,
  isError: false,
};

const Overview = () => {
  const { state } = useContext(AuthContext);
  const [first, setfirst] = useState("");
  const [first1, setfirst1] = useState("");
  const [first2, setfirst2] = useState("");
  const [VluesData, setVluesData] = useState([]);
  const [android_downloads, setAndrioddevelopmet] = useState([]);
  const [show, setShow] = useState(false);
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [last_page, setLastPage] = useState(1);
  const [loader, setLoader] = useState(initLoader);
  const [showModal, setShowModal] = useState(false);
  const [req_no, setReqNo] = useState();
  const [req_bal, setReqBal] = useState();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  //required destructuring from the above state object
  const { token } = state;
  const { isLoading } = loader;

  //function for getting data regarding the credit/debit amount
  const Api = (Token) => {
    var formdata = new FormData();
    formdata.append("token", Token);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(
      "https://brainbucks.co.in/api/admin/total-amount-dashboard",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "001") {
          // console.log(result);
          setfirst(result.total_credit);
          setfirst1(result.total_debit);
          setfirst2(result.total_remaining);
          setAndrioddevelopmet(result.android_downloads);
        }
      })
      .catch((error) => console.log("error", error));
  };

  //function for getting regarding the graph of credit/debit amount
  const DataApi = (token) => {
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

    fetch("https://brainbucks.co.in/api/admin/income-graph", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "001") {
          setVluesData(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const month = VluesData.map((item) => item.month);
  const credit = VluesData.map((item) => item.credit);
  const debit = VluesData.map((item) => item.debit);

  //function of get user list for the view detials button
  const getUserList = (x) => {
    setLoader({
      ...loader,
      isLoading: true,
    });
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

    fetch(
      `https://brainbucks.co.in/api/admin/users-list?page=${x}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log("user list", result);
        setUserList(result.data.data);
        setLastPage(result.data.last_page);
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

  //function for change page
  const handelPageChange = (x) => {
    setPage(x);
    getUserList(x);
  };

  //function for update user Wallet
  const updateUserWallet = (no, paisa) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: token,
      phone: no,
      wallet_balance: paisa,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/update-wallet", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 1) {
          toast(result.msg);
          // console.log(result);
        } else {
          toast(result.msg);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    Api(token);
    DataApi(token);
    // getUserList(page);
  }, []);

  const options = {
    chart: {
      id: "bar",
    },
    stroke: {
      colors: ["red"],
      curve: "smooth",
      width: 1,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: month,
    },
  };

  const series = [
    {
      name: "DEBIT",
      data: debit,
    },
    {
      name: "Credit",
      data: credit,
    },
  ];
  const percentage = 50;
  const filColor = "#2188E7";
  const text = "20px";
  const s34 = "#fff";
  const s32 = "#303030";

  return (
    <>
      <div>
        <div className="row">
          <div className="col-ms-12 col-md-4 col-lg-4">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-3">
                  <img
                    src={Chat1}
                    alt="hello"
                    style={{ width: "70%", margin: "13px" }}
                  />
                </div>
                <div className="col-6">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "13px",
                      lineHeight: "19px",
                      color: "#8A8A8A",
                    }}
                  >
                    Total Money In
                  </p>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#333333",
                    }}
                  >
                    ₹ {first}
                  </p>
                </div>
                <div className="col-3 mt-4">
                  <BsArrowRight />
                </div>
              </div>
            </div>
          </div>
          <div className="col-ms-12 col-md-4 col-lg-4">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-3">
                  <img
                    src={Chat31}
                    alt="hello"
                    style={{ width: "70%", margin: "13px" }}
                  />
                </div>
                <div className="col-6">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "13px",
                      lineHeight: "19px",
                      color: "#8A8A8A",
                    }}
                  >
                    Total Money Out
                  </p>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#333333",
                    }}
                  >
                    ₹ {first1}
                  </p>
                </div>
                <div className="col-3 mt-4">
                  <BsArrowRight />
                </div>
              </div>
            </div>
          </div>
          <div className="col-ms-12 col-md-4 col-lg-4">
            <div
              className="card"
              style={{ borderRadius: "10px", border: "2px solid #D9D9D9" }}
            >
              <div className="row">
                <div className="col-3">
                  <img
                    src={Chat3}
                    alt="hello"
                    style={{ width: "70%", margin: "13px" }}
                  />
                </div>
                <div className="col-6">
                  <p
                    className="mt-2"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "13px",
                      lineHeight: "19px",
                      color: "#8A8A8A",
                    }}
                  >
                    Total Amount Remaining
                  </p>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#333333",
                    }}
                  >
                    ₹ {first2}
                  </p>
                </div>
                <div className="col-3 mt-4">
                  <BsArrowRight />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-sm-12 col-md-8 col-lg-8">
            <div className="card">
              <Chart
                options={options}
                series={series}
                type="line"
                width="100%"
                height="380"
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">App Downloads</h5>
                <p
                  class="card-subtitle mb-2 text-muted text-center pt-2"
                  style={{ fontWeight: "600", fontSize: "14px" }}
                >
                  Total App Downloads{" "}
                  <span style={{ color: "#2E8760" }}>{android_downloads}</span>
                </p>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    className="mt-3"
                    label="Stroke width"
                    style={{ width: "35%", color: "#303030" }}
                  >
                    <CircularProgressbarWithChildren
                      style={{ textAlign: "center" }}
                      value={0}
                      strokeWidth={26}
                      styles={buildStyles({
                        pathColor: filColor,
                        strokeLinecap: "butt",
                        trailColor: "#47BDFF",
                        textColor: s32,
                      })}
                    >
                      {/* <RadialSeparators
         count={4}
         style={{
           background: "#292929",
           width: "1px", 
           height: `${10}%`
          
         }}
       /> */}
                      <strong>100%</strong>
                    </CircularProgressbarWithChildren>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-6">
                    <p style={{ textAlign: "center " }}>
                      <img src={bin} alt="" /> Android{" "}
                      <span style={{ color: "#2E8760" }}> +12.36% </span>
                    </p>

                    <h6
                      className="text-center  "
                      style={{ color: "#000", fontWeight: "600" }}
                    >
                      {android_downloads}
                    </h6>
                  </div>

                  <div className="col-6">
                    <p style={{ textAlign: "center " }}>
                      <img src={bin1} alt="" /> iOS{" "}
                      <span style={{ color: "#2E8760" }}> -2.36% </span>
                    </p>
                    <h6
                      className="text-center  "
                      style={{ color: "#000", fontWeight: "600" }}
                    >
                      0
                    </h6>
                  </div>

                  <div
                    className="mt-3"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      onClick={() => {
                        getUserList(page);
                        setShow(true);
                      }}
                      type="btn"
                      style={{
                        border: "1px solid #2188E7",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        width: "100%",
                        color: "#2188E7",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* offcanvas for view user list */}
      <Offcanvas
        show={show}
        placement="end"
        style={{
          width: "85%",
        }}
      >
        <Offcanvas.Header>
          <div
            style={{
              width: "50px",
              heigth: "50px",
              borderRadius: "50%",
              // border:"1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              setShow(false);
            }}
          >
            <BiArrowBack />
          </div>

          {/* <Offcanvas.Title>Hello world!</Offcanvas.Title> */}
        </Offcanvas.Header>

        <Offcanvas.Body>
          {isLoading ? (
            <LoaderComponent />
          ) : (
            <>
              <div>
                <div className="row">
                  <div className="col-12">
                    <table class="table mt-3">
                      <thead>
                        <tr
                          style={{
                            border: "none",
                            display: "flex",
                            justifyContent: "space-around",
                            color: "#8a8a8a",
                          }}
                        >
                          <th scope="col-2" style={{ border: "none" }}>
                            Name
                          </th>
                          <th
                            scope="col-2"
                            className="me-5"
                            style={{ border: "none" }}
                          >
                            E-mail
                          </th>
                          <th
                            scope="col-2"
                            className="ms-5"
                            style={{ border: "none" }}
                          >
                            Contact Number
                          </th>
                          <th scope="col-2" style={{ border: "none" }}>
                            Platform
                          </th>
                          <th scope="col-1" style={{ border: "none" }}>
                            Wallet balance
                          </th>
                          <th
                            scope="col"
                            style={{ opacity: "0", border: "none" }}
                          >
                            {" "}
                            ss
                          </th>
                        </tr>
                      </thead>
                    </table>

                    <div style={{ overflowY: "scroll", height: "65vh" }}>
                      {userList?.map((res, key) => {
                        return (
                          <div
                            className="card mt-3"
                            style={{ border: "none" }}
                            key={key}
                          >
                            <div
                              className="card-body"
                              style={{
                                border: "1px solid gray",
                                borderRadius: "8px",
                              }}
                            >
                              <div className="row">
                                <div className="col-2">
                                  <p className=" pt-1">{res.name}</p>
                                </div>

                                <div className="col-3">
                                  <span
                                    className=" pt-1"
                                    style={{ float: "left" }}
                                  >
                                    {res.email}
                                  </span>
                                </div>
                                <div
                                  className="col-2"
                                  // style={{ float: "left" }}
                                >
                                  <p className="pt-1">{res.phone}</p>
                                </div>

                                <div
                                  className="col-2"
                                  // style={{ float: "left" }}
                                >
                                  <p className="text-center pt-1">Andriod</p>
                                </div>

                                <div className="col-1">
                                  <div
                                    className="ms-4"
                                    style={{ display: "flex" }}
                                  >
                                    <button
                                      style={{
                                        backgroundColor: "#fff1f1",
                                        // color: "#cc1313",
                                        border: "none",
                                        padding: "6px 10px",
                                        borderRadius: "8px",
                                        textAlign: "center",
                                      }}
                                    >
                                      {res.wallet_balance}
                                    </button>
                                  </div>
                                </div>

                                <div className="col-2">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <button
                                      onClick={() => {
                                        handleShow();
                                        setReqNo(res.phone);
                                        setReqBal(res.wallet_balance);
                                      }}
                                      style={{
                                        backgroundColor: "transparent",
                                        color: "#2188E7",
                                        border: "none",
                                        padding: "5px",
                                        borderRadius: "8px",
                                        textAlign: "center",
                                      }}
                                    >
                                      <AiOutlineArrowRight />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "1rem",
                  }}
                >
                  <Pagination
                    className="pagination-bar"
                    currentPage={page}
                    totalCount={last_page}
                    pageSize={1}
                    onPageChange={handelPageChange}
                  />
                </div>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* modal for upadte user wallet balance */}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wallet Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Wallet Balance</Form.Label>
              <Form.Control
                onChange={(e) => setReqBal(e.target.value)}
                type="number"
                value={req_bal}
                // placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // console.log("to update",req_no,req_bal)
              updateUserWallet(req_no, req_bal);
              handleClose();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Overview;
