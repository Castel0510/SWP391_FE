
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import {
    Card,
    CardBody,
    Typography,

} from "@material-tailwind/react";
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import axios from 'axios';

const ProviderOrderStatusDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const location = useLocation();
    const filteredRows = location?.state?.id;
    // console.log("id fil: ", filteredRows);




    const fetchData = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/GetBookingInfoById?id=${filteredRows}`);
            setData(response?.data?.result);

            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };
    // console.log(data);

    useEffect(() => {
        fetchData();
    }, []);


    const TABLE_HEAD = ["Service title", "Category", "Service", "Price", "Amount", "Total price"];

    

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


    if (!filteredRows) {
        return <div>Item not founds</div>;
    }

    if (isLoading) {
        return (
            <div role="status" className='flex justify-center items-center min-h-[600px]'>
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            
                <>
                    <div className=' text-2xl'>
                        Order detail #{data.id} - <span className='font-bold'>{data.serviceWorkingStatus}</span>
                    </div>
                    <div className='flex justify-center gap-7 mb-10'>
                        <Card className="mt-6 w-[450px] p-6 shadow-xl">
                            <CardBody>
                                <Typography variant="h6" color="blue-gray" className="mb-10">
                                    Customer information
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Customer Name: <span className='font-normal'>{data.customer}</span>
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Email: <span className='font-normal'>{data.email}</span>
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Phone: <span className='font-normal'>{data.phone}</span>
                                </Typography>
                            </CardBody>
                        </Card>
                        <Card className="mt-6 w-[450px] p-6 shadow-xl">
                            <CardBody>
                                <Typography variant="h6" color="blue-gray" className="mb-10">
                                    Time
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Date order: <span className='font-normal'>{data.dateOrder}</span>
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Date complete: <span className='font-normal'>{data.dateComplete}</span>
                                </Typography>
                            </CardBody>
                        </Card>
                        <Card className="mt-6 w-[450px] p-6 shadow-xl">
                            <CardBody>
                                <Typography variant="h6" color="blue-gray" className="mb-10">
                                    Payment
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Status: <span className='font-normal'>Not payment</span>
                                </Typography>

                            </CardBody>
                        </Card>
                    </div>
                    <div className=''>
                        <Card className='mx-4'>
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full text-left text-sm font-light">
                                                <thead className="border-b font-bold border-blue-gray-900">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-4">Service title</th>
                                                        <th scope="col" className="px-6 py-4">Category</th>
                                                        <th scope="col" className="px-6 py-4">Service</th>
                                                        <th scope="col" className="px-6 py-4">Price</th>
                                                        <th scope="col" className="px-6 py-4">Amount</th>
                                                        <th scope="col" className="px-6 py-4">Total price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b">
                                                        <td className="whitespace-nowrap px-6 py-4">{data.serviceTitle}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{data.category}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{data.service}</td>
                                                        <td className="whitespace-nowrap px-8 py-4">{data.price}$</td>
                                                        <td className="whitespace-nowrap px-10 py-4">{data.amount}</td>
                                                        <td className="whitespace-nowrap px-10 py-4">{data.totalPrice}$</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className='flex justify-end mx-4 my-8 '>
                        {data.status === 'Waiting' && (
                            <>
                                <button
                                    className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                    onClick={handleButtonClick}
                                >
                                    Accept
                                </button>
                                <button
                                    className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                        {data.status === 'Confirm' && (
                            <>
                                <button
                                    className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                    onClick={handleButtonClick}
                                >
                                    Next
                                </button>
                                <button
                                    className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                        {(data.status === 'On going' || data.status === 'Waiting for payment') && (
                            <>
                                <button
                                    className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                    onClick={handleButtonClick}
                                >
                                    Done
                                </button>
                                <button
                                    className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                >
                                    Cancel
                                </button>
                            </>
                        )}

                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        className="modal-content"
                    >
                        <div className="text-center">
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                                {data.status === 'Waiting' && (
                                                    <h3 className="text-3xl font-semibold">
                                                        Accept order
                                                    </h3>
                                                )}
                                                {data.status === 'Confirm' && (
                                                    <h3 className="text-3xl font-semibold">
                                                        Doing order
                                                    </h3>
                                                )}
                                                {data.status === 'On going' && (
                                                    <h3 className="text-3xl font-semibold">
                                                        Done order
                                                    </h3>
                                                )}
                                                {data.status === 'Waiting for payment' && (
                                                    <h3 className="text-3xl font-semibold">
                                                        Done order
                                                    </h3>
                                                )}
                                                {data.status === 'Refuse' && (
                                                    <h3 className="text-3xl font-semibold">
                                                        Refuse order
                                                    </h3>
                                                )}
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                {data.status === 'Waiting' && (
                                                    <h3>
                                                        Accept order #{data.id}?
                                                    </h3>
                                                )}
                                                {data.status === 'Confirm' && (
                                                    <h3>
                                                        Doing order #{data.id}?
                                                    </h3>
                                                )}
                                                {data.status === 'On going' && (
                                                    <h3>
                                                        Done order #{data.id}?
                                                    </h3>
                                                )}
                                                {data.status === 'Waiting for payment' && (
                                                    <h3>
                                                        Done order #{data.id}?
                                                    </h3>
                                                )}
                                                {data.status === 'Refuse' && (
                                                    <h3>
                                                        Refuse order #{data.id}?
                                                    </h3>
                                                )}
                                            </p>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
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
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

                        </div>
                    </Modal>

                </>
            
        </>
    )
}

export default ProviderOrderStatusDetail