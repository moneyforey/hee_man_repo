import { useState, useEffect } from "react";
import { Card, Button, Offcanvas } from "react-bootstrap";
import QuizCard from "./QuizCard";
import { toast } from "react-toastify";
import SearchIcon from "../../Img/ri_search-line.svg";
import LoaderComponent from "../Utils/LoaderComponent";
import EmptyContainer from "../Utils/EmptyContainer";
import { HiX } from "react-icons/hi";

const initLoader = {
  isLoading: false,
  isError: false,
};

const RoomTabs = () => {
  const [Value, setValue] = useState("Public");
  const [Data, setData] = useState([]);
  const [Data1, setData1] = useState([]);
  const [Bar, setBar] = useState("");
  const [show, setShow] = useState(false);
  const [Name, setName] = useState("");
  const [Title, setTitle] = useState("");
  const [Imges, setImges] = useState("");
  const [TotalPart, setTotalPart] = useState([]);
  const [isPublic, setIsPublic] = useState();
  const [quizes, setQuizes] = useState([]);
  const [status, setStatus] = useState();
  const [ele, setElement] = useState({});
  const [searchkeypublic, setSearchKeyPublic] = useState("");
  const [searchkeyprivate, setSearchKeyPrivate] = useState("");
  const [filterPublic, setFilterPublic] = useState([]);
  const [filterPrivate, setFilterPrivate] = useState([]);
  const [loader, setLoader] = useState(initLoader);
  const { isLoading } = loader;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //function for getting public rooms
  const Api = (x) => {
    // console.log(searchkeypublic);
    setLoader({
      ...loader,
      isLoading: true,
    });
    var formdata = new FormData();
    formdata.append("token", localStorage.getItem("token"));
    formdata.append("search", x);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`https://brainbucks.co.in/api/admin/get-public-rooms`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("public room", result.data.data);
        setData(result.data.data);
        setFilterPublic(result.data.data);
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

  //function for getting room by their id is from either public or private
  const Api2 = async (token, id) => {
    console.log(id);
    var formdata = new FormData();
    formdata.append("token", token);
    formdata.append("room_id", id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/get-room-members", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("particular room",result);

        if (result.status == "001") {
          setTotalPart(result.data);
        } else {
          if (result.message === "There Are No Participants Found.") {
            setTotalPart([]);
          }
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  //function for getting private room
  const Api1 = (x) => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    var formdata = new FormData();
    formdata.append("token", localStorage.getItem("token"));
    formdata.append("search", x);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `https://brainbucks.co.in/api/admin/get-private-rooms`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setData1(result.data.data);
        setFilterPrivate(result.data.data);
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

  //function getting quiz for particular room
  const getQuizesForRoom = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: localStorage.getItem("token"),
      room_id: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/get-room-quizzes", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("quizdata",result.data);

        !result.data ? setQuizes([]) : setQuizes(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  //function for click search public
  const clicksearchPublic = () => {
    Api(searchkeypublic);
  };

  // function for click search for private
  const clicksearchPrivate = () => {
    Api1(searchkeyprivate);
  };

  //function for updating room
  const updateRoom = (a, b, c, d) => {
    // console.log({type:a,status:b,title:c,room_id:d})

    var formdata = new FormData();
    formdata.append("token", localStorage.getItem("token"));
    formdata.append("title", c);
    formdata.append("room_type", a);
    formdata.append("room_id", d);
    formdata.append("status", b);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/room-update", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "001") {
          toast(result.message);
          // if(a==0){
          Api();
          // }else{
          Api1();
          // }
        } else {
          toast(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  //function for handle search  for Public room
  const handleSearchForPublic = (e) => {
    const { key, target } = e;
    const { value } = target;
    setSearchKeyPublic(value);
    if (key === "Enter") {
      // console.log(searchkeypublic);
      Api(value);
    }
    // console.log(key, value);
  };

  //function for action for public
  const actionToPublic = () => {
    setSearchKeyPublic("");
    Api("");
  };

  //function for action for private
  const actionToPrivate = () => {
    setSearchKeyPrivate("");
    Api1("");
  };

  //function for handle search  for Private room
  const handleSearchForPrivate = (e) => {
    const { key, target } = e;
    const { value } = target;
    setSearchKeyPrivate(value);
    if (key === "Enter") {
      // console.log(searchkeyprivate);
      Api1(value);
    }
    // console.log(key, value);
  };

  useEffect(() => {
    Api("");
    Api1("");
  }, []);

  return (
    <>
      <div className="row">
        <div
          className="col-1"
          onClick={() => {
            setValue("Public");
          }}
          style={{
            fontWeight: Value == "Public" ? "600" : "400",
            fontSize: 16,
            color: Value == "Public" ? "#000" : "#808080",
            cursor: "pointer",
          }}
        >
          Public
        </div>
        <div
          className="col-1"
          onClick={() => {
            setValue("Private");
          }}
          style={{
            fontWeight: Value == "Private" ? "600" : "400",
            fontSize: 16,
            color: Value == "Private" ? "#000" : "#808080",
            cursor: "pointer",
          }}
        >
          Private
        </div>
      </div>
      <div className="row mt-3">
        <div
          className="col-1"
          style={{ borderBottom: Value == "Public" ? "2px solid #000" : "" }}
        ></div>
        <div
          className="col-1"
          style={{ borderBottom: Value == "Private" ? "2px solid #000" : "" }}
        ></div>
      </div>
      <hr style={{ marginTop: 0 }} />

      <div style={{ height: "75vh", overflowY: "scroll" }}>
        {Value == "Public" ? (
          <>
            {/* upper search row starts here */}
            <div className="row">
              <div className="col-6 d-flex">
                <div className="col-8">
                  <h5 className="mt-1">
                    Showing total
                    <span style={{ color: "red" }}>
                      {" "}
                      {filterPublic?.length}{" "}
                    </span>
                    Public Rooms
                  </h5>
                </div>
                <div className="col-4"></div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-6">
                    <div
                      className="row"
                      style={{
                        border: "1px solid #D9D9D9",
                        height: "40px",
                        borderRadius: "7px",
                      }}
                    >
                      <div className="col-2 mt-1">
                        <img alt="SearchIcon" src={SearchIcon} />
                      </div>
                      <div className="col-10 mt-1 ">
                        <input
                          className="border-0 w-100"
                          placeholder="Search for Public Room"
                          style={{
                            textDecoration: "none",
                            outline: "none",
                            color: "#272727",
                          }}
                          onKeyPress={handleSearchForPublic}
                          // onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <button
                      className="border-0 bg-white"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(35,176,101,1) 0%, rgba(46,135,96,1) 100%)",
                        color: "#fff",
                        height: "40px",
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        marginLeft: "-20px",
                      }}
                      onClick={clicksearchPublic}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* search row end here */}

            <div className="row">
              {
                // {/* mapping for public cards      */}
                isLoading ? (
                  <LoaderComponent />
                ) : filterPublic.length === 0 ? (
                  <EmptyContainer
                    message="No Data Found"
                    actionName="Fetch All Data"
                    action={actionToPublic}
                  />
                ) : (
                  filterPublic?.map((res, key) => {
                    return (
                      <>
                        <div className="col-3 mt-2" key={key}>
                          <Card style={{ width: "18rem" }}>
                            <Card.Body>
                              <Card.Title style={{ fontWeight: 600 }}>
                                {res.title}
                              </Card.Title>
                              <Card.Text>
                                <span style={{ fontSize: 16 }}>
                                  Total Members{" "}
                                  <span style={{ color: "green" }}>
                                    {res.total_participated}
                                  </span>
                                </span>
                              </Card.Text>
                              <Button
                                className="w-100"
                                variant="primary"
                                onClick={() => {
                                  setIsPublic(true);
                                  handleShow();
                                  setBar(res.id);
                                  setTitle(res.title);
                                  setName(res.admin_name);
                                  setImges(res.admin_image);
                                  Api2(localStorage.getItem("token"), res.id);
                                  getQuizesForRoom(res.id);
                                  setStatus(res.status);
                                  setElement(res);
                                }}
                              >
                                View Details
                              </Button>
                            </Card.Body>
                          </Card>
                        </div>
                      </>
                    );
                  })
                )
              }
            </div>
          </>
        ) : (
          <>
            {/* upper search row starts here */}
            <div className="row">
              <div className="col-6 d-flex">
                <div className="col-8">
                  <h5 className="mt-1">
                    Showing total
                    <span style={{ color: "red" }}>
                      {" "}
                      {filterPrivate?.length}{" "}
                    </span>
                    Private Rooms
                  </h5>
                </div>
                <div className="col-4"></div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-6">
                    <div
                      className="row"
                      style={{
                        border: "1px solid #D9D9D9",
                        height: "40px",
                        borderRadius: "7px",
                      }}
                    >
                      <div className="col-2 mt-1">
                        <img alt="SearchIcon" src={SearchIcon} />
                      </div>
                      <div className="col-10 mt-1 ">
                        <input
                          className="border-0 w-100"
                          placeholder="Search for Private Room"
                          style={{
                            textDecoration: "none",
                            outline: "none",
                            color: "#272727",
                          }}
                          onKeyPress={handleSearchForPrivate}
                          // onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <button
                      className="border-0 bg-white"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(35,176,101,1) 0%, rgba(46,135,96,1) 100%)",
                        color: "#fff",
                        height: "40px",
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        marginLeft: "-20px",
                      }}
                      onClick={clicksearchPrivate}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* search row end here */}

            <div className="row">
              {
                // mapping for private room cards

                isLoading ? (
                  <LoaderComponent />
                ) : filterPrivate.length === 0 ? (
                  <EmptyContainer
                    message="No Data Found"
                    actionName="Fetch All Data"
                    action={actionToPrivate}
                  />
                ) : (
                  filterPrivate?.map((res, key) => {
                    return (
                      <>
                        <div className="col-3 mt-2" key={key}>
                          <Card style={{ width: "18rem" }}>
                            <Card.Body>
                              <Card.Title style={{ fontWeight: 600 }}>
                                {res.title}
                              </Card.Title>
                              <Card.Text>
                                <span style={{ fontSize: 16 }}>
                                  Total Participated{" "}
                                  <span style={{ color: "green" }}>
                                    {res.total_participated}
                                  </span>
                                </span>
                              </Card.Text>
                              <Button
                                className="w-100"
                                variant="primary"
                                onClick={() => {
                                  setIsPublic(false);
                                  handleShow();
                                  setBar(res.id);
                                  setTitle(res.title);
                                  setName(res.admin_name);
                                  setImges(res.admin_image);
                                  Api2(localStorage.getItem("token"), res.id);
                                  getQuizesForRoom(res.room_id);
                                  setStatus(res.status);
                                  setElement(res);
                                }}
                              >
                                View Details
                              </Button>
                            </Card.Body>
                          </Card>
                        </div>
                      </>
                    );
                  })
                )
              }
            </div>
          </>
        )}
      </div>
      <Offcanvas show={show} className="w-50" placement="end">
        <Offcanvas.Header>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              handleClose();
              setElement({});
            }}
          ></button>
        </Offcanvas.Header>

        <Profile
          updateRoom={updateRoom}
          ele={ele}
          status={status}
          quizes={quizes}
          isPublic={isPublic}
          title={Title}
          name={Name}
          admin_avtar={Imges}
          TotalPart={TotalPart}
        />
      </Offcanvas>
    </>
  );
};

export default RoomTabs;

const Profile = (props) => {
  const {
    isPublic,
    quizes,
    admin_avtar,
    title,
    name,
    ele,
    updateRoom,
    TotalPart,
  } = props;
  const { status, room_type, id } = ele;
  const [checked, setChecked] = useState(true);
  const [type, setType] = useState();
  const [typeValue, setTypeValue] = useState();
  const [onParticpant, setOnParticipant] = useState(true);
  const [statusName, setStatusName] = useState(1);
  const [heading, setHeading] = useState();

  console.log(quizes);

  const handleSwitch = (e) => {
    const { checked } = e.target;
    if (checked) {
      if (isPublic) {
        setType("Private");
        setTypeValue(1);
      } else {
        setType("Public");
        setTypeValue(0);
      }
    } else {
      if (isPublic) {
        setType("Public");
        setTypeValue(0);
      } else {
        setType("Private");
        setTypeValue(1);
      }
    }
  };

  const handleChangeStatus = (e) => {
    const { value } = e.target;
    setStatusName(+value);
  };

  useEffect(() => {
    setType(room_type ? "Private" : "Public");
    setStatusName(status);
    setHeading(title);
    setTypeValue(room_type);
  }, []);
  // console.log("sn",statusName);
  return (
    <>
      <Offcanvas.Body>
        <div className="row">
          <div className="col-6">
            <p style={{ fontSize: 20, fontWeight: 600, color: "#000" }}>
              Room Title
            </p>
          </div>

          <div className="col-6">
            <button
              onClick={() => updateRoom(typeValue, statusName, heading, id)}
              className="col-3 border-0 bg-primary"
              style={{ borderRadius: 5, height: 40, color: "#fff" }}
            >
              Save
            </button>
          </div>
        </div>

        <div className="mt-2 ms-3 row">
          <input
            value={heading}
            className="col-6"
            name="heading"
            onChange={(e) => setHeading(e.target.value)}
            style={{
              fontSize: 16,
              fontWeight: 600,
              border: "none",
              boxShadow: "none",
            }}
          />
        </div>

        <div className="row">
          <div className="col-6">
            <div className="">
              <p style={{ fontSize: 20, fontWeight: 600, color: "#000" }}>
                Room Type
              </p>
            </div>

            <div class="form-check form-switch">
              <input
                onChange={handleSwitch}
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
              />
              <label className="form-check-label" for="flexSwitchCheckChecked">
                {type}
              </label>
            </div>
          </div>

          <div className="col-6 ">
            <div
              value={status}
              style={{ fontSize: 20, fontWeight: 600, color: "#000" }}
            >
              Room Status
            </div>
            <select className="mx-2 mt-3" onChange={handleChangeStatus}>
              <option value="">change status</option>
              <option
                style={{
                  width: "150px",
                  backgroundColor: "#efefef",
                  color: "#8A8A8A",
                }}
                value={0}
              >
                Delete
              </option>
              <option
                style={{
                  width: "150px",
                  backgroundColor: "#edf7ff",
                  color: "#2188E7",
                }}
                value={1}
              >
                Active
              </option>
              <option
                style={{
                  width: "150px",
                  backgroundColor: "#edf7ff",
                  color: "#2E8760",
                }}
                value={2}
              >
                Block
              </option>
            </select>

            <label
              style={{
                backgroundColor:
                  statusName === 0
                    ? "#efefef"
                    : statusName === 1
                    ? "#edf7ff"
                    : "#edf7ff",

                color:
                  statusName === 0
                    ? "#8A8A8A"
                    : statusName === 1
                    ? "#2188E7"
                    : "#2E8760",
                    padding:".25rem",
                    borderRadius:'.5rem'
              }}
              className="form-check-label"
              for="flexSwitchCheckChecked"
            >
              {statusName === 0
                ? "Delete"
                : statusName === 1
                ? "Active"
                : "Block"}
            </label>
          </div>
        </div>

        <div className="">
          <p style={{ fontSize: 20, fontWeight: 600, color: "#000" }}>Admin</p>
        </div>
        <div className="mt-2 ms-3 d-flex">
          <img
            style={{ borderRadius: "50%", width: "5%" }}
            src={admin_avtar}
            alt="#"
          />
          <h6 className="mx-3 mt-2">{name}</h6>
        </div>

        <div className="d-flex">
          <p
            className="col-3"
            onClick={() => setOnParticipant(true)}
            style={{
              fontSize: 20,
              fontWeight: onParticpant ? 600 : "",
              cursor: "pointer",
            }}
          >
            Total Members
          </p>
          <p className="col-1"></p>
          <p
            className="col-2"
            onClick={() => setOnParticipant(false)}
            style={{
              fontSize: 20,
              fontWeight: !onParticpant ? 600 : "",
              cursor: "pointer",
            }}
          >
            Quizes
          </p>
        </div>

        <div className="row">
          <div
            className="col-3 mt-2"
            style={{
              borderBottom: onParticpant ? "1px solid #000000" : "",
            }}
          ></div>

          <div className="col-1"></div>
          <div
            className="col-2"
            style={{
              borderBottom: !onParticpant ? "1px solid #000000" : "",
            }}
          ></div>
        </div>
        <hr style={{ marginTop: "0px" }} />

        {onParticpant ? (
          <>
            <div className="mt-2 ms-3">
              {TotalPart.length === 0 ? (
                <h1>No Participants</h1>
              ) : (
                TotalPart?.map((res, item) => {
                  return (
                    <>
                      <div className="d-flex mt-2">
                        <img
                          style={{ borderRadius: "50%", width: "5%" }}
                          src={res.image}
                          alt="#"
                        />
                        <h6 className="mx-3 mt-2" key={item}>
                          {res.name}
                        </h6>
                      </div>
                    </>
                  );
                })
              )}
            </div>
          </>
        ) : (
          <div
            style={{
              overflowY: "scroll",
              maxHeight: "50vh",
            }}
          >
            {quizes?.length === 0 ? (
              <h5>No Quizes</h5>
            ) : (
              quizes?.map((el) => <QuizCard data={el} />)
            )}
          </div>
        )}
      </Offcanvas.Body>
    </>
  );
};
