import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingScreen = ({
  onLoadingComplete,
  duration = 3000,
}: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          if (onLoadingComplete) {
            setTimeout(onLoadingComplete, 300);
          }
          return 100;
        }
        
        const increment = 100 / (duration / 100);
        return Math.min(prevProgress + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onLoadingComplete]);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.videoContainer}>
        <video className={styles.loadingVideo} autoPlay playsInline muted loop>
          <source src="/loader/loader.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className={styles.loadingText}>
        Loading Deelu's Birthday Surprise...
      </div>
    </div>
  );
};

export default LoadingScreen;
