import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { format, differenceInDays } from 'date-fns';

const BookingPage = () => {

  const navigateTo = useNavigate();
  let [totalPrice, setTotalPrice] = useState(0);
  const { itemId } = useParams();
  const items = [
    { id: 1, name: 'Hotel for bird', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider A', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 100 },
    { id: 2, name: 'Hotel for bird', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 3, name: 'Spa  2', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 4, name: 'Spa  2', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 5, name: 'Spa  2', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 6, name: 'Spa  2', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 7, name: 'Medical  2', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 8, name: 'Medical  2', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },

  ]


  const selectedItem = items.find((item) => item.id === parseInt(itemId, 10));

  const [formData, setFormData] = useState({
    username: '',
    name: selectedItem.name,
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    note: '',
    price: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };




  useEffect(() => {
    const calculateTotalPrice = () => {
      const checkInDate = new Date(formData.checkInDate);
      const checkOutDate = new Date(formData.checkOutDate);
      const days = differenceInDays(checkOutDate, checkInDate);

      if (selectedItem) {
        const newTotalPrice = days * selectedItem.price;
        setTotalPrice(newTotalPrice);
      }
    };

    calculateTotalPrice();

    const checkInDateInput = document.querySelector('[name="checkInDate"]');
    const checkOutDateInput = document.querySelector('[name="checkOutDate"]');

    checkInDateInput.addEventListener('change', calculateTotalPrice);
    checkOutDateInput.addEventListener('change', calculateTotalPrice);

    return () => {
      checkInDateInput.removeEventListener('change', calculateTotalPrice);
      checkOutDateInput.removeEventListener('change', calculateTotalPrice);
    };
  }, [formData, selectedItem]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const checkInDate = new Date(formData.checkInDate);
    const checkOutDate = new Date(formData.checkOutDate);
    const days = differenceInDays(checkOutDate, checkInDate);

    totalPrice = days * selectedItem.price;

    const updatedFormData = {
      ...formData,
      price: totalPrice,
    };

    console.log('Form Data:', updatedFormData);
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
      <button onClick={() => window.history.back()} className='button-goback'>Go Back</button>

      <h2 className="form-header">Booking Form for: {selectedItem.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Name</label>
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
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
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
            style={{ resize: "none" }}
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
        <div className="item-price">
          Total Price: {isNaN(totalPrice) ? '0' : `$${totalPrice}`}
        </div>
        <div className='flex'>
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
