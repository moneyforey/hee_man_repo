import SearchIcon from "../../Img/ri_search-line.svg";
// import Chat7 from "../../Img/delete.png";
// import Chat from "../../Img/pen-2-fill.png";
// import Thaks from "../../Img/DeleteSucess.json";
// import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { AuthContext } from "../Utils/AuthContextProvider";
import { Button, InputGroup, Modal, Spinner, Form } from "react-bootstrap";
import BlogCard from "./BlogCard";
import { toast } from "react-toastify";
import LoaderComponent from "../Utils/LoaderComponent";
import EmptyContainer from "../Utils/EmptyContainer";
import ImgFileInput from "react-imgfile";
import Editor from "../Utils/RichTextEditor";

const initContent = {
  title: "",
  body: "",
  image: "",
  category_id: "",
  status: 0,
};

const initAddStatus = {
  isPending: false,
  isSucess: false,
};

const initLoader = {
  isLoading: false,
  isError: false,
};

const Drafts = () => {
  const { state } = useContext(AuthContext);
  const [show1, setShow1] = useState(false);
  const [blogCategoreis, setBlogCategoreis] = useState([]);
  const [content, setContent] = useState(initContent);
  const [addStatus, setAddStatus] = useState(initAddStatus);
  const [blogs, setBlogs] = useState([]);
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const [loader, setLoader] = useState(initLoader);
  const [toSearch, setToSearch] = useState();
  const [content1, setContent1] = useState("");

  //required destructing from state object
  const { title, body, image, category_id, status } = content;
  const { isPending, isSucess } = addStatus;
  const { isLoading, isError } = loader;
  const { token } = state;

  //on/off functions for modal(Add blog)
  const handleClose = () => setShow1(false);
  const handleShow = () => {
    setShow1(true);
    // console.log("hello world");
    getBlogCategories();
  };

  //function for handel changes for blog content
  const handleChangeContnet = (e) => {
    const { type, value, name, checked } = e.target;

    type === "checkbox"
      ? setContent({
          ...content,
          [name]: checked ? 1 : 0,
        })
      : setContent({
          ...content,
          [name]: value,
        });
  };

  // function for upload file as change
  const handleChangeFile = (files) => {
    setContent({
      ...content,
      image: files[0],
    });
  };

  //function for get all the category in for blogs
  const getBlogCategories = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: token,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://brainbucks.co.in/api/admin/get-blog-category",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        // console.log(res);
        if (res.status === 1) {
          setBlogCategoreis(res.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  //function for add blog
  const handleAddBlog = () => {
    setAddStatus({
      ...addStatus,
      isPending: true,
    });
    var formdata = new FormData();
    Object.entries(content).forEach(([key, value]) =>
      formdata.append(key, value)
    );
    formdata.append("token", token);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/create-blog", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setAddStatus({
          ...addStatus,
          isPending: false,
        });
      })
      .catch((error) => {
        console.log("error", error);
        setAddStatus({
          ...addStatus,
          isPending: false,
        });
      });
  };

  //function for getting all blogs
  const getBlogs = () => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      token: token,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/get-draft-blogs", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 1) {
          setBlogs(result.data);
          setSearchedBlogs(result.data);
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

  //function for delete blog
  const handleDeleteBlog = (id) => {
    console.log("id in dlt", id);
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

    fetch("https://brainbucks.co.in/api/admin/delete-blog", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 1) {
          toast(result.message);
          getBlogs();
        } else {
          toast(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  //function for get searched blogs
  const handleSearchFunctionality = (tosearch) => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: token,
      search: tosearch,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://brainbucks.co.in/api/admin/search-draft-blog",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 1) {
          setSearchedBlogs(result.data);
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

  // funcion for key press for the search functionality
  const handleKeyPressSearch = (e) => {
    const { key, target } = e;
    const { value } = target;
    //  console.log(key,value);
    setToSearch(value);
    if (key === "Enter") {
      // console.log(value);
      handleSearchFunctionality(value);
    }
  };

  //function for mapping all the blogs from empty container page
  const getBackAgain = () => {
    setSearchedBlogs(blogs);
  };

  useState(() => {
    getBlogs();
  }, []);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-6 d-flex">
            <div className="col-6">
              <h5 className="mt-1">
                Showing total{" "}
                <span style={{ color: "red" }}>{searchedBlogs?.length}</span> Blogs
              </h5>
            </div>
            <div className="col-4">
              <button
                onClick={handleShow}
                style={{
                  backgroundColor: "#EDF7FF",
                  border: "1px solid #2188E7",
                  height: "40px",
                  borderRadius: "10px",
                  color: "#2188E7",
                }}
              >
                <span className="p-3"> +Add Blog</span>
              </button>
            </div>
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
                      onKeyPress={handleKeyPressSearch}
                      className="border-0 w-100"
                      placeholder="Search for Blog"
                      style={{
                        textDecoration: "none",
                        outline: "none",
                        color: "#272727",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-2">
                <button
                  onClick={handleSearchFunctionality}
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
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            maxHeight: "70vh",
            overflowY: "scroll",
          }}
          className="container mt-4"
        >
          <div className="row">
            {isLoading ? (
              <LoaderComponent />
            ) : searchedBlogs.lenght === 0 ? (
              <EmptyContainer
                message="Data Not Fount"
                action={getBackAgain}
                actionName="Get All Blogs"
              />
            ) : (
              searchedBlogs?.map((el) => (
                <BlogCard
                  getBlogs={getBlogs}
                  key={el.id}
                  {...el}
                  handleDeleteBlog={handleDeleteBlog}
                />
              ))
            )}

            {/* <div className="col-sm-12 col-sm-4 col-lg-4">
              <div className="card">
                <div className="container">
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "20px",
                      color: "#000000",
                    }}
                  >
                    How to Crack UPSC in one first Attempt ?
                  </p>
                  <div className="row">
                    <div className="col-6"></div>
                    <div className="col-6"></div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12 col-md-2 col-lg-3">
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
                        UPSC
                      </p>
                    </div>
                    <div className="col-sm-12 col-md-2 col-lg-3">
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
                        IAS
                      </p>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-6">
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
                        How to Become IAS ?
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-2 col-lg-3">
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
                        UPSC
                      </p>
                    </div>
                    <div className="col-sm-12 col-md-2 col-lg-3">
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
                        IAS
                      </p>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4">
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
                        IAS Motivation
                      </p>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-2">
                      <p
                        className="text-center"
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "#8A8A8A",
                          background: "#FEFEFE",
                          border: "1px solid #D9D9D9",
                          borderRadius: "23px",
                          padding: "8px 4px",
                        }}
                      >
                        +45
                      </p>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-12 col-md-4 col-lg-4">
                      <button
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
                          <img
                            src={Chat}
                            alt="hello"
                            style={{ width: "25%" }}
                          />
                        </span>
                        Edit Blog
                      </button>
                    </div>
                    <div className="col-sm-12 col-md-3 col-lg-3">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ background: "#CC1313", padding: "3px 18px" }}
                      >
                        <span>
                          <img
                            src={Chat7}
                            alt="hello"
                            style={{ width: "90%", margin: "0px 0px 0px 0px" }}
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* modal for Add blogs starts here*/}
      <Modal
        show={show1}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "70vh",
            overflowY: "scroll",
          }}
        >
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={handleChangeContnet}
                name="title"
                value={title}
                type="text"
                placeholder="Enter Title here"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Select
                onChange={handleChangeContnet}
                name="category_id"
                value={category_id}
                autoFocus
              >
                <option>select Category</option>
                {blogCategoreis?.map((el) => (
                  <option value={el.id}>{el.category_name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Banner</Form.Label>
              {/* <Form.Control
                onChange={handleChangeContnet}
                type="file"
                name="image"
                autoFocus
              /> */}

              <ImgFileInput
                buttonText="Choose image"
                onChange={handleChangeFile}
                maxFileSize={5242880}
                singleImage={true}
                name="image"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Body</Form.Label>
              {/* <Form.Control
                name="body"
                onChange={handleChangeContnet}
                as="textarea"
                rows={10}
                placeholder="Enter your blog content here..."
              />*/}

              <Editor content1={content1} setContent1={setContent1} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <InputGroup>
            <InputGroup.Checkbox
              style={{
                borderBottomRightRadius: "5px",
                borderTopRightRadius: "5px",
              }}
              size="lg"
              name="status"
              onChange={handleChangeContnet}
              aria-label="Checkbox for following text input"
            />
            <Form.Control
              style={{
                backgroundColor: "transparent",
                border: "none",
              }}
              disabled
              placeholder="Publish the blog"
            />
            <Button
              variant={status ? "success" : "primary"}
              onClick={handleAddBlog}
            >
              {isPending ? <Spinner /> : status ? "Publish" : "Save as Draft"}
            </Button>
          </InputGroup>
        </Modal.Footer>
      </Modal>
      {/* modal for Add blogs ends here*/}
    </>
  );
};

export default Drafts;