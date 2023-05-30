import { useState, useEffect } from "react";
import LoaderComponent from "../Utils/LoaderComponent";
import Pagination from "../Utils/Pagination";

const initLoader = {
  isLoading: false,
  isError: false,
};

const Transitions = () => {
  const [Data, setData] = useState([]);
  const [loader, setLoader] = useState(initLoader);
  const [page, setPage] = useState(1);
  const [last_page, setLastPage] = useState(3);
  const { isLoading } = loader;

  const Api = (x) => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: localStorage.getItem("token"),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://brainbucks.co.in/api/admin/admin-txn-history?page=${x}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setLoader({
          ...loader,
          isLoading: false,
        });
        setData(result.data.data);
        setLastPage(result.data.last_page);
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
    // console.log(x);
    setPage(x);
    Api(x);
  };

  useEffect(() => {
    Api(page);
  }, []);

  return (
    <>
      <div>
        <div className="mt-3 ">
          <div className="row mx-4 mt-3">
            <div
              className="row"
              style={{ color: "#434343", fontWeight: "600", fontSize: "14px" }}
            >
              <div className="col-1">
                <p>S.No.</p>
              </div>
              <div className="col-2">
                <p>Name</p>
              </div>
              <div className="col-1">
                <p>Date&Time</p>
              </div>
              <div className="col-2">
                <p>Transaction ID</p>
              </div>
              <div className="col-1">
                <p>Amount</p>
              </div>
              <div className="col-2">
                <p>Phone Number</p>
              </div>
              <div className="col-2">
                <p>Payment Type</p>
              </div>
              <div className="col-1">
                <p>Status</p>
              </div>
            </div>

            <div style={{ overflowY: "scroll", height: "60vh" }}>
              {isLoading ? (
                <LoaderComponent />
              ) : (
                Data?.map((res, key) => {
                  return (
                    <>
                      <div
                        className="row align-items-center  mt-3"
                        style={{
                          border: "1px solid #DDDDDD",
                          width: "98.5%",
                          borderRadius: "5px",
                          height: "45px",
                          backgroundColor: " #FFFFFF",
                        }}
                      >
                        <div className="col-1" key={key}>
                          <p
                            style={{
                              color: "#434343",
                              fontWeight: "400",
                              fontSize: "14px",
                            }}
                          >
                            {key + 1}
                          </p>
                        </div>
                        <div className="col-2">
                          <p style={{ fontWeight: "400", fontSize: "14px" }}>
                            {res.name}
                          </p>
                        </div>
                        <div className="col-1 text-nowrap">
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#434343",
                              fontWeight: "400",
                            }}
                          >
                            {res.date.split(" ")[0]}
                          </p>
                        </div>
                        <div className="col-2">
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#434343",
                              fontWeight: "400",
                            }}
                          >
                            {res.txn_id}
                          </p>
                        </div>
                        <div className="col-1">
                          <p
                            style={{
                              fontSize: "14px",
                              color: " #40997E",
                              fontWeight: "500",
                            }}
                          >
                            {res.amount}
                          </p>
                        </div>
                        <div className="col-2">
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#434343",
                              fontWeight: "400",
                            }}
                          >
                            {res.phone}
                          </p>
                        </div>
                        <div className="col-2">
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#434343",
                              fontWeight: "400",
                            }}
                          >
                            {res.type}
                          </p>
                        </div>
                        <div className="col-1">
                          <p
                            style={{
                              fontSize: "14px",
                              color: " #2E8760",
                              fontWeight: "600",
                            }}
                          >
                            {res.status === "TXN_SUCCESS" ? (
                              <>
                                <span style={{ color: "green" }}>SUCCESS</span>
                              </>
                            ) : (
                              <>
                                <span style={{ color: "red" }}>FAILED</span>
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "1rem",
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
        </div>
      </div>
    </>
  );
};

export default Transitions;
