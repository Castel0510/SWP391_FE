import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import clsx from 'clsx';
import { LuEye } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const ReportPage = () => {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [totalPage, setTotalPage] = React.useState(0);
    const [search, setSearch] = React.useState('');

    const reportQuery = useQuery(
        ['report', search, page, pageSize],
        async () => {
            const res = await axios.get(
                'https://apis20231023230305.azurewebsites.net/api/Report/Get?pageIndex=0&pageSize=9999'
            );
            const reports = res.data.result.items.sort((a, b) => {
                return a.id < b.id ? 1 : -1;
            });

            setTotalPage(Math.ceil(reports.length / pageSize));
            return reports
                .filter((x) => x.reportName.toLowerCase().includes(search.toLowerCase()))
                .slice((page - 1) * pageSize, page * pageSize);
        },
        {
            initialData: [],
        }
    );

    const reportStatusOptions = [
        {
            label: 'Pending',
            value: 0,
        },
        {
            label: 'Processing',
            value: 1,
        },
        {
            label: 'Confirm',
            value: 2,
        },
        {
            label: 'Decline',
            value: 3,
        },
    ];

    return (
        <div className="max-w-4xl min-h-screen mx-auto">
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col">
                    <div className="flex items-center justify-end gap-2 p-4"></div>

                    {/* table */}
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Report Name
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
                                {reportQuery.data.map((item, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-emerald-100">
                                        <th className="px-6 py-4 text-gray-900">{item.id}</th>
                                        <td className="px-6 py-4 text-gray-900">{item.reportName}</td>
                                        <td
                                            className={clsx('px-6 py-4 ', {
                                                'text-red-500': item.reportStatus === 3,
                                                'text-green-500': item.reportStatus === 2,
                                                'text-blue-500': item.reportStatus === 1,
                                                'text-yellow-700': item.reportStatus === 0,
                                            })}
                                        >
                                            {reportStatusOptions.find((x) => x.value === item.reportStatus)?.label}
                                        </td>

                                        <td className="px-6 py-4 text-gray-900">
                                            <Link className="flex gap-1" to={`/report-detail/${item.id}`}>
                                                <LuEye className="w-5 h-5 text-gray-500" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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

export default ReportPage;
