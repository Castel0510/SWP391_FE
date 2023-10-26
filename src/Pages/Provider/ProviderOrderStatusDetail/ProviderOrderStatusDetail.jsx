
import React from 'react'
import { useLocation } from 'react-router';
import {
    Card,
    CardBody,
    Typography,

} from "@material-tailwind/react";

const ProviderOrderStatusDetail = () => {

    const location = useLocation();
    const filteredRows = location.state?.filteredRows;


    const TABLE_HEAD = ["Service title", "Category", "Service", "Price", "Amount", "Total price"];

    const TABLE_ROWS = filteredRows && filteredRows?.map(item => item)
    console.log("check", TABLE_ROWS.Amount);

    if (!filteredRows) {
        return <div>Item not founds</div>;
    }

    return (
        <>
            {filteredRows.map(item => (
                <>
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
                                    Payment
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
                                                        <td className="whitespace-nowrap px-8 py-4">{item.price}</td>
                                                        <td className="whitespace-nowrap px-10 py-4">{item.amount}</td>
                                                        <td className="whitespace-nowrap px-10 py-4">{item.totalPrice}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                </>
            ))}
        </>
    )
}

export default ProviderOrderStatusDetail