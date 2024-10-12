import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import "./AdminNavBar.css";

const AdminNavBar = () => {
    const navigate = useNavigate(); // Initialize navigate
    const { logout } = useLogout();

    const handleLogoutClick = () => {
        logout();
        console.log("logout");
        navigate('/admin-login');
    };

    return (
        <nav className='admin-navbar'>
            <img src="./Logo(3).png" alt="Company Logo" className='admin-logo' />
            

            <ul className='admin-nav-links'>
                <li><button className='admin-nav-btn' onClick={() => navigate('/admin-products')}>Inventory</button></li>
                <li><button className='admin-nav-btn' onClick={() => navigate('/all-users')}>Users</button></li>
                <li><button className='admin-nav-btn' onClick={() => navigate('/csr-orders')}>Orders</button></li>
                <li><button className='admin-nav-btn' onClick={() => navigate('/all-vendors')}>Vendors</button></li>
                <li><button className='admin-logout-btn' onClick={handleLogoutClick}>LOGOUT</button></li>
            </ul>
        </nav>
    );
};

export default AdminNavBar;
