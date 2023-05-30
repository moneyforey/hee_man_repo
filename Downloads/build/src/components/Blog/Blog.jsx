import { useEffect } from "react";

import SideBar from "../../components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import BlogData from "./BlogData";

const Blog = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Navigate("/");
    }
  }, []);

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div className="row">
          <div className="col-2">
            <SideBar />
          </div>
          <div className="col-10">
            <div className="container">
              <BlogData />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
