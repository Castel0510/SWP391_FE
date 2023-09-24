import { Fragment, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './Routes/Routes'
import DefaultComponent from './Components/DefaultComponent/DefaultComponent'

function App() {

  return (
    <>
      <div>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.page
            const Layout = route.isShowHeaderFooter ? DefaultComponent : Fragment
            return (
              <Route path={route.path} key={index} element={
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
