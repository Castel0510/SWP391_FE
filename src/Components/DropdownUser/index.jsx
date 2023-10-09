import React, { useState } from 'react';
import avatar_tmp from '../../Assets/Images/bird_hero.png'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Store/userSlice';

const DropdownUser = (props) => {
    const { fullName, role, resetUser } = props
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();

    const customerDropdownList = [
        {
            path: '/withdraw-money',
            display: 'Withdraw money',
        },
        {
            path: '/profile',
            display: 'View profile',
        },
        {
            path: '/order',
            display: 'Order history',
        },
        {
            path: '/transaction',
            display: 'History transaction',
        },
    ]

    const providerDropdownList = [
        {
            path: '/withdraw-money',
            display: 'Withdraw money',
        },
        {
            path: '/profile',
            display: 'View profile',
        },
    ]

    let dropdownItems = [];


    if (role === 'Customer') {
        dropdownItems = customerDropdownList;
    } else if (role === 'Provider') {
        dropdownItems = providerDropdownList;
    }

    const handleLogout = () => {
        resetUser(null)
        dispatch(logoutUser());
        navigate('/')
    }

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    onClick={toggleDropdown}
                    type="button"
                    className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    <div className="w-8 h-8 rounded-full border border-solid border-black p-1">
                        <img
                            src={avatar_tmp}
                            alt="User Avatar"
                            className="w-full h-full rounded-full"
                        />
                    </div>

                    <p className="px-1">{fullName}</p>

                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
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
