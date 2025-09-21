import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Congratulations.module.css";

function Congratulations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !messageRef.current || !confettiRef.current) return;
    
    // Create confetti particles
    const confettiCount = 100;
    const colors = ["#ff7b54", "#ff9e7d", "#ffc177", "#8bdb81", "#ffb085"];
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = styles.confetti;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confettiRef.current.appendChild(confetti);
    }

    // Animate confetti
    gsap.fromTo(
      `.${styles.confetti}`,
      {
        y: -100,
        opacity: 1,
      },
      {
        y: "100vh",
        rotation: "+=360",
        duration: () => Math.random() * 2 + 2,
        ease: "power1.out",
        stagger: 0.02,
        repeat: -1,
        repeatRefresh: true,
      }
    );

    // Animate title with a bounce effect
    gsap.fromTo(
      titleRef.current,
      {
        scale: 0.8,
        opacity: 0,
        y: -50,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate message
    gsap.fromTo(
      messageRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate number
    gsap.fromTo(
      `.${styles.number}`,
      {
        scale: 0.5,
        opacity: 0,
        rotation: -10,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        delay: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
    
    // Clean up
    return () => {
      gsap.killTweensOf(`.${styles.confetti}`);
      gsap.killTweensOf(titleRef.current);
      gsap.killTweensOf(messageRef.current);
      gsap.killTweensOf(`.${styles.number}`);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.confettiContainer} ref={confettiRef}></div>
      
      <div className={styles.content}>
        <h2 className={styles.title} ref={titleRef}>
          Congrats Deelu!
        </h2>
        
        <div className={styles.ageContainer}>
          <div className={styles.number}>2</div>
          <div className={styles.number}>0</div>
        </div>
        
        <p className={styles.message} ref={messageRef}>
          Finally, you've reached the big <span className={styles.highlight}>20</span>! 
          Welcome to the club of people who can no longer use the teen excuse. 
          You're officially too old for teen drama but still too young for a quarter-life crisis. 
          Perfect balance! Happy Birthday! 🎉
        </p>
        
        <div className={styles.emoji}>
          🎂 🎁 🎊 🥳 🎈
        </div>
      </div>
    </div>
  );
}

export default Congratulations;