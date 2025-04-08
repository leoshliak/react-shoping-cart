import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({cart, productsQuantity, isCart, setIsCart, isActive, setIsActive}) => {
  return (
    <header>
        <div className="header-container">
          <div onClick={() => setIsActive(!isActive)} className={`menu-icon ${isActive ? 'active' : ''}`} role="button" aria-label="menu">
            <span></span>
          </div>
        <div className="logo equal">
       <h2>VogueNest</h2>
        </div>
        <nav className={`nav ${isActive ? 'active' : ''}`}>
        <ul>
            <NavLink to='/'><li>Home</li></NavLink>
            <NavLink to='/shop'><li>Shop</li></NavLink>
            <NavLink to='/about'><li>About us</li></NavLink>
            <NavLink to='/contact'><li>Contact</li></NavLink>
        </ul>
        </nav>
      <div className="cart equal">
        <div role='button' aria-hidden="true" className="cart-con" onClick={() => { 
          setIsCart(true)
          document.body.style.overflow = 'hidden';
          }}>
        <img src="/shopping-cart-reverse.svg" width="40" height="40" role="img" alt="cart" />
        <span style={{display: productsQuantity > 0 ? 'flex' : 'none'}}  className='quantity'>{productsQuantity}</span>
        </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar