import React from 'react';
import logo from '../../Assets/Images/logo.png';
import { Dialog } from '@headlessui/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormError from '../../Components/FormError/FormError';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const WalletPage = () => {
    const [isDeposit, setIsDeposit] = React.useState(false);
    const [isWithdraw, setIsWithdraw] = React.useState(false);
    const depositForm = useForm({
        defaultValues: {
            amount: 0,
        },
        resolver: yupResolver(
            Yup.object().shape({
                amount: Yup.number().min(0, 'Amount must be greater than 0').required('Amount is required'),
            })
        ),
    });

    const withdrawForm = useForm({
        defaultValues: {
            amount: 0,
        },
        resolver: yupResolver(
            Yup.object().shape({
                amount: Yup.number().min(0, 'Amount must be greater than 0').required('Amount is required'),
            })
        ),
    });

    return (
        <>
            <Dialog open={isDeposit} onClose={() => setIsDeposit(false)} className="relative z-50">
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="max-w-sm px-4 py-8 mx-auto bg-white rounded fade-in">
                        <Dialog.Title className="text-lg font-bold text-center">Deposit To Wallet</Dialog.Title>
                        <FormProvider {...depositForm}>
                            <form className="mt-4" onSubmit={depositForm.handleSubmit(console.log)}>
                                <input
                                    type="number"
                                    name="amount"
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                    placeholder="Amount"
                                    required
                                    {...depositForm.register('amount')}
                                />
                                <FormError name="amount" />
                                <button
                                    type="submit"
                                    className="w-full px-4 duration-300 py-3 mt-4 font-bold text-white !bg-green-600 rounded hover:!bg-green-500"
                                >
                                    Deposit
                                </button>
                            </form>
                        </FormProvider>
                    </Dialog.Panel>
                </div>
            </Dialog>
            <Dialog open={isWithdraw} onClose={() => setIsWithdraw(false)} className="relative z-50">
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="max-w-sm px-4 py-8 mx-auto bg-white rounded fade-in">
                        <Dialog.Title className="text-lg font-bold text-center">Withdraw From Wallet</Dialog.Title>
                        <FormProvider {...withdrawForm}>
                            <form className="mt-4" onSubmit={withdrawForm.handleSubmit(console.log)}>
                                <input
                                    type="number"
                                    name="amount"
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                    placeholder="Amount"
                                    required
                                    {...withdrawForm.register('amount')}
                                />
                                <FormError name="amount" />
                                <button
                                    type="submit"
                                    className="w-full px-4 duration-300 py-3 mt-4 font-bold text-white !bg-red-600 rounded hover:!bg-red-500"
                                >
                                    Withdraw
                                </button>
                            </form>
                        </FormProvider>
                    </Dialog.Panel>
                </div>
            </Dialog>
            <div className="max-w-5xl min-h-screen px-4 py-12 mx-auto">
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setIsDeposit(true)}
                        className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700"
                    >
                        Deposit Money
                    </button>
                    <button
                        onClick={() => setIsWithdraw(true)}
                        className="px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700"
                    >
                        Withdraw Money
                    </button>
                </div>
            </div>
        </>
    );
};

export default WalletPage;
