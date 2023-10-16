import React from 'react'
import NavbarAdminComponent from '../NavbarAdminComponent'
import SidebarAdminComponent from '../SidebarAdminComponent'

const LayoutAdminComponent = ({children}) => {
  return (
    <div>
      <NavbarAdminComponent />

      <div>  
        <SidebarAdminComponent />
        <div className="p-4 sm:ml-64 pt-24">
          {children}
        </div>
      </div>
    </div>
  )
}

export default LayoutAdminComponent