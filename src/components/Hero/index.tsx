import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Hero.module.css';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate title
    tl.fromTo(titleRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );
    
    // Animate content with slight delay
    tl.fromTo(contentRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );
    
  }, []);

  return (
    <div ref={containerRef} className={styles.heroContainer}>
      <h1 ref={titleRef} className={styles.heroTitle}>Happy Birthday Deelu!</h1>
      
      <p ref={contentRef} className={styles.heroContent}>
        Hope your day is as awesome as you are!
      </p>
    </div>
  );
};

export default Hero;