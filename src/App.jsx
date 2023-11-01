import { Fragment } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@smastrom/react-rating/style.css';
import { ToastContainer } from 'react-toastify';
import LayoutAdminComponent from './Components/AdminComponent/LayoutAdminComponent';
import DefaultComponent from './Components/DefaultComponent/DefaultComponent';
import LayoutProviderComponent from './Components/ProviderComponent/LayoutProviderComponent';
import { routes } from './Routes/Routes';

const queryClient = new QueryClient();

function App() {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div>
                    <Routes>
                        {routes.map((route, index) => {
                            const Page = route.page;
                            const Layout = route.isShowHeaderFooter ? DefaultComponent : Fragment;
                            const LayoutProvider = route.isShowSidebarProvider ? LayoutProviderComponent : Fragment;
                            const LayoutAdmin = route.isShowAdmin ? LayoutAdminComponent : Fragment;

                            return (
                                <Route
                                    path={route.path}
                                    key={index}
                                    element={
                                        <LayoutAdmin>
                                            <LayoutProvider>
                                                <Layout>
                                                    <Page />
                                                    <ToastContainer
                                                        position="bottom-right"
                                                        autoClose={3000}
                                                        hideProgressBar={false}
                                                        newestOnTop={false}
                                                        closeOnClick
                                                        rtl={false}
                                                        pauseOnFocusLoss
                                                        draggable
                                                        pauseOnHover
                                                        theme="light"
                                                    />
                                                </Layout>
                                            </LayoutProvider>
                                        </LayoutAdmin>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </QueryClientProvider>
        </>
    );
}

export default App;
