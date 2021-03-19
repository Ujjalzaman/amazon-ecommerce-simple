import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    return (
        <div className="Header">
            <img src={logo} alt=""/>
            <nav className="nav">
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">Manage</Link>
                <Link to="/contact-us">Contact Us</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
            </nav>
        </div>
    );
};

export default Header;