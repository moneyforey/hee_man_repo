import SearchIcon from "../../Img/ri_search-line.svg";
import { BsFilter } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import mahakal from "../../Img/Group 10.png";

const ComplaintsHomeData = () => {
  const lowname = [
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
    {
      name: "Elvish Yadav",
    },
  ];

  return (
    <>
      <div className="container-fluid" style={{ padding: " 0px" }}>
        <div className="row">
          <div
            className="col-4 "
            style={{ backgroundColor: "#2c2c2c", marginLeft: "-24px" }}
          >
            <div className="row p-2">
              <div className="col-9 ">
                <div className="row">
                  <div
                    className="col-12"
                    style={{ backgroundColor: "#333", borderRadius: "8px" }}
                  >
                    <div
                      className="row"
                      style={{
                        border: "none",
                        height: "40px",
                        borderRadius: "7px",
                      }}
                    >
                      <div className="col-2 mt-2">
                        <img alt="SearchIcon" src={SearchIcon} />
                      </div>

                      <div className="col-10 mt-2 ">
                        <input
                          className="border-0 w-100"
                          placeholder="Search for Participant"
                          style={{
                            textDecoration: "none",
                            outline: "none",
                            color: "#ccc",
                            backgroundColor: "#333",
                            border: "none",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-2">
                <BsFilter
                  style={{
                    color: "#fff",
                    fontSize: "40px",
                    backgroundColor: "#333",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div style={{ overflowY: "scroll", height: "82vh" }}>
                  {lowname.map((res, key) => {
                    return (
                      <div
                        className="mb-2 px-2 py-2"
                        style={{
                          backgroundColor: "#333",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "8px",
                        }}
                        key={key}
                      >
                        <img
                          src={mahakal}
                          alt="#"
                          style={{ width: "40px", height: "40px" }}
                        />

                        <h6 className="text-white ms-2 pt-2">{res.name}</h6>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-6" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="row py-2" style={{ backgroundColor: "#ececec" }}>
              <div className="col-6">
                <h6>
                  {" "}
                  <img
                    src={mahakal}
                    style={{ width: "40px", height: "40px" }}
                  />{" "}
                  Raghuveer Singh
                </h6>
              </div>

              <div className="col-2"></div>
              <div className="col-4">
                <button
                  style={{
                    color: "#2188E7",
                    borderRadius: "8px",
                    padding: "8px 15px",
                    backgroundColor: "#EDF3FF",
                    border: "none",
                  }}
                >
                  {" "}
                  Mark as Closed
                </button>
              </div>
            </div>
            <div></div>

            <div className="row">
              <div className="col-8 mt-3">
                <div style={{ backgroundColor: "#fff", borderRadius: "8px" }}>
                  <p style={{ padding: "10px", color: "#8a8a8a" }}>
                    I am not able to retrieve my won rewards money into my bank
                    account My latest winning amount is ₹ 14,500 and it has been
                    one day since I have won rewards, kindly help me to get my
                    money
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4"></div>
              <div className="col-8 mt-3">
                <div style={{ backgroundColor: "#fff", borderRadius: "8px" }}>
                  <p
                    style={{
                      padding: "10px",
                      color: "#fff",
                      backgroundColor: "#367CFF",
                      borderRadius: "8px",
                    }}
                  >
                    Thank you for contacting brain bucks, sir as i can see the
                    amount which you are trying to retrieve is more than your
                    redeemable balance, kindly enter the amount within the range
                    of your redeemable balance
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-9">
                <div style={{ position: "absolute", top: "93%", width: "40%" }}>
                  <input
                    type="email"
                    class="form-control py-2"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Type your message here "
                  />
                </div>
              </div>
              <div
                className="col-3"
                style={{
                  position: "absolute",
                  top: "94%",
                  right: "0",
                  width: "20%",
                }}
              >
                <div>
                  <AiOutlinePlus
                    style={{
                      backgroundColor: "#8a8a8a",
                      padding: "8px",
                      borderRadius: "8px",
                      fontSize: "30px",
                      color: "#fff",
                      fontWeight: "600",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintsHomeData;
