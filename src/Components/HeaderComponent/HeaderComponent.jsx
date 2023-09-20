import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { Container } from "reactstrap";
import logo from '../../Assets/Images/logo.png';
import './style.scss'

const HeaderComponent = () => {
    const navLinks = [
        {
            path: "/",
            display: "Home",
        },
        {
            path: "/service",
            display: "Service",
        },
        {
            path: "/login",
            display: "Log in",
        },
    ];

    return (
        <header className="header">
            <div className="main__navbar">
                <div className="container mx-auto flex items-center gap-1 justify-between">
                    <div className="logo">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="Logo" className="w-8 h-8" />
                            <h3 className="text-xl font-bold uppercase">Bird</h3>
                        </Link>
                    </div>

                    <div className="menu">
                        {navLinks.map((item, index) => (
                            <NavLink
                                to={item.path}
                                key={index}
                            >
                                {item.display}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </header>

    )
}

export default HeaderComponent