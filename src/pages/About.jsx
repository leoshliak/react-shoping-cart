import {React, useEffect} from 'react'
import '../styles/About.css'
import Footer from '../components/Footer'
import useScrollAnimation from '../components/useScrollAnimation'

const About = () => {

  useScrollAnimation();

  useEffect(() => {
    const handleBeforeUnload = () => sessionStorage.removeItem('animations-played');
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className='about-container'>
         <div className="general-info">
          <div className="general-text">
            <h1 className='anim-items no-hide'>About us</h1>
          <p className='anim-items no-hide'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, quisquam, maxime aliquid eveniet aperiam nostrum culpa dolorem reprehenderit vero totam provident odit sed, aspernatur libero illo ullam et. Similique odio accusamus sapiente consequuntur sint molestias. Vel maxime, voluptatibus, itaque optio omnis laudantium veritatis alias rem voluptate fugiat, dolor tempora libero.</p>
          </div>
          <div className="inspo-images">
            <div class="about-img-div anim-items no-hide"><img alt="Minimalist Chic" src="/minimalistic_chic.jpg" /></div>
            <div class="about-img-div anim-items no-hide"><img alt="Streetwear Vibes" src="/street.jpg" /></div>
            <div class="about-img-div anim-items no-hide"><img alt="Classic Elegance" src="/elegancy.jpg" /></div></div>
         </div>
          <div className="specializations">
            <h2 className='anim-items no-hide'>Our Specialization</h2>
            <div className="info-con">
          <div className="about-info anim-items no-hide" id='one'>
              <div className="info-text">
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sapiente quod, velit perferendis illum laudantium earum minus incidunt at labore! Consequuntur fugit totam voluptatibus eaque expedita? Dignissimos cumque quo excepturi optio itaque repudiandae? Quia labore animi voluptates quas perferendis nam debitis consectetur pariatur sapiente obcaecati quis commodi repudiandae atque autem, minima corporis.</p>
                </div>
                <div className="info-img ">
                <img alt="" src="/dress.jpg" />
                </div>
                </div>
                <div className="about-info anim-items no-hide" id='two'>
                <div className="info-img">
                <img alt="" src="/bags.jpg" /></div>
              <div className="info-text">
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sapiente quod, velit perferendis illum laudantium earum minus incidunt at labore! Consequuntur fugit totam voluptatibus eaque expedita? Dignissimos cumque quo excepturi optio itaque repudiandae? Quia labore animi voluptates quas perferendis nam debitis consectetur pariatur sapiente obcaecati quis commodi repudiandae atque autem, minima corporis.</p>
                </div>
          </div>
          <div className="about-info anim-items no-hide" id='three'>
              <div className="info-text">
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sapiente quod, velit perferendis illum laudantium earum minus incidunt at labore! Consequuntur fugit totam voluptatibus eaque expedita? Dignissimos cumque quo excepturi optio itaque repudiandae? Quia labore animi voluptates quas perferendis nam debitis consectetur pariatur sapiente obcaecati quis commodi repudiandae atque autem, minima corporis.</p>
                </div>
                <div className="info-img">
                <img alt="" src="/watches.webp" />
                </div>
                </div>
                <div className="about-info anim-items no-hide" id='four'>
                  <div className="info-img">
                <img alt="" src="/shoes.jpg" />
                </div>
              <div className="info-text">
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sapiente quod, velit perferendis illum laudantium earum minus incidunt at labore! Consequuntur fugit totam voluptatibus eaque expedita? Dignissimos cumque quo excepturi optio itaque repudiandae? Quia labore animi voluptates quas perferendis nam debitis consectetur pariatur sapiente obcaecati quis commodi repudiandae atque autem, minima corporis.</p>
                </div>
                </div>
                <div className="about-info anim-items no-hide" id='five'>
              <div className="info-text">
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sapiente quod, velit perferendis illum laudantium earum minus incidunt at labore! Consequuntur fugit totam voluptatibus eaque expedita? Dignissimos cumque quo excepturi optio itaque repudiandae? Quia labore animi voluptates quas perferendis nam debitis consectetur pariatur sapiente obcaecati quis commodi repudiandae atque autem, minima corporis.</p>
                </div>
                <div className="info-img">
                <img alt="" src="/shirt.jpg" />
                </div>
                </div>
                <div className="about-info anim-items no-hide" id='six'>
                  <div className="info-img">
                <img alt="" src="/sunglacces.jpg" />
                </div>
              <div className="info-text">
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sapiente quod, velit perferendis illum laudantium earum minus incidunt at labore! Consequuntur fugit totam voluptatibus eaque expedita? Dignissimos cumque quo excepturi optio itaque repudiandae? Quia labore animi voluptates quas perferendis nam debitis consectetur pariatur sapiente obcaecati quis commodi repudiandae atque autem, minima corporis.</p>
                </div>
                </div>
          </div>
          </div>
         <div className="important  anim-items no-hide">
          <h2>This is not a real store</h2>
          <p>This is a fictional store, and none of the products displayed here exist.</p>
          <p>Products information and images: <a href="https://dummyjson.com/docs" target='_blank'>DummyJSON API.</a></p>
          <p>Other photos on this app were taken from <a href="https://www.pexels.com/" target='_blank'>Pexels</a> and <a href="https://unsplash.com/" target='_blank'>Unshplash.</a></p>
          <p className='code'>Source code: <a href="https://github.com/leoshliak/react-shoping-cart" target='_blank'><i class="fa-brands fa-github"></i></a></p>
         </div>
         <Footer />
    </div>
  )
}

export default About