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
import { IconContext } from 'react-icons';
import { MdOutlineAccountCircle, MdOutlineHomeRepairService, MdOutlineAttachMoney } from 'react-icons/md';
import { BiStore } from 'react-icons/bi';
import { GrServices } from 'react-icons/gr';
import { LiaMoneyBillAltSolid } from 'react-icons/lia';
import { AiOutlineUserAdd } from 'react-icons/ai';
import ChartBasicArea from '../../../Components/Chart/ChartBasicArea';
import { useQuery } from 'react-query';
import axios from 'axios';
import { groupCountValueByDate, groupSumValueByDate } from '../../../Utils/report.helper';
import { formatCurrency } from '../../../Utils/string.helper';

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

const DashboardPageProvider = () => {
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
    const [user, setUser] = React.useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));

        setUser(user);
    }, []);

    const getServiceCreated = useQuery(
        ['serviceCreated', user],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Provider/GetServiceCreated?id=${user.id}`
            );

            return res.data.result;
        },
        { initialData: 0, enabled: Boolean(user) }
    );

    const getServiceCreatedInMonth = useQuery(
        ['serviceCreatedInMonth', user],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Provider/GetServiceCreatedInMonth?id=${user.id}`
            );

            return res.data.result;
        },
        { initialData: 0, enabled: Boolean(user) }
    );

    const getPrice = useQuery(
        ['price', user],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Provider/GetPrice?id=${user.id}`
            );

            return res.data.result;
        },
        { initialData: 0, enabled: Boolean(user) }
    );

    const getPriceInMonth = useQuery(
        ['priceInMonth', user],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Provider/GetPriceInMonth?id=${user.id}`
            );

            return res.data.result;
        },
        { initialData: 0, enabled: Boolean(user) }
    );

    const getBooking = useQuery(
        ['booking', user],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Provider/GetBooking?id=${user.id}`
            );

            return res.data.result;
        },
        { initialData: 0, enabled: Boolean(user) }
    );

    const getBookingInMonth = useQuery(
        ['bookingInMonth', user],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Provider/GetBookingInMonth?id=${user.id}`
            );

            return res.data.result;
        },
        { initialData: 0, enabled: Boolean(user) }
    );

    const customerQuery = useQuery(
        ['customer', user],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/GetByProviderId?id=${user.id}`
            );

            return groupCountValueByDate(res.data.result, 'createAt');
        },
        { initialData: {}, enabled: Boolean(user) }
    );

    const orderQuery = useQuery(
        ['order', user],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/GetByProviderId?id=${user.id}`
            );
            const chartData = res.data.result.map((item) => {
                const total = item.bookingDetails.reduce((acc, cur) => {
                    return acc + cur.price;
                }, 0);

                return {
                    ...item,
                    total,
                };
            });

            return groupSumValueByDate(chartData, 'createAt', 'total');
        },
        { initialData: {} }
    );

    return (
        <div className="bg-gray-50/50">
            <div className="grid mt-12 gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <DataCard
                    title="Revenue"
                    icon={<MdOutlineAttachMoney className="w-7 h-7" />}
                    count={formatCurrency(getPrice.data)}
                    countInMonth={formatCurrency(getPriceInMonth.data)}
                    colorClassName={'from-blue-600 to-blue-400'}
                />

                <DataCard
                    title="Service Created"
                    icon={
                        <IconContext.Provider value={{ color: 'white', className: 'global-class-name' }}>
                            <MdOutlineHomeRepairService className="!text-white fill-white w-7 h-7" />
                        </IconContext.Provider>
                    }
                    count={getServiceCreated.data}
                    countInMonth={getServiceCreatedInMonth.data}
                    colorClassName={'from-pink-600 to-pink-400'}
                />

                <DataCard
                    title="Booking"
                    icon={<LiaMoneyBillAltSolid className="w-7 h-7" />}
                    count={getBooking.data}
                    countInMonth={getBookingInMonth.data}
                    colorClassName={'from-green-600 to-green-400'}
                />

                <div className="col-span-2">
                    <ChartBasicArea
                        colors={['#1e88e5']}
                        title={'Service Created'}
                        unit={'Services'}
                        values={Object.keys(customerQuery.data).map((key) => ({
                            name: key,
                            data: customerQuery.data[key],
                        }))}
                    />
                </div>

                <div className="col-span-2">
                    <ChartBasicArea
                        colors={['#43a047']}
                        title={'Order'}
                        unit={'VNĐ'}
                        values={Object.keys(orderQuery.data).map((key) => ({
                            name: key,
                            data: formatCurrency(orderQuery.data[key]),
                        }))}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardPageProvider;
