import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Cart from './components/Cart';
import Loading from './components/Loading';
import Error from './pages/Error';

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productsQuantity, setProductsQuantity] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart).reduce((acc, item) => acc + item.quantity, 0) : 0;
    } catch {
      return 0;
    }
  });
  const [error, setError] = useState(null);
  const [isCart, setIsCart] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
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

    const timer = setTimeout(fetchProducts, 500);
  
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
      setProductsQuantity(quantity);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cart]);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  if(!isLoading) return (
    <>
    <ScrollRestoration />
    <div>
     <Navbar cart={cart} productsQuantity={productsQuantity} isCart={isCart} setIsCart={setIsCart} isActive={isActive} setIsActive={setIsActive} />
     <div className="container">
      <Outlet  context={{ products, cart, setCart, setProductsQuantity, isActive, setIsActive }} />
      <Cart cart={cart} setCart={setCart} isCart={isCart} setIsCart={setIsCart} setProductsQuantity={setProductsQuantity} />
     </div>
    </div>
    </>
  )
}

export default App
