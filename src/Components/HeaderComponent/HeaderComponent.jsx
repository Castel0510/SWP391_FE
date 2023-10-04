import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../Assets/Images/logo.png';
import './style.scss';
import DropdownUser from '../DropdownUser'
import { useSelector } from 'react-redux';

function getUser() {
    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
    } else {
        user = null;
    }
    return user;
}

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
    }, []);

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
        {
            path: '/cart',
            display: 'Cart',
        },
    ];

    const providerMenu = [
        {
            path: '/your-shop',
            display: 'Your Shop',
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
    //vì chưa có api nên menu sẽ auto vào defaultMenu
    if (dataUser && dataUser?.user?.role === 'customer') {
        menu = customerMenu;
    } else if (dataUser && dataUser?.user?.role === 'provider') {
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
                            //tạm thời cho mặc định là role customer, sau có api sẽ chuyển thành user.role
                            // nếu muốn đăng nhập với role provider, thì thay customer thành provider
                            <>
                                {user?.role === 'customer' && (<div className='wallet'>20,000,000 VNĐ</div>)}
                                <DropdownUser fullName={user?.fullName} role="customer" resetUser={setUser} />
                            </>
                        }

                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;
