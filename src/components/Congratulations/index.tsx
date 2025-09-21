import { useEffect, useState } from "react";
import styles from "./Congratulations.module.css";

interface ConfettiParticle {
  id: number;
  style: React.CSSProperties;
}

const birthDate = new Date(2005, 8, 22);
const today = new Date();
const age = today.getFullYear() - birthDate.getFullYear();
const hasHadBirthdayThisYear =
  today.getMonth() > birthDate.getMonth() ||
  (today.getMonth() === birthDate.getMonth() &&
    today.getDate() >= birthDate.getDate());
const [number1, number2] = `${hasHadBirthdayThisYear ? age : age - 1}`.split(
  ""
);

const CONFETTI_COUNT = 150;
const COLORS = ["#ff7b54", "#ff9e7d", "#ffc177", "#8bdb81", "#ffb085"];

function Congratulations() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    const generatedParticles: ConfettiParticle[] = Array.from({
      length: CONFETTI_COUNT,
    }).map((_, i) => ({
      id: i,
      style: {
        backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 8 + 6}px`, // 6px to 14px
        height: `${Math.random() * 8 + 6}px`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${Math.random() * 3 + 2}s`, // 2s to 5s
      },
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.confettiContainer}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={styles.confetti}
            style={particle.style}
          />
        ))}
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>Congrats Deelu!</h2>

        <div className={styles.ageContainer}>
          <div className={`${styles.number} ${styles.number1}`}>{number1}</div>
          <div className={`${styles.number} ${styles.number2}`}>{number2}</div>
        </div>

        <p className={styles.message}>
          Finally, you've reached the big{" "}
          <span className={styles.highlight}>{number1 + "" + number2}</span>!
          Welcome to the club of people who can no longer use the teen excuse.
          You're officially too old for teen drama but still too young for a
          quarter-life crisis. Perfect balance! Happy Birthday! 🎉
        </p>

        <div className={styles.emoji}>🎂 🎁 🎊 🥳 🎈</div>
      </div>
    </div>
  );
}

export default Congratulations;
