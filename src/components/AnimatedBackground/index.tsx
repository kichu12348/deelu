import { useEffect, useState, useMemo } from "react";
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

interface Particle {
  id: number;
  Icon: React.ElementType;
  style: React.CSSProperties;
  className: string;
}

interface AnimatedBackgroundProps {
  intensity?: "low" | "medium" | "high";
}

const celebrationIcons = [
  FaBirthdayCake,
  FaGift,
  FaHeart,
  FaStar,
  FaMusic,
  MdCelebration,
  GiPartyPopper,
];

const animationClasses = [styles.float, styles.sway, styles.pulseAndFloat];

const getParticleCount = (intensity: "low" | "medium" | "high") => {
  switch (intensity) {
    case "low":
      return 20;
    case "medium":
      return 35;
    case "high":
      return 50;
    default:
      return 35;
  }
};

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  intensity = "medium",
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const particleCount = useMemo(() => getParticleCount(intensity), [intensity]);

  useEffect(() => {
    const generatedParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const Icon =
        celebrationIcons[Math.floor(Math.random() * celebrationIcons.length)];
      const randomAnimationClass =
        animationClasses[Math.floor(Math.random() * animationClasses.length)];

      const size = Math.random() * 25 + 15;
      const animationDuration = Math.random() * 15 + 10;
      const animationDelay = Math.random() * 10;

      generatedParticles.push({
        id: i,
        Icon,
        className: `${styles.particle} ${randomAnimationClass}`,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          fontSize: `${size}px`,
          animationDuration: `${animationDuration}s`,
          animationDelay: `-${animationDelay}s`,
        },
      });
    }

    setParticles(generatedParticles);
  }, [particleCount]);

  return (
    <div className={styles.background}>
      <div className={styles.particlesContainer}>
        {particles.map(({ id, Icon, style, className }) => (
          <div key={id} style={style} className={className}>
            <Icon />
          </div>
        ))}
      </div>
      <div className={styles.gradientOverlay}></div>
    </div>
  );
};

export default AnimatedBackground;
