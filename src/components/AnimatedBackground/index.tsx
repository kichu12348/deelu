import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  FaBirthdayCake,
  FaGift,
  FaHeart,
  FaStar,
  FaMusic,
} from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { GiPartyPopper } from "react-icons/gi";
import styles from "./AnimatedBackground.module.css";

interface AnimatedBackgroundProps {
  intensity?: "low" | "medium" | "high";
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  intensity = "medium",
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const getParticleCount = () => {
    switch (intensity) {
      case "low":
        return 15;
      case "medium":
        return 25;
      case "high":
        return 40;
      default:
        return 25;
    }
  };

  const celebrationIcons = [
    FaBirthdayCake,
    FaGift,
    FaHeart,
    FaStar,
    FaMusic,
    MdCelebration,
    GiPartyPopper,
  ];

  useEffect(() => {
    if (!backgroundRef.current || !particlesRef.current) return;

    const particlesContainer = particlesRef.current;

    particlesContainer.innerHTML = "";

    // Create particles
    const particleCount = getParticleCount();
    const particles: HTMLElement[] = [];

    // Create bubbles
    for (let i = 0; i < particleCount * 1.5; i++) {
      const bubble = document.createElement("div");
      bubble.className = `${styles.particle} ${styles.bubble}`;

      // Random size between 10px and 50px
      const size = Math.random() * 40 + 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      // Random position
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.top = `${Math.random() * 100}%`;

      particlesContainer.appendChild(bubble);
      particles.push(bubble);
    }

    // Create icon particles
    for (let i = 0; i < particleCount; i++) {
      const iconContainer = document.createElement("div");
      iconContainer.className = `${styles.particle} ${styles.icon}`;

      // Random size between 15px and 35px
      const size = Math.random() * 20 + 15;
      iconContainer.style.fontSize = `${size}px`;

      // Random position
      iconContainer.style.left = `${Math.random() * 100}%`;
      iconContainer.style.top = `${Math.random() * 100}%`;

      // Random icon
      const IconComponent =
        celebrationIcons[Math.floor(Math.random() * celebrationIcons.length)];
      const iconSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      iconSvg.setAttribute("viewBox", "0 0 24 24");
      iconSvg.style.width = "100%";
      iconSvg.style.height = "100%";

      // Use an inline SVG approach for icons
      iconContainer.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor">
        <path d="${getIconPath(IconComponent.name)}"></path>
      </svg>`;

      particlesContainer.appendChild(iconContainer);
      particles.push(iconContainer);
    }

    // Create decorative shapes
    for (let i = 0; i < particleCount * 0.5; i++) {
      const shapeContainer = document.createElement("div");
      shapeContainer.className = `${styles.shapeContainer}`;

      // Random size between 30px and 70px
      const size = Math.random() * 40 + 30;
      shapeContainer.style.width = `${size}px`;
      shapeContainer.style.height = `${size}px`;

      // Random position
      shapeContainer.style.left = `${Math.random() * 100}%`;
      shapeContainer.style.top = `${Math.random() * 100}%`;

      // Add SVG shape
      const shapeType = Math.floor(Math.random() * 3);
      let shapePath = "";

      switch (shapeType) {
        case 0: // Star
          shapePath =
            "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
          break;
        case 1: // Heart
          shapePath =
            "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
          break;
        case 2: // Circle
          shapePath =
            "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z";
          break;
      }

      shapeContainer.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <path class="${styles.shape}" d="${shapePath}"></path>
      </svg>`;

      particlesContainer.appendChild(shapeContainer);
      particles.push(shapeContainer);
    }

    // Animate particles
    particles.forEach((particle) => {
      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.3,
        duration: 2,
        delay: Math.random() * 2,
      });
      animateParticle(particle);
    });

    // Cleanup
    return () => {
      gsap.killTweensOf(particles);
    };
  }, [intensity]);

  const getIconPath = (iconName: string) => {
    switch (iconName) {
      case "FaBirthdayCake":
        return "M12 6a2 2 0 0 0-2 2c0 .11 0 .22.07.33.09.11.22.2.37.2.3 0 .41-.09.41-.33 0-.35.31-.66.67-.66s.67.31.67.66c0 .24.11.33.41.33.15 0 .28-.09.37-.2.07-.11.07-.22.07-.33 0-1.1-.9-2-2-2zm5 2c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-8 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm9.16 6.67l-2.99-7.46A1.02 1.02 0 0 0 14.27 6c-.26 0-.54.09-.75.26-.04.03-.07.04-.11.08l-1.14.83-1.37-1.37c-.17-.19-.38-.33-.61-.4-.01 0-.01-.01-.02-.01-.18-.07-.39-.07-.56 0-.01 0-.01.01-.02.01-.23.07-.44.21-.61.4l-1.37 1.37-1.14-.83c-.04-.04-.07-.05-.11-.08-.21-.17-.49-.26-.75-.26-.48 0-.89.33-1 .79l-2.99 7.46c-.11.28-.05.59.14.83.2.24.5.38.82.38h16c.32 0 .62-.14.82-.38.19-.24.25-.55.14-.83zM12 8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z";
      case "FaGift":
        return "M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 12 7.4l3.38 4.6L17 10.83 14.92 8H20v6z";
      case "FaHeart":
        return "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
      case "FaStar":
        return "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
      case "FaMusic":
        return "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z";
      case "MdCelebration":
        return "M2,22l14-5l-9-9L2,22z M12.35,16.18L5.3,18.7l2.52-7.05L12.35,16.18z M14.53,12.53l5.59-5.59c0.49-0.49,1.28-0.49,1.77,0 l0.59,0.59l1.06-1.06l-0.59-0.59c-1.07-1.07-2.82-1.07-3.89,0l-5.59,5.59L14.53,12.53z M10.06,6.88L9.47,7.47l1.06,1.06l0.59-0.59 c1.07-1.07,1.07-2.82,0-3.89l-0.59-0.59L9.47,4.53l0.59,0.59C10.54,5.6,10.54,6.4,10.06,6.88z M17.06,11.88l-1.59,1.59l1.06,1.06 l1.59-1.59c0.49-0.49,1.28-0.49,1.77,0l1.61,1.61l1.06-1.06l-1.61-1.61C19.87,10.81,18.13,10.81,17.06,11.88z M15.06,5.88 l-3.59,3.59l1.06,1.06l3.59-3.59c1.07-1.07,1.07-2.82,0-3.89l-1.59-1.59l-1.06,1.06l1.59,1.59C15.54,4.6,15.54,5.4,15.06,5.88z";
      case "GiPartyPopper":
        return "M14.53,1.45L13.45,2.53l0.71,0.71l1.06-1.08L14.53,1.45z M21.9,9.37l-0.79-0.79l-5.86,5.86l0.79,0.79L21.9,9.37z M11.25,8.46c1.08-1.08,1.08-2.83,0-3.89c-1.08-1.08-2.83-1.08-3.89,0c-1.08,1.08-1.08,2.83,0,3.89 C8.43,9.54,10.17,9.54,11.25,8.46z M18.46,11.03l-1.68-1.68l-5.15,5.15l1.68,1.68L18.46,11.03z M1.25,16.19l5.86,5.86l0.79-0.79 l-5.86-5.86L1.25,16.19z";

      default:
        return "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"; // Default to star
    }
  };

  const animateParticle = (particle: HTMLElement) => {
    const duration = Math.random() * 15 + 10;

    // Random movement range
    const xMovement = Math.random() * 50 - 25; // -25px to 25px
    const yMovement = Math.random() * 50 - 25; // -25px to 25px

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      onComplete: () => animateParticle(particle),
    });

    // Random rotation
    const rotation = Math.random() * 360;

    // Add animations to timeline
    tl.to(particle, {
      x: xMovement,
      y: yMovement,
      rotation: rotation,
      duration: duration,
      ease: "sine.inOut",
    });

    // Occasionally add a pulse animation
    if (Math.random() > 0.7) {
      tl.to(
        particle,
        {
          scale: Math.random() * 0.5 + 0.8,
          opacity: Math.random() * 0.3 + 0.2,
          duration: duration / 2,
          yoyo: true,
          repeat: 1,
        },
        0
      ); // Start at the same time
    }
  };

  return (
    <div ref={backgroundRef} className={styles.background}>
      <div ref={particlesRef} className={styles.particles}></div>
      <div className={styles.gradientOverlay}></div>
    </div>
  );
};

export default AnimatedBackground;
