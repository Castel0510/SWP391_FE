import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { format, differenceInDays, addDays } from 'date-fns';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoInLocalStorage } from '../../Store/userSlice';
import { fetchServices } from '../../Store/serviceSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatCurrency } from '../../Utils/string.helper';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import * as Yup from 'yup';
import FormError from '../../Components/FormError/FormError';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    serviceStartDate: Yup.date().required('Check-in date is required'),
    serviceEndDate: Yup.date()
        .required('Check-out date is required')
        .min(Yup.ref('serviceStartDate'), 'Check-out date must be after check-in date'),
    totalPrice: Yup.number().required('Total price is required'),
    paymentURL: Yup.string().required('Payment URL is required'),
    customerId: Yup.number().required('Customer ID is required'),
    providerId: Yup.number().required('Provider ID is required'),
    bookingDetails: Yup.array().of(
        Yup.object().shape({
            birdServiceId: Yup.string().required('Service ID is required'),
            description: Yup.number().required('Description is required'),
            miniServiceId: Yup.number().required('Mini service ID is required'),
        })
    ),
});

const BookingHotel = () => {
    const methods = useForm(
        {
            defaultValues: {
                serviceStartDate: null,
                serviceEndDate: null,
                totalPrice: 0,
                paymentURL: '',
                customerId: null,
                providerId: null,
                bookingDetails: [
                    {
                        birdServiceId: null,
                        description: '',
                        miniServiceId: null,
                    },
                ],
            },
        },
        {
            resolver: yupResolver(validationSchema),
        }
    );
    const user = useSelector(getUserInfoInLocalStorage);

    useEffect(() => {
        methods.setValue('serviceStartDate', format(new Date(), 'yyyy-MM-dd'));
        methods.setValue('serviceEndDate', format(new Date(), 'yyyy-MM-dd'));
        methods.setValue('customerId', user.id);
    }, []);

    const { itemId } = useParams();
    const [selectPriceId, setSelectPriceId] = useState(null);
    const [selectMiniServiceId, setSelectMiniServiceId] = useState(null);
    const { data: services } = useQuery(
        ['services', itemId],
        async () => {
            const response = await fetch(
                `https://apis20231023230305.azurewebsites.net/api/BirdService/GetById?id=${itemId}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data.result;
        },
        {
            enabled: !!itemId,
            initialData: {},
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                methods.setValue('providerId', data.providerId);
                methods.setValue('bookingDetails[0].birdServiceId', data.id);
                setSelectPriceId(data.prices[0].id);
            },
        }
    );

    const selectPriceOption = useMemo(() => {
        if (services && services.prices) {
            return services.prices.map((priceItem) => {
                return {
                    name: priceItem.priceName,
                    label: `${priceItem.priceName} (${formatCurrency(priceItem.priceAmount)})`,
                    value: priceItem.id,
                };
            });
        }

        return [];
    }, [services]);

    const selectMiniServiceOption = useMemo(() => {
        if (services && services.miniServices) {
            return services.miniServices.map((miniServiceItem) => {
                return {
                    name: miniServiceItem.miniServiceName,
                    label: `${miniServiceItem.miniServiceName} (${formatCurrency(miniServiceItem.price)})`,
                    value: miniServiceItem.id,
                };
            });
        } else {
            return [];
        }
    }, [services]);

    const watchServiceStartDate = methods.watch('serviceStartDate');
    const watchServiceEndDate = methods.watch('serviceEndDate');
    const totalPrice = methods.watch('totalPrice');
    useEffect(() => {
        if (!services || !services.prices || !selectPriceId) {
            return;
        }

        const checkInDate = new Date(watchServiceStartDate);
        const checkOutDate = new Date(watchServiceEndDate);
        const days = differenceInDays(checkOutDate, checkInDate);
        const selectPrice = services.prices.find((item) => item.id == selectPriceId);

        let total = 0;
        total = total + days * selectPrice.priceAmount;
        if (total < 0) {
            total = 0;
        }
        if (selectMiniServiceId) {
            const selectMiniService = services.miniServices.find((item) => item.id == selectMiniServiceId);

            if (selectMiniService) {
                methods.setValue('bookingDetails[0].miniServiceId', selectMiniService.id);

                total = total + selectMiniService.price;
            } else {
                methods.setValue('bookingDetails[0].miniServiceId', null);
            }
        }

        methods.setValue('totalPrice', total);
    }, [services, watchServiceStartDate, watchServiceEndDate, selectPriceId, selectMiniServiceId]);

    const createBookingMutation = useMutation(async (input) => {
        return await axios.post(
            `https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/CreateBookingg?priceId=${selectPriceId}`,
            input
        );
    });

    const onSubmit = (data) => {
        const isConfirmed = window.confirm(`Are you sure you want to book ${services.birdServiceName}?`);

        if (!isConfirmed) {
            return;
        }

        createBookingMutation.mutate(data, {
            onSuccess: (data) => {
                console.log(data);
                toast.success('Booking Successful');
                // setTimeout(() => {
                //     navigateTo('/payment', { state: { dataToSend } });
                // }, 3000);
            },
        });
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(
    //                 `https://apis20231023230305.azurewebsites.net/api/BirdService/GetById?id=${itemId}`
    //             );
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch data');
    //             }
    //             const data = await response.json();
    //             setServices(data.result);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [itemId]);
    // console.log('====================================');
    // console.log(services);
    // console.log('====================================');

    // const [selectedSize, setSelectedSize] = useState('');
    // const [selectedOption, setSelectedOption] = useState('');
    // const [checkInError, setCheckInError] = useState(null);
    // const [checkOutError, setCheckOutError] = useState(null);

    // const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    // const selectedItem2 = items1.find((item) => item.id === parseInt(itemId, 10));
    // const [formData, setFormData] = useState({
    //     userID: userID,
    //     username: '',
    //     serviceName: selectedItem2 ? selectedItem2.name : '',
    //     email: user.email,
    //     phone: '',
    //     checkInDate: '',
    //     checkOutDate: '',
    //     note: '',
    //     price: '',
    //     size: selectedSize,
    //     selectedOption: selectedOption,
    //     selectedCheckboxes: [],
    //     category: selectedItem2 ? selectedItem2.category : '',
    //     status: 'WAIT',
    // });

    // const options = [];

    // if (selectedItem2) {
    //     selectedItem2.size.forEach((size) => {
    //         options.push({
    //             name: size.name,
    //             label: `${size.label}/${size.price}$/bird`,
    //             price: size.price,
    //         });
    //     });
    // }

    // const checkboxOptions = [];

    // if (selectedItem2) {
    //     selectedItem2.selectedService.forEach((service) => {
    //         checkboxOptions.push({
    //             id: service.serviceID,
    //             label: `${service.label}/$${service.price}`,
    //             price: service.price,
    //         });
    //     });
    // }

    // useEffect(() => {
    //     if (user && user.id) {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             userID: user.id,
    //         }));
    //     }
    // }, [user]);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(`Input name: ${name}, Value: ${value}`);

    //     if (name === 'checkInDate') {
    //         const currentDate = new Date();
    //         const selectedDate = new Date(value);
    //         if (selectedDate < currentDate) {
    //             setCheckInError('Check-in date cannot be in the past');
    //         } else {
    //             setCheckInError(null);
    //         }
    //     } else if (name === 'checkOutDate') {
    //         const currentDate = new Date();
    //         const selectedDate = new Date(value);
    //         if (selectedDate < currentDate) {
    //             setCheckOutError('Check-out date cannot be in the past');
    //         } else if (selectedDate > currentDate && selectedDate <= addDays(currentDate, 30)) {
    //             setCheckOutError(null);
    //         } else {
    //             setCheckOutError('Check-out date must be within 30 days from today');
    //         }
    //     }

    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    //     console.log('inputchangedata', formData);
    // };

    // useEffect(() => {
    //     const calculateTotalPrice = () => {
    //         const checkInDate = new Date(formData.checkInDate);
    //         const checkOutDate = new Date(formData.checkOutDate);
    //         const days = differenceInDays(checkOutDate, checkInDate);

    //         if (selectedItem2) {
    //             const selectedItemPrice = parseFloat(services.prices);
    //             const selectedOptionPrice = parseFloat(selectedOption);
    //             const checkboxPrices = selectedCheckboxes.map((checkbox) => parseFloat(checkbox.price));
    //             const checkboxTotalPrice = checkboxPrices.reduce((acc, price) => acc + price, 0);
    //             const newTotalPrice = days * selectedItemPrice + days * selectedOptionPrice + checkboxTotalPrice;
    //             setTotalPrice(newTotalPrice);

    //             const selectedSizeName = options.find((option) => option.price === selectedOption)?.name || '';
    //             setSelectedSize(selectedSizeName);
    //         }
    //     };

    //     calculateTotalPrice();

    //     const checkInDateInput = document.querySelector('[name="checkInDate"]');
    //     const checkOutDateInput = document.querySelector('[name="checkOutDate"]');

    //     checkInDateInput.addEventListener('change', calculateTotalPrice);
    //     checkOutDateInput.addEventListener('change', calculateTotalPrice);

    //     return () => {
    //         checkInDateInput.removeEventListener('change', calculateTotalPrice);
    //         checkOutDateInput.removeEventListener('change', calculateTotalPrice);
    //     };
    // }, [formData, selectedItem2, selectedOption, selectedCheckboxes, options, totalPrice]);

    // const isCheckOutAfterCheckIn = (checkInDate, checkOutDate) => {
    //     const checkIn = new Date(checkInDate);
    //     const checkOut = new Date(checkOutDate);
    //     return checkOut > checkIn;
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const checkInDate = new Date(formData.checkInDate);
    //     const checkOutDate = new Date(formData.checkOutDate);
    //     const days = differenceInDays(checkOutDate, checkInDate);

    //     const selectedItemPrice = parseFloat(services.prices);
    //     const selectedOptionPrice = parseFloat(selectedOption);
    //     const checkboxPrices = selectedCheckboxes.map((checkbox) => checkbox.price);
    //     const checkboxTotalPrice = checkboxPrices.reduce((acc, price) => acc + price, 0);
    //     const newTotalPrice = days * selectedItemPrice + days * selectedOptionPrice + checkboxTotalPrice;
    //     const newServiceName = services.birdServiceName;
    //     const categoryData = services.serviceCategory.categoryName;
    //     const updatedFormData = {
    //         ...formData,
    //         price: newTotalPrice,
    //         selectedCheckboxes: selectedCheckboxes,
    //         serviceName: newServiceName,
    //         category: categoryData,
    //     };
    //     if (
    //         !formData.username ||
    //         !formData.email ||
    //         !formData.phone ||
    //         !formData.checkInDate ||
    //         !formData.checkOutDate ||
    //         checkInError ||
    //         checkOutError ||
    //         !isCheckOutAfterCheckIn(formData.checkInDate, formData.checkOutDate)
    //     )
    //         if (!isCheckOutAfterCheckIn(formData.checkInDate, formData.checkOutDate)) {
    //             toast.error('check your booking date again, must be in 30 day from checkindate');
    //             return;
    //         }
    //     const dataToSend = updatedFormData;

    //     if (checkInError || checkOutError) {
    //         toast.error('Please check your information again');
    //         return;
    //     }
    //     console.log(categoryData);

    //     fetch('https://64b1e204062767bc4826ae59.mockapi.io/da/Nhasx', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(dataToSend),
    //     })f
    //         .then((response) => {
    //             if (response.ok) {
    //                 return response.json();
    //             }
    //             throw new Error('Network response was not ok.');
    //         })
    //         .then(() => {
    //             toast.success('Booking Successful', {
    //                 position: 'top-right',
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //             });

    //             setTimeout(() => {
    //                 navigateTo('/payment', { state: { dataToSend } });
    //             }, 3000);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             toast.error('Failed to submit the booking. Please try again later.');
    //         });
    //     console.log('dataToSend', dataToSend);
    // };

    // //SIZE

    // const handleDropdownChange = (e) => {
    //     const selectedValue = e.target.value;
    //     setSelectedOption(selectedValue);

    //     // Update other fields in the form as necessary
    //     setFormData({
    //         ...formData,
    //         selectedOption: selectedValue,
    //         size: selectedSize, // Update this as per your requirement
    //         // ... other form fields
    //     });
    // };
    // //checkbox

    // const handleCheckboxChange = (e) => {
    //     const { id, checked } = e.target;
    //     const checkbox = checkboxOptions.find((checkbox) => checkbox.id === id);

    //     if (checked) {
    //         setSelectedCheckboxes([...selectedCheckboxes, checkbox]);
    //     } else {
    //         setSelectedCheckboxes(selectedCheckboxes.filter((item) => item.id !== id));
    //     }
    // };

    // //Confirm popup
    // const handleConfirmation = (e) => {
    //     e.preventDefault();

    //     const isConfirmed = window.confirm(`Are you sure you want to book ${services.birdServiceName}?`);

    //     if (isConfirmed) {
    //         handleSubmit(e);
    //     } else {
    //         console.log('Booking canceled');
    //     }
    // };

    // console.log(formData);

    // console.log('====================================');
    // console.log(services.prices);
    // console.log('====================================');

    return (
        <FormProvider {...methods}>
            <div className="flex items-start justify-center min-h-screen py-10">
                <div className="flex flex-col w-full max-w-4xl gap-10">
                    <button onClick={() => window.history.back()} className="back-button">
                        <FaArrowLeft />
                    </button>
                    <h2 className="mb-2 font-bold">
                        Booking Form for: {services ? services.birdServiceName : 'No item selected'}
                    </h2>
                    <form className="grid grid-cols-3 gap-3" onSubmit={methods.handleSubmit(onSubmit)}>
                        {/* <div className="col-span-1">
                        <label htmlFor="username" className="block text-sm font-semibold leading-6 text-gray-900">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            // value={formData.username}
                            // onChange={handleInputChange}
                            {...methods.register('username', { required: true })}
                            required
                            className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div> */}
                        {/* <div className="col-span-1">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            // value={formData.email}
                            // onChange={handleInputChange}
                            {...methods.register('email', { required: true })}
                            required
                            className="block w-full rounded-md px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div> */}
                        {/* <div className="col-span-1">
                        <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                            Phone:
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            // value={formData.phone}
                            // onChange={handleInputChange}
                            {...register('phone', { required: true })}
                            required
                            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div> */}

                        <div className="col-span-1">
                            <label
                                htmlFor="serviceStartDate"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Check-In Date:
                            </label>
                            <input
                                type="date"
                                name="serviceStartDate"
                                id="serviceStartDate"
                                // value={formData.checkInDate}
                                // onChange={handleInputChange}
                                {...methods.register('serviceStartDate', { required: true })}
                                required
                                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <FormError name="serviceStartDate" />
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor="serviceEndDate"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Check-Out Date:
                            </label>
                            <input
                                type="date"
                                name="serviceEndDate"
                                id="serviceEndDate"
                                // value={formData.checkOutDate}
                                // onChange={handleInputChange}
                                {...methods.register('serviceEndDate', { required: true })}
                                required
                                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <FormError name="serviceEndDate" />
                        </div>

                        <div className="col-span-1">
                            <label
                                htmlFor="selectedOption"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Select an Option of your bird size:
                            </label>
                            <select
                                className="block w-full px-4 py-2.5 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={selectPriceId}
                                onChange={(e) => setSelectPriceId(e.target.value)}
                                required
                            >
                                {selectPriceOption.map((option) => (
                                    <option key={option.name} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor="selectedOption"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Mini Service:
                            </label>
                            <select
                                className="block w-full px-4 py-2.5 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={selectMiniServiceId}
                                onChange={(e) => setSelectMiniServiceId(e.target.value)}
                                required
                            >
                                <option value="">Select an option</option>
                                {selectMiniServiceOption.map((option) => {
                                    return (
                                        <option key={option.name} value={option.value}>
                                            {option.label}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="col-span-3">
                            <label
                                htmlFor="bookingDetails[0].description"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Note:
                            </label>
                            <div className="">
                                <textarea
                                    {...methods.register('bookingDetails[0].description', { required: true })}
                                    rows={4}
                                    id="bookingDetails[0].description"
                                    className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="w-full col-span-3 border-t border-gray-400 border-solid" />
                        <div className="flex flex-col items-end justify-end col-span-3 gap-10 mt-4">
                            <p className="flex justify-between w-full max-w-xs text-xl font-bold text-black rounded-lg">
                                <span>Total</span>
                                <span>{formatCurrency(totalPrice)}</span>
                            </p>
                            <button
                                type="submit"
                                className="px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm w-fit hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                    <ToastContainer />
                </div>
            </div>
        </FormProvider>
    );
};

export default BookingHotel;
