import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import styles from "./Gallery.module.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const galleryItems = [
  {
    id: 1,
    imagePath: "/images/image1.jpg",
    note: "Deelu accepting his award for 'Most Likely to Accidentally Become a Cringe Master.' So proud!",
    position: 44,
    side: "left",
  },
  {
    id: 2,
    imagePath: "/images/image2.jpg",
    note: "When Deelu tries to be suave but ends up looking like a '90s boy band member who fell over. Still fabulous, though.🔥",
    position: 360,
    side: "right",
  },
  {
    id: 3,
    imagePath: "/images/image3.jpg",
    note: "Deep in thought, or just calculating how many more snacks he can eat before anyone notices. Probably both.",
    position: 680,
    side: "left",
  },
  {
    id: 4,
    imagePath: "/images/image4.jpg",
    note: "That moment when Deelu realizes he's accidentally on camera but embraces the chaos with a winning smile.",
    position: 980,
    side: "right",
  },
  {
    id: 5,
    imagePath: "/images/image5.jpg",
    note: "Dis just sus 🤨",
    position: 1300,
    side: "left",
  },
];

function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const path = svgRef.current.querySelector("path");
    const rocketImage = svgRef.current.querySelector("image");
    if (!path || !rocketImage) return;

    const pathTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    pathTl.to(
      path,
      {
        strokeDashoffset: -200,
        ease: "none",
      },
      0
    );

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${galleryItems[index].position - 50}px center`,
            end: `top+=${galleryItems[index].position + 50}px center`,
            toggleActions: "play none none reverse",
          },
        })
        .fromTo(
          item,
          {
            x: galleryItems[index].side === "left" ? -100 : 100,
            y: 30,
            opacity: 0,
            rotation: galleryItems[index].side === "left" ? -10 : 10,
          },
          {
            x: galleryItems[index].side === "left" ? 180 : -180,
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          }
        )
        .fromTo(
          item.querySelector(`.${styles.stickyNote}`),
          {
            y: 20,
            opacity: 0,
            rotation: galleryItems[index].side === "left" ? 5 : -5,
          },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
    });

    // Cleanup
    return () => {
      pathTl.kill();
    };
  }, []);

  // Assign refs to items
  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      itemsRef.current[index] = el;
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <h2 className={styles.title}>Da Journey</h2>
      <div className={styles.svgContainer}>
        <svg
          ref={svgRef}
          className={styles.curvyPath}
          viewBox="0 0 100 1500"
          preserveAspectRatio="none"
        >
          <path
            d="M50,0 C70,100 30,200 50,300 C70,400 30,500 50,600 C70,700 30,800 50,900 C70,1000 30,1100 50,1200 C70,1300 30,1400 50,1500" // Extended the path
            stroke="var(--color-accent)"
            strokeWidth="5"
            fill="none"
          />
          <image
            href="/icons/rocket.svg"
            x="45"
            y="10"
            width="10"
            height="20"
            opacity="0"
          />
        </svg>

        {/* Gallery Items */}
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => setItemRef(el, index)}
            className={`${styles.polaroidContainer} ${styles[item.side]}`}
            style={{ top: `${item.position}px` }}
          >
            <div className={styles.polaroid}>
              <div className={styles.imageContainer}>
                <img
                  src={item.imagePath}
                  alt={`Memory ${item.id}`}
                  className={styles.image}
                  onError={() => handleImageError(item.id)}
                  style={{
                    display: imageErrors[item.id] ? "none" : "block",
                  }}
                />
                {imageErrors[item.id] && (
                  <div className={styles.fallbackImage}>Memory #{item.id}</div>
                )}
              </div>
              <div className={styles.polaroidCaption}>Memory #{item.id}</div>
            </div>
            <div className={styles.stickyNote}>
              <p>{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
