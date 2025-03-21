import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({cart}) => {
 console.log(cart)
  return (
    <header>
        <div className="header-container">
        <div className="logo equal">
       <h2>VogueNest</h2>
        </div>
        <ul>
            <NavLink to='/'><li>Home</li></NavLink>
            <NavLink to='/shop'><li>Shop</li></NavLink>
            <NavLink to='/about'><li>About us</li></NavLink>
            <NavLink to='/contact'><li>Contact</li></NavLink>
            <NavLink to='/shop'><li>Shop</li></NavLink>
        </ul>
      <div className="cart equal">
        <div className="cart-con">
        <img src="/shopping-cart-reverse.svg" width="40" height="40" />
        <span style={{display: cart.length > 0 ? 'flex' : 'none'}}  className='quantity'>{cart.length}</span>
        </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar