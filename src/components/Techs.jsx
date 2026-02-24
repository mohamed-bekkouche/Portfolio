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

const Techs = () => {
  const techs = [
    {
      id: 0,
      name: "JavaScript",
      icon: <FaJs />,
    },
    {
      id: 1,
      name: "TypeScript",
      icon: <SiTypescript />,
    },
    {
      id: 2,
      name: "React Js",
      icon: <FaReact />,
    },
    {
      id: 8,
      name: "Tailwind",
      icon: <SiTailwindcss />,
    },
    {
      id: 3,
      name: "Next js",
      icon: <SiNextdotjs />,
    },
    {
      id: 4,
      name: "Node js",
      icon: <FaNodeJs />,
    },
    {
      id: 5,
      name: "Express js",
      icon: <SiExpress />,
    },
    {
      id: 6,
      name: "MongoDB",
      icon: <SiMongodb />,
    },
    {
      id: 7,
      name: "MySQL",
      icon: <SiMysql />,
    },
    {
      id: 9,
      name: "Stripe",
      icon: <SiStripe />,
    },
    {
      id: 10,
      name: "ChartJs",
      icon: <SiChartdotjs />,
    },
    {
      id: 11,
      name: "React Native",
      icon: <TbBrandReactNative />,
    },
  ];

  const TechsRefs = useRef([]);
  const techDivRef = useRef();
  const TechRef = useRef();

  useEffect(() => {
    const currentTechRef = TechRef.current; // Store in variable

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
      { threshold: 0.8 },
    );

    if (currentTechRef) {
      observer.observe(currentTechRef);
    }

    return () => {
      if (currentTechRef) {
        observer.unobserve(currentTechRef);
      }
    };
  }, []); // Empty dependency array is fine now

  return (
    <div ref={TechRef} className="w-full bg-primary relative py-10">
      <h2 className="text-[4rem] text-center font-medium mb-4 text-white">
        Techs
      </h2>
      <div className="w-full relative md:w-[80%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div
          ref={techDivRef}
          className="techDiv w-60 h-60 bg-secondary rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 duration-300"
        ></div>
        {techs.map((tech, i) => (
          <div
            ref={(el) => (TechsRefs.current[i] = el)}
            key={tech.id}
            style={{ animationDelay: `${200 + 100 * (i % techs.length)}ms` }}
            className="group relative bg-[#2d2f32] hover:bg-[#171818] rounded-md overflow-hidden hover:shadow-xl duration-300 flex items-center justify-center h-[190px] cursor-pointer text-white hover:text-secondary opacity-0 translate-y-[50px]"
          >
            <div className="h-fit p-6 ">
              <h1 className="justify-center flex mb-2 text-[3.2rem]">
                {tech.icon}
              </h1>
              <h2 className="text-center"> {tech.name} </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Techs;
