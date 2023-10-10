import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { format, differenceInDays, addDays } from 'date-fns';
import { FaArrowLeft } from 'react-icons/fa';



const BookingPage = () => {

  const navigateTo = useNavigate();
  let [totalPrice, setTotalPrice] = useState(0);
  const { itemId } = useParams();
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('https://64b1e204062767bc4826ae59.mockapi.io/da/Product')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); 



  const [selectedSize, setSelectedSize] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [checkInError, setCheckInError] = useState(null);
  const [checkOutError, setCheckOutError] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const selectedItem = items.find((item) => item.id === parseInt(itemId, 10));
  const category = selectedItem ? selectedItem.category : '';

  const [formData, setFormData] = useState({
    username: '',
    serviceName: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    note: '',
    price: '',
    size: selectedSize,
    selectedOption: selectedOption,
    selectedCheckboxes: [],
  });
  const options = [
    { name: 'small', label: `SMALL SIZE (5-20cm)/${selectedItem?.price}$/bird`, price: selectedItem?.price },
    { name: 'medium', label: 'MEDIUM SIZE (20-30cm)/(200$/bird)', price: 200 },
    { name: 'big', label: 'BIG SIZE (>30cm)/(300$/bird)', price: 300 },
  ];
  

  const checkboxOptions = [
    { id: '1', label: 'Nail', price: 200 },
    { id: '2', label: 'Beak Trimming($300)', price: 300 },
    { id: '3', label: 'Wing Clipping($400)', price: 400 },

    // { id: '4', label: 'Wings($500)', price: 500 },

  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'checkInDate') {
      const currentDate = new Date();
      const selectedDate = new Date(value);
      if (selectedDate < currentDate) {
        setCheckInError('Check-in date cannot be in the past');
      } else {
        setCheckInError(null);
      }
    } else if (name === 'checkOutDate') {
      const currentDate = new Date();
      const selectedDate = new Date(value);
      if (selectedDate < currentDate) {
        setCheckOutError('Check-out date cannot be in the past');
      } else if (selectedDate > currentDate && selectedDate <= addDays(currentDate, 30)) {
        setCheckOutError(null);
      } else {
        setCheckOutError('Check-out date must be within 30 days from today');
      }
    }

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
      const selectedItemPrice = parseFloat(selectedItem.price);
      const selectedOptionPrice = parseFloat(selectedOption);
      const checkboxPrices = selectedCheckboxes.map((checkbox) => parseFloat(checkbox.price));
      const checkboxTotalPrice = checkboxPrices.reduce((acc, price) => acc + price, 0);
      const newTotalPrice = days * selectedItemPrice + days * selectedOptionPrice + checkboxTotalPrice;
      setTotalPrice(newTotalPrice);

      const selectedSizeName = options.find((option) => option.price === selectedOption)?.name || '';
      setSelectedSize(selectedSizeName);
    }
  };

  calculateTotalPrice();

  const checkInDateInput = document.querySelector('[name="checkInDate"]');
  const checkOutDateInput = document.querySelector('[name="checkOutDate"]');

  if (checkInDateInput) {
    checkInDateInput.addEventListener('change', calculateTotalPrice);
  }
  if (checkOutDateInput) {
    checkOutDateInput.addEventListener('change', calculateTotalPrice);
  }

  return () => {
    if (checkInDateInput) {
      checkInDateInput.removeEventListener('change', calculateTotalPrice);
    }
    if (checkOutDateInput) {
      checkOutDateInput.removeEventListener('change', calculateTotalPrice);
    }
  };
}, [formData, selectedItem, selectedOption, selectedCheckboxes, options, totalPrice, selectedItem]);

  const isCheckOutAfterCheckIn = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    return checkOut > checkIn;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const checkInDate = new Date(formData.checkInDate);
    const checkOutDate = new Date(formData.checkOutDate);
    const days = differenceInDays(checkOutDate, checkInDate);

    const selectedItemPrice = parseFloat(selectedItem.price);
    const selectedOptionPrice = parseFloat(selectedOption);
    const checkboxPrices = selectedCheckboxes.map((checkbox) => checkbox.price);
    const checkboxTotalPrice = checkboxPrices.reduce((acc, price) => acc + price, 0);
    const newTotalPrice = days * selectedItemPrice + days * selectedOptionPrice + checkboxTotalPrice;

    const updatedFormData = {
      ...formData,
      price: newTotalPrice,
      selectedCheckboxes: selectedCheckboxes,
    };
    if (
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.checkInDate ||
      !formData.checkOutDate ||
      checkInError || 
      checkOutError ||
      !isCheckOutAfterCheckIn(formData.checkInDate, formData.checkOutDate)
      
    ) 
    
    if (!isCheckOutAfterCheckIn(formData.checkInDate, formData.checkOutDate)) {
      toast.error('date error');
      return; 
    }
 
   

    if (checkInError || checkOutError) {

      toast.error('Please check your information again');
      return;
    }

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
      navigateTo('/order');
    }, 3000);
  };

  //SIZE



  const handleDropdownChange = (e) => {
    const selectedValue = parseFloat(e.target.value);
    setSelectedOption(selectedValue);

    const selectedSizeName = options.find((option) => option.price === selectedValue)?.name || '';

    setSelectedSize(selectedSizeName);

    setFormData({
      ...formData,
      selectedOption: selectedValue,
      size: selectedSizeName,
    });
  };


  //checkbox



  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const checkbox = checkboxOptions.find((checkbox) => checkbox.id === id);

    if (checked) {
      setSelectedCheckboxes([...selectedCheckboxes, checkbox]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter((item) => item.id !== id));
    }
  };

  //Confirm popup
  const handleConfirmation = (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm(`Are you sure you want to book ${selectedItem.name}?`);

    if (isConfirmed) {
      handleSubmit(e);
    } else {

      console.log('Booking canceled');
    }
  };
  
  return (
    <div className="form-container">
      <button onClick={() => window.history.back()} className="back-button">
        <FaArrowLeft />
      </button>
      <h2 className="form-header"> Booking Form for: {selectedItem ? selectedItem.name : 'Item Not Found'}</h2>
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
            <div className="form-input">
              <label>Check-Out Date:</label>
              <input
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleInputChange}
                required
                className="input-date"
              />
              {checkOutError && <p className="error-message">{checkOutError}</p>}
            </div>
        {category === 'Hotel' && (
          <>
           
            <div className="form-input">
              <label>Select an Option of your bird size:</label>
              <select
                name="selectedOption"
                value={selectedOption}
                onChange={handleDropdownChange}
                required
                className="select-dropdown"
              >
                <option value="" disabled>Select an option</option>
                {options.map((option) => (
                  <option key={option.name} value={option.price}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        {category === 'Spa' && (
          <div className="form-input">
            
            <label>Select Additional Services:</label>
            {checkboxOptions.map((checkbox) => (
              <label key={checkbox.id} className="checkbox-label">
                <input
                  type="checkbox"
                  id={checkbox.id}
                  onChange={handleCheckboxChange}
                  checked={selectedCheckboxes.some((item) => item.id === checkbox.id)}
                  className="checkbox-input"
                />
                {checkbox.label}
              </label>
            ))}
          </div>
        )}
        <div className='item-price'>
          Total Price: {isNaN(totalPrice) ? '0' : `$${totalPrice}`}
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={(e) => handleConfirmation(e)} 
            className="form-submit-button bg-green-500"
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
