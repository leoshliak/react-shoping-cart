import { useParams, useLocation, useOutletContext } from 'react-router-dom';
import '../styles/ProductPage.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProductPage = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const { products, cart, setCart ,setProductsQuantity, } = useOutletContext();
  const navigate = useNavigate();
  const [itemQuantity, setItemQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);
   const [mainImage, setMainImage] = useState('');
   const [imageLoading, setImageLoading] = useState(true);

  // Get product from navigation state or find in products array
  const product = state?.product || products.find(p => p.id.toString() === productId);
  const sameCategory = products.filter((item) => item.category === product.category && item.id != productId);
  const sugProducts = sameCategory.filter((_, index) => index < 3 );

  useEffect(() => {
    if (product) {
      product.images.forEach(img => {
        const image = new Image();
        image.src = img;
      });
      
      sugProducts.forEach(item => {
        item.images.forEach(img => {
          const image = new Image();
          image.src = img;
        });
      });
    }
  }, [product, sugProducts]);

  const Stars = ({number}) => {
    const starArray = []
     for (let i = 0; i < number; i++) {
       starArray.push('★')
     }
    const starsString = starArray.join("");
    return <p className='stars'>{starsString}</p>
  }

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-page">
      <i class="fa-solid fa-arrow-left" onClick={() => navigate('/shop')}></i>
      <div className="container">
      <div className="gallery">
        
        <div className="img-options">
        {product.images.map((img, index) => (
          <img  key={index} className={img === mainImage || mainImage === '' && index === 0 ? 'active' : ''}
           src={img} alt={`${product.title} - ${index + 1}`} onClick={() => {
            setImageLoading(true)
            setMainImage(img)
          }}
          loading='lazy' />
        ))}
        </div>
        <div className="show-image">
  {imageLoading && <div className="image-loader">Loading...</div>}
  <img 
    src={mainImage === '' ? product.images[0] : mainImage} 
    alt=""  
    onLoad={() => setImageLoading(false)}
    onError={() => setImageLoading(false)}
    style={{ opacity: imageLoading ? 0 : 1 }}
    key={product.id} // Force re-render on product change
  />
</div>
      </div>
      <div className="product-info">
      <h1>{product.title}</h1>
      <div className="price-review"><p className='price-text'>Price: {product.price}$</p>
      <div className="review">
        <p className='rating'>{product.rating}</p>
        <Stars number={Math.round(product.rating)} />
        <a href="#reviews"><i className="fa-regular fa-comment"></i></a>
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
  <span className='more-less' onClick={() => setShowMore(!showMore)}>
    {showMore ? 'Show less' : 'Show more'}
  </span>
      </div>
      <div class="product-amount">{itemQuantity <= 1 ? <button disabled>-</button> :  <button onClick={() => {setItemQuantity(prev => prev - 1)}}>-</button>}
      <input type='number' min={1} value={itemQuantity} onChange={(e) => {setItemQuantity(e.target.value)}} class="count"></input>
      <button onClick={() => {setItemQuantity(prev => prev + 1)}}>+</button></div>
     <button className='product-add' onClick={() => {
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
      }}>Add to Cart</button>
      </div>
    </div>
    <div className="suggestions">
      <h2>You may also like</h2>
      <div className="sug-items">
        {sugProducts.map((item) => (
         <div className="sug-item" key={item.id} onClick={(e) => {
          if (!e.target.closest('button')) {
            setMainImage(item.images[0]);
            navigate(`/shop/${item.id}`, { 
              state: { item }
            });
            setItemQuantity(1);
            setShowMore(false)
          }
         }}>
         <img src={item.thumbnail} alt="item" />
         <div className="text">
         <h3 className='title'>{item.title}</h3>
         <p className="price">{item.price}$</p>
         <button onClick={() => {
           const check = cart.find(target => target.title === item.title);
           setProductsQuantity(prevQuantity => prevQuantity + 1)
           if(check == undefined) {
           setCart(prevCart => [...prevCart, {...item, quantity: 1}]);
         } else {
           const existingIndex = cart.findIndex(target => target.title === item.title);
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
    </div>

    <div className="reviews">
  <h2>Reviews</h2>
  <div className="reviews-con" id='reviews'>
    {product.reviews?.length > 0 ? (
      product.reviews.map((review, index) => (
        <div className="review-card" key={index}>
          <div className="review-header">
            <div className="reviewer-info">
              <h4>{review.reviewerName}</h4>
              <p className="review-email">{review.reviewerEmail}</p>
            </div>
            <div className="review-meta">
              <div className="rating-stars">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="review-date">
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))
    ) : (
      <p className="no-reviews">No reviews yet</p>
    )}
  </div>
</div>
    </div>
  );
};

export default ProductPage;