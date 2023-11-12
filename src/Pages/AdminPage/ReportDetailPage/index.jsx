import axios from 'axios';
import React from 'react';
import { useQuery, useMutation } from 'react-query';
import Pagination from '@mui/material/Pagination';
import clsx from 'clsx';
import { LuEye } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import FormError from '../../../Components/FormError/FormError';
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
            <Dialog open={isUpdateModal} onClose={() => setIsUpdateModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
                    <Dialog.Panel className="w-full max-w-md p-4 mx-auto bg-white rounded">
                        <Dialog.Title className="text-lg font-bold">Update Report</Dialog.Title>
                        <FormProvider {...formMethods}>
                            <form
                                className="flex flex-col gap-4 mt-2"
                                onSubmit={formMethods.handleSubmit((data) => {
                                    reportStatusMutation.mutate({
                                        ...data,
                                        reportStatus: parseInt(data?.reportStatus),
                                    });
                                })}
                            >
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="first-name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Admin Answer
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...formMethods.register('adminAnswer')}
                                        ></textarea>
                                    </div>
                                    <FormError name="adminAnswer" />
                                </div>
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="first-name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Report Status
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...formMethods.register('reportStatus')}
                                        >
                                            {updateStatusOptions.map((item, index) => (
                                                <option key={index} value={item.value}>
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <FormError name="reportStatus" />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => setIsUpdateModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white duration-300 bg-blue-600 rounded-md text-whit hover:bg-blue-700"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    </Dialog.Panel>
                </div>
            </Dialog>
            <div>
                <div className="flex flex-col justify-between h-full">
                    <div className="mb-4">
                        <div className="flex items-center justify-end gap-2 ">
                            {reportQuery.data?.reportStatus === 0 && (
                                <button
                                    className={clsx(
                                        'px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
                                    )}
                                    onClick={() => {
                                        updateStatusMutation.mutate({ status: 1 });
                                    }}
                                >
                                    Proceed
                                </button>
                            )}
                            {reportQuery.data?.reportStatus === 1 && (
                                <button
                                    className={clsx(
                                        'px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
                                    )}
                                    onClick={() => {
                                        setIsUpdateModal(true);
                                    }}
                                >
                                    Update Answer
                                </button>
                            )}
                        </div>
                    </div>
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
                                <div className="col-span-2 text-sm font-medium">Admin answer</div>
                                <div className="col-span-2 text-sm font-medium">{reportQuery.data?.adminAnswer}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportDetailPage;
