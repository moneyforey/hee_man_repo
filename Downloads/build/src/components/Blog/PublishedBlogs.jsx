import SearchIcon from "../../Img/ri_search-line.svg";
import { useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal, Spinner } from "react-bootstrap";
import { AuthContext } from "../Utils/AuthContextProvider";
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

const PublishedBlogs = () => {
  const { state } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [blogCategoreis, setBlogCategoreis] = useState([]);
  const [content, setContent] = useState(initContent);
  const [addStatus, setAddStatus] = useState(initAddStatus);
  const [blogs, setBlogs] = useState([]);
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const [loader, setLoader] = useState(initLoader);
  const [toSearch, setToSearch] = useState();
  const [content1, setContent1] = useState("");

  //requireed destucture from state object
  const { title, category_id, status } = content;
  const { isPending } = addStatus;
  const { isLoading } = loader;
  const { token } = state;

  //on/off functions for modal(Add blog)
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
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
        console.log(res);
        if (res.status === 1) {
          setBlogCategoreis(res.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  //function for add blog
  const handleAddBlog = () => {
    console.log(content1);
    setAddStatus({
      ...addStatus,
      isPending: true,
    });
    var formdata = new FormData();
    Object.entries(content).forEach(([key, value]) =>
      formdata.append(key, value)
    );
    formdata.append("token", token);
    formdata.append("body", content1);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/create-blog", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // if(result.status == 1){
        toast(result.messaage);
        setAddStatus({
          ...addStatus,
          isPending: false,
        });
        // }else{

        // }
      })
      .catch((error) => {
        console.log("error", error);
        setAddStatus({
          ...addStatus,
          isPending: false,
        });
      });
  };

  //function for get blogs
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

    fetch(
      "https://brainbucks.co.in/api/admin/get-published-blogs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 1) {
          console.log(result.data);
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
      "https://brainbucks.co.in/api/admin/search-published-blog",
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

  useEffect(() => {
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
                <span style={{ color: "red" }}>{searchedBlogs?.length}</span>{" "}
                Blogs
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
                  onClick={() => handleSearchFunctionality(toSearch)}
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
          className="container mt-4"
          style={{
            maxHeight: "70vh",
            overflowY: "scroll",
          }}
        >
          <div className="row">
            {isLoading ? (
              <LoaderComponent />
            ) : searchedBlogs.length === 0 ? (
              <EmptyContainer
                message="Data Not Found"
                action={getBackAgain}
                actionName="Get All Blogs"
              />
            ) : (
              searchedBlogs?.map((el) => (
                <BlogCard
                  getBlogs={getBlogs}
                  key={el.id}
                  handleDeleteBlog={handleDeleteBlog}
                  {...el}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* modal for Add blogs starts here*/}
      <Modal
        show={show}
        onHide={handleClose}
        // style={{
        //   width:"50%"
        // }}
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

              <ImgFileInput
                buttonText="Choose image"
                onChange={handleChangeFile}
                maxFileSize={5242880}
                singleImage={true}
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
              /> */}

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
              placeholder="Check to Publish the blog"
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

export default PublishedBlogs;
