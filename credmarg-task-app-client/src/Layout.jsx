import React from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import FooterComponent from './components/common/Footer'

function Layout() {

  
  return (
    <>
    <Navbar/>
    <Outlet />
    <FooterComponent/>
    </>
  )
}

export default Layout