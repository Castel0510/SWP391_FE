import React, { useState } from 'react';

const OrderHistoryPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const data = [
    {
      id: '1',
      name: 'Make a birdhouse',
      dateOrder: '01/01/2023',
      dateComplete: '03/01/2023',
      detail: 'Craft your custom birdhouse: Build, paint to your garden sanctuary.',
      status: 'DONE',
    },
    {
      id: '2',
      name: 'Haven Retreat',
      dateOrder: '01/01/2023',
      dateComplete: null,
      detail: 'Explore birdwatching, nesting, and conservation in our tranquil avian sanctuary.',
      status: 'ONGOING',
    },
    {
      id: '3',
      name: 'Feathered Training',
      dateOrder: '01/01/2023',
      dateComplete: '03/01/2023',
      detail: 'Teach and bond with pet birds through professional training and enrichment.',
      status: 'DONE',
    },
    {
      id: '4',
      name: 'Feathered Picture',
      dateOrder: '01/01/2023',
      dateComplete: null,
      detail: 'Capture the beauty of birds in their natural habitat with avian photography services.',
      status: 'CANCEL',
      reason: 'reason cancel'
    },
  ];

  const filteredData = selectedStatus === 'ALL' ? data : data.filter((item) => item.status === selectedStatus);

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'ONGOING':
        return 'bg-yellow-300';
      case 'CANCEL':
        return 'bg-red-400';
      case 'DONE':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <>
      <div className="min-h-[320px] p-8 bg-white shadow-md rounded my-10 mx-auto">
        <div className="text-center font-bold">ORDER HISTORY</div>

        <div className="mt-5 mb-10">
          <button
            className={`bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded ml-5 ${
              selectedStatus === 'ALL' ? 'bg-gray-500' : ''
            }`}
            onClick={() => setSelectedStatus('ALL')}
          >
            All
          </button>
          <button
            className={`bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded ml-5 ${
              selectedStatus === 'ONGOING' ? 'bg-yellow-500' : ''
            }`}
            onClick={() => setSelectedStatus('ONGOING')}
          >
            ON GOING
          </button>
          <button
            className={`bg-red-400 hover:bg-red-500 text-black font-bold py-2 px-4 rounded ml-5 ${
              selectedStatus === 'CANCEL' ? 'bg-red-500' : ''
            }`}
            onClick={() => setSelectedStatus('CANCEL')}
          >
            CANCEL
          </button>
          <button
            className={`bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded ml-5 ${
              selectedStatus === 'DONE' ? 'bg-green-500' : ''
            }`}
            onClick={() => setSelectedStatus('DONE')}
          >
            DONE
          </button>
        </div>

        {filteredData.map((item, index) => (
          <div className="shadow-md rounded-md mt-5" key={index}>
            <div className={`p-4 rounded-md ${getStatusBackgroundColor(item.status)}`}>{item.name}</div>
            <div className="p-3 flex">
              <p className="font-bold pr-1">Date order: </p> {item.dateOrder}
            </div>
            <div className="p-3 flex">
              <p className="font-bold pr-1">Date completed: </p> {item.dateComplete}
            </div>
            <div className="p-3 flex leading-normal">
              <p className="font-bold pr-1">Detail: </p> {item.detail}
            </div>
            <div className="p-3 pb-6 flex">
              <p className="font-bold pr-1">Status: </p> {item.status}
              
            </div>
            {item.status === 'CANCEL' && (
                <div className="px-3 pb-6 flex">
                  <p className="font-bold pr-1">Reason: </p> {item.reason}
                </div>
              )}
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderHistoryPage;