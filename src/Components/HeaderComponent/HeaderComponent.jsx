import React from 'react'
import { NavLink } from 'react-router-dom';

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
    )
}

export default HeaderComponent