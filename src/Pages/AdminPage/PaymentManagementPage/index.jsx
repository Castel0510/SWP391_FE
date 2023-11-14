import React, { useEffect, useState } from 'react';
import { BiDetail } from 'react-icons/bi';
import { MdOutlineNoAccounts } from 'react-icons/md';
import ModalChangeStatusAccount from '../../../Components/Shared/ModalChangeStatusAccount';
import { Link } from 'react-router-dom';
import { getAllProvider } from '../../../Store/managementSlice';
import { useDispatch } from 'react-redux';
import { truncateString } from '../../../Utils';
import { useQuery, useMutation } from 'react-query';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import clsx from 'clsx';
import { formatCurrency } from '../../../Utils/string.helper';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const DataRow = ({ item, index, onChange }) => {
    const bankList = [
        {
            id: 0,
            name: 'Vietcombank',
        },
        {
            id: 1,
            name: 'Techcombank',
        },
        {
            id: 2,
            name: 'Vietinbank',
        },
        {
            id: 3,
            name: 'BIDV',
        },
    ];

    const handleAccept = useMutation(
        async () => {
            return await axios.put(
                `https://apis20231023230305.azurewebsites.net/api/Transaction/AuthorizeTransaction?id=${item.id}&status=1`
            );
        },
        {
            onSuccess: (data) => {
                onChange();
                if (data.data?.status === 'BadRequest') {
                    toast.error(data.data?.message);
                } else {
                    toast.success('Accept success');
                }
            },

            onError: () => {
                toast.error('Accept fail');
            },
        }
    );

    const handleReject = useMutation(
        async () => {
            return await axios.put(
                `https://apis20231023230305.azurewebsites.net/api/Transaction/AuthorizeTransaction?id=${item.id}&status=2`
            );
        },
        {
            onSuccess: (data) => {
                onChange();
                if (data.data?.status === 'BadRequest') {
                    toast.error(data.data?.message);
                } else {
                    toast.success('Reject success');
                }
            },

            onError: () => {
                toast.error('Reject fail');
            },
        }
    );

    return (
        <tr key={index} className="bg-white border-b hover:bg-emerald-100">
            <th className="px-6 py-4 text-gray-900">{item.id}</th>
            <td
                className={clsx('px-6 py-4 text-gray-900 font-bold', {
                    'text-green-500': item.transactionType === 0,
                    'text-red-500': item.transactionType === 1,
                })}
            >
                {item.transactionType === 0 ? 'Deposit' : 'Withdraw'}
            </td>
            <td className="px-6 py-4 text-gray-900">{formatCurrency(item.amountTransaction)}</td>{' '}
            <td className="px-6 py-4 text-gray-900">{bankList.find((bank) => bank.id === item?.wallet?.bank)?.name}</td>
            <td className="px-6 py-4 text-gray-900">{item?.wallet?.bankNumber}</td>
            <td className="px-6 py-4 text-gray-900">{item?.wallet?.user?.username}</td>
            <td
                className={clsx(' text-gray-900 font-bold ', {
                    'text-yellow-700': item.transactionStatus === 0,
                    'text-green-700': item.transactionStatus === 1,
                    'text-red-700': item.transactionStatus === 2,
                })}
            >
                <div className="ml-5">
                    {clsx('', {
                        Waiting: item.transactionStatus === 0,
                        Approve: item.transactionStatus === 1,
                        Reject: item.transactionStatus === 2,
                    })}
                </div>
            </td>
            {/* <td className={`px-6 py-4 ${item.confirmStatus ? 'text-green-500' : 'text-red-500'}`}>
        {item.confirmStatus ? 'Confirm' : 'Unconfirm'}
      </td> */}
            <td className="w-32 px-6 py-2 text-gray-900">
                {item.transactionStatus === 0 && (
                    <>
                        <div className="inline-flex gap-1">
                            <button
                                onClick={() => handleAccept.mutate()}
                                type="button"
                                className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-md "
                                title="Detail"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleReject.mutate()}
                                type="button"
                                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md "
                                title="Detail"
                            >
                                Reject
                            </button>
                        </div>
                    </>
                )}
            </td>
        </tr>
    );
};

const PaymentManagementPage = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(0);

    const transactionQuery = useQuery(
        ['transaction', page, pageSize],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Transaction/Get?pageIndex=0&pageSize=99999`
            );

            setTotalPage(Math.ceil(res.data.result.items.length / pageSize));
            return res.data.result.items.sort((a, b) => b.id - a.id).slice((page - 1) * pageSize, page * pageSize);
        },
        {
            initialData: [],
        }
    );

    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center justify-end gap-2 p-4">
                    {/* filter */}

                    {/* search */}
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bank Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bank Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionQuery.data?.map((item, index) => (
                                <DataRow
                                    key={index}
                                    item={item}
                                    index={index}
                                    onChange={() => {
                                        transactionQuery.refetch();
                                    }}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
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
            </div>
        </div>
    );
};

export default PaymentManagementPage;
