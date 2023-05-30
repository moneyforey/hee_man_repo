import { useContext, useState } from "react";
import Chat7 from "../../Img/delete.png";
import Chat from "../../Img/pen-2-fill.png";
import Thaks from "../../Img/DeleteSucess.json";
import Lottie from "lottie-react";
import { AuthContext } from "../Utils/AuthContextProvider";
import { Button, Form, Offcanvas, Spinner } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import LoaderComponent from "../Utils/LoaderComponent";
import clock from "../../Img/clock.svg";
import Dates from "../../Img/Date.svg";
import Editor from "../Utils/RichTextEditor";
import { toast } from "react-toastify";

const initLoader = {
  isLoading: false,
  isError: false,
};

const initRes = {
  isPending: false,
  isRejected: false,
};

const BlogCard = ({
  title,
  image,
  category_id,
  datetime,
  status,
  body,
  id,
  handleDeleteBlog,
  getBlogs,
}) => {
  const { state } = useContext(AuthContext);
  const [showView, setShowView] = useState(false);
  const [loader, setLoader] = useState(initLoader);
  const [updatedContent, setUpdatedContent] = useState({});
  const [content1, setContent1] = useState("");
  const [resEditBlog, setResEditBlog] = useState(initRes);
  const [blog, setBlog] = useState({});
  const [show, setShow] = useState(false);

  //required destructuring from state objects
  const { token } = state;
  const { isLoading, isError } = loader;
  const { isPending, isRejected } = resEditBlog;

  //function for view particular blog detail
  const handleView = (id) => {
    setLoader({
      ...loader,
      isloading: true,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: token,
      id: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/get-single-blogs", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("res for blog", result);
        if (result.status == 1) {
          setBlog(result.data);
          setLoader({
            ...loader,
            isLoading: false,
          });
        } else {
          setLoader({
            ...loader,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoader({
          ...loader,
          isLoading: false,
        });
      });
  };

  //function for edit particular blog
  const handleEditBlog = (updatedContent) => {
    setResEditBlog({
      ...resEditBlog,
      isPending: true,
    });
    // console.log(id);
    var formdata = new FormData();
    Object.entries(updatedContent).forEach(([key, value]) => {
      formdata.append(key, value);
    });
    formdata.append("token", token);
    formdata.append("body", content1);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/edit-blog", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status == 1) {
          toast(result.message);
          setResEditBlog({
            ...resEditBlog,
            isPending: false,
          });
          getBlogs();
        } else {
          toast(result.message);
          setResEditBlog({
            ...resEditBlog,
            isPending: false,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  //function for handle changes over the blog condition
  const handleChangeBlogContemt = (e) => {
    const { value, name } = e.target;
    setUpdatedContent({
      ...updatedContent,
      [name]: value,
    });
  };

  return (
    <>
      <div
        style={{
          gap: ".5rem",
          marginTop: ".5rem",
        }}
        className="col-sm-12 col-sm-4 col-lg-4"
      >
        <div className="card">
          <div className="container">
            <p
              style={{
                width: "350px",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "20px",
                color: "#000000",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </p>
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6"></div>
            </div>

            {/* <div className="col-sm-12 col-md-2 col-lg-3">
              <p
                className="text-center"
                style={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "12px",
                  color: "#8A8A8A",
                  background: "#EFEFEF",
                  borderRadius: "23px",
                  padding: "8px 4px",
                }}
              >
               
              </p>
            </div> */}

            <div
              style={{
                width: "100%",
                height: "200px",
                margin: "auto",
                marginBottom: "1rem",
              }}
            >
              <img
                src={image}
                style={{
                  width: "100%",
                  height: "100%",
                  marginBottom: "1rem",
                }}
                alt="Sorry to say"
              />
            </div>

            <div className="row mb-3">
              <div className="col-sm-12 col-md-4 col-lg-4">
                <button
                  onClick={() => {
                    setShowView(true);
                    handleView(id);
                  }}
                  type="button"
                  class="btn btn-primary"
                  style={{
                    background:
                      "linear-gradient(180deg, #23B065 0%, #2E8760 100%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                >
                  View Details
                </button>
              </div>
              <div className="col-sm-12 col-md-5 col-lg-5">
                <button
                  onClick={() => {
                    setShow(true);
                    setUpdatedContent({
                      title,
                      image,
                      datetime,
                      category_id,
                      body,
                      status,
                      id,
                    });
                  }}
                  type="button"
                  class="btn btn-primary"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #2E8760",
                    borderRadius: "8px",
                    color: "#2E8760",
                    fontSize: "12px",
                  }}
                >
                  <span>
                    <img src={Chat} alt="hello" style={{ width: "25%" }} />
                  </span>
                  Edit Blog
                </button>
              </div>

              <div className="col-sm-12 col-md-3 col-lg-3">
                <button
                  onClick={() => {
                    // console.log(id);
                    handleDeleteBlog(id);

                    // setReqID(id);
                  }}
                  type="button"
                  class="btn btn-primary"
                  // data-bs-toggle="modal"
                  // data-bs-target="#exampleModal"
                  style={{ background: "#CC1313", padding: "3px 18px" }}
                >
                  <span>
                    <img
                      src={Chat7}
                      alt="hello"
                      style={{
                        width: "90%",
                        margin: "0px 0px 0px 0px",
                      }}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal for delete  */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <p
                className="text-center"
                style={{
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "24px",
                  color: "#000000",
                }}
              >
                Are you sure?
              </p>
              <p
                className="text-center"
                style={{
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: "#8A8A8A",
                }}
              >
                Do you really want to delete this Blog?
              </p>
            </div>
            <div className="container mb-3">
              <div className="row">
                <div className="col-6 text-center">
                  <button
                    type="button"
                    class="btn btn-secondary text-center"
                    data-bs-dismiss="modal"
                    style={{
                      background: "#dadada",
                      border: "none",
                      padding: "7px 40px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-6 text-center">
                  <button
                    // onClick={()=>handleDeleteBlog(id)}
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1"
                    style={{
                      background: "#CC1313",
                      borderRadius: "7px",
                      border: "none",
                      padding: "7px 40px",
                    }}
                  >
                    Yes Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div
                className="d-flex"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Lottie animationData={Thaks} style={{ width: "40%" }} />
              </div>
              <p
                className="text-center"
                style={{
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "24px",
                  color: "#000000",
                }}
              >
                {/* Are you sure? */}
              </p>
              <p
                className="text-center"
                style={{
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: "#8A8A8A",
                }}
              >
                “ Blog ” is successfully deleted
              </p>
            </div>
            <div className="container text-center mb-3">
              <button
                type="button"
                class="btn btn-primary text-center"
                data-bs-dismiss="modal"
                style={{ border: "none", padding: "7px 40px" }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* delete modal ends here */}

      {/* offcanvas for view particular blog */}

      <Offcanvas
        show={showView}
        placement="end"
        style={{
          width: "50%",
          borderRadius: "20px 0 0 0",
        }}
      >
        <Offcanvas.Header>
          <span
            onClick={() => setShowView(false)}
            style={{
              color: "#000",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <RxCross2 size="30px" />
          </span>
        </Offcanvas.Header>

        <Offcanvas.Body
          style={{
            maxHeight: "90vh",
            overflowY: "scroll",
          }}
        >
          {isLoading ? (
            <LoaderComponent />
          ) : (
            <>
              <h2>{blog.title}</h2>

              <div style={{ display: "flex", gap: "2rem" }}>
                <div>
                  <img src={Dates} alt="" />
                  <span>{blog?.datetime?.split(" ")[0]}</span>
                </div>
                <div>
                  <img src={clock} alt="" />
                  <span>{blog?.datetime?.split(" ")[1]}</span>
                </div>
              </div>

              {/* <div className="col-sm-12 col-md-2 col-lg-3">
                <p
                  className="text-center"
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "20px",
                    color: "#8A8A8A",
                    background: "#EFEFEF",
                    borderRadius: "23px",
                    padding: "8px 4px",
                  }}
                >
                  <span>Published: </span>
                  {blog.status ? "Yes" : "No"}
                </p>
              </div> */}

              <hr />
              <img
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                }}
                src={blog.image}
                alt=""
              />

              <div dangerouslySetInnerHTML={{ __html: blog.body }} />
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* offcanvas for Edit particular blog */}

      <Offcanvas
        show={show}
        placement="end"
        style={{
          width: "50%",
          borderRadius: "20px 0 0 0",
          padding: "1rem",
        }}
      >
        <Offcanvas.Header>
          <span
            onClick={() => setShow(false)}
            style={{
              color: "#000",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <RxCross2 size="30px" />
          </span>

          <Button
            disabled={isPending}
            onClick={() => handleEditBlog(updatedContent)}
          >
            {isPending ? <Spinner /> : "Save"}
          </Button>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {isLoading ? (
            <LoaderComponent />
          ) : (
            <>
              <input
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: ".5rem",
                  fontSize: "25px",
                  width: "100%",
                }}
                value={updatedContent.title}
                name="title"
                onChange={handleChangeBlogContemt}
              />

              <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
                <div>
                  <img src={Dates} alt="" />
                  <span>{updatedContent.datetime?.split(" ")[0]}</span>
                </div>
                <div>
                  <img src={clock} alt="" />
                  <span>{updatedContent.datetime?.split(" ")[1]}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <Form.Check // prettier-ignore
                    onChange={() =>
                      setUpdatedContent({
                        ...updatedContent,
                        status: updatedContent.status == 0 ? 1 : 0,
                      })
                    }
                    type="switch"
                    id="custom-switch"
                    // label="Check this switch"
                  />
                  <h6>{updatedContent.status ? "PUBLISHED" : "DRAFT"}</h6>
                </div>
              </div>

              {/* <div className="col-sm-12 col-md-2 col-lg-3">
                <p
                  className="text-center"
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "20px",
                    color: "#8A8A8A",
                    background: "#EFEFEF",
                    borderRadius: "23px",
                    padding: "8px 4px",
                  }}
                >
                  <span>Published: </span>
                  {blog.status ? "Yes" : "No"}
                </p>
              </div> */}

              <hr />
              <img
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                }}
                src={image}
                alt=""
              />
              <div
                style={{
                  maxHeight: "70vh",
                  overflowY: "scroll",
                }}
              >
                {/* <textarea
                  style={{
                    height: "20vh",
                    width: "100%",
                  }}
                  name="body"
                  onChange={handleChangeBlogContemt}
                >
                  {updatedContent.body}
                </textarea> */}

                <Editor
                  content1={updatedContent.body}
                  setContent1={setContent1}
                  
                />
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default BlogCard;
