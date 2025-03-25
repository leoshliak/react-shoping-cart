import React, { useState } from 'react'
import '../styles/Shop.css'
import { useOutletContext } from 'react-router-dom';

const Shop = () => {
  const { products, cart, setCart, setProductsQuantity } = useOutletContext();
  const [currentCategory, setCurrentCategory] = useState('all');
  
  const categories = [
    { id: 'all', label: 'All products' },
    { id: 'womens-dresses', label: "Women's dresses" },
    {id: 'womens-bags', label: "Women's bags" },
    { id: 'womens-shoes', label: "Women's shoes" },
    { id: 'mens-shirts', label: "Men's shirts" },
    { id: 'mens-watches', label: "Watches" },
    { id: 'sunglasses', label: "Sunglasses" }
  ];

 const handleCategoryChange = (categoryId) => {
  setCurrentCategory(categoryId);
 }

  return (
    <>
    <div className='shop'>
        <aside>
          <div className="filter">
            <h3>Categories</h3>
            <ul className="categories">
              {categories.map((category) => (
                <li key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={currentCategory === category.id ? 'active' : ''}>
                  {category.label}</li>
              ))}
            </ul>
          </div>
        </aside>
        <main>
          <h2>{categories.find(c => c.id === currentCategory)?.label || 'All products'}</h2>
          <div className="products">
            {currentCategory === 'all' ? 
            products.map((product) => (
              <div className='product-card' key={product.id}>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.price}$</p>
      <button onClick={() => {
        const check = cart.find(item => item.title === product.title);
        setProductsQuantity(prevQuantity => prevQuantity + 1)
        if(check == undefined) {
        setCart(prevCart => [...prevCart, {...product, quantity: 1}]);
      } else {
        const existingIndex = cart.findIndex(item => item.title === product.title);
        setCart(prevCart => 
          prevCart.map((item, index) => ( 
            index === existingIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item))
        );
      }
      console.log(cart)
      }}>Add to cart</button>
    </div>
            ))
            : products.filter((product) => (product.category === currentCategory)).map((product) =>(
              <div className='product-card' key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.price}$</p>
              <button onClick={() => {
               const check = cart.find(item => item.title === product.title);
               setProductsQuantity(prevQuantity => prevQuantity + 1)
               if(check == undefined) {
               setCart(prevCart => [...prevCart, {...product, quantity: 1}]);
             } else {
               const existingIndex = cart.findIndex(item => item.title === product.title);
               setCart(prevCart => 
                 prevCart.map((item, index) => ( 
                   index === existingIndex
                     ? { ...item, quantity: item.quantity + 1 }
                     : item))
               );
             }
             console.log(cart)
              }}>Add to cart</button>
            </div>
            ))}
          </div>
        </main>
    </div>
    </>
  )
}

export default Shop