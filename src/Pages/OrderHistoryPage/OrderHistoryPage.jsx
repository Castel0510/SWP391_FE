import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import OrderDetailPage from './OrderDetailPage';
import { Navigate, useNavigate, } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getUserInfoInLocalStorage } from '../../Store/userSlice';

const OrderHistoryPage = () => {
  const user = useSelector(getUserInfoInLocalStorage);
  const navigate = useNavigate();
  const [isPaymentPopupOpen, setPaymentPopupOpen] = useState(false);

  const userID = user?.id;
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);



  useEffect(() => {
    const apiUrl = 'https://64b1e204062767bc4826ae59.mockapi.io/da/Nhasx';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((item) => item.userID === userID);
        setData(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [userID]);

  const filteredData = selectedStatus === 'ALL' ? data : data.filter((item) => item.status === selectedStatus);

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'WAIT':
        return 'bg-yellow-500';
      case 'ONGOING':
        return 'bg-yellow-300';
      case 'PAYMENT':
        return 'bg-blue-400';
      case 'CANCEL':
        return 'bg-red-400';
      case 'DONE':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  };
  //  console.log('id',selectedOrder.id);

  useEffect(() => {
    if (selectedOrder && selectedOrder.id) {
      navigate(`/order-detail/${selectedOrder.id}`);
    }
  }, [selectedOrder, navigate]);


  const handleOrderClick = (order) => {
    console.log("Order clicked:", order);
    setSelectedOrder(order);
  }

  const handlePaymentClick = () => {
    setPaymentPopupOpen(true);
  };

  const handleClosePaymentPopup = () => {
    setPaymentPopupOpen(false);
  };

  const PaymentPopup = () => {
    return (
      <div className="payment-popup">
        <button onClick={() => setPaymentPopupOpen(false)}>Close</button>
      </div>
    );
  };


  return (
    <>
      <button onClick={() => window.history.back()} className="back-button">
        <FaArrowLeft />
      </button>
      <div className="min-h-[320px] p-8 bg-white shadow-md rounded my-10 mx-auto">
        <div className="text-center font-bold">ORDER HISTORY</div>

        <div className="mt-5 mb-10">
          <button
            className={`bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded ml-5 ${selectedStatus === 'ALL' ? 'bg-gray-500' : ''
              }`}
            onClick={() => setSelectedStatus('ALL')}
          >
            All
          </button>
          <button
            className={`bg-yellow-500 hover:bg-yellow-900 text-black font-bold py-2 px-4 rounded ml-5 ${selectedStatus === 'ONGOING' ? 'bg-yellow-500' : ''
              }`}
            onClick={() => setSelectedStatus('WAIT')}
          >
            WAIT          </button>
          <button
            className={`bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded ml-5 ${selectedStatus === 'ONGOING' ? 'bg-yellow-500' : ''
              }`}
            onClick={() => setSelectedStatus('ONGOING')}
          >
            ON GOING
          </button>
          <button
            className={`bg-blue-400 hover:bg-blue-800 text-black font-bold py-2 px-4 rounded ml-5 ${selectedStatus === 'ONGOING' ? 'bg-yellow-500' : ''
              }`}
            onClick={() => setSelectedStatus('PAYMENT')}
          >
            PAYMENT
          </button>
          <button
            className={`bg-red-400 hover:bg-red-500 text-black font-bold py-2 px-4 rounded ml-5 ${selectedStatus === 'CANCEL' ? 'bg-red-500' : ''
              }`}
            onClick={() => setSelectedStatus('CANCEL')}
          >
            CANCEL
          </button>
          <button
            className={`bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded ml-5 ${selectedStatus === 'DONE' ? 'bg-green-500' : ''
              }`}
            onClick={() => setSelectedStatus('DONE')}
          >
            DONE
          </button>
        </div>
        {isPaymentPopupOpen && <PaymentPopup />}

        {filteredData.map((item, index) => (
          <div className="shadow-md rounded-md mt-5" key={index}>
            <div
              className={`p-4 rounded-md ${getStatusBackgroundColor(item.status)}`}
              onClick={() => handleOrderClick(item)}

            >
              {item.serviceName}
            </div>
            {/* {item.status === 'PAYMENT' && (
              <button
                className="bg-blue-400 hover:bg-blue-800 text-black font-bold py-2 px-4 rounded mt-3"
                onClick={handlePaymentClick}
              >
                Make Payment
              </button>
            )} */}
            {/* <div className="p-3 flex">
              <p className="font-bold pr-1">Date order: </p> {item.checkInDate}
            </div>
            <div className="p-3 flex">
              <p className="font-bold pr-1">Date completed: </p> {item.checkOutDate}
            </div>
            <div className="p-3 flex leading-normal">
              <p className="font-bold pr-1">Detail: </p> {item.note}
            </div>
            <div className="p-3 pb-6 flex">
              <p className="font-bold pr-1">Status: </p> {item.status}

            </div>
            {item.status === 'CANCEL' && (
              <div className="px-3 pb-6 flex">
                <p className="font-bold pr-1">Reason: </p> {item.reason}
                <p className="font-bold pr-1">ID: </p> {item.id}

              </div>
            )} */}
          </div>
        ))}
      </div>

    </>
  );
};

export default OrderHistoryPage;