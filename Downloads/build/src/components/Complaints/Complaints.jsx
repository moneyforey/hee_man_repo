import { useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import ComplaintsData from "./ComplaintsData";
import { useNavigate } from "react-router-dom";

const Complaints = () => {
  const Navigate = useNavigate();

  const CheckToken = async (Token) => {
    var formdata = new FormData();
    formdata.append("token", Token);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/check-token", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status == 1) {
          //  console.log("nice");
        } else {
          Navigate("/");
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Navigate("/");
    } else {
      CheckToken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
          <div className="container">
            <ComplaintsData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
