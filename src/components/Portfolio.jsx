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

  useEffect(() => {
    const currentId = parseInt(projectId);
    const currentProject = projects.find((pr) => pr.id === currentId) || null;
    setProject(currentProject);
    const nextProjectData =
      projects.find((pr) => pr.id === currentId + 1) || projects[0];
    setNextProject(nextProjectData);
    window.scrollTo(0, 0);
    if (ref.current) ref.current.style.transform = "none";
  }, [projectId]);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center text-white text-2xl">
        Project Not Found
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* Page transition strips */}
      <div className="fixed top-0 left-0 h-fit w-screen flex items-start z-50 gap-[0.5px] pointer-events-none">
        {[0.25, 0.175, 0.1, 0.175, 0.25].map((delay, i) => (
          <div
            key={i}
            style={{ animationDelay: `${delay}s` }}
            className="flex-1 bg-secondary h-screen shrinkheight"
          />
        ))}
      </div>

      {/* ── Hero Section ── */}
      <div className="min-h-screen w-[90%] mx-auto flex justify-center flex-col items-center py-24 md:py-0">
        {/* Meta row */}
        <div className="w-full pb-1 flex items-center justify-between text-base md:text-lg font-bold text-tertiary relative">
          <div
            style={{ animationDelay: "0.7s" }}
            className="fade-in-up opacity-0 translate-y-3"
          >
            {project?.category} / {project?.year}
          </div>
          {project.link && (
            <Link target="_blank" to={project.link} className="z-20">
              <MagneticButton>Live</MagneticButton>
            </Link>
          )}
        </div>

        <div className="borderTop w-0 h-[1.5px] mx-auto bg-tertiary mb-2" />

        {/* Hero body: stacks on mobile, side-by-side on lg */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start pt-4 gap-10 lg:gap-6">
          {/* Left: text */}
          <div className="flex-1 w-full">
            {/* Title */}
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[5.5rem] xl:text-9xl font-caniculeDisplay font-black mb-2 -mt-1 flex flex-wrap items-center leading-none">
              {project?.title.split("").map((e, i) => (
                <span
                  key={i}
                  style={{ animationDelay: `${1000 + 75 * i}ms` }}
                  className="fade-in-up opacity-0"
                >
                  {e === " " ? "\u00A0" : e}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-xl md:text-2xl font-normal text-tertiary w-full lg:w-4/5 mb-6 flex flex-wrap items-center">
              {project?.description.split("").map((e, i) => (
                <span
                  key={i}
                  style={{
                    animationDuration: "0.1s",
                    animationDelay: `${project?.title.length * 75 + 1000 + 4 * i}ms`,
                  }}
                  className="fade-in-down opacity-0"
                >
                  {e === " " ? "\u00A0" : e}
                </span>
              ))}
            </p>

            {/* Technologies */}
            <h2
              style={{
                animationDuration: "0.4s",
                animationDelay: `${project?.title.length * 75 + 1100 + 4 * project?.description.length}ms`,
              }}
              className="text-xl md:text-3xl fade-in-down uppercase mb-3 font-medium opacity-0"
            >
              Technologies :
            </h2>
            <div className="flex items-center flex-wrap gap-3 text-sm md:text-base">
              {project?.techs?.map((tech) => (
                <div
                  key={tech.name}
                  style={{
                    animationDuration: "0.4s",
                    animationDelay: `${project?.title.length * 75 + 1500 + 4 * project?.description.length}ms`,
                  }}
                  className="bg-white/10 rounded-full px-4 md:px-7 py-2 md:py-3 w-fit flex items-center gap-2 hover:bg-white/15 duration-100 fade-in-down opacity-0"
                >
                  <span className="text-xl md:text-2xl">{tech?.icon}</span>
                  <span>{tech?.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: phone mockup — hidden on mobile, shown md+ */}
          <div
            style={{ animationDelay: "1.1s", animationDuration: "0.5s" }}
            className="hidden md:block w-[200px] lg:w-[260px] xl:w-[290px] relative overflow-hidden fade-scaling scale-0 flex-shrink-0"
          >
            <img
              className="w-full relative z-10"
              alt="phone"
              loading="lazy"
              src="/images/iphone.png"
            />
            <div className="absolute top-4 w-[90%] h-[calc(100%-50px)] flex flex-col left-1/2 -translate-x-1/2">
              <div className="flex items-center justify-end gap-2 pr-3 py-1 text-xs">
                <GiNetworkBars className="scale-y-75" />
                <FaWifi />
                <FaBatteryThreeQuarters />
              </div>
              <img
                className="w-full h-full object-cover rounded-[32px] rounded-t-none"
                src={project?.phoneImage}
                alt="project"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── PC Video Section ── */}
      <div className="py-12 md:py-24">
        <div className="w-[90%] md:w-[80%] mx-auto flex justify-center items-center">
          <div className="flex-1 relative overflow-hidden">
            <img
              className="w-full relative z-10"
              src="/images/pc.png"
              alt="pc"
              loading="lazy"
            />
            <div className="absolute top-[6%] w-[78%] h-[85%] left-1/2 -translate-x-1/2">
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

      {/* ── Sub Images (white section) ── */}
      <div className="w-full bg-white py-12 md:py-24 space-y-8 md:space-y-10">
        {[project?.subImages[0], project?.subImages[1]].map((src, i) => (
          <div
            key={i}
            className="w-[90%] mx-auto shadow-lg flex justify-center items-center"
          >
            <img
              src={src}
              alt={`sub-${i}`}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>

      {/* ── iMac Section (scroll-morph) ── */}
      <div
        className="w-screen relative overflow-x-hidden"
        style={{ minHeight: "120dvh" }}
      >
        <motion.div
          key={`motion-${projectId}`}
          ref={ref}
          className="left-1/2 top-0 -translate-x-1/2 absolute z-0 h-[calc(100%-100px)] w-screen lg:w-[2500px] flex justify-center bg-[#e6e8eb]"
          style={{
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            boxShadow: boxShadowValue,
          }}
        />
        <div className="w-screen pt-8 pb-16 relative z-10">
          <div className="w-[90%] md:w-[70%] mx-auto flex justify-center items-center gap-5 px-2 md:px-10 min-h-screen">
            <div className="flex-1 relative overflow-hidden">
              <img
                className="w-full relative z-10"
                src="/images/imac.png"
                alt="iMac"
                loading="lazy"
              />
              <div className="absolute top-1.5 w-full h-[72%] left-1/2 -translate-x-1/2">
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

      {/* ── Next Project Section ── */}
      <div className="bg-primary pt-6 pb-12 md:pb-16">
        {/* Title + Next button */}
        <div className="w-[90%] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-12">
          <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-9xl font-caniculeDisplay font-black leading-none">
            {nextProject?.title}
          </h1>
          <Link
            to={`/project/${nextProject?.id}`}
            className="flex-shrink-0 self-start sm:self-center"
          >
            <MagneticButton>Next</MagneticButton>
          </Link>
        </div>

        {/* Next project mockups */}
        <div className="w-[90%] mx-auto flex flex-col sm:flex-row items-center gap-6 md:gap-8">
          {/* Phone — hidden on small mobile, shown sm+ */}
          <div className="hidden sm:block w-[150px] md:w-[200px] lg:w-[230px] relative overflow-hidden flex-shrink-0">
            <img
              className="w-full relative z-10"
              src="/images/iphone.png"
              alt="iPhone"
              loading="lazy"
            />
            <div className="absolute top-3 w-[90%] h-[calc(100%-42px)] flex flex-col left-1/2 -translate-x-1/2">
              <div className="flex items-center justify-end gap-2 pr-3 py-1 text-[10px]">
                <GiNetworkBars className="scale-y-75" />
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

          {/* PC mockup */}
          <div className="flex-1 relative overflow-hidden">
            <img
              className="w-full relative z-10"
              src="/images/pc.png"
              alt="PC"
              loading="lazy"
            />
            <div className="absolute top-[6%] w-[78%] h-[85%] left-1/2 -translate-x-1/2">
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
  );
};

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  return <ProjectContent key={projectId} projectId={projectId} />;
};

export default ProjectDetailsPage;
