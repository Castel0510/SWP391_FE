import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { format, differenceInDays, addDays } from 'date-fns';
import { FaArrowLeft } from 'react-icons/fa';



const BookingPage = () => {
  const [items1, setItems1] = useState([]);

  const navigateTo = useNavigate();
  let [totalPrice, setTotalPrice] = useState(0);
  const { itemId } = useParams();
  const items = [
    {
     "id": 1,
     "name": "Feathered Friends Retreat",
     "category": "Hotel",
     "rating": 4,
     "phone": "092456711",
     "address": "Ho Chi Minh",
     "provider": "Provider B",
     "description": "Welcome to Feathered Haven Hotel, where your avian companions are treated like royalty. Our luxurious bird boarding services offer spacious cages, gourmet seed blends, and a serene environment. Rest assured, your feathered friends will chirp with joy during their stay.",
     "price": 120,
     "image": "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
     "videoId": "video_id_7"
    },
    {
     "id": 2,
     "name": "Avian Haven Boarding",
     "category": "Hotel",
     "rating": 5,
     "phone": "092456711",
     "address": "Ho Chi Minh",
     "provider": "Provider B",
     "description": "Nestled in the heart of nature, Winged Retreat Hotel provides a cozy sanctuary for your feathered friends. From canaries to cockatoos, we offer personalized accommodations, delicious treats, and daily serenades of soothing melodies.",
     "price": 120,
     "image": "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
     "videoId": "video_id_8"
    },
    {
     "id": 3,
     "name": "Tranquil Retreat Hotel",
     "category": "Hotel",
     "rating": 4.7,
     "phone": "0912345678",
     "address": "Ho Chi Minh",
     "provider": "Provider E",
     "description": "Experience tranquility at Tranquil Retreat Hotel, where comfort meets elegance. Our luxurious rooms, exceptional service, and breathtaking views of the river ensure a relaxing stay. Recharge and unwind with us.",
     "price": 180,
     "image": "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
     "videoId": "video_id_9"
    },
    {
     "id": 4,
     "name": "Royal Oasis Hotel",
     "category": "Hotel",
     "rating": 4.5,
     "phone": "0898765432",
     "address": "Ho Chi Minh",
     "provider": "Provider F",
     "description": "Indulge in regal luxury at Royal Oasis Hotel. Our opulent suites, gourmet dining, and impeccable service create an unforgettable experience. Embrace the royal treatment during your stay.",
     "price": 220,
     "image": "https://www.birds-online.de/wp-content/uploads/2019/02/Vogeldusche_Sascha_Bittner02.jpg",
     "videoId": "video_id_10"
    },
    {
     "id": 5,
     "name": "Wellness Plus Clinic",
     "category": "Hotel",
     "rating": 4.6,
     "phone": "0978901234",
     "address": "Ho Chi Minh",
     "provider": "Provider G",
     "description": "Prioritize your well-being at Wellness Plus Clinic. Our experienced medical team offers comprehensive healthcare services, from preventive care to specialized treatments. Your health is our priority.",
     "price": 90,
     "image": "https://hari.ca/wp-content/uploads/2015/01/2.2.5-Punishment-__-And-th.e-parrot-e1422554834274.jpg",
     "videoId": "video_id_11"
    },
    {
     "id": 6,
     "name": "Healing Haven Medical Center",
     "category": "Hotel",
     "rating": 4.8,
     "phone": "0965432109",
     "address": "Ha Noi",
     "provider": "Provider H",
     "description": "From canaries to cockatiels, Canary Cove Hotel welcomes all feathered guests. Our bird boarding services include flight time in our indoor aviary, songbird concerts, and a delicious menu to keep your birds content and entertained",
     "price": 110,
     "image": "https://www.allaboutbirds.org/news/wp-content/uploads/2020/04/SCranes-Vyn-1280x795.jpg",
     "videoId": "video_id_12"
    },
    {
     "id": 7,
     "name": "Sunset View Resort",
     "category": "Hotel",
     "rating": 4.9,
     "phone": "0912345678",
     "address": "Ha Noi",
     "provider": "Provider I",
     "description": "Enjoy breathtaking sunsets at Sunset View Resort. Our beachfront property offers luxurious accommodations, seaside dining, and a serene atmosphere for a perfect getaway.",
     "price": 250,
     "image": "data:image/jpeg;base64,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1y7T4eGjv09tlyKUesUsw1DnPJwwHAiwksST05HljrLhiMQKfttD+HbdO2qDWhdHVQbVVrPR2Jk2cuILBXyvrefoxnymjuK/pc7i6aexUtooQFq2Q3YawMwBAJ6EDr1wB5Yl/iBXtzUbZvNN5qJpSp6hwQt6EkqQeCAkKVXjkDpgeRkTrbRue46u2miwKdA6Cw1svpWycBQwBbGcD25OJd8TGIEFtVBXf7GKEA6bTKCR5g28hn3ZGR7xIfQj9FVaG2ytvR1121cQpLVMxHBxWBnARCuVHQN7My64mtuG31bjTwurFgBBGe6sOzKR1VveOsCv7fr69z8ccqq2Ho9KQ1jIU5crFKABgCQOLYPY5OOxlqmnt2107YjCmsJyOXPUs5xjLsxJY4AGST2m5AREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQP/9k=",
     "videoId": "video_id_13"
    },
    {
     "id": 8,
     "name": "Mountain Retreat Lodge",
     "category": "Hotel",
     "rating": 4.4,
     "phone": "0898765432",
     "address": "Ha Noi",
     "provider": "Provider J",
     "description": "Escape to the tranquil mountains at Mountain Retreat Lodge. Cozy cabins, hiking trails, and a rustic charm await you. Experience nature at its best.",
     "price": 170,
     "image": "data:image/jpeg;base64,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",
     "videoId": "video_id_14"
    },
    {
     "id": 9,
     "name": "Parrot Palace Lodging",
     "category": "Hotel",
     "rating": 4.7,
     "phone": "0978901234",
     "address": "Ho Chi Minh",
     "provider": "Provider K",
     "description": "Prioritize your health at VitalCare Medical Center. Our team of experts offers comprehensive medical services, from wellness check-ups to specialized treatments, to keep you in the best of health.",
     "price": 95,
     "image": "https://animalhouseofchicago.com/uploads/SiteAssets/7/images/birdroom.jpg",
     "videoId": "video_id_15"
    },
    {
     "id": 10,
     "name": "Winged Wanderers Inn",
     "category": "Hotel",
     "rating": 4.6,
     "phone": "0965432109",
     "address": "Ha Noi",
     "provider": "Provider L",
     "description": "Embark on a journey to holistic well-being at the Holistic Healing Hub. Our therapies, including yoga and mindfulness, promote physical, mental, and emotional balance.",
     "price": 120,
     "image": "https://images.squarespace-cdn.com/content/v1/54257575e4b062fcf1a30269/1499830232171-ZTAX6FDNY7NH82SI3NAG/Screen+Shot+2017-07-12+at+1.30.04+PM.png",
     "videoId": "video_id_16"
    },
    {
     "id": 11,
     "name": "Lakeside Lodge & Spa",
     "category": "Hotel",
     "rating": 4.5,
     "phone": "0912345678",
     "address": "Ho Chi Minh",
     "provider": "Provider M",
     "description": "Experience serenity at Lakeside Lodge & Spa. Our lakeside retreat offers luxurious rooms, spa treatments, and picturesque views for a peaceful escape.",
     "price": 200,
     "image": "https://lirp.cdn-website.com/024c5410/dms3rep/multi/opt/Bird+boarding-1920w.png",
     "videoId": "video_id_17"
    },
    {
     "id": 12,
     "name": "Urban Elegance Hotel",
     "category": "Hotel",
     "rating": 4.8,
     "phone": "0898765432",
     "address": "Ho Chi Minh",
     "provider": "Provider N",
     "description": "Discover the epitome of urban elegance at Urban Elegance Hotel. Our modern design, gourmet dining, and impeccable service cater to your sophisticated tastes.",
     "price": 230,
     "image": "https://www.exoticwings.ca/cdn/shop/products/BirdBoardingHeroImageSquare.jpg?v=1644617623",
     "videoId": "video_id_18"
    },
    {
     "id": 13,
     "name": "Feathered Elegance Spa",
     "category": "Spa",
     "rating": 4.5,
     "phone": "0901234567",
     "address": "Ho Chi Minh",
     "provider": "Provider O",
     "description": " At Feathered Elegance Spa, we pamper your avian friends with the utmost care and luxury. Our experienced staff provides a range of spa treatments, from feather fluffing to beak rejuvenation, ensuring your birds look and feel their best",
     "price": 110,
     "image": "https://www.example.com/holistic-institute-image.jpg",
     "videoId": "video_id_19"
    },
    {
     "id": 14,
     "name": "Harmony Medical Clinic",
     "category": "Medical",
     "rating": 4.6,
     "phone": "0912345678",
     "address": "456 Wellness Lane, Ho Chi Minh",
     "provider": "Provider P",
     "description": "Discover inner harmony at Harmony Medical Clinic. We specialize in holistic treatments, including meditation and yoga, to enhance your physical and mental health.",
     "price": 95,
     "image": "https://www.example.com/harmony-clinic-image.jpg",
     "videoId": "video_id_20"
    },
    {
     "id": 15,
     "name": "Serene Wellness Center",
     "category": "Medical",
     "rating": 4.7,
     "phone": "0923456789",
     "address": "101 Serenity Street, Ho Chi Minh",
     "provider": "Provider Q",
     "description": "Find serenity at Serene Wellness Center. Our comprehensive wellness services, including nutritional counseling and stress management, empower you to live a healthier life.",
     "price": 120,
     "image": "https://www.example.com/serene-center-image.jpg",
     "videoId": "video_id_21"
    },
    {
     "id": 16,
     "name": "Vital Life Clinic",
     "category": "Medical",
     "rating": 4.8,
     "phone": "0934567890",
     "address": "123 Vitality Road, Ho Chi Minh",
     "provider": "Provider R",
     "description": "Prioritize your vitality at Vital Life Clinic. Our team of healthcare professionals offers personalized wellness plans and advanced medical care to optimize your health.",
     "price": 100,
     "image": "https://www.example.com/vital-life-clinic-image.jpg",
     "videoId": "video_id_22"
    },
    {
     "id": 17,
     "name": "Mindful Healing Center",
     "category": "Medical",
     "rating": 4.6,
     "phone": "0945678901",
     "address": "456 Mindfulness Place, Ho Chi Minh",
     "provider": "Provider S",
     "description": "Embrace mindfulness at Mindful Healing Center. Our therapies, including mindfulness meditation and cognitive-behavioral therapy, promote mental well-being and emotional balance.",
     "price": 110,
     "image": "https://www.example.com/mindful-center-image.jpg",
     "videoId": "video_id_23"
    },
    {
     "id": 18,
     "name": "Wellness Connection Clinic",
     "category": "Medical",
     "rating": 4.7,
     "phone": "0956789012",
     "address": "789 Wellness Avenue, Ho Chi Minh",
     "provider": "Provider T",
     "description": "Connect with wellness at Wellness Connection Clinic. Our integrative approach combines traditional and alternative medicine to optimize your overall health.",
     "price": 105,
     "image": "https://www.example.com/wellness-connection-image.jpg",
     "videoId": "video_id_24"
    },
    {
     "id": 19,
     "name": "Renewed Health Center",
     "category": "Medical",
     "rating": 4.8,
     "phone": "0967890123",
     "address": "101 Renewal Road, Ho Chi Minh",
     "provider": "Provider U",
     "description": "Experience renewed health at Renewed Health Center. Our team offers regenerative therapies and personalized health plans to revitalize your life.",
     "price": 120,
     "image": "https://www.example.com/renewed-health-center-image.jpg",
     "videoId": "video_id_25"
    },
    {
     "id": 20,
     "name": "Integrative Healing Hub",
     "category": "Medical",
     "rating": 4.9,
     "phone": "0978901234",
     "address": "123 Integrative Lane, Ho Chi Minh",
     "provider": "Provider V",
     "description": "Explore integrative healing at Integrative Healing Hub. We combine traditional and complementary therapies to address the root causes of health issues.",
     "price": 115,
     "image": "https://www.example.com/integrative-hub-image.jpg",
     "videoId": "video_id_26"
    },
    {
     "id": 21,
     "name": "Inner Balance Clinic",
     "category": "Medical",
     "rating": 4.7,
     "phone": "0989012345",
     "address": "456 Balance Street, Ho Chi Minh",
     "provider": "Provider W",
     "description": "Find inner balance at Inner Balance Clinic. Our holistic treatments, including acupuncture and meditation, promote harmony in your body and mind.",
     "price": 110,
     "image": "https://www.example.com/inner-balance-image.jpg",
     "videoId": "video_id_27"
    },
    {
     "id": 22,
     "name": "Rejuvenate Spa & Wellness",
     "category": "Medical",
     "rating": 4.8,
     "phone": "0991234567",
     "address": "101 Revitalize Place, Ho Chi Minh",
     "provider": "Provider X",
     "description": "Rejuvenate your body and soul at Rejuvenate Spa & Wellness. Our spa offers a range of therapies, from massages to yoga, for a revitalizing experience.",
     "price": 120,
     "image": "https://www.example.com/rejuvenate-spa-image.jpg",
     "videoId": "video_id_28"
    },
    {
     "id": 23,
     "name": "Peaceful Path Wellness Center",
     "category": "Medical",
     "rating": 4.6,
     "phone": "0912345678",
     "address": "456 Peaceful Road, Ho Chi Minh",
     "provider": "Provider Y",
     "description": "Find your peaceful path to well-being at Peaceful Path Wellness Center. Our holistic approach, including mindfulness and nutrition counseling, empowers you to live a harmonious life.",
     "price": 95,
     "image": "https://www.example.com/peaceful-path-image.jpg",
     "videoId": "video_id_29"
    },
    {
     "id": 24,
     "name": "Eco Retreat Lodge",
     "category": "Hotel",
     "rating": 4.7,
     "phone": "0898765432",
     "address": "789 Eco Avenue, Ho Chi Minh",
     "provider": "Provider Z",
     "description": "Escape to nature at Eco Retreat Lodge. Our eco-friendly lodge offers sustainable accommodations, eco-tours, and a deep connection with the environment.",
     "price": 130,
     "image": "https://www.example.com/eco-retreat-image.jpg",
     "videoId": "video_id_30"
    }
   ]
 
  useEffect(() => {
    const apiUrl = "https://64b1e204062767bc4826ae59.mockapi.io/da/Product";
  
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
  
  console.log("2", items1);



  const [selectedSize, setSelectedSize] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [checkInError, setCheckInError] = useState(null);
  const [checkOutError, setCheckOutError] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const selectedItem = items.find((item) => item.id === parseInt(itemId, 10));


  const [formData, setFormData] = useState({
    username: '',
    serviceName: selectedItem.name,
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
    { name: 'small', label: 'SMALL SIZE(5-20cm)/'+  + selectedItem.price + '$/bird', price: selectedItem.price },
    { name: 'medium', label: 'MEDIUM SIZE (20-30cm)/(200$/bird)', price: 200 },
    { name: 'big', label: 'BIG SIZE(>30cm)/(300$/bird)', price: 300 },


  ];

  const checkboxOptions = [
    { id: '1', label: 'Nail($200)', price: 200 },
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

    checkInDateInput.addEventListener('change', calculateTotalPrice);
    checkOutDateInput.addEventListener('change', calculateTotalPrice);

    return () => {
      checkInDateInput.removeEventListener('change', calculateTotalPrice);
      checkOutDateInput.removeEventListener('change', calculateTotalPrice);
    };
  }, [formData, selectedItem, selectedOption, selectedCheckboxes, options, totalPrice]);

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
 
   const dataToSend  = updatedFormData;

    if (checkInError || checkOutError) {

      toast.error('Please check your information again');
      return;
    }

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
      <h2 className="form-header">Booking Form for: {selectedItem.name}</h2>
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

export default BookingPage;
