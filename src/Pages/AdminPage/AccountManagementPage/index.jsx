import React, { useState } from 'react';
import { BiDetail } from 'react-icons/bi';
import { MdOutlineNoAccounts, MdOutlineAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ModalChangeStatusAccount from '../../../Components/Shared/ModalChangeStatusAccount'

const AccountManagementPage = () => {
  const [data, setData] = useState([
    {
      fullName: "Nguyen Van An",
      role: "Provider",
      email: "annv_123@gmail.com",
      phone: "0123123122",
      activeStatus: true,
    },
    {
      fullName: "Dang Thi Thu Thao",
      role: "Customer",
      email: "dangthithuthao2209@gmail.com",
      phone: "0839124879",
      activeStatus: false,
    },
    {
      fullName: "Phan Anh Khoi",
      role: "Customer",
      email: "phananhkhoi983@gmail.com",
      phone: "0586492921",
      activeStatus: true,
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggleModal = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleConfirmAction = () => {
    if (selectedItem) {
      const index = data.findIndex((item) => item.fullName === selectedItem.fullName);

      if (index !== -1) {
        const updatedData = [...data];
        updatedData[index].activeStatus = !selectedItem.activeStatus;

        setData(updatedData);
      }

      handleCloseModal();
    }
  };

  // drop down
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);


  const toggleMenu = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div>
      <div className="flex items-center justify-end gap-2 p-4">
        {/* filter */}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded={isDropDownOpen}
              aria-haspopup="true"
            >
              Filter
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
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

          {isDropDownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">
                <Link to="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                  Role
                </Link>
                <Link to="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">
                  Phone
                </Link>
                <Link to="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
                  Status
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* search */}
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-50" placeholder="Search for users" />
        </div>
      </div>

      {/* table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Full name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="bg-white border-b hover:bg-emerald-100">
                <th className="px-6 py-4 text-gray-900">{item.fullName}</th>
                <td className="px-6 py-4 text-gray-900">{item.role}</td>
                <td className="px-6 py-4 text-gray-900">{item.email}</td>
                <td className="px-6 py-4 text-gray-900">{item.phone}</td>
                <td className={`px-6 py-4 ${item.activeStatus ? 'text-green-500' : 'text-red-500'}`}>
                  {item.activeStatus ? 'Active' : 'Inactive'}
                </td>
                <td className="px-6 py-4 text-gray-900">
                  <div className='flex gap-1'>
                    <button type='button' className="font-medium text-blue-600 hover:underline" title='Detail'>
                      <BiDetail />
                    </button>
                    {!item.activeStatus ? (
                      <button type='button'
                        className="font-medium text-blue-600 hover:underline"
                        title='Unblock'
                        onClick={() => handleToggleModal(item)}
                      >
                        <MdOutlineAccountCircle />
                      </button>
                    ) : (
                      <button type='button'
                        className="font-medium text-blue-600 hover:underline"
                        title='Block'
                        onClick={() => handleToggleModal(item)}
                      >
                        <MdOutlineNoAccounts />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedItem && (
        <ModalChangeStatusAccount
          body={selectedItem.activeStatus ? 'Block' : 'Unblock'}
          onClose={handleCloseModal}
          onAction={handleConfirmAction}
        />
      )}

    </div>
  );
};

export default AccountManagementPage;
