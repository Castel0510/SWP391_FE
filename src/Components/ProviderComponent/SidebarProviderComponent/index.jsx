import React, { useState } from 'react';
import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineFileDone, AiOutlineShop } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { MdPassword } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import './style.scss';

const SidebarProviderComponent = () => {
  const providerMenu = [
    {
      icon: <LuLayoutDashboard className='w-5 h-5' />,
      path: '/provider-dashboard',
      display: 'Dashboard',
    },
    {
      icon: <AiOutlineShop className='w-5 h-5' />,
      path: '/my-shop',
      display: 'My Shop',
    },
    {
      icon: <AiOutlineFileDone className='w-5 h-5' />,
      path: '/order',
      display: 'Order',
    },
    {
      icon: <ImProfile className='w-5 h-5' />,
      path: '/provider-profile',
      display: 'Profile',
    },
    {
      icon: <MdPassword className='w-5 h-5' />,
      path: '/provider-change-password',
      display: 'Change password',
    },
  ];

  const [activeLink, setActiveLink] = useState('/provider-dashboard');

  return (
    <aside
      id="default-sidebar"
      className="mt-20 fixed top-15 h-full left-0 z-10 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto sidebar-bg-color ring-1">
        <ul className="space-y-2 font-medium">
          {providerMenu.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={`flex items-center p-2 text-gray-900 rounded-lg group ${activeLink === item.path ? 'bg-emerald-500' : ''
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

export default SidebarProviderComponent;
