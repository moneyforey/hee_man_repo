import React from "react";
// import { SunspotLoader } from "react-awesome-loaders";
import styles from "./Loader.module.css";
const dummyArray = new Array(11).fill(1);

const LoaderComponent = () => {
  return (
    //     <>
    //     <SunspotLoader
    //       gradientColors={["#6366F1", "#E0E7FF"]}
    //       shadowColor={"#3730A3"}
    //       desktopSize={"128px"}
    //       mobileSize={"100px"}
    //     />
    //   </>

    <div className={styles.bouncing_loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    // <div style={{
    //     display:"grid",
    //     gridTemplateColumns:"repeat(3,1fr)",
    //     gap:"1rem"
    // }}>
    //     {
    //        dummyArray.map((el)=><div className="card" aria-hidden="true">

    //        <div className="card-body">
    //          {/* <h5 class="card-title placeholder-glow">
    //            <span class="placeholder col-6"></span>
    //          </h5> */}
    //          <p className="card-text placeholder-glow d-flex">
    //           <span  className="placeholder"  style={{
    //              width:"40px",
    //              height:"40px",
    //              borderRadius:"50%"
    //           }}> </span>
    //            <span className="placeholder col-7"></span>

    //          </p>

    //        </div>
    //      </div>
    //      )

    //     }
    // </div>
  );
};

export default LoaderComponent;
