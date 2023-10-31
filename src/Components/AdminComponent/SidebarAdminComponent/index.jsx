import React, { useState } from 'react'
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdManageAccounts } from 'react-icons/md';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2';
import { GoReport } from 'react-icons/go';
import { NavLink } from 'react-router-dom';

const SidebarAdminComponent = () => {
  const providerMenu = [
    {
      icon: <LuLayoutDashboard className='w-5 h-5' />,
      path: '/admin-dashboard',
      display: 'Dashboard',
    },
    {
      icon: <MdManageAccounts className='w-5 h-5' />,
      path: '/admin-account-management',
      display: 'User Management',
    },
    {
      icon: <HiOutlineBuildingStorefront className='w-5 h-5' />,
      path: '/admin-provider-management',
      display: 'Provider Management',
    },
    {
      icon: <GoReport className='w-5 h-5' />,
      path: '/admin-report-management',
      display: 'Report Management',
    },
  ];

  const [activeLink, setActiveLink] = useState('/admin-dashboard');

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
}

export default SidebarAdminComponent