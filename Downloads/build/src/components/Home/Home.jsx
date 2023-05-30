import React, { useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";
import HomeData from "../../components/Home/HomeData";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Navigate("/");
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
            <HomeData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
