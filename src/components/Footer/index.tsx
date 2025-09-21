import { useState, useRef, useEffect } from "react";
import styles from "./Footer.module.css";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonMessages = [
    "Do Not Press",
    "hehehehehehehhehehehehehhehehe",
  ];

  const handleButtonClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        // Do nothing on click if already playing, just increment counter
        setClickCount((prev) => Math.min(prev + 1, buttonMessages.length - 1));
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        setClickCount(1);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false);
        setClickCount(0);
      };

      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.madeWith}>
          Made wid{" "}
          <span className={styles.heart}>
            <FaHeart color="red" />
          </span>{" "}
          by kichu
        </p>
        <button
          className={styles.button}
          onClick={handleButtonClick}
        >
          {isPlaying ? buttonMessages[clickCount] : buttonMessages[0]}
        </button>
      </div>

      <audio
        ref={audioRef}
        src="https://cdn.jsdelivr.net/gh/kichu12348/joooe@main/rolls.mp3"
        preload="auto"
      />
    </footer>
  );
};

export default Footer;
