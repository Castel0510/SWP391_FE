import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeaderFooter:true
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
]