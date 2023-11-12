import axios from 'axios';
import React, { useState } from 'react';
import { BiDetail, BiTrash, BiEditAlt } from 'react-icons/bi';
import { LuBird } from 'react-icons/lu';
import { useQuery, useMutation } from 'react-query';
import { birdSizeOptions } from '../../../models/bird';
import { Dialog } from '@headlessui/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormError from '../../../Components/FormError/FormError';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Pagination from '@mui/material/Pagination';

const BirdTypeManagementPage = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [updateBirdType, setUpdateBirdType] = useState({});

    const createFormMethods = useForm({
        defaultValues: {
            birdName: '',
            birdSize: 0,
        },
        resolver: yupResolver(
            Yup.object().shape({
                birdName: Yup.string().required('Please enter bird name'),
                birdSize: Yup.number().required('Please select bird size'),
            })
        ),
    });

    const updateFormMethods = useForm({
        defaultValues: {
            birdName: '',
            birdSize: 0,
        },
        resolver: yupResolver(
            Yup.object().shape({
                birdName: Yup.string().required('Please enter bird name'),
                birdSize: Yup.number().required('Please select bird size'),
            })
        ),
    });

    const birdTypeQuery = useQuery(
        ['birdType', page, pageSize, search],
        async () => {
            const res = await axios.get(
                'https://apis20231023230305.azurewebsites.net/api/BirdType/Get?pageIndex=0&pageSize=1000'
            );

            const filteredData = res.data.result.items.filter((item) => {
                return item.birdName.toLowerCase().includes(search.toLowerCase());
            });

            const totalPage = Math.ceil(filteredData.length / pageSize);
            setTotalPage(totalPage);

            return filteredData.slice((page - 1) * pageSize, page * pageSize);
        },
        {
            refetchOnWindowFocus: false,
            initialData: [],
        }
    );

    const createMutation = useMutation(
        (data) => axios.post('https://apis20231023230305.azurewebsites.net/api/BirdType/Create', data),
        {
            onSuccess: () => {
                setPage(1);
                birdTypeQuery.refetch();
                toast.success('Create bird type successfully');
                setIsCreateModal(false);
            },
        }
    );

    const updateMutation = useMutation(
        (data) => axios.put('https://apis20231023230305.azurewebsites.net/api/BirdType/Update?id=' + data.id, data),
        {
            onSuccess: () => {
                setPage(1);
                birdTypeQuery.refetch();
                toast.success('Update bird type successfully');
                setIsUpdateModal(false);
            },
        }
    );

    const deleteMutation = useMutation(
        (id) => axios.delete(`https://apis20231023230305.azurewebsites.net/api/BirdType/Delete?id=${id}`),
        {
            onSuccess: () => {
                setPage(1);
                birdTypeQuery.refetch();
                toast.success('Delete bird type successfully');
            },
        }
    );

    return (
        <>
            <Dialog open={isUpdateModal} onClose={() => setIsUpdateModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="w-full max-w-md p-4 mx-auto bg-white rounded">
                        <Dialog.Title className="text-lg font-bold">Update Bird Type</Dialog.Title>
                        <FormProvider {...updateFormMethods}>
                            <form
                                className="flex flex-col gap-4 mt-2"
                                onSubmit={updateFormMethods.handleSubmit((data) => {
                                    updateMutation.mutate({
                                        ...data,
                                        id: updateBirdType.id,
                                    });
                                })}
                            >
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="first-name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Bird Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...updateFormMethods.register('birdName')}
                                        />
                                    </div>
                                    <FormError name="birdName" />
                                </div>
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="first-name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Bird Size
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...updateFormMethods.register('birdSize')}
                                        >
                                            {birdSizeOptions.map((item, index) => (
                                                <option key={index} value={item.value}>
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <FormError name="birdSize" />
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
            <Dialog open={isCreateModal} onClose={() => setIsCreateModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="w-full max-w-md p-4 mx-auto bg-white rounded">
                        <Dialog.Title className="text-lg font-bold">Create New Bird Type</Dialog.Title>
                        <FormProvider {...createFormMethods}>
                            <form
                                className="flex flex-col gap-4 mt-2"
                                onSubmit={createFormMethods.handleSubmit((data) => {
                                    createMutation.mutate(data);
                                })}
                            >
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="first-name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Bird Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...createFormMethods.register('birdName')}
                                        />
                                    </div>
                                    <FormError name="birdName" />
                                </div>
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="first-name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Bird Size
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...createFormMethods.register('birdSize')}
                                        >
                                            {birdSizeOptions.map((item, index) => (
                                                <option key={index} value={item.value}>
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <FormError name="birdSize" />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => setIsCreateModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white duration-300 bg-green-600 rounded-md text-whit hover:bg-green-700"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    </Dialog.Panel>
                </div>
            </Dialog>
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col">
                    <div className="flex items-center justify-end gap-2 p-4">
                        <button
                            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white duration-300 bg-green-600 rounded-md text-whit hover:bg-green-700"
                            onClick={() => setIsCreateModal(true)}
                        >
                            <LuBird className="w-5 h-5" /> Create New Bird Type
                        </button>
                        {/* search */}

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search-users"
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-50"
                                placeholder="Search for users"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                            />
                        </div>
                    </div>

                    {/* table */}
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Bird Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Bird Size
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {birdTypeQuery.data.map((item, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-emerald-100">
                                        <th className="px-6 py-4 text-gray-900">{item.id}</th>
                                        <td className="px-6 py-4 text-gray-900">{item.birdName}</td>
                                        <td className="px-6 py-4 text-gray-900">
                                            {birdSizeOptions.find((x) => x.value === item.birdSize)?.label}
                                        </td>

                                        <td className="px-6 py-4 text-gray-900">
                                            <div className="flex gap-1">
                                                <button
                                                    type="button"
                                                    className="font-medium text-blue-600 hover:underline"
                                                    title="Detail"
                                                    onClick={() => {
                                                        setIsUpdateModal(true);
                                                        setUpdateBirdType(item);

                                                        updateFormMethods.setValue('birdName', item.birdName);
                                                        updateFormMethods.setValue('birdSize', item.birdSize);
                                                    }}
                                                >
                                                    <BiEditAlt className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="font-medium text-red-600 hover:underline"
                                                    title="Detail"
                                                    onClick={() => {
                                                        const confirm = window.confirm(
                                                            'Are you sure you want to delete this bird type?'
                                                        );
                                                        if (confirm) {
                                                            deleteMutation.mutate(item.id);
                                                        }
                                                    }}
                                                >
                                                    <BiTrash className="w-4 h-4" />
                                                </button>
                                            </div>
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
        </>
    );
};

export default BirdTypeManagementPage;
