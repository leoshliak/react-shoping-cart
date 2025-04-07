import { React, useEffect, useState } from 'react'
import '../styles/Cart.css'

const Cart = ({ cart, setCart, isCart, setIsCart, setProductsQuantity }) => {
  const [total, setTotal] = useState(0)
  
  function updateTotal() {
    const newTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }  

  useEffect(() => {
    updateTotal();
  }, [cart])

  const updateCart = (newCart) => {
    try {
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };
  
  return (
    <div className={isCart ? 'cart-component active' : 'cart-component'}>
      <div className="cart-top">
        <h2>Cart</h2>
        <i className="fa-solid fa-xmark" onClick={() => {
          setIsCart(false)
          document.body.style.overflow = 'auto';
        }}></i>
      </div>
      <div className="cart-container">
        <div className="cart-list">
          {cart.map((item, index) => (
            <div className="cart-item" key={item.id}>
              <div><img src={item.thumbnail} alt={item.title} /></div>
              <div><p className="title">{item.title}</p></div>
              <div><p className='price'>{(item.price * item.quantity).toFixed(2)}$</p></div>
              <div className="amount">
                <button onClick={() => {
                  updateCart(prevCart => 
                    prevCart.map((cartItem, cartIndex) => 
                      cartIndex === index
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                    )
                  );
                  setProductsQuantity(prev => prev + 1);
                }}>+</button>
                <p className='count'>{item.quantity}</p>
                <button onClick={() => {
                  updateCart(prevCart => 
                    prevCart
                      .map((cartItem, cartIndex) => 
                        cartIndex === index
                          ? { ...cartItem, quantity: cartItem.quantity - 1 }
                          : cartItem
                      )
                      .filter(cartItem => cartItem.quantity > 0)
                  );
                  setProductsQuantity(prev => Math.max(prev - 1, 0));
                }}>-</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-bottom">
          <div className="total"><p>Total: <span>{total.toFixed(2)}$</span></p></div>
          <div className="buttons">
            <div className="checkout"><button>checkout</button></div>
            <div className="clear">
              <i className="fa-solid fa-trash-can" onClick={() => {
                localStorage.removeItem('cart');
                setCart([]);
                setProductsQuantity(0);
              }}></i>
            </div>    
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;