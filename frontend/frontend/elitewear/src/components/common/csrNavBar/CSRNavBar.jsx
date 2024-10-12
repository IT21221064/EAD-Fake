import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import "./CSRNavBar.css"; // Assuming you'll create a new CSS file or reuse the existing one with different class names
import { BiExit, BiUser, BiCollection } from "react-icons/bi";

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
                <li><button className='csr-nav-btn' onClick={() => navigate('/all-users')}><BiUser style={{ fontSize: '24px', marginRight: '8px', marginBottom: '1px' }}/>Users</button></li>
                <li><button className='csr-nav-btn' onClick={() => navigate('/csr-orders')}><BiCollection style={{ fontSize: '24px', marginRight: '8px', marginBottom: '1px' }}/>Orders</button></li>
                <li><button className='csr-nav-btn csr-logout-btn' onClick={handleLogoutClick}><BiExit style={{ fontSize: '24px', marginRight: '8px', marginBottom: '1px' }}/>LOGOUT</button></li>
            </ul>
        </nav>
    );
}

export default CSRNavBar;
