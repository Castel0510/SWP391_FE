import axios from 'axios';
import React from 'react';
import { useQuery, useMutation } from 'react-query';
import Pagination from '@mui/material/Pagination';
import clsx from 'clsx';
import { LuEye } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import FormError from '../../Components/FormError/FormError';
import { Dialog } from '@headlessui/react';

const ReportDetailPage = () => {
    const { id = '' } = useParams();
    const [isUpdateModal, setIsUpdateModal] = React.useState(false);
    const formMethods = useForm({
        defaultValues: {
            reportStatus: 3,
            adminAnswer: '',
        },
    });

    const reportQuery = useQuery(['report', id], async () => {
        const res = await axios.get('https://apis20231023230305.azurewebsites.net/api/Report/GetById?id=' + id);
        return res.data.result;
    });

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

    const updateStatusOptions = [
        {
            label: 'Confirm',
            value: 2,
        },
        {
            label: 'Decline',
            value: 3,
        },
    ];

    const reportStatusMutation = useMutation(
        async (data) => {
            const res = await axios.put(
                `https://apis20231023230305.azurewebsites.net/api/Report/Update?id=${id}`,
                data
            );
            return res.data.result;
        },
        {
            onSuccess: () => {
                toast.success('Update status successfully');
                reportQuery.refetch();
            },
        }
    );

    const updateStatusMutation = useMutation(
        async (data) => {
            const res = await axios.put(
                `https://apis20231023230305.azurewebsites.net/api/Report/UpdateReportStatus?id=${id}&status=${data.status}`
            );
            return res.data.result;
        },
        {
            onSuccess: () => {
                toast.success('Update status successfully');
                reportQuery.refetch();
            },
        }
    );

    return (
        <>
            <div className="max-w-2xl min-h-screen py-8 mx-auto">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col max-w-xl p-4 border border-green-300 border-solid rounded-lg">
                            <div className={clsx('text-lg font-bold')}>Customer Information</div>
                            <div className="grid grid-cols-2">
                                <div className="text-sm font-medium">Name</div>
                                <div className="text-sm font-medium">{reportQuery.data?.user?.fullname}</div>
                                <div className="text-sm font-medium">Email</div>
                                <div className="text-sm font-medium">{reportQuery.data?.user?.email}</div>
                                <div className="text-sm font-medium">Phone</div>
                                <div className="text-sm font-medium">{reportQuery.data?.user?.phoneNumber}</div>
                            </div>
                        </div>
                        <div className="flex flex-col max-w-xl p-4 border border-green-300 border-solid rounded-lg">
                            <div className={clsx('text-lg font-bold')}>Report Information</div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm font-medium">Report Name</div>
                                <div className="text-sm font-medium">{reportQuery.data?.reportName}</div>
                                <div className="text-sm font-medium ">Report Status</div>
                                <div
                                    className={clsx('text-sm font-medium', {
                                        'text-yellow-700': reportQuery.data?.reportStatus === 0,
                                        'text-blue-500': reportQuery.data?.reportStatus === 1,
                                        'text-green-500': reportQuery.data?.reportStatus === 2,
                                        'text-red-500': reportQuery.data?.reportStatus === 3,
                                    })}
                                >
                                    {reportStatusOptions.find((x) => x.value === reportQuery.data?.reportStatus)?.label}
                                </div>
                                <div className="col-span-2 text-sm font-medium">Report Description</div>
                                <div className="col-span-2 text-sm font-medium">{reportQuery.data?.content}</div>
                                {reportQuery.data?.reportStatus === 2 ||
                                    (reportQuery.data?.reportStatus === 3 && (
                                        <>
                                            <div className="col-span-2 text-sm font-medium">Admin answer</div>
                                            <div className="col-span-2 text-sm font-medium">
                                                {reportQuery.data?.adminAnswer}
                                            </div>
                                        </>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportDetailPage;
