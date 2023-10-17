import { Fragment, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './Routes/Routes'
import DefaultComponent from './Components/DefaultComponent/DefaultComponent'
import LayoutProviderComponent from './Components/ProviderComponent/LayoutProviderComponent'
import LayoutAdminComponent from './Components/AdminComponent/LayoutAdminComponent'
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <div>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.page
            const Layout = route.isShowHeaderFooter ? DefaultComponent : Fragment
            const LayoutProvider = route.isShowSidebarProvider ? LayoutProviderComponent : Fragment
            const LayoutAdmin = route.isShowAdmin ? LayoutAdminComponent : Fragment

            return (
              <Route path={route.path} key={index} element={
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
              } />
            )
          })}

        </Routes>
      </div>
    </>
  )
}

export default App
