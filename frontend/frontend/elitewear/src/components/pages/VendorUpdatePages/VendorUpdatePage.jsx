import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAutContext";
import "./VendorUpdatePage.css";
import VendorNavBar from "../../common/vendorNavBar/VendorNavBar";
import Footer from "../../common/footer/Footer";
import { Navigate } from "react-router-dom";

const UpdateVendorProfile = () => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [NIC, setNIC] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [vendorId, setVendorId] = useState(null);
  const [password, setPassword] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { navigate } = Navigate();

  useEffect(() => {
    const fetchProfile = async () => {

      const currentUser = JSON.parse(localStorage.getItem("user"));
      const currentVendorId = currentUser?.vendor?.id;
      console.log(currentVendorId);
      

      const response = await fetch(
        `http://localhost:5133/api/vendor/${currentVendorId}`
      );
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setVendorId(json.vendorId)
        setPassword(json.passwordHash);
        setId(json.id);
        setEmail(json.email);
        setBirthday(json.birthday);
        setNIC(json.nic);
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
            vendorId,
            email,
            username,
            password,
            NIC,
            birthday,
          }),
        }
      );

      if (response.ok) {
        setError(null);
        setEmptyFields([]);
        alert("Update successful!");
        navigate("/vendor-profile"); 
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
    <div>
      <VendorNavBar/>
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
            type="email"
            id="email"
            className={`update-vendor-input ${
              emptyFields.includes("email") ? "error" : ""
            }`}
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />

          <label htmlFor="nic" className="update-vendor-label">
            NIC
          </label>
          <input
            type="text"
            id="NIC"
            className={`update-vendor-input ${
              emptyFields.includes("NIC") ? "error" : ""
            }`}
            onChange={(e) => setNIC(e.target.value)}
            value={NIC || ""}
          />

          <label htmlFor="birthday" className="update-vendor-label">
            Birthday
          </label>
          <input
            type="date"
            id="birthday"
            className={`update-vendor-input ${
              emptyFields.includes("birthday") ? "error" : ""
            }`}
            onChange={(e) => setBirthday(e.target.value)}
            value={birthday || ""}
          />

          <button className="update-vendor-submit-btn" type="submit">
            Update
          </button>

          {error && <div className="update-vendor-error-msg">{error}</div>}
        </form>
      </div>
    </div>
    

    </div>
  );
};

export default UpdateVendorProfile;
