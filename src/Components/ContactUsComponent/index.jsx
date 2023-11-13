import React from 'react';
import './style.scss';
import svg from '../../Assets/Svg/undraw-contact.svg';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormError from '../FormError/FormError';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { getUserInfoInLocalStorage } from '../../Store/userSlice';

const ContactUsComponent = () => {
    const [user, setUser] = React.useState();
    React.useEffect(() => {
        setUser(getUserInfoInLocalStorage());
    }, []);

    const formMethods = useForm({
        defaultValues: {
            name: '',

            message: '',
        },
        resolver: yupResolver(
            yup.object().shape({
                name: yup.string().required('Name is required'),
                message: yup.string().required('Message is required'),
            })
        ),
    });

    const sendReportMutation = useMutation(
        (data) => {
            return axios.post('https://apis20231023230305.azurewebsites.net/api/Report/Create', data);
        },
        {
            onSuccess: (data) => {
                toast.success('Send report successfully');
                formMethods.reset();
            },
        }
    );

    const onSubmit = (data) => {
        const user = getUserInfoInLocalStorage();

        const payload = {
            ...data,
            reportName: data.name,
            content: data.message,
            userId: user?.id,
        };

        sendReportMutation.mutate(payload);
    };

    return (
        <div className="contact-us">
            <div className="container mx-auto my-24 md:px-6">
                <div className="title">
                    <small>Contact Us</small>
                    <h2>Tell us if you have any questions</h2>
                    <p>
                        We connect with customers who need to use services from suppliers. We aim to build a community
                        of bird lovers in Vietnam
                    </p>
                </div>

                <section className="mb-10 contact-us-form">
                    <div className="flex flex-wrap">
                        <div className="w-full mb-10 shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
                            <img src={svg} />
                        </div>
                        <FormProvider {...formMethods}>
                            {/* form */}
                            <div className="w-full mb-12 shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
                                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                                    <div className="relative mb-6" data-te-input-wrapper-init>
                                        <div className='mb-2'>Name</div>
                                        <input
                                            type="text"
                                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleInput90"
                                            placeholder="Name"
                                            {...formMethods.register('name')}
                                        />
                                        <FormError name="name" />

                                        <label
                                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                            htmlFor="exampleInput90"
                                        >

                                        </label>
                                    </div>

                                    <div className="relative mb-6" data-te-input-wrapper-init>
                                        <div className='mb-2'>Message</div>
                                        <textarea
                                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlTextarea1"
                                            rows="3"
                                            placeholder="Your message"
                                            {...formMethods.register('message')}
                                        ></textarea>
                                        <FormError name="message" />
                                        <label
                                            htmlFor="exampleFormControlTextarea1"
                                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                        >

                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        className="mb-6 inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </FormProvider>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContactUsComponent;
