import { useEffect, useRef, useState } from "react";

const SplitText = ({ text, baseDelay = 0 }) =>
  text.split("").map((char, i) => (
    <span
      key={i}
      className="char-reveal inline-block"
      style={{ animationDelay: `${baseDelay + i * 55}ms` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

export default function About() {
  const AboutRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = AboutRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setRevealed(true);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [revealed]);

  return (
    <div
      id="About"
      ref={AboutRef}
      className="relative w-full bg-primary overflow-hidden min-h-screen"
    >
      <header className="mb-6 sm:mb-8 text-center">
        <p className="font-caniculeDisplay text-xs sm:text-sm tracking-[0.25em] uppercase text-tertiary mb-1">
          Who i am
        </p>
        <h2 className="font-caniculeDisplay font-black text-white text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-none tracking-tight">
          About Me
        </h2>
        <div className="w-8 sm:w-12 h-0.5 bg-secondary mx-auto mt-3 sm:mt-4" />
      </header>

      <div className="hidden lg:flex w-full h-fit items-stretch">
        <div className="relative flex flex-col justify-between w-[50%] xl:w-[46%] px-14 xl:px-20 py-16 z-10">
          <div className="flex flex-col gap-7">
            <div
              className={`blk ${revealed ? "on" : ""}`}
              style={{ animationDelay: "150ms" }}
            >
              <p className="font-bold text-xs uppercase text-secondary">
                Full-Stack Developer
              </p>
            </div>

            <div>
              <h1
                className={`font-caniculeDisplay font-black text-white leading-none ${revealed ? "chars-active" : ""}`}
                style={{
                  fontSize: "clamp(3rem,5.5vw,5rem)",
                  letterSpacing: "-.025em",
                }}
              >
                <SplitText text="Mohamed" baseDelay={200} />
                <br />
                <SplitText text="Bekkouche" baseDelay={500} />
              </h1>

              {/* accent rule */}
              <div
                className={`blk ${revealed ? "on" : ""} mt-5 flex items-center gap-3`}
                style={{ animationDelay: "950ms" }}
              >
                <div className="w-10 h-0.5 bg-secondary" />

                <div className="w-1 h-1 rounded-full bg-secondary opacity-70 shrink-0" />
                <div className="w-4 h-px bg-secondary/25" />
              </div>
            </div>

            <p
              className={`font-medium text-sm text-white/70 md:text-[1.1rem] leading-6 blk ${revealed ? "on" : ""} max-w-[400px] mb-4`}
              style={{ animationDelay: "1050ms" }}
            >
              2+ years crafting{" "}
              <span className="font-bold text-secondary">
                seamless, functional
              </span>{" "}
              digital solutions for e-commerce, education, and startups. I work
              across the full stack — pixel-perfect UIs to robust APIs.{" "}
              <span className="font-bold text-secondary">
                Let's build something extraordinary.
              </span>
            </p>

            <button
              className={`blk block w-fit ${revealed ? "on" : ""}`}
              style={{ animationDelay: "1350ms" }}
            >
              <a
                href="#Projects"
                className="font-bold text-sm leading-5 uppercase text-tertiary border border-tertiary
                px-7 py-3 bg-transparent rounded-lg cursor-pointer hover:bg-secondary hover:text-primary hover:border-secondary duration-200"
              >
                View My Work →
              </a>
            </button>
          </div>
        </div>

        <div className="relative flex items-center py-20 z-10 flex-shrink-0">
          <div
            className="w-px h-full"
            style={{
              background:
                "linear-gradient(to bottom,transparent,rgba(60,207,145,.35) 25%,rgba(60,207,145,.35) 75%,transparent)",
            }}
          />
        </div>

        <div className="relative flex-1 flex items-end justify-center overflow-hidden">
          <span className="font-caniculeDisplay top-1/3 left-1/2 -translate-x-1/2 text-nowrap -translate-y-1/2 text-[clamp(5rem,12vw,8.5rem)] -tracking-wide leading-4 font-black text-transparent absolute custom-stroke">
            BEKKOUCHE
          </span>
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
                rounded-full bg-[#3ccf923f]
                w-[420px] h-[420px] xl:w-[630px] xl:h-[630px]
                blur-3xl z-0"
          ></div>
          <img
            className="relative z-20  w-auto max-w-[90%] xl:max-w-full"
            style={{
              maxHeight: "calc(100vh - 2rem)",
              objectFit: "contain",
              objectPosition: "bottom",
            }}
            src="/images/me_sm.webp"
            alt="Mohamed Bekkouche"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex lg:hidden flex-col h-fit">
        <div
          className="relative w-full overflow-hidden flex items-end justify-center"
          style={{ height: "60vw", minHeight: "280px", maxHeight: "420px" }}
        >
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
                rounded-full bg-[#3ccf923f]
                w-[420px] h-[420px] xl:w-[630px] xl:h-[630px]
                blur-3xl z-0"
          ></div>

          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to top, #000 0%, transparent 55%)",
            }}
          />

          <img
            className="relative z-20 w-auto max-w-[85%]"
            style={{
              maxHeight: "100%",
              objectFit: "contain",
              objectPosition: "bottom",
            }}
            src="/images/me_sm.webp"
            alt="Mohamed Bekkouche"
            loading="lazy"
          />
          <span className="font-caniculeDisplay top-1/3 left-1/2 -translate-x-1/2 text-nowrap tracking-wide -translate-y-1/2 text-[clamp(4rem,12vw,5rem)] font-black text-transparent absolute custom-stroke">
            BEKKOUCHE
          </span>
        </div>

        <div className="flex flex-col gap-6 px-5 sm:px-8 py-10 flex-1 ">
          <div>
            <p className="font-bold leading-3 text-xs uppercase text-secondary mb-3">
              Full-Stack Developer
            </p>
            <h1
              className={`font-caniculeDisplay font-black text-white leading-none ${revealed ? "chars-active" : ""}`}
              style={{
                fontSize: "clamp(1.9rem,9vw,3.5rem)",
                letterSpacing: "-.02em",
              }}
            >
              <SplitText text="Mohamed" baseDelay={100} />
              <span> </span>
              <SplitText text="Bekkouche" baseDelay={400} />
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-0.5 bg-secondary" />
              <div className="w-1 h-1 rounded-full bg-secondary opacity-70 shrink-0" />
            </div>
          </div>

          <p
            className={`font-medium text-sm text-white/70 md:text-[1.1rem] leading-6 blk ${revealed ? "on" : ""} max-w-[400px] mb-4`}
            style={{ animationDelay: "1050ms" }}
          >
            2+ years crafting{" "}
            <span className="font-bold text-secondary">
              seamless, functional
            </span>{" "}
            digital solutions for e-commerce, education, and startups. I work
            across the full stack — pixel-perfect UIs to robust APIs.{" "}
            <span className="font-bold text-secondary">
              Let's build something extraordinary.
            </span>
          </p>

          <button
            className={`blk mx-auto block w-fit ${revealed ? "on" : ""}`}
            style={{ animationDelay: "1350ms" }}
          >
            <a
              href="#Projects"
              className="font-bold text-sm leading-5 uppercase
                px-7 py-3 rounded-lg cursor-pointer bg-secondary text-primary"
            >
              View My Work →
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
