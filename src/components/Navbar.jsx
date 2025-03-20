import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
        <div className="header-container">
        <div className="logo equal">
       <img src="" alt="" />
       <h2>UStore</h2>
        </div>
        <ul>
            <NavLink to='/'><li>Home</li></NavLink>
            <NavLink to='/shop'><li>Shop</li></NavLink>
            <NavLink to='/about'><li>About us</li></NavLink>
            <NavLink to='/shop'><li>Shop</li></NavLink>
            <NavLink to='/shop'><li>Shop</li></NavLink>
        </ul>
      <div className="cart equal">
        <div className="cart-con">
        <img src="/shopping-cart-reverse.svg" width="40" height="40" />
        <span className='quantity'>0</span>
        </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar