import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookingPage = () => {
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
    

  const { itemId } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkInDate: '',
    checkOutDate: '',
  });

  useEffect(() => {
    const selectedItem = items.find((item) => item.id === parseInt(itemId, 10));

    if (selectedItem) {
      setFormData({ ...formData, name: selectedItem.name });
    }
  }, [itemId, items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <div>
      <h2>Booking Page for: {formData.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="checkInDate">Check-In Date:</label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="checkOutDate">Check-Out Date:</label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Book Now</button>
        </div>
      </form>
    </div>
  );
};

export default BookingPage;
