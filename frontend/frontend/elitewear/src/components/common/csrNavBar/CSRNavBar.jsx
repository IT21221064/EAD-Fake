import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import "./CSRNavBar.css"; // Assuming you'll create a new CSS file or reuse the existing one with different class names

const CSRNavBar = () => {
    const navigate = useNavigate(); // Initialize navigate
    const { logout } = useLogout();

    const handleLogoutClick = () => {
        logout();
        console.log("logout");
        navigate('/csr-login');
    };

    return (
        <nav className='csr-navcontainer'>
            
            <img src="./Logo(3).png" alt="Company Logo" className='csr-logo' />

            <ul className='csr-nav-links'>
                <li><button className='csr-nav-btn' onClick={() => navigate('/all-users')}>Users</button></li>
                <li><button className='csr-nav-btn' onClick={() => navigate('/csr-orders')}>Orders</button></li>
                <li><button className='csr-nav-btn csr-logout-btn' onClick={handleLogoutClick}>LOGOUT</button></li>
            </ul>
        </nav>
    );
}

export default CSRNavBar;
