import { useState, useEffect, useRef } from "react";

import Project from "../components/Project";

import { projects } from "../data/projects";

function Projects() {
  const [playId, setplayId] = useState(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
          }
        });
      },
      { threshold: 0.5 },
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div id="Projects" className="w-full min-h-[100dvh]">
      <h1 className="text-white text-center text-[5rem] py-5"> My Arts </h1>
      <div className="grid grid-cols-2 gap-4 w-[90%] mx-auto items-stretch">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (projectRefs.current[index] = el)}
            className="opacity-0 transform translate-y-[50px] transition-all duration-700 ease-out"
          >
            <Project project={project} playId={playId} setplayId={setplayId} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
