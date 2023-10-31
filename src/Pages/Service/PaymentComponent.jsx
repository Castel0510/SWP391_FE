import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentButton from './PaymentButton';

const PaymentComponent = () => {
  const location = useLocation();
  const dataToSend = location.state?.dataToSend;
  const navigate = useNavigate();

  const handleDoneClick = () => {
    const orderId = dataToSend.orderId; 
    const updatedOrder = { ...dataToSend, status: 'DONE' }; 
  
    fetch(`https://64b1e204062767bc4826ae59.mockapi.io/da/Nhasx/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedOrder),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to update order status');
      })
      .then(() => {
        navigate('/order');
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  };

  if (!dataToSend) {
    return (
      <div className="payment-container">
        <p>No form data found.</p>
      </div>
    );
  }

  const paymentMethod = dataToSend.paymentMethod;

  return (
    <div className="payment-container">
      <div className="payment-information">
        <h2>Payment Information</h2>
        <p>
          <strong>Full Name:</strong> {dataToSend.username}
        </p>
        <p>
          <strong>Email:</strong> {dataToSend.email}
        </p>
        <p>
          <strong>Phone:</strong> {dataToSend.phone}
        </p>
        <p>
          <strong>Note:</strong> {dataToSend.note}
        </p>
        <p>
          <strong>Check-In Date:</strong> {dataToSend.checkInDate}
        </p>
        <p>
          <strong>Check-Out Date:</strong> {dataToSend.checkOutDate}
        </p>
        <p>
          <strong>Selected Bird Size:</strong> {dataToSend.size}
        </p>
        <p>
          <strong>Total Price:</strong> ${dataToSend.price}
        </p>

        <div className="payment-method">
          {paymentMethod === 'credit_card' && (
            <div>
              <h3>Payment Method: Credit Card</h3>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div>
              <h3>Payment Method: PayPal</h3>
              <div>
                <label htmlFor="paypalEmail">PayPal Email:</label>
                <input
                  type="email"
                  id="paypalEmail"
                  name="paypalEmail"
                  value={dataToSend.paypalEmail}
                />
              </div>
              <div>
                <label htmlFor="paypalPassword">PayPal Password:</label>
                <input
                  type="password"
                  id="paypalPassword"
                  name="paypalPassword"
                  value={dataToSend.paypalPassword}
                />
              </div>
            </div>
          )}
        </div>

        <div className="done-button">
        <PaymentButton dataToSend={dataToSend} />
        <button onClick={handleDoneClick}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
