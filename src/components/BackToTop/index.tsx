import { useState, useEffect } from "react";
import styles from "./BackToTop.module.css";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > window.innerHeight / 2);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`${styles.backToTop} ${isVisible ? styles.visible : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <FaArrowUp color="var(--color-background)" />
    </button>
  );
};

export default BackToTop;