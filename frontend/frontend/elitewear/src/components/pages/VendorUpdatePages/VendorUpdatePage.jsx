import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAutContext";
import "./VendorUpdatePage.css";

const UpdateVendorProfile = () => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(
        `http://localhost:5133/api/vendor/${user.vendor.id}`
      );
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setPassword(json.passwordHash);
        setId(json.id);
        setEmail(json.email);
        setUsername(json.username);
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5133/api/vendor/${user.vendor.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            email,
            username,
            password,
          }),
        }
      );

      if (response.ok) {
        setError(null);
        setEmptyFields([]);
        console.log("Update successful!");
      } else {
        const json = await response.json();
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="update-vendor-profile-container">
      <div className="update-vendor-profile-form-wrapper">
        <form onSubmit={handleUpdate} className="update-vendor-profile-form">
          <label htmlFor="username" className="update-vendor-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`update-vendor-input ${
              emptyFields.includes("username") ? "error" : ""
            }`}
            onChange={(e) => setUsername(e.target.value)}
            value={username || ""}
          />

          <label htmlFor="email" className="update-vendor-label">
            Email
          </label>
          <input
            type="text"
            id="email"
            className={`update-vendor-input ${
              emptyFields.includes("email") ? "error" : ""
            }`}
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />

          <button className="update-vendor-submit-btn" type="submit">
            Update
          </button>

          {error && <div className="update-vendor-error-msg">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default UpdateVendorProfile;
