import React from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const RolesCard = ({ total_users, id, role_name }) => {
  const navigate = useNavigate();

  const navigatetoParticulrarDepartment = (destination) => {
    navigate(`/department/${destination}`);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "5px",
        height: "150px",
      }}
    >
      <h3
        style={{
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "24px",
          lineHeight: "29px",
        }}
      >
        {role_name}
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h5
          style={{
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "19px",
          }}
        >
          <span
            style={{
              color: "#2E8760",
            }}
          >
            {total_users}{" "}
          </span>
          users
        </h5>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          type="button"
          className="btn btn-dark"
          style={{
            borderRadius: "5px",
            backgroundColor: "#a0aba9",
            border: "none",
          }}
          onClick={() => navigatetoParticulrarDepartment(id)}
        >
          View Users
        </button>

        <button
          type="button"
          className="btn btn-light"
          style={{
            color: "#d33d3d",
            backgroundColor: "#FFF1F1",
            borderRadius: "5px",
          }}
        >
          <MdDelete color="#d33d3d" />
          Edit
        </button>
      </div>
    </div>
  );
};

export default RolesCard;
