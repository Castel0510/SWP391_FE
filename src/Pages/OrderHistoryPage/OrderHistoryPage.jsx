import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, ChevronUpDownIcon, EyeIcon } from '@heroicons/react/24/outline';
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import Pagination from '@mui/material/Pagination';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { getUser } from '../../Store/userSlice';
import { formatCurrency } from '../../Utils/string.helper';
import { Money, EyeOpen, TrashBin } from 'akar-icons';
import { toast } from 'react-toastify';
const OrderHistoryPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [table, setTable] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [totalPage, setTotalPage] = useState(0);
    const [selectedTab, setSelectedTab] = useState(0);
    const dataUser = useSelector((state) => state.user);
    const [searchValue, setSearchValue] = useState('');
    const [user, setUser] = useState(null);
    const router = useNavigate();

    useEffect(() => {
        setUser(getUser());
    }, [dataUser]);

    const itemLocal = JSON.parse(localStorage.getItem('userInfo'));
    const proId = itemLocal?.id;
    // console.log("proId: ", proId);

    const orderQuery = useQuery(
        ['order-ne', page, pageSize, selectedTab, searchValue, proId],
        async () => {
            const response = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/GetByCustomerId?id=${proId}`
            );

            const list = response.data.result.map((item) => {
                return item;
            });

            const filterList = list.filter((item) => {
                return item.bookingStatus === selectedTab;
            });

            setTotalPage(Math.ceil(filterList.length / pageSize));

            return filterList
                .sort((a, b) => {
                    return a.id - b.id > 0 ? -1 : 1;
                })
                .slice((page - 1) * pageSize, page * pageSize);
        },
        {
            enabled: proId !== null,
            initialData: [],
        }
    );

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

    const handleMakePaymentMutation = useMutation(
        (id) => axios.put(`https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/PayBooking?id=${id}`),
        {
            onSuccess: (data) => {
                orderQuery.refetch();
                if (data.data?.status === 'BadRequest') {
                    toast.error(data.data?.message);
                } else {
                    toast.success('Update status success');
                }
            },
            onError: (data) => {
                console.log(data);
                toast.error('Make payment failed!');
            },
        }
    );

    const handleCancelMutation = useMutation(
        (id) => axios.put(`https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/CancelBooking?id=${id}`),
        {
            onSuccess: () => {
                orderQuery.refetch();
                toast.success('Cancel successfully!');
            },
            onError: (data) => {
                console.log(data);
                toast.error('Cancel failed!');
            },
        }
    );

    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto">
                <Card className="w-full h-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 text-center">
                            <div>
                                <Typography variant="h2" color="blue-gray">
                                    Order History
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
                                            onClick={() => handleTabChange(status)}
                                        >
                                            &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                        </Tab>
                                    ))}
                                </TabsHeader>
                            </Tabs>
                        </div>
                    </CardHeader>
                    <CardBody className="px-0 overflow-auto">
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
                                {orderQuery.data.map(
                                    (
                                        { id, bookingStatus, serviceEndDate, serviceStartDate, bookingDetails },
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
                                                            {itemLocal?.customerName}
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

                                                <td className="flex items-center gap-2 w-[100px]">
                                                    <Tooltip content="View detail">
                                                        <IconButton variant="text">
                                                            <button
                                                                onClick={() => {
                                                                    router(`/order-detail/${id}`);
                                                                }}
                                                            >
                                                                <EyeOpen className="w-4 h-4" />
                                                            </button>
                                                        </IconButton>
                                                    </Tooltip>

                                                    {bookingStatus === 0 && (
                                                        <Tooltip content="Make payment">
                                                            <IconButton variant="text">
                                                                <button
                                                                    onClick={() => {
                                                                        const isConfirm = window.confirm(
                                                                            'Are you sure to make payment?'
                                                                        );
                                                                        if (!isConfirm) return;
                                                                        handleMakePaymentMutation.mutate(id);
                                                                    }}
                                                                >
                                                                    <Money className="w-4 h-4" />
                                                                </button>
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                    {bookingStatus === 0 && (
                                                        <Tooltip content="Make payment">
                                                            <IconButton variant="text" className="text-red-500">
                                                                <button
                                                                    onClick={() => {
                                                                        const isConfirm = window.confirm(
                                                                            'Are you sure to cancel this order?'
                                                                        );
                                                                        if (!isConfirm) return;

                                                                        handleCancelMutation.mutate(id);
                                                                    }}
                                                                >
                                                                    <TrashBin className="w-4 h-4" />
                                                                </button>
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
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
            </div>
        </div>
    );
};

export default OrderHistoryPage;
