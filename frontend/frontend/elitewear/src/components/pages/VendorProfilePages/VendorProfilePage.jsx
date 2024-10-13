import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAutContext";
import "./VendorProfilePage.css";
import VendorNavBar from "../../common/vendorNavBar/VendorNavBar";
import Footer from "../../common/footer/Footer";

const VendorProfile = () => {
  const [User, setUser] = useState(null);
  const { user } = useAuthContext();



  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(
        `http://localhost:5133/api/vendor/${user.vendor.id}`
      );
      console.log(user);
      const json = await response.json();

      if (response.ok) {

        setUser(json);
      }
    };
    if (user != null) {
      fetchProfile();
    }
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Displays in local date format (e.g., MM/DD/YYYY or DD/MM/YYYY)
  };

  return (
    <>
    <div>
    <VendorNavBar/>
    <div className="vendor-profile-container">
    <div className="vendor-profile-inner-container">
      <div className="vendor-profile-header">
        <h1 className="vendor-profile-title">
          HELLO {User?.username ?? "null"}!
        </h1>
        <h2 className="vendor-profile-subtitle">
          Here are your profile details
        </h2>
      </div>

      <div className="vendor-profile-details">
      <h5 className="vendor-profile-info">
          <strong>Name:</strong> <span>{User?.username ?? "null"}</span>
      </h5>

      <p className="vendor-profile-info" >
         <strong>Email:</strong> <span>{User?.email ?? "null"}</span>
      </p>

      <p className="vendor-profile-info" style={{ marginTop: '11px'}}>
         <strong>NIC:</strong> <span>{User?.nic ?? "null"}</span>
      </p>

      <p className="vendor-profile-info" style={{ marginTop: '11px'}}>
      <strong>Birthday:</strong> <span>{User?.birthday ? formatDate(User.birthday) : "null"}</span>
      </p>

      </div>

      <div className="vendor-update-actions">
        <a href="/vendor-update">
          <button className="vendor-profile-btn">Edit Profile</button>
        </a>
      </div>
      <div className="vendor-review-actions">
        <a href="/userreview">
          <button className="vendor-profile-btn">My Reviews</button>
        </a>
      </div>
      </div>
      <br/>  <br/>  <br/> 
     
    </div>
    </div>
    </>
  );
};

export default VendorProfile;
