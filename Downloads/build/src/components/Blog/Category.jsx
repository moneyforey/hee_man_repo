import { useContext, useEffect, useState } from "react";
import SearchIcon from "../../Img/ri_search-line.svg";
import { AuthContext } from "../Utils/AuthContextProvider";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import LoaderComponent from "../Utils/LoaderComponent";
import EmptyContainer from "../Utils/EmptyContainer";
import CategoryCard from "./CategoryCard";
import { toast } from "react-toastify";
import ImgFileInput from "react-imgfile";

const initCategory = {
  category_name: "",
  category_image: "",
};

const initLoader = {
  isLoading: false,
  isError: false,
};

const initAddStatus = {
  isPending: false,
  isRejected: false,
};
const Category = () => {
  const { state } = useContext(AuthContext);
  const [category, setCategory] = useState(initCategory);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(initLoader);
  const [addcategorystatus, setAddCategoryStatus] = useState(initAddStatus);

  //required destructuring from states object
  const { token } = state;
  const { isLoading, isError } = loader;
  const { isPending, isRejected } = addcategorystatus;

  //function for handle on/off for add category modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //function for handleChange CAteogry
  const handleChangeCategory = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  // function for upload file as change
  const handleChangeFile = (files) => {
    setCategory({
      ...category,
      category_image: files[0],
    });
  };

  //function for add new category for blogs
  const handleCreateBlogCategory = () => {
    console.log(category);
    setAddCategoryStatus({
      ...addcategorystatus,
      isPending: true,
    });
    var formdata = new FormData();
    Object.entries(category).forEach(([key, value]) => {
      formdata.append(key, value);
    });
    formdata.append("token", token);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://brainbucks.co.in/api/admin/create-blog-category",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status == 1) {
          toast(result.message);
          setAddCategoryStatus({
            ...addcategorystatus,
            isPending: false,
          });
          // setShow(false);
          getAllcategories();
        } else {
          toast(result.message);
          setAddCategoryStatus({
            ...addcategorystatus,
            isPending: false,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        setAddCategoryStatus({
          ...addcategorystatus,
          isPending: false,
        });
      });
  };

  const getAllcategories = () => {
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
      "https://brainbucks.co.in/api/admin/get-blog-category",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status == 1) {
          setCategories(result.data);
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
        setLoader({
          ...loader,
          isLoading: false,
        });
        console.log("error", error);
      });
  };

  useEffect(() => {
    getAllcategories();
  }, []);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-6 d-flex">
            <div className="col-7">
              <h5 className="mt-1">
                Showing total <span style={{ color: "red" }}>{}</span>{" "}
                Categories
              </h5>
            </div>
            <div className="col-5">
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
                <span className="p-3"> +Add Category</span>
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
                      //   onKeyPress={handleKeyPressSearch}
                      className="border-0 w-100"
                      placeholder="Search for Categories"
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
                  //   onClick={()=>handleSearchFunctionality(toSearch)}
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
        <div className="container mt-4">
          <div className="row">
            {isLoading ? (
              <LoaderComponent />
            ) : categories.length === 0 ? (
              <EmptyContainer
                message="Data Not Found"
                //    action={getBackAgain}
                actionName="Get All Blogs"
              />
            ) : (
              categories?.map((el) => <CategoryCard key={el.id} {...el} />)
            )}
          </div>
        </div>
      </div>

      {/* modal for Add category */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                onChange={handleChangeCategory}
                type="text"
                name="category_name"
                // value={category_name}
                placeholder="Enter category name...."
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Category Image</Form.Label>

              <ImgFileInput
                buttonText="Choose image"
                onChange={handleChangeFile} 
                maxFileSize={5242880}
                singleImage={true}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
         
          <Button
            disabled={isPending}
            variant="primary"
            onClick={handleCreateBlogCategory}
          >
            {isPending ? <Spinner /> : "ADD"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Category;
