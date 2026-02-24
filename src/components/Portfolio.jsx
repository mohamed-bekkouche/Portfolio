import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";

import { GiNetworkBars } from "react-icons/gi";
import { FaBatteryThreeQuarters, FaWifi } from "react-icons/fa";
import MagneticButton from "./MagneticButton";

const ProjectContent = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "center start"],
  });

  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.5]);
  const boxShadowValue = useTransform(
    shadowOpacity,
    (value) => `0px 40px 70px -10px rgba(255, 255, 255, ${value})`,
  );

  //   const currentId = parseInt(projectId);

  //   const currentProject = projects.find((pr) => pr.id === currentId) || null;
  //   setProject(currentProject);

  //   const nextProjectData =
  //     projects.find((pr) => pr.id === currentId + 1) || projects[0];
  //   setNextProject(nextProjectData);

  //   window.scrollTo(0, 0);
  // }, [projectId]);
  useEffect(() => {
    const currentId = parseInt(projectId);

    const currentProject = projects.find((pr) => pr.id === currentId) || null;
    setProject(currentProject);

    const nextProjectData =
      projects.find((pr) => pr.id === currentId + 1) || projects[0];
    setNextProject(nextProjectData);

    window.scrollTo(0, 0);

    if (ref.current) {
      ref.current.style.transform = "none";
    }
  }, [projectId]);

  if (!project) {
    return <div>Project Not Found</div>;
  }

  return (
    <div className="text-white">
      <div className="fixed top-0 left-0 h-fit w-screen flex items-start z-50 gap-[0.5px]">
        <div
          style={{ animationDelay: "0.25s" }}
          className="flex-1 bg-secondary h-screen shrinkheight"
        ></div>
        <div
          style={{ animationDelay: "0.175s" }}
          className="flex-1 bg-secondary h-screen shrinkheight"
        ></div>
        <div
          style={{ animationDelay: "0.1s" }}
          className="flex-1 bg-secondary h-screen shrinkheight"
        ></div>
        <div
          style={{ animationDelay: "0.175s" }}
          className="flex-1 bg-secondary h-screen shrinkheight"
        ></div>
        <div
          style={{ animationDelay: "0.25s" }}
          className="flex-1 bg-secondary h-screen shrinkheight"
        ></div>
      </div>
      <div className="h-screen w-[90%] mx-auto flex justify-center flex-col items-center">
        <div className="w-full pb-1 flex items-center justify-between text-lg font-bold text-tertiary relative">
          <div
            style={{ animationDelay: "0.7s" }}
            className="fade-in-up opacity-0 translate-y-3"
          >
            {project?.category} / {project?.year}
          </div>
          {project.link && (
            <Link
              target="_blank"
              to={project.link}
              className="absolute top-2 -right-10 transform  -translate-y-1/2 z-20"
            >
              <MagneticButton>Live</MagneticButton>
            </Link>
          )}
        </div>
        <div className="borderTop w-0 h-[1.5px] mx-auto bg-tertiary mb-2"></div>
        <div className="w-full flex justify-center items-start pt-3 ">
          <div className="flex-1">
            <h1 className="text-9xl font-caniculeDisplay font-black mb-2 -mt-5 flex items-center">
              {" "}
              {/* {project?.title}{" "} */}
              {project?.title.split("").map((e, i) => (
                <div
                  key={i}
                  style={{
                    animationDelay: `${1000 + 75 * i}ms`,
                  }}
                  className="fade-in-up opacity-0 "
                >
                  {" "}
                  {e}{" "}
                </div>
              ))}
            </h1>

            <p className="text-2xl font-normal text-tertiary w-4/5 mb-8 flex items-center flex-wrap">
              {project?.description.split("").map((e, i) => (
                <div
                  key={i}
                  style={{
                    animationDuration: "0.1s",
                    animationDelay: `${
                      project?.title.length * 75 + 1000 + 4 * i
                    }ms`,
                  }}
                  className="fade-in-down opacity-0"
                >
                  {e === " " ? "\u00A0" : e}{" "}
                </div>
              ))}
            </p>
            <h2
              style={{
                animationDuration: "0.4s",
                animationDelay: `${
                  project?.title.length * 75 +
                  1100 +
                  4 * project?.description.length
                }ms`,
              }}
              className="text-3xl fade-in-down uppercase mb-3 font-medium opacity-0"
            >
              {" "}
              Technologies :{" "}
            </h2>
            <div className="flex items-center gap-5 text-xl">
              {project?.techs?.map((tech) => (
                <div
                  key={tech.name}
                  style={{
                    animationDuration: "0.4s",
                    animationDelay: `${
                      project?.title.length * 75 +
                      1500 +
                      4 * project?.description.length
                    }ms`,
                  }}
                  className="bg-white/10 rounded-full px-7 py-3 w-fit flex items-center gap-2 hover:bg-white/15 duration-100 fade-in-down opacity-0"
                >
                  <span className="text-2xl"> {tech?.icon} </span>
                  <span> {tech?.name} </span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ animationDelay: "1.1s", animationDuration: "0.5s" }}
            className="w-[290px] relative overflow-hidden fade-scaling scale-0"
          >
            <img
              className="w-full relative z-10"
              alt="phone"
              loading="lazy"
              src="/images/iphone.png"
            />
            <div className=" absolute top-4 w-[90%] h-[calc(100%-50px)] flex flex-col left-1/2 -translate-x-1/2">
              <div className="flex items-center justify-end gap-2 pr-3 py-1 ">
                <GiNetworkBars className=" scale-y-75" />
                <FaWifi />
                <FaBatteryThreeQuarters />
              </div>
              <img
                className="w-full h-full object-cover rounded-[32px] rounded-t-none"
                src={project?.phoneImage}
                alt={"project"}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-16">
        <div className="h-screen  w-[90%] mx-auto flex justify-center items-center gap-5 px-10 ">
          <div className="flex-1 relative overflow-hidden">
            <img
              className="w-full relative z-10"
              src="/images/pc.png"
              alt="pc"
              loading="lazy"
            />
            <div className=" absolute top-5 w-[78%] h-[85%] left-1/2 -translate-x-1/2">
              <video
                className="w-full h-full object-cover"
                src={project.video || "/images/"}
                autoPlay
                loop
                muted
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-24">
        <div className=" w-[90%] mx-auto mb-10 shadow-lg flex justify-center items-center">
          <img src={project?.subImages[0]} alt="sub" loading="lazy" />
        </div>
        <div className=" w-[90%] mx-auto shadow-lg  flex justify-center items-center  ">
          <img src={project?.subImages[1]} alt="sub" loading="lazy" />
        </div>
      </div>

      <div className="w-screen relative overflow-x-hidden h-[120dvh]">
        <motion.div
          key={`motion-${projectId}`}
          ref={ref}
          className="left-1/2 top-0 -translate-x-1/2 absolute z-0 h-[calc(100%-100px)] lg:w-[2500px] flex justify-center bg-[#e6e8eb]"
          style={{
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            boxShadow: boxShadowValue,
          }}
        />

        <div className="w-screen  pt-8 pb-16 ">
          <div className="min-h-screen  w-[70%] mx-auto  flex justify-center items-center gap-5 px-10">
            <div className="flex-1 relative overflow-hidden">
              <img
                className="w-full relative z-10"
                src="/images/imac.png"
                alt="Imac"
                loading="lazy"
              />
              <div className=" absolute top-1.5 w-full h-[72%] left-1/2 -translate-x-1/2">
                <img
                  className="w-full h-full object-cover"
                  src={project.subImages[2]}
                  alt="sub"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-fit bg-primary pt-3 pb-10">
        <div className="w-fit pr-28 relative mx-auto">
          <Link
            to={`/project/${nextProject?.id}`}
            className="absolute top-3 right-0 transform -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <MagneticButton>Next</MagneticButton>
          </Link>
          <h1 className="text-9xl font-caniculeDisplay font-black mb-16 flex items-center mx-auto w-fit">
            {nextProject?.title}
          </h1>
        </div>
        <div className="flex items-center gap-5 w-4/5 mx-auto">
          <div className="w-[230px] relative overflow-hidden">
            <img
              className="w-full relative z-10"
              src="/images/iphone.png"
              alt="iPhone"
              loading="lazy"
            />
            <div className=" absolute top-3 w-[90%] h-[calc(100%-42px)] flex flex-col left-1/2 -translate-x-1/2">
              <div className="flex items-center justify-end gap-2 pr-3 py-1 text-xs">
                <GiNetworkBars className=" scale-y-75" />
                <FaWifi />
                <FaBatteryThreeQuarters />
              </div>
              <img
                className="w-full h-full object-cover rounded-[24px] rounded-t-none"
                src={nextProject?.phoneImage}
                alt="project"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex-1 mx-auto flex justify-center items-center gap-5 px-10 relative">
            <div className="flex-1 relative overflow-hidden">
              <img
                className="w-full relative z-10"
                src="/images/pc.png"
                alt="Pc"
                loading="lazy"
              />
              <div className=" absolute top-5 w-[78%] h-[85%] left-1/2 -translate-x-1/2">
                <img
                  className="w-full h-full object-cover"
                  src={nextProject?.subImages[0]}
                  alt="sub"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  return <ProjectContent key={projectId} projectId={projectId} />;
};

export default ProjectDetailsPage;
