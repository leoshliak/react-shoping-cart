
import React, { useState, useEffect } from 'react'
import '../styles/Shop.css'
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const { products, cart, setCart, setProductsQuantity } = useOutletContext();
  const [currentCategory, setCurrentCategory] = useState('all');
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [loadedHoverImages, setLoadedHoverImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      products.forEach(product => {
        // Preload both thumbnail and hover image
        const hoverImg = new Image();
        hoverImg.src = product.images[1];
        hoverImg.onload = () => {
          setLoadedHoverImages(prev => ({ ...prev, [product.id]: true }));
        };
      });
    }
  }, [products]);

  
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
          <div className="top"><h2>{categories.find(c => c.id === currentCategory)?.label || 'All products'}</h2></div>
          <div className="products">
            {currentCategory === 'all' ? 
            products.map((product) => (
              <div className='product-card' key={product.id}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              onClick={(e) => {
                if (!e.target.closest('button')) {
                  navigate(`/shop/${product.id}`, { 
                    state: { product}
                  });
                  window.scrollTo({
                    top: 0,
                    behavior: 'auto'
                  });
                }
              }}
              >
      <div className="image-wrapper">
       <img src={product.thumbnail} alt={product.title} className="main-image"
         style={{ 
           opacity: hoveredProductId === product.id ? 0 : 1,
           transition: 'opacity 0.4s ease-in-out' 
               }}
  />
       <img src={product.images[1]}  alt={product.title} className="hover-image"
          style={{ 
          opacity: hoveredProductId === product.id && loadedHoverImages[product.id] ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out' 
                }}
  />
   </div>
      <div className="rest">
      <h3>{product.title}</h3>
      <p className='price'>{product.price}$</p>
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
      }}>Add to cart</button></div>
    </div>
            ))
            : products.filter((product) => (product.category === currentCategory)).map((product) =>(
              <div className='product-card' key={product.id}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              onClick={(e) => {
                if (!e.target.closest('button')) {
                  navigate(`/shop/${product.id}`, { 
                    state: { product } 
                  });
                }
              }}
              >
              <div className="image-wrapper">
              <img src={product.thumbnail} alt={product.title} className="main-image"
                 style={{ 
                    opacity: hoveredProductId === product.id ? 0 : 1,
                    transition: 'opacity 0.4s ease-in-out' 
                      }}
  />
              <img src={product.images[1]} alt={product.title} className="hover-image"
                 style={{ 
                    opacity: hoveredProductId === product.id && loadedHoverImages[product.id] ? 1 : 0,
                    transition: 'opacity 0.4s ease-in-out' 
                       }}
  />  
  </div>
              <div className="rest">
              <h3>{product.title}</h3>
              <p className='price'>{product.price}$</p>
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
              }}>Add to cart</button></div>
            </div>
            ))}
          </div>
        </main>
    </div>
    </>
  )
}

export default Shop
