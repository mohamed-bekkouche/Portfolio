import { useEffect, useRef } from "react";
import { FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiExpress,
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiStripe,
  SiChartdotjs,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const techs = [
  { id: 0, name: "JavaScript", icon: <FaJs /> },
  { id: 1, name: "TypeScript", icon: <SiTypescript /> },
  { id: 2, name: "React Js", icon: <FaReact /> },
  { id: 8, name: "Tailwind", icon: <SiTailwindcss /> },
  { id: 3, name: "Next Js", icon: <SiNextdotjs /> },
  { id: 4, name: "Node Js", icon: <FaNodeJs /> },
  { id: 5, name: "Express Js", icon: <SiExpress /> },
  { id: 6, name: "MongoDB", icon: <SiMongodb /> },
  { id: 7, name: "MySQL", icon: <SiMysql /> },
  { id: 9, name: "Stripe", icon: <SiStripe /> },
  { id: 10, name: "Chart Js", icon: <SiChartdotjs /> },
  { id: 11, name: "React Native", icon: <TbBrandReactNative /> },
];

const Techs = () => {
  const TechsRefs = useRef([]);
  const techDivRef = useRef(null);
  const TechRef = useRef(null);

  useEffect(() => {
    const currentTechRef = TechRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (techDivRef.current) {
              techDivRef.current.classList.add("scale-100");
            }
            TechsRefs.current.forEach((ref) => {
              if (ref) ref.classList.add("fade-tech");
            });
          }
        });
      },
      { threshold: 0.6 },
    );

    if (currentTechRef) observer.observe(currentTechRef);
    return () => {
      if (currentTechRef) observer.unobserve(currentTechRef);
    };
  }, []);

  return (
    <div
      ref={TechRef}
      className="w-full bg-primary relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <header className="mb-10 sm:mb-14 text-center">
        <p className="font-caniculeDisplay text-xs sm:text-sm tracking-[0.25em] uppercase text-tertiary mb-1">
          My Stack
        </p>
        <h2 className="font-caniculeDisplay font-black text-white text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-none tracking-tight">
          Techs
        </h2>
        <div className="w-8 sm:w-12 h-0.5 bg-secondary mx-auto mt-3 sm:mt-4" />
      </header>

      {/* ── Grid ── */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Glowing orb */}
        <div
          ref={techDivRef}
          className="
            absolute left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80
            rounded-full bg-secondary
            opacity-30 blur-3xl
            scale-0 duration-700
            pointer-events-none z-0
          "
        />

        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {techs.map((tech, i) => (
            <div
              key={tech.id}
              ref={(el) => (TechsRefs.current[i] = el)}
              // ✅ Only animationDelay here — NO inline opacity/transform/transition
              // Those were fighting the CSS animation and making cards visible immediately
              style={{ animationDelay: `${150 + 70 * i}ms` }}
              className="
                group relative
                bg-[#111111] hover:bg-[#0d0d0d]
                border border-transparent hover:border-secondary/20
                rounded-xl overflow-hidden
                flex flex-col items-center justify-center
                h-28 sm:h-36 lg:h-44
                cursor-pointer
                text-white hover:text-secondary
                duration-300
                hover:shadow-[0_0_24px_rgba(60,207,145,0.08)]
                opacity-0
              "
            >
              {/* top accent sweep */}
              <div
                className="
                absolute top-0 left-0 right-0 h-[2px]
                bg-secondary
                scale-x-0 group-hover:scale-x-100
                origin-left transition-transform duration-300
              "
              />

              {/* icon */}
              <span
                className="
                text-3xl sm:text-4xl lg:text-5xl
                mb-2 sm:mb-3
                transition-transform duration-300
                group-hover:-translate-y-1
              "
              >
                {tech.icon}
              </span>

              {/* name */}
              <span
                className="
                font-caniculeDisplay font-medium
                text-[0.6rem] sm:text-xs lg:text-sm
                tracking-[0.15em] uppercase
                text-tertiary group-hover:text-secondary
                transition-colors duration-300
                px-2 text-center
              "
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Techs;
