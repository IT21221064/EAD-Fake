import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import "./VendorNavBar.css";

const VendorNavBar = () => {
    const navigate = useNavigate(); // Initialize navigate
    const { logout } = useLogout();

    const handleLogoutClick = () => {
        logout();
        console.log("logout");
        navigate('/vendor-login');
    };

    return (
        <nav className='vendor-navcontainer'>
           <img src="./Logo(3).png" alt="Company Logo" className='vendor-logo' />

            <ul className='vendor-nav-links'>
                <li>
                    <button className='vendor-nav-btn' onClick={() => navigate('/vendor-products')}>My Products</button>
                </li>
                <li>
                    <button className='vendor-nav-btn' onClick={() => navigate('/vendor-orders')}>Orders</button>
                </li>
                <li>
                    <button className='vendor-nav-btn' onClick={() => navigate('/vendor-profile')}>Profile</button>
                </li>
                <li>
                    <button className='vendor-nav-btn' onClick={() => navigate('/vendor-notifications')}>Notifications</button>
                </li>
                <li>
                    <button className='vendor-nav-btn csr-logout-btn' onClick={handleLogoutClick}>LOGOUT</button>
                </li>
            </ul>
        </nav>
    );
};

export default VendorNavBar;
