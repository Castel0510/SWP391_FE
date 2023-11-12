import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../Assets/Images/logo.png';
import './style.scss';
import DropdownUser from '../DropdownUser';
import { useSelector } from 'react-redux';
import { getUser } from '../../Store/userSlice';
import { useQuery } from 'react-query';
import axios from 'axios';
import { formatCurrency } from '../../Utils/string.helper';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

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

    const cart = useQuery(
        ['cart', user?.Id],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Cart/GetByUserId?id=${user?.Id}`
            );

            return res.data.result;
        },
        {
            enabled: user?.Id !== null,
            refetchInterval: 3000,
        }
    );

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
        {
            path: '/list-provider',
            display: 'Provider',
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
        {
            path: '/list-provider',
            display: 'Provider',
        },
    ];

    const providerMenu = [
        {
            path: '/my-shop',
            display: 'My Shop',
        },
        {
            path: '/order-provider',
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
        menu = defaultMenu;
    }

    const userWallet = useQuery(
        ['user-Wallet', user?.Id],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Wallet/GetByUserId?id=${user?.Id}`
            );

            return res.data.result;
        },
        {
            enabled: user?.Id !== null,
            refetchInterval: 3000,
        }
    );

    return (
        <header className="header">
            <div className={`main__navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container flex items-center justify-between gap-1 mx-auto">
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

                        {user === null ? (
                            <NavLink className="btn_login" to="/login">
                                Log in
                            </NavLink>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/order-cart" className="relative mr-4 ">
                                    <div className="absolute flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 rounded-full left-3 bottom-3">
                                        {Boolean(cart.data) &&
                                            cart.data?.cartDetails.reduce((a, b) => a + b.quantity, 0)}
                                    </div>
                                    <ShoppingCartIcon className="w-6 h-6 text-green-600" />
                                </Link>
                                <div>
                                    {Boolean(userWallet.data) && (
                                        <div className="px-8 py-4 text-white bg-green-600 rounded-lg" to="/wallet">
                                            {formatCurrency(userWallet.data?.walletAmount)}
                                        </div>
                                    )}
                                </div>
                                <DropdownUser id={user?.Id} role={user?.role} resetUser={setUser} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;
