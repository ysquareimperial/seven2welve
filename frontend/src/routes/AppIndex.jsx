import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'
import Header from '../pages/Header'

function AppIndex() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <Outlet />
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default AppIndex
