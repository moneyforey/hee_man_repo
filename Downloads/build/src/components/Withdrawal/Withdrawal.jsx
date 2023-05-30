import SideBar from "../SideBar/SideBar";
import Main from "./Main";

const Withdrawal = () => {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div className="row">
          <div className="col-2">
            <SideBar />
          </div>
          <div className="col-10">
            <div className="container">
              <Main />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
