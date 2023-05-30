import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import DepartmentSubheader from "./DepartmentSubheader";
import DepartmentCard from "./DepartmentCard";
import axios from "axios";
import LoaderComponent from "../Utils/LoaderComponent";

//function for get departments
const getDepartments = async () => {
  let res = await axios.post(
    "https://brainbucks.co.in/api/admin/get-departments-roles",
    {
      token: localStorage.getItem("token"),
    }
  );
  return res.data;
};

const initLoader = {
  isLoading: false,
  isError: false,
};
const Department = () => {
  const [departments, setDeparments] = useState();
  const [no_of_departments, setNoofDepartments] = useState();
  const [loader, setLoader] = useState(initLoader);
  const { isLoading, isError } = loader;

  const get = () => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    getDepartments()
      .then((res) => {
        if (res.status === 1) {
          setDeparments(res.data);
          setNoofDepartments(res.datalength);
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
      .catch((err) => {
        console.log(err);
        setLoader({
          ...loader,
          isLoading: false,
        });
      })
      .finally(() => {
        setLoader({ ...initLoader });
      });
  };

  // function for add department
  const addDepartments = async (department) => {
    try {
      let res = await axios.post(
        "https://brainbucks.co.in/api/admin/create-department",
        {
          token: localStorage.getItem("token"),
          department_name: department,
        }
      );

      get();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div style={{ overflow: "hidden", backgroundColor: "#f5f5f5 " }}>
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
          <div className="container">
            <Header />
            <DepartmentSubheader
              no_of_departments={no_of_departments}
              addDepartments={addDepartments}
            />
            {isLoading ? (
              <LoaderComponent />
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "2rem",
                  maxHeight: "74vh",
                  overflowY: "scroll",
                }}
              >
                {departments?.map((el) => (
                  <DepartmentCard key={el.id} {...el} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
