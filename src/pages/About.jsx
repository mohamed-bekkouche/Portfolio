import { useEffect, useRef } from "react";

function About() {
  const box1Ref = useRef([]);
  const box2Ref = useRef([]);
  const AboutRef = useRef();
  const BgGreen = useRef();

  useEffect(() => {
    const currentAboutRef = AboutRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (BgGreen.current) {
              BgGreen.current.classList.add("scale-100");
            }
            box1Ref.current.forEach((ref) => {
              if (ref) ref.classList.add("fade-scaling");
            });
            box2Ref.current.forEach((ref) => {
              if (ref) ref.classList.add("fade-scaling");
            });
          }
        });
      },
      { threshold: 0.9 },
    );

    if (currentAboutRef) {
      observer.observe(currentAboutRef);
    }

    return () => {
      if (currentAboutRef) {
        observer.unobserve(currentAboutRef);
      }
    };
  }, []);
  return (
    <div
      id="About"
      ref={AboutRef}
      className="relative w-full bg-primary h-[100vh] min-h-[100vh] px-5 overflow-hidden"
    >
      <div className="w-full sticky top-0 h-full flex justify-center items-center pr-[50px] pl-[70px]">
        <div className="grid grid-cols-10 gap-[14px]  absolute bottom-0 left-1/4 -translate-x-1/2 -translate-y-10 rotate-[15deg] z-[9999999] bg-transparent w-fit h-fit ">
          {Array.from({ length: 100 }, (_, index) => (
            <div
              style={{ animationDelay: `${10 * (index % 100)}ms` }}
              ref={(el) => (box1Ref.current[index] = el)}
              key={index}
              className="w-[5px] h-[5px] rounded-full bg-secondary scale-0"
            />
          ))}
        </div>
        <div className="max-w-[550px]">
          <h1 className="text-[3rem] text-white w-full h-1/2 mb-1 font-bold font-roboto uppercase leading-[4.5rem] flex items-center gap-3">
            ⚡️
            <span className="">About Me</span>
          </h1>
          <p className=" text-left text-[1.4rem] text-white font-medium leading-[2rem]">
            Hello!{" "}
            <span className="text-[1.3rem] font-bold  text-secondary">
              I’m Mohamed Bekkouche
            </span>
            , a full-stack developer with 2+ years of experience crafting
            seamless, functional, and visually engaging digital solutions for
            e-commerce, education, and startups
            <span className="font-bold text-secondary">
              . Let’s create something extraordinary!
            </span>
          </p>
        </div>
        <div className="h-full min-w-[700px] max-w-[800px] relative overflow-hidden">
          <div className="grid grid-cols-10 gap-[14px]  absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-[75%]  bg-transparent w-fit h-fit ">
            {Array.from({ length: 100 }, (_, index) => (
              <div
                style={{
                  animationDelay: `${10 * (index % 100)}ms`,
                }}
                ref={(el) => (box2Ref.current[index] = el)}
                key={index}
                className="w-[5px] h-[5px] rounded-full bg-secondary scale-0"
              />
            ))}
          </div>
          <div
            ref={BgGreen}
            className="w-[700px] h-[700px] bg-secondary absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full translate-y-1/2 scale-0 duration-500"
          ></div>
          <img
            className="w-full absolute bottom-0 left-1/2 -translate-x-1/2"
            src="/images/me.webp"
            alt="Me"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
