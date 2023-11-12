import React, { useState, useEffect } from 'react';
import avatar_tmp from '../../Assets/Images/bird_hero.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser, getUserInfoInLocalStorage } from '../../Store/userSlice';
import { useQuery } from 'react-query';
import axios from 'axios';

const DropdownUser = (props) => {
    const { id, role, resetUser } = props;
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const [user, setUser] = useState('');
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const navigate = useNavigate();
    const customerDropdownList = [
        {
            path: '/profile',
            display: 'View profile',
        },
        {
            path: '/change-password-customer',
            display: 'Change password',
        },
        {
            path: '/wallet',
            display: 'Wallet',
        },
        {
            path: '/order',
            display: 'Order history',
        },
    ];

    const providerDropdownList = [
        {
            path: '/profile',
            display: 'View profile',
        },
    ];

    let dropdownItems = [];

    if (role === 'Customer') {
        dropdownItems = customerDropdownList;
    } else if (role === 'Provider') {
        dropdownItems = providerDropdownList;
    }

    const handleLogout = () => {
        resetUser(null);
        dispatch(logoutUser());
        navigate('/');
    };

    useEffect(() => {
        setUser(getUserInfoInLocalStorage());
    }, []);

    const providerQuery = useQuery(
        ['user', 'provider', user],
        async () => {
            const user = getUserInfoInLocalStorage();

            const getUser = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Provider/GetByProviderId?id=${user?.id}`
            );

            return getUser;
        },
        {
            enabled: !!user,
            refetchInterval: 3000,
            onSuccess: (data) => {
                setUser(data.data.result);
            },
        }
    );

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    onClick={toggleDropdown}
                    type="button"
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    <div className="w-8 h-8 p-1 border border-black border-solid rounded-full">
                        <img
                            src={
                                user?.user?.avatarURL && user?.user?.avatarURL !== 'string'
                                    ? user.user?.avatarURL
                                    : user?.user?.image && user?.user?.image !== 'string'
                                    ? user?.user?.image
                                    : avatar_tmp
                            }
                            alt="User Avatar"
                            className="w-full h-full rounded-full"
                        />
                    </div>

                    <p className="px-1">{user?.providerName || user?.user?.fullname || user?.fullname}</p>

                    <svg
                        className="w-5 h-5 -mr-1 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        {dropdownItems.map((item, key) => (
                            <NavLink
                                key={key}
                                to={item.path}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                                onClick={toggleDropdown}
                            >
                                {item.display}
                            </NavLink>
                        ))}

                        <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-2"
                            onClick={handleLogout}
                            style={{ width: '100%', textAlign: 'start' }}
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownUser;
