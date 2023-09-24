import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import OrderHistoryPage from "../Pages/OrderHistoryPage/OrderHistoryPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import TransactionHistoryPage from "../Pages/TransactionHistoryPage/TransactionHistoryPage";

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
        path: '/orderHistory',
        page: OrderHistoryPage,
        isShowHeaderFooter: true
    },
    {
        path: '/transactionHistory',
        page: TransactionHistoryPage,
        isShowHeaderFooter: true
    },
    {
        path: '*',
        page: NotFoundPage
    },
]