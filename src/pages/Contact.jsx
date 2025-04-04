import React from 'react';
import '../styles/Contact.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p className="hero-text">
          We're here to help you elevate your style journey. Reach out for personalized fashion advice, 
          order support, or partnership opportunities.
        </p>
      </section>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <div className="card-title">
            <i className="fa-solid fa-envelope"></i>
            <h3>Email Us</h3>
            </div>
            <p>support@voguenest.com</p>
            <p>press@voguenest.com</p>
          </div>

          <div className="info-card">
            <div className="card-title">
            <i className="fa-solid fa-phone"></i>
            <h3>Call Us</h3>
            </div>
            <p>+1 (555) 234-5678</p>
            <p>Mon-Fri: 9AM - 6PM EST</p>
          </div>

          <div className="info-card">
            <div className="card-title">
            <i className="fa-solid fa-location-dot"></i>
            <h3>Visit Us</h3>
            </div>
            <p>VogueNest Studios</p>
            <p>123 Fashion Avenue</p>
            <p>New York, NY 10001</p>
          </div>
        </div>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Alexa Styles" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="hello@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select id="subject">
              <option value="general">General Inquiry</option>
              <option value="orders">Order Support</option>
              <option value="collab">Collaboration</option>
              <option value="press">Press Inquiry</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              rows="5" 
              placeholder="Share your style needs..."
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>

      <div className="map-container">
        <iframe
          title="VogueNest Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343004!2d-73.98542828459378!3d40.74844447932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25903c3d8b8cd%3A0xafd473adb0943c1!2s123%20Fashion%20Ave%2C%20New%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sca!4v1717445674304!5m2!1sen!2sca"
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactPage;