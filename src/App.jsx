import { Fragment, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './Routes/Routes'
import HeaderComponent from './Components/HeaderComponent/HeaderComponent'
import FooterComponent from './Components/FooterComponent/FooterComponent'
import DefaultComponent from './Components/DefaultComponent/DefaultComponent'

function App() {

  return (
    <>
      <div>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeaderFooter ? DefaultComponent : Fragment
            return (
              <Route path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </div>
    </>
  )
}

export default App
