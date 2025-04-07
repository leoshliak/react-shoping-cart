import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const animationKey = 'animations-played';
    const hasPlayed = sessionStorage.getItem(animationKey);

    const animItems = document.querySelectorAll('.anim-items');
    
    if (hasPlayed) {
      // If animations already played, add active class immediately
      animItems.forEach(item => item.classList.add('s-active'));
      return;
    }

    const animScroll = () => {
      let allAnimated = true;
      
      animItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (inView && !item.classList.contains('s-active')) {
          item.classList.add('s-active');
        }
        
        if (!item.classList.contains('s-active')) allAnimated = false;
      });

      if (allAnimated) {
        sessionStorage.setItem(animationKey, 'true');
        window.removeEventListener('scroll', animScroll);
      }
    };

    window.addEventListener('scroll', animScroll);
    animScroll(); // Initial check

    return () => window.removeEventListener('scroll', animScroll);
  }, []);
};

export default useScrollAnimation;