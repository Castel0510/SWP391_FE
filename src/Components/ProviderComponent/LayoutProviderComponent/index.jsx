import React from 'react'
import SidebarProviderComponent from '../SidebarProviderComponent'
import NavbarProviderComponent from '../NavbarProviderComponent'

const LayoutProviderComponent = ({ children }) => {
  return (
    <div>
      <NavbarProviderComponent />

      <div>  
        <SidebarProviderComponent />
        <div className="p-4 sm:ml-64 pt-24">
          {children}
        </div>
      </div>
    </div>
  )
}

export default LayoutProviderComponent