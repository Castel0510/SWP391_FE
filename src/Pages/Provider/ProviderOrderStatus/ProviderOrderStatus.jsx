import { ChevronUpDownIcon, EyeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    IconButton,
    Input,
    Tab,
    Tabs,
    TabsHeader,
    Tooltip,
    Typography,
} from '@material-tailwind/react';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../Utils/string.helper';

const ProviderOrderStatus = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [table, setTable] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [selectedTab, setSelectedTab] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const itemLocal = JSON.parse(localStorage.getItem('userInfo'));
    const proId = itemLocal?.id;
    // console.log("proId: ", proId);

    const orderQuery = useQuery(
        ['order', page, pageSize, selectedTab, searchValue],
        async () => {
            const response = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/GetByProviderId?id=${proId}`
                // `https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/GetByProviderId?id=${proId}&pageIndex=0&pageSize=1000`
            );

            const list = await Promise.all(
                response.data.result

                    .filter((item) => item.providerId === proId)
                    .sort((a, b) => {
                        return a.id - b.id > 0 ? 1 : -1;
                    })
                    .map(async (item) => {
                        const customer = await axios.get(
                            `https://apis20231023230305.azurewebsites.net/api/Customer/GetByCustonerId?id=${item?.customerId}`
                        );
                        item.customer = customer.data.result;

                        return item;
                    })
            );

            const filterList = list
                .filter((item) => {
                    return item.bookingStatus === selectedTab;
                })
                .filter((item) => {
                    return item?.customer?.customerName.toLowerCase().includes(searchValue.toLowerCase());
                });

            setTotalPage(Math.ceil(filterList.length / pageSize));

            return filterList.slice((page - 1) * pageSize, page * pageSize);
        },
        {
            enabled: proId !== null,
            initialData: [],
            refetchInterval: 5000,
        }
    );

    // console.log("check: ", table);

    useEffect(() => {
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
    }, []);

    // console.log(">>>>", data);

    const TABS = [
        {
            label: 'Waiting',
            value: 'waiting',
            status: 0,
        },

        {
            label: 'Already paid',
            value: 'already paid',
            status: 1,
        },

        {
            label: 'Cancel',
            value: 'cancel',
            status: 2,
        },
    ];

    const TABLE_HEAD = ['Id', 'Customer', 'Total price', 'Status', ''];

    const handleTabChange = (value) => {
        setSelectedTab(value);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        bookQuery.refetch();
    };

    return (
        <>
            <Card className="w-full h-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 text-center">
                        <div>
                            <Typography variant="h2" color="blue-gray">
                                Order
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value={selectedTab} className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value, status }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        className="w-fit"
                                        onClick={() => {
                                            handleTabChange(status);
                                            setPage(1);
                                            setTotalPage(0);
                                        }}
                                    >
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search by name"
                                icon={<MagnifyingGlassIcon className="w-5 h-5" />}
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-0 overflow-scroll">
                    <table className="w-full mt-4 text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head}{' '}
                                            {index !== TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className="w-4 h-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orderQuery.data
                                .sort((a, b) => {
                                    return a.id - b.id > 0 ? -1 : 1;
                                })
                                .map(
                                    (
                                        {
                                            id,
                                            bookingStatus,
                                            customer,
                                            serviceEndDate,
                                            serviceStartDate,
                                            bookingDetails,
                                        },
                                        index
                                    ) => {
                                        const isLast = index === table.length - 1;
                                        const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                                        let chipColor = '';
                                        if (bookingStatus === 0) chipColor = 'yellow';
                                        else if (bookingStatus === 1) chipColor = 'green';
                                        else if (bookingStatus === 2) chipColor = 'red';
                                        else if (bookingStatus === 3) chipColor = 'green';
                                        else if (bookingStatus === 4) chipColor = 'blue';
                                        else if (bookingStatus === 5) chipColor = 'green';
                                        else if (bookingStatus === 6) chipColor = 'red';
                                        const totalPrice = bookingDetails.reduce((total, item) => {
                                            return total + item.price;
                                        }, 0);
                                        return (
                                            <tr key={id}>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {id}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {customer.customerName}
                                                        </Typography>
                                                        {/* <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {email}
                                                    </Typography> */}
                                                    </div>
                                                </td>
                                                {/* <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {phone}
                                                </Typography>
                                            </td> */}

                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {formatCurrency(totalPrice)}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Chip
                                                            variant="ghost"
                                                            size="sm"
                                                            color={chipColor}
                                                            value={
                                                                TABS.find((tab) => tab.status === bookingStatus)?.label
                                                            }
                                                        />
                                                    </div>
                                                </td>

                                                <td className={classes}>
                                                    <Tooltip content="View">
                                                        <IconButton variant="text">
                                                            <Link to={'/order-status-detail/' + id}>
                                                                <EyeIcon className="w-4 h-4" />
                                                            </Link>
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                        </tbody>
                    </table>
                </CardBody>
                <div>
                    {totalPage > 1 && (
                        <div className="col-span-3 mt-4">
                            <Pagination
                                count={totalPage}
                                page={page}
                                onChange={(e, value) => {
                                    setPage(value);
                                }}
                            />
                        </div>
                    )}
                </div>
            </Card>
        </>
    );
};

export default ProviderOrderStatus;
