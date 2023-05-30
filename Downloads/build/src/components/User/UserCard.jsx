import React from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import howw from "../../Img/Group 13160.png";
import horr from "../../Img/Group 13161.png";
import { useNavigate } from "react-router-dom";
// import cardimg from "../../Img/Group 10.png";

const UserCard = ({ res, key }) => {
  const Navigate = useNavigate();

  const funForNavigation = (destination) => {
    Navigate("");
  };

  return (
    <div className="col-lg-4 col-sm-12 mt-5">
      <div
        class="card"
        style={{
          width: "100%",
          boxShadow: "0px 4px 4px rgba(57,80,126, 0.14);",
        }}
        key={key}
      >
        <div className="row">
          <div className="col-lg-3 col-sm-4">
            <img
              src="https://images-ext-2.discordapp.net/external/sdLmKpayR0kOd9rEB7eIC7wYFcz7B04aT3ZKa1lqp44/https/e7.pngegg.com/pngimages/85/114/png-clipart-avatar-user-profile-male-logo-profile-icon-hand-monochrome.png?width=585&height=586"
              alt="#"
              style={{
                width: "100%",
                padding: 5,
                borderRadius: "50%",
              }}
            />
          </div>

          <div className="col-lg-8 col-sm-6">
            <h4 className="text-nowrap mt-2">{res.name} </h4>
            <div className="row">
              <div className="col-7  ">
                <p style={{ color: "#8a8a8a" }}> {res.role} </p>
              </div>
              <span
                className="col-5"
                style={{
                  textAlign: "left",
                  backgroundColor: "#E3FFF3",
                  height: "30px",
                  borderRadius: "5px",
                }}
              >
                <strong
                  className="mt-2"
                  style={{
                    position: "absolute",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#2e8760",
                    borderRadius: "50%",
                  }}
                ></strong>
                <p className="ms-3"> online </p>
              </span>

              <p style={{ fontSize: "14px", color: "#2E8760" }}>
                {`${res.created_at.split(" ")[0]} | ${
                  res.created_at.split(" ")[1]
                }`}
              </p>
            </div>
          </div>
        </div>

        <div className="card-body">
          <p className="card-title" style={{ color: "#8a8a8a" }}>
            <MdOutlineWatchLater
              className="me-2"
              style={{
                backgroundColor: "#EFEFEF",
                color: "#8a8a8a",
                padding: "3px",
                borderRadius: "50%",
                fontSize: "28px",
              }}
            />
            {`Joined ${res.created_at.split(" ")[0]}`}
          </p>

          <div className="row">
            <div className="col-lg-6 col-sm-6">
              <div>
                <p style={{ color: "#8a8a8a" }}>
                  <img src={howw} alt="#" style={{ width: "35px" }} />
                  {res.cont3}
                  <span style={{ color: "#cc1313" }} className="mx-1">
                    {res.contst}
                  </span>
                </p>
              </div>
            </div>

            <div className="col-lg-6 col-sm-6">
              <div>
                <p style={{ color: "#8a8a8a" }}>
                  <img src={horr} alt="#" style={{ width: "35px" }} />
                  {res.cont6}
                  <span style={{ color: "#2E8760  " }} className="mx-1">
                    {res.contNumber}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 col-sm-6">
              <div>
                <button
                  type="button"
                  style={{
                    backgroundColor: "#21B867",
                    color: "#fff",
                    border: "none",
                    padding: "7px 10px",
                    width: "100%",
                    borderRadius: "8px",
                    fontSize: "18px",
                  }}
                >
                  <AiFillEye className="mb-1" style={{ fontSize: "22px" }} />
                  View Profile
                </button>
              </div>
            </div>

            <div className="col-lg-6 col-sm-6">
              <button
                type="button"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #000",
                  borderRadius: "7px",
                  padding: "7px 10px",
                  width: "100%",
                }}
              >
                Assign Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
