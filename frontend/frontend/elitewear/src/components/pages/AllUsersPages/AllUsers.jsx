import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAutContext";
import './AllUsers.css';
import AdminNavBar from "../../common/adminNavBar/AdminNavBar";
import CSRNavBar from "../../common/csrNavBar/CSRNavBar"; // Import CSR NavBar
import { getUserRole } from "../../../hooks/useRoles"; // Import the global state
import Footer from "../../common/footer/Footer";

function AllUsers() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const userRole = getUserRole(); // Get the current user role

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5133/api/user");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, []);

  const handleActivateUser = async (email) => {
    try {
      const response = await axios.put(
        `http://localhost:5133/api/user/activate/${email}`
      );

      if (response.status === 200) {
        alert("User activated successfully!");
        const updatedUsers = users.map((u) =>
          u.email === email ? { ...u, state: "Activated" } : u
        );
        setUsers(updatedUsers);
      } else {
        alert("Error activating user.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while activating the user.");
    }
  };

  return (
    <div>
      {userRole === "admin0000" && <AdminNavBar />}
      {userRole === "csr" && <CSRNavBar />}
      <div className="all-users-container">
        <h1 className="user-list-title">User List</h1>
        <table className="user-list-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>State</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="user-item">
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.state}</td>
                <td>
                  {user.state === "Pending" && (
                    <p className="user-status pending">User has registered</p>
                  )}
                  {user.state === "Activated" && (
                    <p className="user-status active">User is Active</p>
                  )}
                  {user.requested === "Yes" && (
                    <p className="user-status requested">
                      User has requested reactivation
                    </p>
                  )}
                </td>
                <td>
                  {user.state === "Pending" && (
                    <button
                      className="activate-button"
                      onClick={() => handleActivateUser(user.email)}
                    >
                      Activate
                    </button>
                  )}
                  {user.requested === "Yes" && (
                    <button
                      className="reactivate-button"
                      onClick={() => handleActivateUser(user.email)}
                    >
                      Reactivate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default AllUsers;
