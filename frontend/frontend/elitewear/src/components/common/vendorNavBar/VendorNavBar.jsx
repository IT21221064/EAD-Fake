import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import "./VendorNavBar.css";
import { BiStoreAlt,BiUser, BiCollection, BiExit, BiBell } from "react-icons/bi";

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
                    <button className='vendor-nav-btn' onClick={() => navigate('/vendor-products')}><BiStoreAlt style={{ fontSize: '24px', marginRight: '8px', marginBottom: '1px' }}/>My Products</button>
                </li>
                <li>
                    <button className='vendor-nav-btn' onClick={() => navigate('/vendor-orders')}><BiCollection style={{ fontSize: '24px', marginRight: '8px', marginBottom: '1px' }}/>Orders</button>
                </li>
                <li>
                    <button className='vendor-nav-btn' onClick={() => navigate('/vendor-profile')}><BiUser style={{ fontSize: '24px', marginRight: '8px', marginBottom: '1px' }}/>Profile</button>
                </li>
                <li>
                    <button className='vendor-nav-btn' onClick={() => navigate('/vendor-notifications')}><BiBell style={{ fontSize: '24px', marginRight: '8px', marginBottom: '1px' }}/>Notifications</button>
                </li>
                <li>
                    <button className='vendor-nav-btn csr-logout-btn' onClick={handleLogoutClick}><BiExit style={{ fontSize: '24px', marginRight: '8px', marginBottom: '1px' }}/>LOGOUT</button>
                </li>
            </ul>
        </nav>
    );
};

export default VendorNavBar;
