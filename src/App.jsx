import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <div>
     <Navbar />
     <div className="container">
     <Outlet />
     </div>
    </div>
  )
}

export default App
