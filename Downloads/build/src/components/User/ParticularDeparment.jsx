import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentSubheader from "./DepartmentSubheader";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import RolesCard from "./RolesCard";
import LoaderComponent from "../Utils/LoaderComponent";

//function for get departments
const getDepartments = async (id) => {
  let res = await axios.post(
    "https://brainbucks.co.in/api/admin/get-departments-roles",
    {
      token: localStorage.getItem("token"),
      id: id,
    }
  );

  return res.data;
};

const initLoader = {
  isloading: false,
  isError: false,
};

const ParticularDeparment = () => {
  const { id } = useParams();
  const [departmentName, setDepartmentName] = useState();
  const [roles, setRoles] = useState();
  const [loader, setLoader] = useState(initLoader);
  const navigate = useNavigate();
  const { isLoading, isError } = loader;

  // function for getting the data of particular department
  const filterRequireDepartment = () => {
    setLoader({
      ...loader,
      isLoading: true,
    });

    getDepartments(id)
      .then((res) => {
        if (res.status === 1) {
          setRoles(res.data);
          setDepartmentName(res.department_name);
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
      });
  };

  useEffect(() => {
    filterRequireDepartment();
  }, []);

  //function for creating new role
  const createRole = async (role) => {
    try {
      let res = await axios.post(
        "https://brainbucks.co.in/api/admin/create-role",
        role
      );
      filterRequireDepartment();
      //    console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ overflow: "hidden", backgroundColor: "#f5f5f5 " }}>
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
          <div className="container"></div>
          <Header />
          <DepartmentSubheader
            departmentName={departmentName}
            createRole={createRole}
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
              {roles?.map((el) => (
                <RolesCard key={el.id} {...el} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticularDeparment;
