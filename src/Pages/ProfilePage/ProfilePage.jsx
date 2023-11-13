import React from 'react';
import logo from '../../Assets/Images/logo.png';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { getUser } from '../../Store/userSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FormError from '../../Components/FormError/FormError';
import { toast } from 'react-toastify';
import CTAUploadImage from '../../Components/CTA/CTAUploadImage';

const ProfilePage = () => {
    const dataUser = useSelector((state) => state.user);
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        setUser(getUser());
    }, [dataUser]);
    const formMethods = useForm({
        defaultValues: {
            customerName: '',
            user: {
                avatarURL: '',
                fullname: '',
                username: '',
                password: '',
                email: '',
                dob: '',
                phoneNumber: '',
                gender: '',
                image: '',
            },
        },
    });

    const userData = useQuery(
        ['user', user?.Id],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Customer/GetById?id=${user?.Id}`
            );
            return res.data.result;
        },
        {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: user?.Id !== null,
            onSuccess: (data) => {
                formMethods.reset({
                    ...data,
                });
                formMethods.setValue('user.dob', data.user.dob.split('T')[0]);
            },
        }
    );

    const handleUpdateCustomer = useMutation(
        (data) => {
            return axios.put(`https://apis20231023230305.azurewebsites.net/api/Customer/Update?id=${user.Id}`, data);
        },
        {
            onSuccess: () => {
                toast.success('Update profile successfully');
            },
            onError: (error) => {
                toast.error('Update profile failed');
            },
        }
    );

    return (
        <FormProvider {...formMethods}>
            <form
                onSubmit={formMethods.handleSubmit((data) => {
                    handleUpdateCustomer.mutate(data);
                })}
            >
                <div className="w-full max-w-lg p-8 mx-auto my-10 bg-white rounded shadow-md">
                    <div className="font-bold text-center">Update My Profile</div>

                    <div className="flex flex-col gap-4 p-6 rounded">
                        <CTAUploadImage
                            defaultValue={userData.data?.user?.avatarURL}
                            onUpload={(url) => formMethods.setValue('user.avatarURL', url)}
                        />
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    {...formMethods.register('user.fullname')}
                                />
                            </div>
                            <FormError name="user.fullname" />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    {...formMethods.register('user.email')}
                                />
                            </div>
                            <FormError name="user.email" />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    {...formMethods.register('user.phoneNumber')}
                                />
                            </div>
                            <FormError name="user.phoneNumber" />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Date of Birth
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    className="block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    {...formMethods.register('user.dob')}
                                />
                            </div>
                            <FormError name="user.dob" />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Gender
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    {...formMethods.register('user.gender')}
                                />
                            </div>
                            <FormError name="user.gender" />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 mt-4 font-bold text-white bg-green-600 rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default ProfilePage;
