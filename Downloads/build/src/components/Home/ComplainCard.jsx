import Chat7 from "../../Img/Rectangle.png";

const ComplainCard = () => {
  const checked = {
    color: "#2E8760",
  };
  const checked1 = {
    color: "#EFEFEF",
  };
  return (
    <div className="container mt-1">
      <div className="card">
        <div className="row mt-2">
          <div className="col-2 ">
            <img
              src={Chat7}
              alt="hello"
              style={{
                width: "60%",
                margin: "0px 0px 0px 0px",
                borderRadius: "40px",
                float: "right",
              }}
            />
          </div>
          <div className="col-6">
            <p>Anjela Rudolf</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div style={{ marginLeft: "12px" }}>
              <span className="fa fa-star" style={checked}></span>
              <span className="fa fa-star" style={checked}></span>
              <span className="fa fa-star " style={checked}></span>
              <span className="fa fa-star" style={checked1}></span>
              <span className="fa fa-star" style={checked1}></span>
            </div>
          </div>
          <div className="col-6">
            <p
              style={{
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "16px",
                color: "#C3C3C3",
              }}
            >
              23 September 2022
            </p>
          </div>
        </div>
        <div className="container">
          <p
            style={{
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "19px",
              color: "#8A8A8A",
            }}
          >
            Good app!! but i think quiz section can be improved
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplainCard;
