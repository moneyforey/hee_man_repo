import { FaArrowRight } from "react-icons/fa";
import Dates from "../../Img/Date.svg";
import { Offcanvas } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Utils/AuthContextProvider";
import { RxCross2 } from "react-icons/rx";
import ImgFileInput from "react-imgfile";
import { AiFillEdit } from "react-icons/ai";

const CategoryCard = ({ id, category_image, category_name, datetime }) => {
  const [show, setShow] = useState(false);
  const [updatedCategory, setUpdateCategory] = useState({});
  const [blob, setBlob] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const { state } = useContext(AuthContext);

  const { token } = state;

  //function for handle on/off for offcanvas of details
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //function for manipulate the offcanvas modal inputs
  const handleChangecategoryint = (e) => {
    const { name, value, type, files } = e.target;
    // console.log(name, value, files);
    type === "file"
      ? setUpdateCategory({
          ...updatedCategory,
          [name]: files[0],
        })
      : setUpdateCategory({
          ...updatedCategory,
          [name]: value,
        });

    // console.log(updatedCategory);
  };

  //function for update particular category
  const updateCategory = (id) => {
    // console.log(id);
    var formdata = new FormData();
    Object.entries(updatedCategory).forEach(([key, value]) => {
      formdata.append(key, value);
    });
    formdata.append("token", token);
    formdata.append("id", id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://brainbucks.co.in/api/admin/update-blog-category",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    setUpdateCategory({
      category_name,
      category_image,
    });
  }, []);

  return (
    <>
      <div className="col-4 mt-3">
        <span className="card" style={{ cursor: "pointer" }}>
          <div className="d-flex ps-2">
            <span className="col-2">
              <div
                className="mt-2"
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #D9D9D9",
                  borderRadius: "50px",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  alt="#"
                  src={"https://brainbucks.co.in/public/Blog/" + category_image}
                  width="100%"
                />
              </div>
            </span>

            <div className="col-8 mt-2">
              <span className="ml-5">
                <p
                  style={{
                    marginBottom: "1px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "20px",
                    color: "#000000",
                  }}
                >
                  {category_name}
                </p>
                <p
                  className="mt-1"
                  style={{
                    marginTop: "-10px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    color: "#8A8A8A",
                  }}
                >
                  <img src={Dates} alt="" />
                  <span
                    style={{
                      color: "red",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "16px",
                      color: "#CC1313",
                    }}
                  >
                    {datetime}
                  </span>
                </p>
              </span>
            </div>

            <span
              onClick={handleShow}
              className="col-2 mt-3"
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaArrowRight />
            </span>
          </div>
        </span>
      </div>

      {/* offcanvas for details of the category */}
      <Offcanvas
        show={show}
        placement="end"
        style={{
          width: "50%",
          borderRadius: "15px 0 0 0",
        }}
      >
        <Offcanvas.Header>
          <span
            onClick={handleClose}
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <h4 style={{
            textAlign:"left"
          }}>Category Details</h4> */}
          <div className="col-6">
            {/* <label className="mt-2" style={{ fontSize: 16, fontWeight: 600 }}>
              Change Category Image
            </label> */}
            <label
              className="filelabel1 w-100"
              style={{
                height: "270px",
                marginLeft: "0px",
                backgroundColor: "#F5F5F5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "1rem",
                paddingTop:"1rem"
              }}
            >
              {blob ? (
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: ".5rem",
                  }}
                  src={blob}
                  alt=""
                />
              ) : (
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: ".5rem",
                  }}
                  src={"https://brainbucks.co.in/public/Blog/" + category_image}
                  alt=""
                />
              )}
              <span
                style={{
                  color: "blue",
                  border: "1px solid blue",
                  padding: ".5rem",
                  borderRadius: ".5rem",
                }}
              >
                Update Image
              </span>
              <input
                className="FileUpload1"
                id="FileInput1"
                name="category_image"
                type="file"
                accept=".png,.jpg"
                onChange={(e) => {
                  setBlob(URL.createObjectURL(e.target.files[0]));
                  handleChangecategoryint(e);
                }}
              />
            </label>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1rem",
              gap: ".5rem",
              // width:"100%"
            }}
          >
            <input
              style={{
                borderRadius: ".5rem",
                border: isEdit ? "2px solid #8a8a8a" : "none",
                padding: ".37rem",
                backgroundColor: isEdit ? "none" : "#F5F5F5",
                boxShadow: "none",
              }}
              name="category_name"
              onChange={handleChangecategoryint}
              value={updatedCategory.category_name}
              disabled={!isEdit}
            />
            <button
              onClick={() => setIsEdit(!isEdit)}
              style={{
                padding: "none",
              }}
              type="button"
              className="btn btn-success"
            >
              <AiFillEdit />
            </button>
          </div>

          <button
            onClick={() => updateCategory(id)}
            style={{ width: "250px", marginTop: "1rem" }}
            type="button"
            className="btn btn-primary"
          >
            Update
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CategoryCard;
