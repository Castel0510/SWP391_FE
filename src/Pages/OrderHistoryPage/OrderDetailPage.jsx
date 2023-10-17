import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <div className="order-detail">
      <h2>Order Details</h2>
      <p><strong>Name:</strong> {order.serviceName}</p>
      <p><strong>Date Order:</strong> {order.checkInDate}</p>
      <p><strong>Date Completed:</strong> {order.checkOutDate}</p>
      <p><strong>Detail:</strong> {order.note}</p>
      <p><strong>Status:</strong> {order.status}</p>
      {order.status === 'CANCEL' && (
        <p><strong>Reason for Cancellation:</strong> {order.reason}</p>
      )}
    </div>
  );
};

export default OrderDetailPage;
