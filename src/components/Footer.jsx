import React from 'react'

const Footer = () => {
  return (
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
  )
}

export default Footer