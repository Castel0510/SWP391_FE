import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../Assets/Images/logo.png';
import './style.scss';
import DropdownUser from '../DropdownUser'
import { useSelector } from 'react-redux';
import { getUser } from '../../Store/userSlice';

const HeaderComponent = () => {
    const [scrolled, setScrolled] = useState(false);
    const dataUser = useSelector((state) => state.user);
    const [user, setUser] = useState(null);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        setUser(getUser());

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [dataUser]);

    const defaultMenu = [
        {
            path: '/',
            display: 'Home',
        },
        {
            path: '/service',
            display: 'Service',
        },

    ];

    const customerMenu = [
        {
            path: '/',
            display: 'Home',
        },
        {
            path: '/service',
            display: 'Service',
        },
    ];

    const providerMenu = [
        {
            path: '/my-shop',
            display: 'My Shop',
        },
        {
            path: '/order',
            display: 'Order',
        },
        {
            path: '/dashboard',
            display: 'Dashboard',
        },
    ];

    let menu = [];
    if (user && user?.role === 'Customer') {
        menu = customerMenu;
    } else if (user && user?.role === 'Provider') {
        menu = providerMenu;
    } else {
        menu = defaultMenu
    }

    return (
        <header className="header">
            <div className={`main__navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container mx-auto flex items-center gap-1 justify-between">
                    <div className="logo">
                        <Link to="/" className="flex items-center">
                            <img src={logo} alt="Logo" className="w-8 h-8" />
                            <h3 className="text-xl font-bold uppercase">BirdLive</h3>
                        </Link>
                    </div>

                    <div className="menu">
                        {menu.map((item, index) => (
                            <NavLink className="menu_items" to={item.path} key={index}>
                                {item.display}
                            </NavLink>
                        ))}

                        {user === null
                            ?
                            <NavLink className="btn_login" to="/login">
                                Log in
                            </NavLink>
                            :
                            <>
                                <DropdownUser id={user?.Id} role={user?.role} resetUser={setUser} />
                            </>
                        }

                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;
