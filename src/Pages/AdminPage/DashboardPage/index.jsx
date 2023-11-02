import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    getCustomer,
    getCustomerInMonth,
    getOrder,
    getOrderInMonth,
    getProvider,
    getProviderInMonth,
    getUserInMonth,
} from '../../../Store/dashboardSlice';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { BiStore } from 'react-icons/bi';
import { LiaMoneyBillAltSolid } from 'react-icons/lia';
import { AiOutlineUserAdd } from 'react-icons/ai';
import ChartBasicArea from '../../../Components/Chart/ChartBasicArea';
import { useQuery } from 'react-query';
import axios from 'axios';
import { groupCountValueByDate } from '../../../Utils/report.helper';

const DataCard = ({ title, icon, count, countInMonth, colorClassName }) => (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
        <div
            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr ${colorClassName} text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center`}
        >
            {icon}
        </div>
        <div className="p-4 text-right">
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-600">{title}</p>
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {count} {title.toLowerCase()}s
            </h4>
        </div>
        <div className="p-4 border-t-4" style={{ borderTop: '1px solid #D3D3D3' }}>
            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-600">
                <strong className="text-green-500">+{countInMonth}</strong> in this month
            </p>
        </div>
    </div>
);

const DashboardPage = () => {
    const [dataDashboard, setDataDashboard] = useState({
        customer: '',
        customerInMonth: '',
        order: '',
        orderInMonth: '',
        provider: '',
        providerInMonth: '',
        userInMonth: '',
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    customerData,
                    customerInMonthData,
                    orderData,
                    orderInMonthData,
                    providerData,
                    providerInMonthData,
                    userInMonthData,
                ] = await Promise.all([
                    dispatch(getCustomer()),
                    dispatch(getCustomerInMonth()),
                    dispatch(getOrder()),
                    dispatch(getOrderInMonth()),
                    dispatch(getProvider()),
                    dispatch(getProviderInMonth()),
                    dispatch(getUserInMonth()),
                ]);

                setDataDashboard((prevData) => ({
                    ...prevData,
                    customer: customerData.payload?.data?.result,
                    customerInMonth: customerInMonthData.payload?.data?.result,
                    order: orderData.payload?.data?.result,
                    orderInMonth: orderInMonthData.payload?.data?.result,
                    provider: providerData.payload?.data?.result,
                    providerInMonth: providerInMonthData.payload?.data?.result,
                    userInMonth: userInMonthData.payload?.data?.result,
                }));
            } catch (error) {}
        };

        fetchData();
    }, []);

    const userQuery = useQuery(
        ['user'],
        async () => {
            const res = await axios.get(
                'https://apis20231023230305.azurewebsites.net/api/User/GetAllUser?pageIndex=0&pageSize=999999'
            );

            const data = groupCountValueByDate(res.data.result.items, 'createdAt');
            return data;
        },
        {
            initialData: {},
        }
    );

    const customerQuery = useQuery(
        ['customer'],
        async () => {
            const res = await axios.get(
                'https://apis20231023230305.azurewebsites.net/api/Customer/Get?pageIndex=0&pageSize=999999'
            );

            return groupCountValueByDate(res.data.result.items, 'createdAt');
        },
        { initialData: {} }
    );

    const providerQuery = useQuery(
        ['provider'],
        async () => {
            const res = await axios.get(
                'https://apis20231023230305.azurewebsites.net/api/Provider/Get?pageIndex=0&pageSize=999999'
            );

            return groupCountValueByDate(res.data.result.items, 'createdAt');
        },
        { initialData: {} }
    );

    const orderQuery = useQuery(
        ['order'],
        async () => {
            const res = await axios.get(
                'https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/GetAllBooking?pageIndex=0&pageSize=999999'
            );

            return groupCountValueByDate(res.data.result.items, 'createAt');
        },
        { initialData: {} }
    );

    return (
        <div className="bg-gray-50/50">
            <div className="grid mt-12 gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <DataCard
                    title="USER"
                    icon={<AiOutlineUserAdd className="w-7 h-7" />}
                    count={dataDashboard.userInMonth}
                    countInMonth={dataDashboard.userInMonth}
                    colorClassName={'from-orange-600 to-orange-400'}
                />

                <DataCard
                    title="Customer"
                    icon={<MdOutlineAccountCircle className="w-7 h-7" />}
                    count={dataDashboard.customer}
                    countInMonth={dataDashboard.customerInMonth}
                    colorClassName={'from-blue-600 to-blue-400'}
                />

                <DataCard
                    title="Provider"
                    icon={<BiStore className="w-7 h-7" />}
                    count={dataDashboard.provider}
                    countInMonth={dataDashboard.providerInMonth}
                    colorClassName={'from-pink-600 to-pink-400'}
                />

                <DataCard
                    title="Order"
                    icon={<LiaMoneyBillAltSolid className="w-7 h-7" />}
                    count={dataDashboard.order}
                    countInMonth={dataDashboard.orderInMonth}
                    colorClassName={'from-green-600 to-green-400'}
                />
                <div className="col-span-2">
                    <ChartBasicArea
                        colors={['#ffa726']}
                        title={'User'}
                        unit={'User'}
                        values={Object.keys(userQuery.data).map((key) => ({
                            name: key,
                            data: userQuery.data[key],
                        }))}
                    />
                </div>
                <div className="col-span-2">
                    <ChartBasicArea
                        colors={['#1e88e5']}
                        title={'Customer'}
                        unit={'Customer'}
                        values={Object.keys(customerQuery.data).map((key) => ({
                            name: key,
                            data: customerQuery.data[key],
                        }))}
                    />
                </div>
                <div className="col-span-2">
                    <ChartBasicArea
                        colors={['#d81b60']}
                        title={'Provider'}
                        unit={'Provider'}
                        values={Object.keys(providerQuery.data).map((key) => ({
                            name: key,
                            data: providerQuery.data[key],
                        }))}
                    />
                </div>
                <div className="col-span-2">
                    <ChartBasicArea
                        colors={['#43a047']}
                        title={'Order'}
                        unit={'Order'}
                        values={Object.keys(orderQuery.data).map((key) => ({
                            name: key,
                            data: orderQuery.data[key],
                        }))}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
