import providerHomePage from "../Components/Provider/providerHomePage";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import OrderHistoryPage from "../Pages/OrderHistoryPage/OrderHistoryPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import BookingPage from "../Pages/Service/BookingPage";
import ItemDetailPage from "../Pages/Service/ItemDetail";
import ServicePage2 from "../Pages/Service/ServicePage";
// import ServicePage from "../Pages/ServicePage";
import TransactionHistoryPage from "../Pages/TransactionHistoryPage/TransactionHistoryPage";
import ServicePage from "../Pages/ServicePage";
import MyShopPage from "../Pages/MyShopPage/MyShopPage";
import CreateServicePage from "../Pages/CreateServicePage/CreateServicePage";

import BookingPageSpa from "../Pages/Service/BookingSpa";
import BookingPageHotel from "../Pages/Service/BookingHotel";
import BookingPageMedical from "../Pages/Service/BookingMedical";


import OrderDetailPage from "../Pages/OrderHistoryPage/OrderDetailPage";


export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeaderFooter: true,
    //show header and footer
  },
  {
    path: "/login",
    page: LoginPage,
  },
  {
    path: "/register",
    page: RegisterPage,
  },
  {
    path: "/profile",
    page: ProfilePage,
    isShowHeaderFooter: true,
  },
  {
    path: "/order",
    page: OrderHistoryPage,
    isShowHeaderFooter: true,
  },
  {
    path: "/transaction",
    page: TransactionHistoryPage,
    isShowHeaderFooter: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
  {
    path: "/service",
    page: ServicePage2,
    isShowHeaderFooter: true,
  },
  {
    path: "/detail/:itemId",
    page: ItemDetailPage,
    isShowHeaderFooter: true,
  },
  {
    path: "/detail/:id",
    page: BookingPage,
    isShowHeaderFooter: true,
  },

  {
    path: "/provider",
    page: providerHomePage,
    isShowHeaderFooter: true,
  },
  {
    path: "/booking/hotel/:itemId",
    page: BookingPageHotel,
    isShowHeaderFooter: true,
  },
  {
    path: "/booking/spa/:itemId",
    page: BookingPageSpa,
    isShowHeaderFooter: true,
  },
  {
    path: "/booking/medical/:itemId",
    page: BookingPageMedical,
    isShowHeaderFooter: true,
  },
  //   {

  //     path: '/service/*',
  //     page: ServicePage,
  //     isShowHeaderFooter:true
  // }
  {
    path: "/service/*",
    page: ServicePage,
    isShowHeaderFooter: true,
  },
  {
    path: "/my-shop",
    page: MyShopPage,
    isShowHeaderFooter: true,
  },
  {
    path: "/order",
    page: OrderHistoryPage,
    isShowHeaderFooter: true,
  },
  {
    path: "/order-detail/:orderId",
    page: OrderDetailPage,
    isShowHeaderFooter: true,
  },
  {
    path: "/createService",
    page: CreateServicePage,
    isShowHeaderFooter: true,
  },
  {
    path: "/item-detail-page/:id",
    page: ItemDetailPage,
    isShowHeaderFooter: true,
  },
];
