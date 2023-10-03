import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { format, differenceInDays, addDays } from 'date-fns';

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


  const options = [
    { name: 'small', label: '5-10(cm)(100/bird)', price: 100 },
    { name: 'medium', label: '10-30(cm)(200/bird)', price: 200 },
    { name: 'big', label: '>30(cm)(300/bird)', price: 300 },
  ];

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [checkInError, setCheckInError] = useState(null);
  const [checkOutError, setCheckOutError] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

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
    size: selectedSize,
    selectedOption: selectedOption,
    selectedCheckboxes: [],
  });


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
  
        // Find the corresponding size based on the selected option's price
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
  }, [formData, selectedItem, selectedOption, selectedCheckboxes, options]);
  


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
      navigateTo('/booking/1');
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
  const checkboxOptions = [
    { id: '1', label: 'Nail($201)', price: 201 },
    { id: '2', label: 'Wings($203)', price: 203 },
  ];


  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const checkbox = checkboxOptions.find((checkbox) => checkbox.id === id);

    if (checked) {
      setSelectedCheckboxes([...selectedCheckboxes, checkbox]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter((item) => item.id !== id));
    }
  };
  return (
    <div className="form-container">
  <button onClick={() => window.history.back()} className="btn-goback">Go Back</button>

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
    <div className="item-price">
      Total Price: {isNaN(totalPrice) ? '0' : `$${totalPrice}`}
    </div>
    <div className="flex">
      <button type="submit" className="form-submit-button bg-green-500">
        SUBMIT
      </button>
    </div>
  </form>

  <ToastContainer />
</div>

  );
};

export default BookingPage;
