import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import './style.scss';
import image from '../../Assets/Images/background_signin_signup.png';
import logo from '../../Assets/Images/logo.png';

const AuthenticationComponent = ({ children }) => {
  const location = useLocation();

  const navLinks = [
    {
      id: 1,
      display: 'Log in',
      path: '/login'
    },
    {
      id: 2,
      display: 'Register',
      path: '/register'
    },
    {
      id: 3,
      display: 'Home',
      path: '/'
    },
  ];

  return (
    <div className="background-authentication">
      <div className="container">
        <div className="container-left">
          <Link className="branch" to='/'>
            <img src={logo} alt="logo" />
            <p>Bird</p>
          </Link>

          {children}

        </div>

        <div className="container-right">
          <div className="menu">
            {navLinks.map((item, key) => (
              <div
                className={`navbar_item ${item.path === location.pathname ? 'navbar_active' : ''}`}
                key={key}
              >
                <Link to={item.path}>{item.display}</Link>
              </div>
            ))}
          </div>

          <div className="image">
            <img src={image} alt="Background" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationComponent;
