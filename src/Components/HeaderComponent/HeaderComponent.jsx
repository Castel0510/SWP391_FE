import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom';
import logo from '../../Assets/Images/logo.png';
import './style.scss'

const HeaderComponent = () => {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

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
            <div className={`main__navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container mx-auto flex items-center gap-1 justify-between">
                    <div className="logo">
                        <Link to="/" className="flex items-center">
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