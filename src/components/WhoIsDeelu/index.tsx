import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhoIsDeelu.module.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const WhoIsDeelu = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const traitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create animation for section entrance
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate content
    gsap.fromTo(
      contentRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        delay: 0.4,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate traits with stagger
    gsap.fromTo(
      '.traitPillItem',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.6,
        scrollTrigger: {
          trigger: traitsRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <h2 ref={titleRef} className={styles.title}>Who is Deelu?</h2>
      
      <p ref={contentRef} className={styles.content}>
        <span className={styles.quoteMarks}>"</span>
        Deelu is that one chaotic friend who somehow manages to be both the 
        <span className={styles.highlight}> smartest</span> and the 
        <span className={styles.highlight}> silliest</span> person in the room. 
        Powered by memes, random bursts of energy, and snacks, his "creative thinking" 
        is usually just elite procrastination. Whether he's roasting you, sending cursed 
        reels at 2AM, or just being ridiculous, Deelu's energy is impossible to ignore — 
        which is exactly why we adore him.
      </p>
      
      <div ref={traitsRef} className={styles.traits}>
        <span className={`${styles.traitPill} traitPillItem`}>Chali Master</span>
        <span className={`${styles.traitPill} traitPillItem`}>Cringe Bringer</span>
        <span className={`${styles.traitPill} traitPillItem`}>Snack Enthusiast</span>
        <span className={`${styles.traitPill} traitPillItem`}>Sticker Connoisseur</span>
      </div>
    </div>
  );
};

export default WhoIsDeelu;