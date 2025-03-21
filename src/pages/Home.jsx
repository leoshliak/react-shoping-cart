import React from 'react'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Home = () => {

const navigate = useNavigate();

  return (
    <>
    <div className='home' id='home'>
      <div className="home-text">
        <h1>Elevate Your Style, Define Your Look</h1>
        <p>Discover the latest fashion trends and timeless accessories that bring out the best in you. Step into confidence with VogueNest.</p>
        <button onClick={() => navigate('/shop')}>Shop Now</button>
        </div>
    </div>
    <div className="fashion-inspo" id='inspo'>
      <h2>Discover Your Signature Look</h2>
      <div className="inspo-con">
  <div className="inspo-text">
    <p>Style is more than just clothing—it's an expression of who you are. Explore curated fashion inspirations that bring confidence and elegance to your everyday life.</p>
  </div>
  <div className="inspo-images">
    <div className="img-div"><img src="/minimalistic_chic.jpg" alt="Minimalist Chic" /></div>
    <div className="img-div"><img src="/street.jpg" alt="Streetwear Vibes" /></div>
    <div className="img-div"><img src="/elegancy.jpg" alt="Classic Elegance" /></div>
  </div></div>
</div>
      <div className="some-info" id='info'>
        <h2>Refine Your Wardrobe</h2>
        <div className="info-con">
          <div className="info">
            <div className="info-text">
            <h3>Fashion That Speaks for You</h3>
            <p>Every outfit tells a story. Whether you're aiming for effortless chic or bold statements, VogueNest brings you fashion that resonates with your personality. Choose from our curated collection of timeless pieces and trend-setting styles.</p>
            </div>
            <div className="info-img"><img src="/pexels-eliasdecarvalho-1006994.jpg" alt="" /></div>
          </div>
          <div className="info">
            <div className="info-img"><img src="/bg.webp" alt="" /></div>
            <div className="info-text">
             <h3>Designed for Elegance, Crafted for Comfort</h3>
            <p>Our pieces are more than just clothing; they are experiences. Crafted with high-quality materials and sustainable practices, VogueNest ensures that fashion is not only stylish but also conscious and enduring.</p>
            </div>
          </div>

          <div className="info">
            <div className="info-text">
            <h3>Dress with Confidence, Walk with Power</h3>
            <p>Great fashion is about more than looking good—it's about feeling unstoppable. Whether you're dressing for a special occasion or daily elegance, VogueNest helps you step out in style and self-assurance.</p>
            </div>
            <div className="info-img"><img src="/man.jpg" alt="" /></div>
          </div>
        </div>
      </div>
    <div className="featured" id='featured'>
      <h2>Featured Items</h2>
      <div className="items">
        <div className="item">
          <img src="/logo.png" alt="item" />
          <div className="text">
          <h3 className='title'>Title</h3>
          <p className="price">52$</p>
          <button>Add to cart</button></div>
        </div>

        <div className="item">
          <img src="/logo.png" alt="item" />
          <div className="text">
          <h3 className='title'>Title</h3>
          <p className="price">52$</p>
          <button>Add to cart</button></div>
        </div>

        <div className="item">
          <img src="/logo.png" alt="item" />
          <div className="text">
          <h3 className='title'>Title</h3>
          <p className="price">52$</p>
          <button>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div className="footer-container">
      <div className="footer-section">
      <h4>VogueNest</h4>
      <p>Redefining fashion through timeless elegance and modern sensibility.</p>
      <div className="social-icons">
        <a href="#"><i className="fa-brands fa-instagram"></i></a>
        <a href="#"><i className="fa-brands fa-pinterest"></i></a>
        <a href="#"><i className="fa-brands fa-facebook"></i></a>
      </div>
    </div>

    <div className="footer-section">
      <h4>Navigation</h4>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href='#inspo'>Discover Style</a></li>
        <li><a href="#info">Refine  Wardrobe</a></li>
        <li><a href="#featured">Featured Items</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>Collections</h4>
      <ul>
        <li><a href="#">Minimalist Chic</a></li>
        <li><a href="#">Streetwear Vibes</a></li>
        <li><a href="#">Classic Elegance</a></li>
        <li><a href="#">New Arrivals</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>Contact</h4>
      <p>voguenest@example.com</p>
      <p>+1 (555) 234-5678</p>
     <p>Open Daily: 9AM - 6PM EST</p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; 2025 VogueNest. Crafted with elegance.</p>
    <div className="legal-links">
      <a href="#">Privacy Policy</a> | 
      <a href="#">Terms of Service</a>
    </div>
        </div>
    </footer>
    </>
  )
}

export default Home