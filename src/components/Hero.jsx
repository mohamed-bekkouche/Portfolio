import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect, useRef } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { motion } from "framer-motion";

function Hero() {
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const delay = isMdUp ? 2100 : 500;
  const heroRef = useRef(null);

  useEffect(() => {
    // Ensure hero container has dimensions
    if (heroRef.current) {
      const height = heroRef.current.clientHeight;
      if (height < 600) {
        heroRef.current.style.minHeight = "600px";
      }
    }
  }, []);

  return (
    <div
      ref={heroRef}
      className="w-full md:w-5/6 lg:w-4/5 text-white min-h-[600px] relative"
    >
      <h1 className="text-2xl sm:text-[2.75rem] md:text-5xl lg:text-6xl xl:text-[4.3rem] text-nowrap leading-[3rem] font-bold mb-3 md:mb-7 uppercase relative">
        <span
          style={{ animationDelay: `${delay - 100}ms` }}
          className="flex items-center gap-2 text-secondary text-[1.2rem] md:text-[1.6rem] rotate-[-5deg] origin-bottom-left translate-x-[-20%] w-fit relative z-10 capitalize opacity-0 fade-in-right"
        >
          {" "}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: (delay + 20) / 1000,
            }}
            className="md:hidden w-20 h-20 rounded-full bg-secondary"
          >
            <img
              className="w-full h-full object-cover rounded-full"
              alt="me"
              src="/images/me_sm.webp"
            />{" "}
          </motion.div>
          Hey, It's Me.{" "}
        </span>
        <span className="relative z-10 flex flex-wrap">
          {"Mohamed Bekkouch".split("").map((e, i) => (
            <div
              key={i}
              style={{ animationDelay: `${delay + 20 * i}ms` }}
              className="fade-in-down opacity-0"
            >
              {e === " " ? "\u00A0" : e}
            </div>
          ))}
          <div
            style={{ animationDelay: `${delay + 320}ms` }}
            className="flip-container opacity-0 fade-in-down"
          >
            <div
              style={{ animationDelay: `${delay + 500}ms` }}
              className={`letter`}
            >
              e
            </div>
          </div>
        </span>
      </h1>
      <p
        style={{ animationDelay: `${delay + 400}ms` }}
        className="text-[1rem] md:text-[1.7rem] mb-8 text-tertiary font-medium md:font-bold fade-in-down delay-100 opacity-0"
      >
        <span className="text-white">Software Engineer. </span>I Love To Bring
        Ideas to Life,
        <br /> One Line of Code at a Time.
      </p>
      <p
        style={{ animationDelay: `${delay + 500}ms` }}
        className="text-sm md:text-[1.1rem] text-tertiary font-normal fade-in-down opacity-0 mb-1"
      >
        <span className="text-white text-xl md:text-[2rem]"> 🧑🏻‍💻 </span>Currently
        specializing in{" "}
        <span className="text-secondary font-semibold">FullStack</span> (Mern
        Stack)
      </p>
      <p
        style={{ animationDelay: `${delay + 600}ms` }}
        className="text-sm md:text-[1.1rem] -mt-2 text-tertiary font-normal mb-10 fade-in-down opacity-0"
      >
        <span className="text-white text-xl md:text-[2rem]"> 🎓 </span> I hold a{" "}
        <span className="text-secondary font-semibold">Licence </span>
        degree in Information Technology from University <br /> Abdelhamid
        Mehri.
      </p>
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">
        <a
          style={{ animationDelay: `${delay + 700}ms` }}
          href="https://github.com/mohamed-bekkouche"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[90%] md:w-auto bg-[#171818] text-white font-bold text-[1.05rem] hover:bg-[#2d2f32] flex justify-center items-center gap-2 px-4 py-[10px] rounded-md duration-200 fade-in-down opacity-0"
        >
          <FaGithub className="text-secondary text-[1.3rem]" /> Github
        </a>

        <a
          style={{ animationDelay: `${delay + 750}ms` }}
          href="https://www.linkedin.com/in/mohamed-bekkouche/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[90%] md:w-auto bg-[#171818] text-white font-bold text-[1.05rem] hover:bg-[#2d2f32] flex justify-center items-center gap-2 px-4 py-[10px] rounded-md duration-200 fade-in-down opacity-0"
        >
          <FaLinkedin className="text-secondary text-[1.3rem]" /> Linkedin
        </a>

        <a
          style={{ animationDelay: `${delay + 800}ms` }}
          href="mailto:mohamed.bekkouche@univ-constantine2.dz"
          className="w-[90%] md:w-auto bg-[#171818] text-white font-bold text-[1.05rem] hover:bg-[#2d2f32] flex justify-center items-center gap-2 px-4 py-[10px] rounded-lg duration-200 fade-in-down opacity-0"
        >
          <FaEnvelope className="text-secondary text-[1.3rem]" /> Email
        </a>
      </div>
    </div>
  );
}

export default Hero;
