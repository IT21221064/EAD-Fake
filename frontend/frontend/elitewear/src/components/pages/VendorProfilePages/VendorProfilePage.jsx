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

  return (
    <>
    <div>
    <VendorNavBar/>
    <div className="vendor-profile-container">
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

      <p className="vendor-profile-info">
         <strong>Email:</strong> <span>{User?.email ?? "null"}</span>
      </p>

      </div>

      <div className="vendor-profile-actions">
        <a href="/UpdateProfile">
          <button className="vendor-profile-btn">Edit Profile</button>
        </a>
        <a href="/userreview">
          <button className="vendor-profile-btn">My Reviews</button>
        </a>
      </div>
      </div>
      <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>
      <Footer />
    </div>
   
    </>
  );
};

export default VendorProfile;
