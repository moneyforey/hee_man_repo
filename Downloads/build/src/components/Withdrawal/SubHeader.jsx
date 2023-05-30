import { useState } from "react";
import Content from "./Content";
import { Modal } from "react-bootstrap";

const initInbtw = {
  from: String(new Date().getDate()),
  to: String(new Date().getDate()).padStart(2, "0"),
};

const SubHeader = () => {
  const [Sales, setSales] = useState("MyTasks");
  const [Datas, setDatas] = useState([]);
  const [show, setShow] = useState(false);
  const [inbtw, setInbtw] = useState(initInbtw);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const { from, to } = initInbtw;

  return (
    <div>
      <div className="row">
        <div className="col-8 mb-2">
          <div className="row">
            <div
              className="col-4 d-flex"
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <span
                className="mt-2"
                style={{
                  fontWeight: Sales === "MyTasks" ? "600" : "400",
                  color: Sales === "MyTasks" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("MyTasks")}
              >
                Withdrawal Requests
              </span>

              {/* <span
                className="px-3"
                style={{
                  backgroundColor: "#CC1313",
                  borderRadius: "50%",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {Datas.length}
              </span> */}


            </div>
          </div>
        </div>

        <div className="col-4 mb-2">
          <div className="row" style={{ marginRight: "20px" }}>
            <div className="col-5"></div>

            <div
              className="col-7 ms-1"
              style={{
                display: Sales === "Question Bank" ? "none" : "",
                background:
                  "linear-gradient(180deg, rgba(33,184,103,1) 0%, rgba(47,132,96,1))",
                height: "40px",
                borderRadius: "7px",
                color: "#fff",
                width: "auto",
              }}
            >
              <span
                className="text-nowrap"
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "6px",
                }}
              >
                22-sep-2022 - 22-sep-2022
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="row">
              <div
                className="col-4"
                style={{
                  borderBottom: Sales === "MyTasks" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-3"
                style={{
                  borderBottom:
                    Sales === "NotStarted" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom:
                    Sales === "InProgress" ? "2px solid #000000" : "",
                }}
              ></div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
        <hr />
      </div>

      {Sales === "MyTasks" ? (
        <div>
          <Content />
        </div>
      ) : (
        <></>
      )}
      {Sales === "NotStarted" ? <div>{/* <NotStarted /> */}</div> : <></>}
      {Sales === "InProgress" ? <div>{/* <InProgress /> */}</div> : <></>}
      {Sales === "Complete" ? <div>{/* <Complete /> */}</div> : <></>}

      <div
        className="offcanvas offcanvas-end w-50"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{ borderTopLeftRadius: 30 }}
      >
        <div className="offcanvas-body">{/* <Question/>  */}</div>
      </div>
      <div
        className="offcanvas offcanvas-end w-50"
        tabindex="-1"
        id="offcanvasRight1"
        aria-labelledby="offcanvasRightLabel1"
        style={{ borderTopLeftRadius: 30 }}
      >
        <div className="offcanvas-body">{/* <AddQuestion/> */}</div>
      </div>

      {/* modal for inbetweendate */}

      <Modal show={show} onClick={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="">FROM</label>
            <input type="date" />
          </div>
          <div>
            <label htmlFor="">TO</label>
            <input type="date" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubHeader;
