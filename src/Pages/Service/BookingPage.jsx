import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {

  const navigateTo = useNavigate();

  const { itemId } = useParams();
  const items = [
    { id: 1, name: 'Hotel  1', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 100 },
    { id: 2, name: 'Hotel  2', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 3, name: 'Spa 1', description: 'Description for Spa1', price: 50 },
    { id: 4, name: 'Spa  2', description: 'Description for Spa 2', price: 70 },
    { id: 5, name: 'Medical 1', description: 'Description for Medical 1', price: 200 },
    { id: 6, name: 'Medical 2', description: 'Description for Medical2', price: 250 },
    { id: 7, name: 'Cage 1', description: 'Description for Cage1', price: 30 },
    { id: 8, name: 'Cage2', description: 'Description for Cage 2', price: 40 },
  ]


  const selectedItem = items.find((item) => item.id === parseInt(itemId, 10));

  const [formData, setFormData] = useState({
    username: '',
    name: selectedItem.name,
    email: '',
    checkInDate: '',
    checkOutDate: '',
    note: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    toast.success('Booking Successful', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setTimeout(() => {
      navigateTo('/service');
    }, 3000);

  };

  return (
    <div className="form-container">
      <h2 className="form-header">Booking Form for: {selectedItem.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label>UserName:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-input">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-input">
          <label>Check-In Date:</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-input">
          <label>Check-Out Date:</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-input">
          <label>Note:</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            required
            rows="4"
            cols="100"
          />
        </div>
        <div>
          <button type="submit" className="form-submit-button bg-green-500">
            Submit
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default BookingPage;
