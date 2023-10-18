import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './OrderDetailPage.scss';
import { FaArrowLeft } from 'react-icons/fa';

const OrderDetailPage = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const apiUrl = `https://64b1e204062767bc4826ae59.mockapi.io/da/Nhasx/${orderId}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
      });
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`order-detail`}>
      <button onClick={() => window.history.back()} className="back-button">
        <FaArrowLeft />
      </button>
      <div className="title-container">
        <h2 className="title">Order Details</h2>
      </div>
      <p><strong>Name:</strong> {order.serviceName}</p>
      <p><strong>User Order Name:</strong> {order.username}</p>

      <p><strong>Date Order:</strong> {order.checkInDate}</p>
      <p><strong>Date Completed:</strong> {order.checkOutDate}</p>
      <p><strong>Detail:</strong> {order.note}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>Phone:</strong> {order.phone}</p>
      <p><strong>Reason:</strong> {order.reason}</p>
      <p><strong>Bird Size:</strong> {order.size.toUpperCase()}</p>
      <p><strong>Price:</strong> {order.price}</p>
      <p><strong>Status:</strong> {order.status}</p>

      {order.status === 'CANCEL' && (
        <p className="status-CANCEL"><strong>Reason for Cancellation:</strong> {order.reason}</p>
      )}
    </div>
  );
};

export default OrderDetailPage;
