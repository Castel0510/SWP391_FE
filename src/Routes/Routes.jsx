import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ServicePage from "../Pages/ServicePage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeaderFooter:true
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
        path: '*',
        page: NotFoundPage
    },
    {
        path: '/service/*',
        page: ServicePage,
        isShowHeaderFooter:true
    }
]