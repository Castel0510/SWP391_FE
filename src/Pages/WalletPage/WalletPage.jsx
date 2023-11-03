import React, { useState, useEffect } from 'react';
import logo from '../../Assets/Images/logo.png';
import { Dialog } from '@headlessui/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormError from '../../Components/FormError/FormError';
import * as Yup from 'yup';
import { getUser } from '../../Store/userSlice';
import { useQuery, useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatCurrency } from '../../Utils/string.helper';
import axios from 'axios';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';

const WalletPage = () => {
    const [user, setUser] = useState(null);
    const dataUser = useSelector((state) => state.user);
    const [isOpenTransaction, setIsOpenTransaction] = useState(false);
    const [transaction, setTransaction] = useState(null);
    useEffect(() => {
        setUser(getUser());
    }, [dataUser]);
    const userWallet = useQuery(
        ['user-Wallet', user?.Id],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Wallet/GetByUserId?id=${user?.Id}`
            );

            return res.data.result;
        },
        {
            enabled: user?.Id !== null,
        }
    );

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

    const transactionMutation = useMutation(
        async (data) => {
            let dto = {
                transactionType: 0,
                createAt: '2023-11-03T15:18:20.431Z',
                transactionDescription: 'string',
                walletId: userWallet.data.id,
                amountTransaction: data.amount,
            };
            if (isDeposit) {
                dto.transactionType = 0;
            } else {
                dto.transactionType = 1;
            }
            setTransaction({
                amount: data.amount,
            });

            const res = await axios.post('https://apis20231023230305.azurewebsites.net/api/Transaction/Create', dto);

            return {
                ...res.data.result,
                amount: data.amount,
                transactionType: dto.transactionType,
            };
        },
        {
            onSuccess: (data) => {
                if (data.transactionType === 0) {
                    setIsOpenTransaction(true);
                    setTransaction(data);
                    toast.success('Deposit successfully');
                } else {
                    toast.success('Withdraw successfully');
                }

                setIsDeposit(false);
                setIsWithdraw(false);
            },
        }
    );

    return (
        <>
            <Dialog
                open={isOpenTransaction}
                onClose={() => {
                    setIsOpenTransaction(false);
                }}
                className="relative z-50"
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-4  w-[700px] fade-in">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="text-lg font-semibold">Payment with MoMo</div>
                            </div>
                            <div className="p-4 bg-white">
                                <QRCode
                                    value={`2|99|0916480138|Luong Duyen Duc||0|0|${transaction?.amount}|${transaction?.id}|transfer_myqr`}
                                />
                            </div>
                            <div>
                                <div>
                                    Please scan the QR code to pay with MoMo app. After payment, please click the button
                                    below to confirm.
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <button
                                    className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700"
                                    onClick={() => setIsOpenTransaction(false)}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
            <Dialog open={isDeposit} onClose={() => setIsDeposit(false)} className="relative z-50">
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="max-w-sm px-4 py-8 mx-auto bg-white rounded fade-in">
                        <Dialog.Title className="text-lg font-bold text-center">Deposit To Wallet</Dialog.Title>
                        <FormProvider {...depositForm}>
                            <form
                                className="mt-4"
                                onSubmit={withdrawForm.handleSubmit((data) => transactionMutation.mutate(data))}
                            >
                                <input
                                    type="number"
                                    name="amount"
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                    placeholder="Amount"
                                    required
                                    {...depositForm.register('amount')}
                                />
                                <FormError name="amount" />
                                <button className="w-full px-4 duration-300 py-3 mt-4 font-bold text-white !bg-green-600 rounded hover:!bg-green-500">
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
                            <form
                                className="mt-4"
                                onSubmit={withdrawForm.handleSubmit((data) => transactionMutation.mutate(data))}
                            >
                                <input
                                    type="number"
                                    name="amount"
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                    placeholder="Amount"
                                    required
                                    {...withdrawForm.register('amount')}
                                />
                                <FormError name="amount" />
                                <button className="w-full px-4 duration-300 py-3 mt-4 font-bold text-white !bg-red-600 rounded hover:!bg-red-500">
                                    Withdraw
                                </button>
                            </form>
                        </FormProvider>
                    </Dialog.Panel>
                </div>
            </Dialog>
            <div className="max-w-5xl min-h-screen px-4 py-12 mx-auto">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        {Boolean(userWallet.data) && (
                            <div className="px-8 py-4 text-white bg-green-600 rounded-lg" to="/wallet">
                                {formatCurrency(userWallet.data?.walletAmount)}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
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
            </div>
        </>
    );
};

export default WalletPage;
