import { useContext, useEffect, useState } from "react";
import Pagination from "../Utils/Pagination";
import LoaderComponent from "../Utils/LoaderComponent";
import { AuthContext } from "../Utils/AuthContextProvider";
import Row from "./Row";
import { toast } from "react-toastify";
import EmptyContainer from "../Utils/EmptyContainer";

const initLoader = {
  isLoading: false,
  isError: false,
};

const Content = () => {
  const [page, setPage] = useState(1);
  const [last_page, setLastPage] = useState();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(initLoader);
  const { isLoading } = loader;
  // const [tochange,setTochange] = useState();
  const { state } = useContext(AuthContext);
  const { token } = state;

  //function for getting widthrwal data;
  const getWithDrawalData = () => {
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
      "https://brainbucks.co.in/api/admin/withdraw-requests",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.data);
        setData(result.data);
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

  //function for updating the status
  const updateWithDrawalData = (id, tochange) => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: token,
      id: id,
      status: tochange,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/withdraw-update", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        const { status, msg } = result;
        if (status == "001") {
          setLoader({
            ...loader,
            isLoading: false,
          });
          getWithDrawalData();
          toast(msg);
        } else {
          setLoader({
            ...loader,
            isLoading: false,
          });
          toast(msg);
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

  useEffect(() => {
    getWithDrawalData();
  }, []);

  //function for change page
  const handelPageChange = (x) => {
    console.log(x);
  };

  const sayhello=()=>{
    console.log("hello");
  }

  return (
    <div>
      <div>
        <div className="mt-3 ">
          <h4>Showing Total <span style={{
            color:"red"
          }}>{data?.length}</span> Pending Requests</h4>
          <div className="row mx-4 mt-3">
            <div
              className="row"
              style={{ color: "#434343", fontWeight: "600", fontSize: "14px" }}
            >
              <div className="col-1">
                <p>Name</p>
              </div>
              <div className="col-2">
                <p>Date&Time</p>
              </div>
              <div className="col-2">
                <p>Transaction ID</p>
              </div>
              <div className="col-1">
                <p>Amount</p>
              </div>
              <div className="col-1">
                <p>Phone </p>
              </div>
              <div className="col-1">
                <p>Bank</p>
              </div>
              <div className="col-2">
                <p>IFSC code</p>
              </div>
              <div className="col-1">
                <p>Status</p>
              </div>
              <div className="col-1">
                <p>Action</p>
              </div>
            </div>

            <div style={{ overflowY: "scroll", height: "60vh" }}>
              {isLoading ? (
                <LoaderComponent />
              ) : (
                data?.length === 0?<EmptyContainer message="Empty Withdrawal Requests" action={sayhello} actionName="" />:
                data?.map((res) => (
                  <Row
                    isLoading={isLoading}
                    key={res.id}
                    res={res}
                    updateWithDrawalData={updateWithDrawalData}
                  />
                ))
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
              {/* <Pagination
                className="pagination-bar"
                currentPage={page}
                totalCount={last_page}
                pageSize={1}
                onPageChange={handelPageChange}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
