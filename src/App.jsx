import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {

 const [cart, setCart] = useState([])

  return (
    <div>
     <Navbar cart={cart} />
     <div className="container">
     <Outlet />
     </div>
    </div>
  )
}

export default App
