import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserCard from "./UserCard";

const ViewUsers = () => {
  const params = useParams();
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      let res = await axios.post(
        `https://brainbucks.co.in/api/admin/get-users`,
        {
          token: localStorage.getItem("token"),
        }
      );
      console.log(res.data.data);
      setUsers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {users.map((el) => {
        <UserCard res={el} key={el.id} />;
      })}
    </div>
  );
};

export default ViewUsers;
