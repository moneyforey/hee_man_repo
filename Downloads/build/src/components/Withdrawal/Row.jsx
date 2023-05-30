import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
// import { GiCancel } from "react-icons/gi";
import { WithdrawalContext } from "../Utils/WithdrawalContextProvider";

const Row = ({ res, updateWithDrawalData, isLoading }) => {
  const { is } = useContext(WithdrawalContext);
  console.log("withdrawal",is);

  const [tochange, setTochange] = useState(0);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [changeStatus, setChangeStatus] = useState(0);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleChangeStatus = (stats) => {
    updateWithDrawalData(id, stats);
    setId("");
    // handleClose();
  };

  return (
    <>
      <div
        key={res.id}
        className="row align-items-center  mt-3"
        style={{
          border: "1px solid #DDDDDD",
          width: "98.5%",
          borderRadius: "5px",
          height: "45px",
          backgroundColor: " #FFFFFF",
        }}
      >
        <div className="col-1">
          <p style={{ fontWeight: "400", fontSize: "14px" }}>{res.name}</p>
        </div>
        <div className="col-2">
          <p
            style={{
              fontSize: "14px",
              color: "#434343",
              fontWeight: "400",
            }}
          >
            {res.datetime}
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
        <div className="col-1">
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
        <div className="col-1">
          <p
            style={{
              fontSize: "14px",
              color: "#434343",
              fontWeight: "400",
            }}
          >
            {res.bank_name}
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
            {res.ifsc_code}
          </p>
        </div>

        <div className="col-1">
          <p
            style={{
              fontSize: "14px",
              color: "#434343",
              fontWeight: "400",
            }}
          >
            {res.status ? "" : "Pending"}
          </p>
        </div>

        <div
          className="col-1"
          onClick={() => {
            setShow(true);
            setId(res.id);
          }}
        >
          <p
            style={{
              cursor: "pointer",
              background: "#3572fa",
              borderRadius: "5px",
              padding: ".5rem",
              fontSize: "12px",
              color: "#434343",
              fontWeight: "400",
            }}
          >
            <strong
              style={{
                color: "white",
              }}
            >
              Action
            </strong>
          </p>
        </div>
      </div>

      {/* model for approved payment */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            margin: "auto",
          }}
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{
            display:"flex",
            alignItems:"center",
            gap:"1rem",
            width:"100%"
          }}>
            <Form.Label className="mt-1">Status:</Form.Label>
            <Form.Select
               style={{
                width:"100%"
               }}
              // size="lg"
              onChange={(e) => setChangeStatus(e.target.value)}
            >
              <option value="0">Pending</option>
              <option value="1">Accept</option>
              <option value="2">Reject</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            variant="success"
            disabled={isLoading}
            onClick={() => handleChangeStatus(changeStatus)}
          >
            Save
          </Button>
          <Button
            disabled={isLoading}
            variant="danger"
            onClick={() => {
              setChangeStatus(0);
              handleClose();
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Row;
