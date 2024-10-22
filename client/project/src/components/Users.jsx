import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [data, setdata] = useState([]);
  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      console.log("signup successfull", response);
      setdata(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/users/${userId}`
      );
      console.log(response);
      getUsers()

      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div className="container">
        <h1>Users</h1>
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">First</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  
                    <tr key={user._id}>
                      <td>{user.firstName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button onClick={() => handleDelete(user._id)}>
                          Delete
                        </button>
                        <Link to={`/edit/${user._id}`}>Edit</Link>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
