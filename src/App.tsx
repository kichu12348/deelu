import { useState, useEffect } from "react";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen";
import AnimatedBackground from "./components/AnimatedBackground";
import Hero from "./components/Hero";
import WhoIsDeelu from "./components/WhoIsDeelu";
import Gallery from "./components/Gallery";
import Congratulations from "./components/Congratulations";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = "/loader/loader.webm";
    video.load();
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <LoadingScreen
          onLoadingComplete={handleLoadingComplete}
          duration={5000} // 5 seconds loading time
        />
      )}

      {!loading && (
        <>
          <AnimatedBackground intensity="medium" />
          <div className="container">
            <Hero />
            <WhoIsDeelu />
            <Gallery />
            <Congratulations />
          </div>
          <Footer />
          <BackToTop />
        </>
      )}
    </>
  );
}

export default App;
