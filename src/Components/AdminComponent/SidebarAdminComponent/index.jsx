import React, { useState } from 'react';
import { LuLayoutDashboard, LuBird } from 'react-icons/lu';
import { MdManageAccounts, MdCategory } from 'react-icons/md';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GoReport } from 'react-icons/go';
import { NavLink } from 'react-router-dom';

const SidebarAdminComponent = () => {
    const providerMenu = [
        {
            icon: <LuLayoutDashboard className="w-5 h-5" />,
            path: '/admin-dashboard',
            display: 'Dashboard',
        },
        {
            icon: <MdManageAccounts className="w-5 h-5" />,
            path: '/admin-account-management',
            display: 'User Management',
        },
        {
            icon: <MdCategory className="w-5 h-5" />,
            path: '/admin-service-category-management',
            display: 'Service Category Management',
        },
        {
            icon: <LuBird className="w-5 h-5" />,
            path: '/admin-bird-type-management',
            display: 'Bird Type Management',
        },
        {
            icon: <HiOutlineBuildingStorefront className="w-5 h-5" />,
            path: '/admin-provider-management',
            display: 'Provider Management',
        },
        {
            icon: <FaRegMoneyBillAlt className="w-5 h-5" />,
            path: '/admin-payment-management',
            display: 'Payment Management',
        },
        {
            icon: <GoReport className="w-5 h-5" />,
            path: '/admin-report-management',
            display: 'Report Management',
        },
    ];

    const [activeLink, setActiveLink] = useState('/admin-dashboard');

    return (
        <aside
            id="default-sidebar"
            className="fixed left-0 z-10 w-64 h-full h-screen mt-20 transition-transform -translate-x-full top-15 sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto sidebar-bg-color ring-1">
                <ul className="space-y-2 font-medium">
                    {providerMenu.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                className={`flex items-center p-2 text-gray-900 rounded-lg group ${
                                    activeLink === item.path ? 'bg-emerald-500' : ''
                                }`}
                                onClick={() => setActiveLink(item.path)}
                            >
                                {item.icon}
                                <span className="ml-3">{item.display}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default SidebarAdminComponent;
