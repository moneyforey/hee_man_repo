import { useEffect, useState } from "react";
import PublishedBlogs from "./PublishedBlogs";
import Drafts from "./Drafts";
import Category from "./Category";
const BlogTab = () => {
  // let Dates = new Date().toLocaleString();
  // console.log(Dates);
  const [Sales, setSales] = useState();

  useEffect(() => {
    setSales("sales");
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-8 mb-4">
          <div className="row">
            <div className="col-3">
              <span
                style={{
                  fontWeight: Sales === "sales" ? "600" : "400",
                  color: Sales === "sales" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("sales")}
              >
                Published Blogs
              </span>
            </div>
            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "Exams" ? "600" : "400",
                  color: Sales === "Exams" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Exams")}
              >
                Drafts
              </span>
            </div>

            <div className="col-2">
              <span
                style={{
                  fontWeight: Sales === "Category" ? "600" : "400",
                  color: Sales === "Category" ? "#000000" : "#8A8A8A",
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onClick={() => setSales("Category")}
              >
                Categories
              </span>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="row" style={{ marginRight: "20px" }}>
            <div className="col-5"></div>

            <div
              className="col-7"
              style={{
                background:
                  "linear-gradient(180deg, rgba(33,184,103,1) 0%, rgba(47,132,96,1))",
                height: "40px",
                borderRadius: "7px",
                color: "#fff",
              }}
            >
              <span
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
                className="col-3"
                style={{
                  borderBottom: Sales === "sales" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "Exams" ? "2px solid #000000" : "",
                }}
              ></div>
              <div
                className="col-2"
                style={{
                  borderBottom: Sales === "Category" ? "2px solid #000000" : "",
                }}
              ></div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
        <hr />
      </div>
      
      {Sales === "sales" ? (
        <div>
          <PublishedBlogs />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Exams" ? (
        <div>
          <Drafts />
        </div>
      ) : (
        <></>
      )}
      {Sales === "Category" ? (
        <div>
          <Category />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default BlogTab;
