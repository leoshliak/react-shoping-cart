// pages/ProductPage.jsx
import { useParams, useLocation, useOutletContext } from 'react-router-dom';
import '../styles/ProductPage.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProductPage = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const { products, cart, setCart ,setProductsQuantity } = useOutletContext();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);
  
  // Get product from navigation state or find in products array
  const product = state?.product || products.find(p => p.id.toString() === productId);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-page">
      <i class="fa-solid fa-arrow-left" onClick={() => navigate('/shop')}></i>
      <div className="container">
      <div className="gallery">
        
        <div className="img-options">
        {product.images.map((img, index) => (
          <img  key={index} src={img} alt={`${product.title} - ${index + 1}`} onClick={() => setMainImage(img)} />
        ))}
        </div>
        <img src={mainImage === '' ? product.images[0] : mainImage} alt="" className="show-image" />
      </div>
      <div className="product-info">
      <h1>{product.title}</h1>
      <div className="price-review"><p className='price-text'>Price: {product.price}$</p>
      <div className="review">
        <p>★★★★★</p>
        <i className="fa-regular fa-comment"></i>
      </div></div>
      <div className="des-div">
      <p className='des'>{product.description}</p>
      <div className={`additional-det-container ${showMore ? 'visible' : ''}`}>
    <div className="additional-det">
      <ul>
        <li>Dimensions: {product.dimensions.height} × {product.dimensions.width} × {product.dimensions.depth}</li>
        <li>Category: {product.category}</li>
        <li>Shipping: {product.shippingInformation}</li>
        <li>Warranty: {product.warrantyInformation}</li>
        <li>Available status: {product.availabilityStatus}</li>
      </ul>
    </div>
  </div>
  <span onClick={() => setShowMore(!showMore)}>
    {showMore ? 'Show less' : 'Show more'}
  </span>
      </div>
      <div class="product-amount">{itemQuantity <= 1 ? <button disabled>-</button> :  <button onClick={() => {setItemQuantity(prev => prev - 1)}}>-</button>}
      <input type='number' min={1} value={itemQuantity} onChange={(e) => {setItemQuantity(e.target.value)}} class="count"></input>
      <button onClick={() => {setItemQuantity(prev => prev + 1)}}>+</button></div>
      <div className="button-div"><button className='product-add' onClick={() => {
        const check = cart.find(item => item.title === product.title);
        setProductsQuantity(prevQuantity => prevQuantity + itemQuantity)
        if(check == undefined) {
          setCart(prevCart => [...prevCart, {...product, quantity: itemQuantity}]);
        } else {
          const existingIndex = cart.findIndex(item => item.title === product.title);
          setCart(prevCart => 
            prevCart.map((item, index) => ( 
              index === existingIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item))
          );
        }
      }}>Add to Cart</button></div>
      </div>
    </div>
    </div>
  );
};

export default ProductPage;