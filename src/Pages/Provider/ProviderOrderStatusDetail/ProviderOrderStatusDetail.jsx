import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { GiDivergence } from 'react-icons/gi';
import moment from 'moment';
import { formatCurrency } from '../../../Utils/string.helper';

const ProviderOrderStatusDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [birdServiceData, setBirdServiceData] = useState(null);

    const location = useLocation();

    const { id = '' } = useParams();

    const service = useQuery(
        ['service', id],
        async () => {
            const service = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/GetBookingInfoById?id=${id}`
            );

            return service?.data?.result;
        },
        { refetchOnWindowFocus: false, refetchOnReconnect: false, enabled: !!id }
    );

    const customer = useQuery(
        ['customer'],
        async () => {
            const user = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Customer/GetByCustonerId?id=${service.data?.customerId}`
            );

            return user?.data?.result;
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            enabled: !!service.data?.customerId,
        }
    );

    useEffect(() => {
        if (service.data?.id) {
            axios
                .get(
                    `https://apis20231023230305.azurewebsites.net/api/BirdService/GetById?id=${service.data.bookingDetails[0].birdServiceId}`
                    // `https://apis20231023230305.azurewebsites.net/api/BirdService/GetById?id=51`
                )
                .then((res) => {
                    setBirdServiceData(res.data.result);
                });
        }
    }, [service.data?.id]);

    const TABLE_HEAD = ['Service title', 'Category', 'Service', 'Price', 'Amount', 'Total price'];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleButtonClick = () => {
        setIsModalOpen(true);
    };
    const handleAccept = () => {
        setIsModalOpen(false);
        // Show toastify success
        toast.success('Action completed!', {
            position: toast.POSITION.TOP_RIGHT,
        });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const statusOptions = [
        {
            label: 'Waiting',
            value: 'waiting',
            status: 0,
        },
        {
            label: 'Confirm',
            value: 'confirm',
            status: 1,
        },
        {
            label: 'Refuse',
            value: 'refuse',
            status: 2,
        },
        {
            label: 'Already paid',
            value: 'already paid',
            status: 3,
        },
        {
            label: 'On going',
            value: 'onGoing',
            status: 4,
        },

        {
            label: 'Done',
            value: 'done',
            status: 5,
        },
        {
            label: 'Cancel',
            value: 'cancel',
            status: 6,
        },
    ];

    const handleAcceptMutation = useMutation(
        () => axios.put(`https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/ConfirmBooking?id=${id}`),
        {
            onSuccess: (data) => {
                service.refetch();
                if (data.data?.status === 'BadRequest') {
                    toast.error(data.data?.message);
                } else {
                    toast.success('Confirm success!');
                }
            },
            onError: (data) => {
                toast.error('Confirm failed!');
            },
        }
    );

    const handleRefuseMutation = useMutation(
        () => axios.put(`https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/RefuseBooking?id=${id}`),
        {
            onSuccess: (data) => {
                service.refetch();
                if (data.data?.status === 'BadRequest') {
                    toast.error(data.data?.message);
                } else {
                    toast.success('Confirm success!');
                }
            },
            onError: (data) => {
                toast.error('Confirm failed!');
            },
        }
    );

    const handleCancelMutation = useMutation(
        () =>
            axios.put(
                `https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/UpdateStatusOrder?id=${id}&status=6`
            ),
        {
            onSuccess: (data) => {
                service.refetch();
                if (data.data?.status === 'BadRequest') {
                    toast.error(data.data?.message);
                } else {
                    toast.success('Confirm success!');
                }
            },
            onError: (data) => {
                toast.error('Confirm failed!');
            },
        }
    );

    const handleDoneMutation = useMutation(
        () =>
            axios.put(
                `https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/UpdateStatusOrder?id=${id}&status=5`
            ),
        {
            onSuccess: (data) => {
                service.refetch();
                if (data.data?.status === 'BadRequest') {
                    toast.error(data.data?.message);
                } else {
                    toast.success('Confirm success!');
                }
            },
            onError: (data) => {
                toast.error('Confirm failed!');
            },
        }
    );

    const handleOnGoingMutation = useMutation(
        () =>
            axios.put(
                `https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/UpdateStatusOrder?id=${id}&status=4`
            ),
        {
            onSuccess: (data) => {
                service.refetch();
                if (data.data?.status === 'BadRequest') {
                    toast.error(data.data?.message);
                } else {
                    toast.success('Confirm success!');
                }
            },
            onError: (data) => {
                toast.error('Confirm failed!');
            },
        }
    );

    const handleChangeStatusMutation = useMutation(
        (status) =>
            axios.put(
                `https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/ChangeBookingStatus?id=${id}&status=${status}`
            ),
        {
            onSuccess: () => {
                service.refetch();
                toast.success('Update status success!');
            },
            onError: (data) => {
                console.log(data);
                toast.error('Update status failed!');
            },
        }
    );

    if (isLoading) {
        return (
            <div role="status" className="flex justify-center items-center min-h-[600px]">
                <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <div className="p-4">
                <div className="mb-4 text-2xl font-bold ">
                    Order detail #{service.data?.id} - <span className="font-bold">{service.data?.bookingStatus}</span>
                </div>
                <div className="flex justify-center mb-10 gap-7">
                    <div className="flex-1 p-6 bg-white border border-green-300 border-solid rounded-md shadow-xl ">
                        <div className="flex flex-col gap-4">
                            <div className="text-lg font-semibold">Customer information</div>
                            <div>
                                <div className="text-sm font-semibold">Customer Name:</div>
                                <span className="text-lg">{customer?.data?.customerName}</span>
                            </div>
                            <div>
                                <div className="text-sm font-semibold">Customer Email:</div>
                                <span className="text-lg">{customer?.data?.user?.email}</span>
                            </div>
                            <div>
                                <div className="text-sm font-semibold">Customer Phone:</div>
                                <span className="text-lg">{customer?.data?.user?.phoneNumber}</span>
                            </div>
                            {/* <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Email: <span className='font-normal'>{filteredRows.email}</span>
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Phone: <span className='font-normal'>{filteredRows.phone}</span>
                                </Typography> */}
                        </div>
                    </div>
                    <div className="flex-1 p-6 bg-white border border-green-300 border-solid rounded-md shadow-xl ">
                        <div className="flex flex-col gap-4">
                            <div className="text-lg font-semibold">Booking information</div>
                            <div>
                                <div className="text-sm font-semibold">Created Time:</div>
                                <span className="text-lg">
                                    {moment(service.data?.createAt).format('DD/MM/YYYY HH:mm:ss')}
                                </span>
                            </div>
                            <div>
                                <div className="text-sm font-semibold">Start Date:</div>
                                <span className="text-lg">
                                    {moment(service.data?.serviceStartDate).format('DD/MM/YYYY HH:mm:ss')}
                                </span>
                            </div>
                            <div>
                                <div className="text-sm font-semibold">End Date:</div>
                                <span className="text-lg">
                                    {moment(service.data?.serviceEndDate).format('DD/MM/YYYY HH:mm:ss')}
                                </span>
                            </div>
                            {/* <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Email: <span className='font-normal'>{filteredRows.email}</span>
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Phone: <span className='font-normal'>{filteredRows.phone}</span>
                                </Typography> */}
                        </div>
                    </div>
                    <div className="flex-1 p-6 bg-white border border-green-300 border-solid rounded-md shadow-xl ">
                        <div className="flex flex-col gap-4">
                            <div className="text-lg font-semibold">Payment information</div>
                            <div>
                                <div className="text-sm font-semibold">Payment Methods:</div>
                                <span className="text-lg">Momo</span>
                            </div>
                            <div>
                                <div className="text-sm font-semibold">Payment Status:</div>
                                <span className="text-lg">
                                    {statusOptions.find((item) => item.status === service.data?.bookingStatus)?.label}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <Card className="mx-4">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-sm font-light text-left">
                                            <thead className="font-bold border-b border-blue-gray-900">
                                                <tr>
                                                    <th scope="col" className="px-6 py-4">
                                                        Service title
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Category
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Service
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Amount
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Total price
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {birdServiceData?.birdServiceName}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {birdServiceData?.serviceCategory?.categoryName}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap"></td>
                                                    <td className="px-8 py-4 whitespace-nowrap"></td>
                                                    <td className="px-10 py-4 whitespace-nowrap"></td>
                                                    <td className="px-10 py-4 whitespace-nowrap">
                                                        {formatCurrency(service.data?.totalPrice)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="flex justify-end mx-4 my-8 ">
                    {service.data?.bookingStatus === 0 && (
                        <>
                            <button
                                className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                                onClick={() => handleAcceptMutation.mutate()}
                            >
                                Accept
                            </button>
                            <button
                                className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                                onClick={() => handleRefuseMutation.mutate()}
                            >
                                Refuse
                            </button>
                        </>
                    )}
                    {service.data?.bookingStatus === 1 && (
                        <>
                            <button
                                className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                                onClick={() => handleCancelMutation.mutate()}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                    {service.data?.bookingStatus === 3 && (
                        <>
                            <button
                                className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                                onClick={() => handleOnGoingMutation.mutate()}
                            >
                                Next
                            </button>
                            <button
                                className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                                onClick={() => handleCancelMutation.mutate()}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                    {service.data?.bookingStatus === 4 && (
                        <>
                            <button
                                className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                                onClick={() => handleDoneMutation.mutate()}
                            >
                                Done
                            </button>
                            <button
                                className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                                onClick={() => handleCancelMutation.mutate()}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="modal-content">
                    <div className="text-center">
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                            <div className="relative w-auto max-w-3xl mx-auto my-6">
                                {/*content*/}
                                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                                        <h3 className="text-3xl font-semibold">
                                            {data.status === 'Waiting' && (
                                                <h3 className="text-3xl font-semibold">Accept order</h3>
                                            )}
                                            {data.status === 'Confirm' && (
                                                <h3 className="text-3xl font-semibold">Doing order</h3>
                                            )}
                                            {data.status === 'On going' && (
                                                <h3 className="text-3xl font-semibold">Done order</h3>
                                            )}
                                            {data.status === 'Waiting for payment' && (
                                                <h3 className="text-3xl font-semibold">Done order</h3>
                                            )}
                                            {data.status === 'Refuse' && (
                                                <h3 className="text-3xl font-semibold">Refuse order</h3>
                                            )}
                                        </h3>
                                        <button
                                            className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative flex-auto p-6">
                                        <p className="my-4 text-lg leading-relaxed text-blueGray-500">
                                            {data.status === 'Waiting' && <h3>Accept order #{data.id}?</h3>}
                                            {data.status === 'Confirm' && <h3>Doing order #{data.id}?</h3>}
                                            {data.status === 'On going' && <h3>Done order #{data.id}?</h3>}
                                            {data.status === 'Waiting for payment' && <h3>Done order #{data.id}?</h3>}
                                            {data.status === 'Refuse' && <h3>Refuse order #{data.id}?</h3>}
                                        </p>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                                        <button
                                            className="middle none center w-[120px] mr-6 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            onClick={handleAccept} // Add click event handler
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="middle none center w-[120px] rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            onClick={handleCancel} // Add click event handler
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default ProviderOrderStatusDetail;
