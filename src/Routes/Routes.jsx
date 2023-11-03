import providerHomePage from '../Components/Provider/providerHomePage';
import HomePage from '../Pages/HomePage/HomePage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage';
import OrderHistoryPage from '../Pages/OrderHistoryPage/OrderHistoryPage';
import OrderHistoryPageProvider from '../Pages/OrderHistoryPage/OrderHistoryPage';

import ProfilePage from '../Pages/ProfilePage/ProfilePage';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import BookingPage from '../Pages/Service/BookingPage';
import TransactionHistoryPage from '../Pages/TransactionHistoryPage/TransactionHistoryPage';
import ServicePage from '../Pages/Service/ServicePage';

import ItemDetailPage from '../Pages/Service/ItemDetail';
import ProviderPage from '../Pages/Provider/ProviderPage';
import ProviderProfile from '../Pages/Provider/ProviderProfile';
import ProviderSecurity from '../Pages/Provider/ProviderSecurity';
import CustomerChangePasswordPage from '../Pages/CustomerChangePasswordPage';

import ItemDetailPageProvider from '../Pages/ItemDetailPage/ItemDetailPage';
import DashboardPage from '../Pages/AdminPage/DashboardPage';
import AccountManagementPage from '../Pages/AdminPage/AccountManagementPage';
import ProviderManagementPage from '../Pages/AdminPage/ProviderManagementPage';
import ReportPage from '../Pages/AdminPage/ReportPage';
import ProviderOrderStatus from '../Pages/Provider/ProviderOrderStatus/ProviderOrderStatus';

import BookingPageSpa from '../Pages/Service/BookingSpa';
import BookingPageHotel from '../Pages/Service/BookingHotel';
import BookingPageMedical from '../Pages/Service/BookingMedical';
import Payment from '../Pages/Service/PaymentComponent';

import OrderDetailPage from '../Pages/OrderHistoryPage/OrderDetailPage';
import MyShopPage from '../Pages/Provider/MyShopPage/MyShopPage';
import CreateServicePage from '../Pages/Provider/CreateServicePage/CreateServicePage';
import EditServicePage from '../Pages/Provider/EditServicePage/EditServicePage';
import ProviderOrderStatusDetail from '../Pages/Provider/ProviderOrderStatusDetail/ProviderOrderStatusDetail';

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeaderFooter: true,
        //show header and footer
    },
    {
        path: '/login',
        page: LoginPage,
    },
    {
        path: '/register',
        page: RegisterPage,
    },
    {
        path: '/profile',
        page: ProfilePage,
        isShowHeaderFooter: true,
    },
    {
        path: '/transaction',
        page: TransactionHistoryPage,
        isShowHeaderFooter: true,
    },
    {
        path: '/wallet',
        page: ProfilePage,
        isShowHeaderFooter: true,
    },
    {
        path: '*',
        page: NotFoundPage,
    },

    {
        path: '/service/*',
        page: ServicePage,
        isShowHeaderFooter: true,
    },
    {
        path: '/change-password-customer',
        page: CustomerChangePasswordPage,
        isShowHeaderFooter: true,
    },
    {
        path: '/order',
        page: OrderHistoryPage,
        isShowHeaderFooter: true,
    },
    {
        path: '/detail/:itemId',
        page: ItemDetailPage,
        isShowHeaderFooter: true,
    },
    {
        path: '/detail/:id',
        page: BookingPage,
        isShowHeaderFooter: true,
    },

    {
        path: '/item-detail-page/:id',
        page: ItemDetailPage,
        isShowHeaderFooter: true,
    },
    {
        path: '/order-detail/:orderId',
        page: OrderDetailPage,
        isShowHeaderFooter: true,
    },
    {
        path: '/booking/boarding/:itemId',
        page: BookingPageHotel,
        isShowHeaderFooter: true,
    },
    {
        path: '/booking/grooming/:itemId',
        page: BookingPageSpa,
        isShowHeaderFooter: true,
    },
    {
        path: '/booking/healcare/:itemId',
        page: BookingPageMedical,
        isShowHeaderFooter: true,
    },
    {
        path: '/payment',
        page: Payment,
        isShowHeaderFooter: true,
    },

    // provider
    {
        path: '/provider',
        page: ProviderPage,
        isShowSidebarProvider: true,
    },
    {
        path: '/provider-dashboard',
        page: ProviderPage,
        isShowSidebarProvider: true,
    },
    {
        path: '/my-shop',
        page: MyShopPage,
        isShowSidebarProvider: true,
    },
    {
        path: '/item-detail-page/:id',
        page: ItemDetailPage,
        isShowSidebarProvider: true,
    },
    {
        path: '/createService',
        page: CreateServicePage,
        isShowSidebarProvider: true,
    },
    {
        path: '/editService/:id',
        page: EditServicePage,
        isShowSidebarProvider: true,
    },
    {
        path: '/order-status',
        page: ProviderOrderStatus,
        isShowSidebarProvider: true,
    },

    {
        path: '/order-status-detail/:id',
        page: ProviderOrderStatusDetail,
        isShowSidebarProvider: true,
    },
    {
        path: '/provider-profile',
        page: ProviderProfile,
        isShowSidebarProvider: true,
    },
    {
        path: '/provider-change-password',
        page: ProviderSecurity,
        isShowSidebarProvider: true,
    },
    // admin
    {
        path: '/admin-dashboard',
        page: DashboardPage,
        isShowAdmin: true,
    },
    {
        path: '/admin-account-management',
        page: AccountManagementPage,
        isShowAdmin: true,
    },
    {
        path: '/admin-provider-management',
        page: ProviderManagementPage,
        isShowAdmin: true,
    },
    {
        path: '/admin-report-management',
        page: ReportPage,
        isShowAdmin: true,
    },
];
