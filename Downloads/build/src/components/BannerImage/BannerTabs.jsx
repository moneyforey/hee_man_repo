import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

const BannerTabs = () => {
  const [show, setShow] = useState(false);
  const [Images, setImages] = useState();
  const [Banner, setBanner] = useState();
  const [Token, setToken] = useState();
  const [Datas, setData] = useState([]);
  const [Inter, setInter] = useState();
  const [Handlen, setHandlen] = useState();
  const [Nav, setNav] = useState();
  const [isHovered, setIsHovered] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const send = async () => {
    var formdata = new FormData();
    formdata.append("token", Token);
    formdata.append("image", Banner);
    formdata.append("type", Inter);
    formdata.append("navigate_to", Nav);
    formdata.append("order", Handlen);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/upload-banners", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "001") {
          // console.log(result) ;
          setShow(false);
          setHandlen("");
          setImages("");
          setBanner("");
          setNav();
          Data(localStorage.getItem("token"));
        }
      })
      .catch((error) => console.log("error", error));
  };

  const Data = async (To) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        token: To,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://brainbucks.co.in/api/user/get-banner", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          setData(result.data);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  //function for hover buttons
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Delete clicked");
  };

  const handleUpdate = () => {
    // Handle update logic here
    console.log("Update clicked");
  };

  useEffect(() => {
    Data(localStorage.getItem("token"));
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12 mb-2">
          <div className="row">
            <div className="col-2">
              <span
                className="mt-2"
                style={{
                  fontWeight: "600",
                  color: "#000000",
                  fontSize: 17,
                  cursor: "pointer",
                }}
              >
                Banner Images
              </span>
            </div>
            <button
              onClick={handleShow}
              className="col-2"
              style={{
                backgroundColor: "#EDF7FF",
                border: "1px solid #2188E7",
                height: "40px",
                borderRadius: "10px",
                color: "#2188E7",
              }}
            >
              <span className="p-3"> + Banner Images</span>
            </button>
          </div>
        </div>

        <div
          className="col-2"
          style={{
            borderBottom: "2px solid #000000",
          }}
        ></div>
        <hr />
      </div>

      <div
        className="row"
        style={{ height: "72vh", overflowY: "scroll", overflowX: "hidden" }}
      >
        {Datas.map((res, key) => {
          return (
            <>
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="col-4 card"
                style={{
                  height: 200,
                  cursor: "pointer",
                  // backgroundImage: `url(${res.image})`,
                  // backgroundSize: "contain",
                  // backgroundPosition: "top",
                  // background: "cover",
                  // backgroundRepeat: "no-repeat",
                }}
              >
                <img alt="#" src={res.image} style={{ objectFit: "cover" }} />
                {isHovered && (
                  <div
                    className="buttons"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <button
                      style={{
                        border: "none",
                        borderRadius: ".5rem",
                      }}
                      onClick={handleDelete}
                    ></button>
                    <button
                      style={{
                        border: "none",
                        borderRadius: ".5rem",
                      }}
                      onClick={handleUpdate}
                    ></button>
                  </div>
                )}
              </div>
            </>
          );
        })}
      </div>

      <Offcanvas
        show={show}
        className="w-50"
        onHide={handleClose}
        placement="end"
        style={{ borderRadius: "20px 5px 0px 0px" }}
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <label className="mt-2" style={{ fontSize: 16, fontWeight: 600 }}>
                Upload Banner Image
              </label>
              <label
                className="filelabel1 w-100"
                style={{
                  height: "150px",
                  marginLeft: "0px",
                  backgroundColor: "#F5F5F5",
                }}
              >
                <span className="title1">
                  <img
                    className="d-flex"
                    src={Images}
                    style={{ width: "100%", height: "110px" }}
                  />
                  150px
                  <span style={{ fontSize: 20, fontWeight: 600 }}> x </span>
                  385px
                </span>
                <input
                  className="FileUpload1"
                  id="FileInput1"
                  name="booking_attachment1"
                  type="file"
                  accept=".png,.jpg"
                  onChange={(e) => {
                    setImages(URL.createObjectURL(e.target.files[0]));
                    setBanner(e.target.files[0]);
                  }}
                />
              </label>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row mt-4">
            <div className="col-3"></div>
            <div className="col-6">
              <label className="mt-2" style={{ fontSize: 16, fontWeight: 600 }}>
                Choose Order
              </label>
              <input
                className="w-100 border-0"
                placeholder=" choose order"
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: 5,
                  height: "40px",
                }}
                value={Handlen}
                onChange={(e) => {
                  setHandlen(e.target.value);
                }}
              />
            </div>
            <div className="col-3"></div>
          </div>

          <div className="row mt-4">
            <div className="col-3"></div>
            <div className="col-6">
              <label className="mt-2" style={{ fontSize: 16, fontWeight: 600 }}>
                Type
              </label>
              <select
                className="w-100 border-0"
                placeholder=" choose order"
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: 5,
                  height: "40px",
                }}
                onChange={(e) => {
                  setInter(e.target.value);
                }}
              >
                <option value="">Select Type</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>
            <div className="col-3"></div>
          </div>

          <div className="row mt-4">
            <div className="col-3"></div>
            <div className="col-6">
              {Inter === "internal" ? (
                <>
                  {" "}
                  <label
                    className="mt-2"
                    style={{ fontSize: 16, fontWeight: 600 }}
                  >
                    Navigate To
                  </label>
                  <select
                    className="w-100 border-0"
                    placeholder=" choose order"
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: 5,
                      height: "40px",
                    }}
                    onChange={(e) => {
                      setNav(e.target.value);
                    }}
                  >
                    <option value="">Pls Select Navigate</option>
                    <option value="Home">Home</option>
                    <option value="Deposit">Deposit</option>
                    <option value="MyExams">MyExams</option>
                    <option value="AllLiveQuizzes">AllLiveQuizzes</option>
                    <option value="AllTriviaQuizzes">AllTriviaQuizzes</option>
                    <option value="StudyMaterials">StudyMaterials</option>
                    <option value="QuestionPaperList">QuestionPaperList</option>
                    <option value="Rooms">Rooms</option>
                    <option value="Explore">Explore</option>
                    <option value="DailyUpdate">DailyUpdate</option>
                  </select>
                </>
              ) : (
                <>
                  <label
                    className="mt-2"
                    style={{ fontSize: 16, fontWeight: 600 }}
                  >
                    Navigate To
                  </label>
                  <input
                    className="w-100 border-0"
                    placeholder="https://example.com"
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: 5,
                      height: "40px",
                    }}
                    value={Nav}
                    onChange={(e) => {
                      setNav(e.target.value);
                    }}
                  />
                </>
              )}
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row mt-3">
            <div className="col-4"></div>
            <div className="col-4">
              <button
                type="submit"
                className="border-0 w-100 text-white mt-5"
                style={{
                  backgroundColor: "#2188E7",
                  height: "40px",
                  borderRadius: 7,
                }}
                onClick={send}
              >
                Save
              </button>
            </div>
            <div className="col-4"></div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default BannerTabs;
