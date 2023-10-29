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

const DataCard = ({ title, icon, count, countInMonth, colorClassName }) => (
  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
    <div className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr ${colorClassName} text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center`}>
      {icon}
    </div>
    <div className="p-4 text-right">
      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
        {title}
      </p>
      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
        {count} {title.toLowerCase()}s
      </h4>
    </div>
    <div className="border-t-4 p-4" style={{ borderTop: '1px solid #D3D3D3' }}>
      <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
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
    userInMonth: ''
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerData, customerInMonthData, orderData, orderInMonthData, providerData, providerInMonthData, userInMonthData] =
          await Promise.all([
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
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-50/50">
      <div className="mt-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <DataCard title="USER"
          icon={<AiOutlineUserAdd className='w-7 h-7'/>}
          count={dataDashboard.userInMonth}
          countInMonth={dataDashboard.userInMonth}
          colorClassName={"from-orange-600 to-orange-400"}
        />

        <DataCard title="Customer"
          icon={<MdOutlineAccountCircle className='w-7 h-7'/>}
          count={dataDashboard.customer}
          countInMonth={dataDashboard.customerInMonth}
          colorClassName={"from-blue-600 to-blue-400"}
        />

        <DataCard title="Provider"
          icon={<BiStore className='w-7 h-7'/>}
          count={dataDashboard.provider}
          countInMonth={dataDashboard.providerInMonth}
          colorClassName={"from-pink-600 to-pink-400"}
        />

        <DataCard title="Order"
          icon={<LiaMoneyBillAltSolid className='w-7 h-7'/>}
          count={dataDashboard.order}
          countInMonth={dataDashboard.orderInMonth}
          colorClassName={"from-green-600 to-green-400"}
        />
      </div>
    </div>
  );
};

export default DashboardPage;