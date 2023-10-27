import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { format, differenceInDays, addDays } from 'date-fns';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';



const BookingMedical = () => {
  const [items1, setItems1] = useState([]);
  const user = useSelector((state) => state.user.user);
  const navigateTo = useNavigate();
  let [totalPrice, setTotalPrice] = useState(0);
  const { itemId } = useParams();
  const userID = user.id;
  useEffect(() => {
    const apiUrl = "https://63692ab028cd16bba716cff0.mockapi.io/login";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setItems1(data);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setLoading(false);
      });
  }, []);



  const [selectedSize, setSelectedSize] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [checkInError, setCheckInError] = useState(null);
  const [checkOutError, setCheckOutError] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const selectedItem2 = items1.find((item) => item.id === parseInt(itemId, 10));


  const [formData, setFormData] = useState({
    userID: userID,
    username: '',
    serviceName: selectedItem2 ? selectedItem2.name : '',
    email: user.email,
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    note: '',
    price: '',
    size: selectedSize,
    selectedOption: selectedOption,
    selectedCheckboxes: [],
    category: selectedItem2 ? selectedItem2.category : '',
    status: 'WAIT', 
  });


  const options = [];

  if (selectedItem2) {
    selectedItem2.size.forEach((size) => {
      options.push({
        name: size.name,
        label: `${size.label}/${size.price}$/bird`,
        price: size.price,
      });
    });
  }

  const checkboxOptions = [];

  if (selectedItem2) {
    selectedItem2.selectedService.forEach((service) => {
      checkboxOptions.push({
        id: service.serviceID,
        label: `${service.label}/$${service.price}`,
        price: service.price,
      });
    });
  }

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
    console.log(`Input name: ${name}, Value: ${value}`);

    if (name === 'checkInDate') {
      const currentDate = new Date();
      const selectedDate = new Date(value);
      if (selectedDate < currentDate) {
        setCheckInError('Check-in date cannot be in the past');
      } else {
        setCheckInError(null);
        
        // Automatically set the checkout date to check-in date + 1 day
        const nextDay = addDays(selectedDate, 1);
        setFormData({
          ...formData,
          checkOutDate: format(nextDay, 'yyyy-MM-dd'),
        });
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
    console.log('inputchangedata', formData);
  }

  useEffect(() => {
    const calculateTotalPrice = () => {
      const checkInDate = new Date(formData.checkInDate);
      const checkOutDate = new Date(formData.checkOutDate);
      const days = differenceInDays(checkOutDate, checkInDate);

      if (selectedItem2) {
        const selectedItemPrice = parseFloat(selectedItem2.price);
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

    checkInDateInput.addEventListener('change', calculateTotalPrice);
    checkOutDateInput.addEventListener('change', calculateTotalPrice);

    return () => {
      checkInDateInput.removeEventListener('change', calculateTotalPrice);
      checkOutDateInput.removeEventListener('change', calculateTotalPrice);
    };
  }, [formData, selectedItem2, selectedOption, selectedCheckboxes, options, totalPrice]);

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

    const selectedItemPrice = parseFloat(selectedItem2.price);
    const selectedOptionPrice = parseFloat(selectedOption);
    const checkboxPrices = selectedCheckboxes.map((checkbox) => checkbox.price);
    const checkboxTotalPrice = checkboxPrices.reduce((acc, price) => acc + price, 0);
    const newTotalPrice = days * selectedItemPrice + days * selectedOptionPrice + checkboxTotalPrice;
    const newServiceName = selectedItem2.name;
    const categoryData = selectedItem2.category;
    const updatedFormData = {
      ...formData,
      price: newTotalPrice,
      selectedCheckboxes: selectedCheckboxes,
      serviceName: newServiceName,
      category: categoryData,
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
        toast.error('check your booking date again, must be in 30 day from checkindate');
        return;
      }
    const dataToSend = updatedFormData;

    if (checkInError || checkOutError) {
      
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
    console.log("dataToSend", dataToSend);
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

    const isConfirmed = window.confirm(`Are you sure you want to book ${selectedItem2.name}?`);

    if (isConfirmed) {
      handleSubmit(e);
    } else {

      console.log('Booking canceled');
    }
  };


  // console.log("formdata", formData);
  // console.log(userID);
  // console.log("selectedItem2", selectedItem2.category);

  return (
    <div className="form-container">
      {/* <div className="user-info">
        <h3>User Information:</h3>
        {user ? (
          <div>
            <p>Name: {user.fullName}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>User information not available</p>
        )}
      </div> */}
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
        <div className="form-input hidden">
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

export default BookingMedical;
