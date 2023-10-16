import React, { useState } from 'react';
import { BiDetail } from 'react-icons/bi';
import { MdOutlineAccountCircle } from 'react-icons/md';
import ModalChangeStatusAccount from '../../../Components/Shared/ModalChangeStatusAccount';

const DataRow = ({ item, index, openModal, handleChangeStatus }) => {
  const handleClickAction = (action) => {
    openModal(action, () => handleChangeStatus(index));
  };

  return (
    <tr key={index} className="bg-white border-b hover:bg-emerald-100">
      <th className="px-6 py-4 text-gray-900">{item.fullName}</th>
      <td className="px-6 py-4 text-gray-900">{item.email}</td>
      <td className="px-6 py-4 text-gray-900">{item.phone}</td>
      <td className={`px-6 py-4 ${item.confirmStatus ? 'text-green-500' : 'text-red-500'}`}>
        {item.confirmStatus ? 'Confirm' : 'Unconfirm'}
      </td>
      <td className="px-6 py-4 text-gray-900">
        <div className="flex gap-1">
          <button type="button" className="font-medium text-blue-600 hover:underline" title="Detail">
            <BiDetail />
          </button>
          {!item.confirmStatus && (
            <button
              type="button"
              className="font-medium text-blue-600 hover:underline"
              title="Confirm"
              onClick={() => handleClickAction('CONFIRM')}
            >
              <MdOutlineAccountCircle />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

const ProviderManagementPage = () => {
  const [data, setData] = useState([
    {
      fullName: "Store A",
      email: "abc@gmail.com",
      phone: "0123238xxxx",
      confirmStatus: true,
    },
    {
      fullName: "Store B",
      email: "abc@gmail.com",
      phone: "0123238xxxx",
      confirmStatus: false,
    },
    {
      fullName: "Store C",
      email: "abc@gmail.com",
      phone: "0123238xxxx",
      confirmStatus: true,
    },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ body: '', onAction: null });

  const openModal = (body, onAction) => {
    setModalData({ body, onAction });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleChangeStatus = (index) => {
    const newData = [...data];
    newData[index].confirmStatus = true;
    setData(newData);
    closeModal();
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
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
                <Link href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">
                  Phone
                </Link>
                <Link href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
                  Status
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* search */}
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="table-search-users" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-50" placeholder="Search for users" />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Full name
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
              <DataRow
                key={index}
                item={item}
                index={index}
                openModal={openModal}
                handleChangeStatus={handleChangeStatus}
              />
            ))}
          </tbody>
        </table>
        {isModalVisible && (
          <ModalChangeStatusAccount onClose={closeModal} body={modalData.body} onAction={modalData.onAction} />
        )}
      </div>
    </div>
  );
};

export default ProviderManagementPage;