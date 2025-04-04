import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productsQuantity, setProductsQuantity] = useState(0)
  const [error, setError] = useState(null);
  const [isCart, setIsCart] = useState(false);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = [
          'womens-dresses',
          'womens-bags',
          'womens-shoes',
          'mens-shirts',
          'mens-watches',
          'sunglasses',
        ];
  
        const responses = await Promise.all(
          categories.map(category => 
            fetch(`https://dummyjson.com/products/category/${category}?limit=30&skip=0`)
          )
        );
  
        const data = await Promise.all(
          responses.map(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
          })
        );

        const allProducts = data.flatMap(category => category.products);
        
        console.log(allProducts)
        setProducts(allProducts);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
   setTimeout(() => {fetchProducts()}, 500) ;
  }, []);

  //if (isLoading) return <div>Loading luxury items...</div>;
  if (error) return <div>Error loading products: {error}</div>;

  /*if(!isLoading)*/ return (
    <>
    <ScrollRestoration />
    <div>
     <Navbar cart={cart} productsQuantity={productsQuantity} isCart={isCart} setIsCart={setIsCart} />
     <div className="container">
      <Outlet  context={{ products, cart, setCart, setProductsQuantity }} />
      <Cart cart={cart} setCart={setCart} isCart={isCart} setIsCart={setIsCart} setProductsQuantity={setProductsQuantity} />
     </div>
    </div>
    </>
  )
}

export default App
