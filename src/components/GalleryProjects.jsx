import { useState, useEffect, useRef } from "react";

const GalleryProjects = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const galleryRef = useRef(null);
  const topRowPositionRef = useRef(0);
  const bottomRowPositionRef = useRef(0);

  const topRowImages = [
    "images/Gallery/g1.webp",
    "images/Gallery/g2.webp",
    "images/Gallery/g4.webp",
    "images/Gallery/scc3.webp",
    "images/Gallery/ssc1.webp",
    "images/Gallery/g10.webp",
    "/images/Gallery/verticcity2.webp",
    "images/Gallery/g14.webp",
  ];

  const bottomRowImages = [
    "images/Gallery/g7.webp",
    "images/Gallery/g9.webp",
    "images/Gallery/scc4.webp",
    "images/Gallery/g13.webp",
    "/images/Gallery/verticcity1.webp",
    "images/Gallery/g15.webp",
    "images/Gallery/scc2.webp",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      },
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isInView) return; // Only process scroll when gallery is in view

      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollDelta = currentScrollTop - lastScrollTop;

      if (currentScrollTop !== lastScrollTop) {
        const moveAmount = scrollDelta * 0.5;

        topRowPositionRef.current += moveAmount;
        bottomRowPositionRef.current -= moveAmount;

        const rowWidth = (300 + 16) * topRowImages.length;

        if (Math.abs(topRowPositionRef.current) > rowWidth) {
          topRowPositionRef.current = 0;
        }
        if (Math.abs(bottomRowPositionRef.current) > rowWidth) {
          bottomRowPositionRef.current = 0;
        }
      }
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop, isInView, topRowImages.length]);

  return (
    <div
      ref={galleryRef}
      className="w-full overflow-hidden min-h-dvh flex justify-center items-center"
    >
      <div className="container">
        <div className="relative mb-4 flex justify-end">
          <div
            className="flex gap-4"
            style={{
              transform: `translateX(${topRowPositionRef.current * 2}px)`,
              transition: "transform 3s linear",
            }}
          >
            {[...topRowImages].map((src, index) => (
              <div key={index} className="flex-none w-[500px] h-[320px]">
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="relative flex justify-start">
          <div
            className="flex gap-4"
            style={{
              transform: `translateX(${bottomRowPositionRef.current * 2}px)`,
              transition: "transform 3s linear",
            }}
          >
            {[...bottomRowImages].map((src, index) => (
              <div key={index} className="flex-none w-[500px] h-[320px]">
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryProjects;
