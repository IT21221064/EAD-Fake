import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAutContext";
import './AllUsers.css';
import AdminNavBar from "../../common/adminNavBar/AdminNavBar";
import CSRNavBar from "../../common/csrNavBar/CSRNavBar";
import { getUserRole } from "../../../hooks/useRoles";
import Footer from "../../common/footer/Footer";
import { BiHome, BiExit } from "react-icons/bi";

function AllUsers() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // Add state for filtering by status
  const userRole = getUserRole();

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

  // Filter users based on search query and selected status
  const filteredUsers = users.filter((user) => {
    const matchesSearchQuery = user.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "" || user.state === selectedStatus;

    return matchesSearchQuery && matchesStatus;
  });

  return (
    <div>
      {userRole === "admin0000" && <AdminNavBar />}
      {userRole === "csr" && <CSRNavBar />}
      <div className="all-users-container">
        <div className="users-container">
          <h1 className="user-list-title">User List</h1>

          {/* Search and Filter section */}
          <div className="user-search-filter-container">
            {/* Search bar */}
            <div className="user-search-bar">
              <input
                type="text"
                placeholder="Search users by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button>
                <i className="fa fa-search"></i>
              </button>
            </div>

            {/* Status filter */}
            <select
              className="user-status-dropdown"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Activated">Activated</option>
              <option value="Deactivated">Deactivated</option>
            </select>
          </div>

          {/* User Table */}
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
              {filteredUsers.map((user) => (
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
      </div>
      <Footer />
    </div>
  );
}

export default AllUsers;
