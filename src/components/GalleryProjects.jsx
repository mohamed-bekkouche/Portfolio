import { useState, useEffect, useRef, useCallback } from "react";

const GalleryProjects = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const galleryRef = useRef(null);
  const topRowPositionRef = useRef(0);
  const bottomRowPositionRef = useRef(0);
  const row3PositionRef = useRef(0);
  const row4PositionRef = useRef(0);

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

  const row3Images = [
    "images/Gallery/g2.webp",
    "images/Gallery/scc3.webp",
    "images/Gallery/g14.webp",
    "images/Gallery/g7.webp",
    "images/Gallery/g4.webp",
    "images/Gallery/scc2.webp",
    "images/Gallery/g10.webp",
  ];

  const getCardWidth = useCallback(() => {
    const vw = window.innerWidth;
    if (vw < 480) return vw * 0.72;
    if (vw < 768) return vw * 0.55;
    if (vw < 1024) return vw * 0.42;
    return Math.min(500, vw * 0.32);
  }, []);

  const GAP = 16;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isInView) return;

      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollDelta = currentScrollTop - lastScrollTop;

      if (currentScrollTop !== lastScrollTop) {
        const moveAmount = scrollDelta * 0.5;

        topRowPositionRef.current += moveAmount;
        bottomRowPositionRef.current -= moveAmount;
        row3PositionRef.current += moveAmount;
        row4PositionRef.current -= moveAmount;

        const cardWidth = getCardWidth();
        const rowWidth = (cardWidth + GAP) * topRowImages.length;

        if (Math.abs(topRowPositionRef.current) > rowWidth)
          topRowPositionRef.current = 0;
        if (Math.abs(bottomRowPositionRef.current) > rowWidth)
          bottomRowPositionRef.current = 0;
        if (Math.abs(row3PositionRef.current) > rowWidth)
          row3PositionRef.current = 0;
        if (Math.abs(row4PositionRef.current) > rowWidth)
          row4PositionRef.current = 0;
      }

      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop, isInView, topRowImages.length, getCardWidth]);

  return (
    <>
      <style>{`
        .gallery-card {
          width: clamp(200px, 72vw, 500px);
          height: clamp(128px, 45vw, 320px);
        }
        .gallery-card-desktop {
          width: clamp(200px, 72vw, 500px);
          height: clamp(128px, 45vw, 320px);
        }
        @media (min-width: 768px) {
          .gallery-card,
          .gallery-card-desktop {
            width: clamp(220px, 32vw, 500px);
            height: clamp(140px, 20vw, 320px);
          }
          .gallery-row-mobile {
            display: none;
          }
        }
      `}</style>

      <div
        ref={galleryRef}
        className="w-full overflow-hidden min-h-dvh flex justify-center items-center"
      >
        <div className="w-full">
          {/* Row 1 */}
          <div className="relative mb-4 flex justify-end">
            <div
              className="flex gap-4"
              style={{
                transform: `translateX(${topRowPositionRef.current * 2}px)`,
                transition: "transform 3s linear",
              }}
            >
              {topRowImages.map((src, index) => (
                <div key={index} className="gallery-card flex-none">
                  <img
                    src={src}
                    alt={`Gallery top ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="relative mb-4 flex justify-start">
            <div
              className="flex gap-4"
              style={{
                transform: `translateX(${bottomRowPositionRef.current * 2}px)`,
                transition: "transform 3s linear",
              }}
            >
              {bottomRowImages.map((src, index) => (
                <div key={index} className="gallery-card flex-none">
                  <img
                    src={src}
                    alt={`Gallery bottom ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 — mobile only */}
          <div className="gallery-row-mobile relative mb-4 flex justify-end">
            <div
              className="flex gap-4"
              style={{
                transform: `translateX(${row3PositionRef.current * 2}px)`,
                transition: "transform 3s linear",
              }}
            >
              {row3Images.map((src, index) => (
                <div key={index} className="gallery-card flex-none">
                  <img
                    src={src}
                    alt={`Gallery row3 ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryProjects;
