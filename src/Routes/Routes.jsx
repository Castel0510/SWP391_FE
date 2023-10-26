import providerHomePage from "../Components/Provider/providerHomePage";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import OrderHistoryPage from "../Pages/OrderHistoryPage/OrderHistoryPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import BookingPage from "../Pages/Service/BookingPage";
import TransactionHistoryPage from "../Pages/TransactionHistoryPage/TransactionHistoryPage";
import ServicePage from "../Pages/ServicePage";
import CreateServicePage from "../Pages/Provider/CreateServicePage/CreateServicePage";
import ProviderPage from "../Pages/Provider/ProviderPage";
import ProviderProfile from "../Pages/Provider/ProviderProfile";
import ProviderSecurity from "../Pages/Provider/ProviderSecurity";
import CustomerChangePasswordPage from "../Pages/CustomerChangePasswordPage"
import DashboardPage from '../Pages/AdminPage/DashboardPage'
import AccountManagementPage from '../Pages/AdminPage/AccountManagementPage'
import ProviderManagementPage from '../Pages/AdminPage/ProviderManagementPage'
import ReportPage from '../Pages/AdminPage/ReportPage'
import ProviderOrderStatus from "../Pages/Provider/ProviderOrderStatus/ProviderOrderStatus";
import ItemDetailPage from "../Pages/Provider/ItemDetailPage/ItemDetailPage";
import MyShopPage from "../Pages/Provider/MyShopPage/MyShopPage";
import ProviderBirdType from "../Pages/Provider/ProviderBirdType/ProviderBirdType";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeaderFooter: true
        //show header and footer
    },
    {
        path: '/login',
        page: LoginPage
    },
    {
        path: '/register',
        page: RegisterPage
    },
    {
        path: '/profile',
        page: ProfilePage,
        isShowHeaderFooter: true
    },
    {
        path: '/transaction',
        page: TransactionHistoryPage,
        isShowHeaderFooter: true
    },
    {
        path: '*',
        page: NotFoundPage
    },
    {
        path: '/service/*',
        page: ServicePage,
        isShowHeaderFooter: true
    },
    {
        path: '/change-password-customer',
        page: CustomerChangePasswordPage,
        isShowHeaderFooter: true
    },
    // provider
    {
        path: '/provider',
        page: ProviderPage,
        isShowSidebarProvider: true
    },
    {
        path: '/provider-dashboard',
        page: ProviderPage,
        isShowSidebarProvider: true
    },
    {
        path: '/provider-bird-type',
        page: ProviderBirdType,
        isShowSidebarProvider: true
    },
    {
        path: '/my-shop',
        page: MyShopPage,
        isShowSidebarProvider: true
    },
    {
        path: '/item-detail-page/:id',
        page: ItemDetailPage,
        isShowSidebarProvider: true
    },
    {
        path: '/createService',
        page: CreateServicePage,
        isShowSidebarProvider: true
    },
    {
        path: '/order-status',
        page: ProviderOrderStatus,
        isShowSidebarProvider: true
    },
    {
        path: '/provider-profile',
        page: ProviderProfile,
        isShowSidebarProvider: true
    },
    {
        path: '/provider-change-password',
        page: ProviderSecurity,
        isShowSidebarProvider: true
    },
    // admin
    {
        path: '/admin-dashboard',
        page: DashboardPage,
        isShowAdmin: true
    },
    {
        path: '/admin-account-management',
        page: AccountManagementPage,
        isShowAdmin: true
    },
    {
        path: '/admin-provider-management',
        page: ProviderManagementPage,
        isShowAdmin: true
    },
    {
        path: '/admin-report-management',
        page: ReportPage,
        isShowAdmin: true
    },
]