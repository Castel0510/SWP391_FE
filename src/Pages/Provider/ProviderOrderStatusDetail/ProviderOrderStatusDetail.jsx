
import React, { useState } from 'react'
import { useLocation } from 'react-router';
import {
    Card,
    CardBody,
    Typography,

} from "@material-tailwind/react";
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const ProviderOrderStatusDetail = () => {

    const location = useLocation();
    const filteredRows = location.state?.filteredRows;


    const TABLE_HEAD = ["Service title", "Category", "Service", "Price", "Amount", "Total price"];

    const TABLE_ROWS = filteredRows && filteredRows?.map(item => item)
    console.log("check", TABLE_ROWS.Amount);

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

    return (
        <>
            {filteredRows.map(item => (
                <>
                    <div className=' text-2xl'>
                        Order detail #{item.id} - <span className='font-bold'>{item.status}</span>
                    </div>
                    <div className='flex justify-center gap-7 mb-10'>
                        <Card className="mt-6 w-[450px] p-6 shadow-xl">
                            <CardBody>
                                <Typography variant="h6" color="blue-gray" className="mb-10">
                                    Customer information
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Customer Name: <span className='font-normal'>{item.customer}</span>
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Email: <span className='font-normal'>{item.email}</span>
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Phone: <span className='font-normal'>{item.phone}</span>
                                </Typography>
                            </CardBody>
                        </Card>
                        <Card className="mt-6 w-[450px] p-6 shadow-xl">
                            <CardBody>
                                <Typography variant="h6" color="blue-gray" className="mb-10">
                                    Time
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Date order: <span className='font-normal'>{item.dateOrder}</span>
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Date complete: <span className='font-normal'>{item.dateComplete}</span>
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
                                                        <td className="whitespace-nowrap px-6 py-4">{item.serviceTitle}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{item.category}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{item.service}</td>
                                                        <td className="whitespace-nowrap px-8 py-4">{item.price}$</td>
                                                        <td className="whitespace-nowrap px-10 py-4">{item.amount}</td>
                                                        <td className="whitespace-nowrap px-10 py-4">{item.totalPrice}$</td>
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
                        {item.status === 'Waiting' && (
                            <>
                                <button
                                    className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                    onClick={handleButtonClick}
                                >
                                    Accept
                                </button>
                                <button
                                    class="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                        {item.status === 'Confirm' && (
                            <>
                                <button
                                    className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                    onClick={handleButtonClick}
                                >
                                    Next
                                </button>
                                <button
                                    class="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                        {(item.status === 'On going' || item.status === 'Waiting for payment') && (
                            <>
                                <button
                                    className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                    onClick={handleButtonClick}
                                >
                                    Done
                                </button>
                                <button
                                    class="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                                                Modal Title
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
                                                Are you confirm to do that?
                                                Are you confirm to do that?
                                                Are you confirm to do that?
                                                Are you confirm to do that?
                                                Are you confirm to do that?
                                                Are you confirm to do that?
                                                Are you confirm to do that?
                                                Are you confirm to do that?
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
            ))}
        </>
    )
}

export default ProviderOrderStatusDetail