import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const BookingPage = () => {
  const [items1, setItems1] = useState([]);
  const user = useSelector((state) => state.user.user);
  const navigateTo = useNavigate();
  const { itemId } = useParams();
  const userID = user.id;
  const [checkInError, setCheckInError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://63692ab028cd16bba716cff0.mockapi.io/login";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setItems1(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const selectedItem2 = items1.find((item) => item.id === parseInt(itemId, 10));

  const [formData, setFormData] = useState({
    userID: userID,
    username: '',
    serviceName: selectedItem2 ? selectedItem2.name : '',
    email: user.email,
    phone: '',
    note: '',
    price: '',
    category: selectedItem2 ? selectedItem2.category : '',
 status: 'ONGOING', 

  });

  useEffect(() => {
    if (user && user.id) {
      setFormData((prevData) => ({
        ...prevData,
        userID: user.id,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkInDate = new Date(formData.checkInDate);
    const newServiceName = selectedItem2.name;
    const categoryData = selectedItem2.category;
    const updatedFormData = {
      ...formData,

      serviceName: newServiceName,
      category: categoryData,
    };

    const dataToSend = updatedFormData;

    if (checkInError) {
      
      toast.error('Please check your information again');
      return;
    }
    console.log(categoryData);

    

    fetch('https://64b1e204062767bc4826ae59.mockapi.io/da/Nhasx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(() => {
        toast.success('Booking Successful', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setTimeout(() => {
          navigateTo('/order');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Failed to submit the booking. Please try again later.');
      });
    console.log("dataToSend", updatedFormData);
  };



  return (
    <div className="form-container">
      <button onClick={() => window.history.back()} className="back-button">
        <FaArrowLeft />
      </button>
      <h2 className="form-header">Booking Form for: {selectedItem2 ? selectedItem2.name : 'No item selected'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Full Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="input-text"
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
            className="input-text"
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
            className="input-text"
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
            className="textarea"
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
            className="input-date"
          />
          {checkInError && <p className="error-message">{checkInError}</p>}
        </div>

        <div className="flex">
          <button
            type="submit"
            className="form-submit-button"
          >
            SUBMIT
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default BookingPage;
