import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const Portfolio = () => {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const listRef = useRef(null);

  const handleProjectHover = (projectId) => {
    setActiveProjectId(projectId);
  };

  const handleProjectLeave = () => {
    setActiveProjectId(null);
  };

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const previewStyle = {
    left: `${mousePosition.x}px`,
    top: `${mousePosition.y}px`,
    transform: `translate(-50% , -50%)`,
  };

  return (
    <div
      id="Projects"
      className="min-h-screen bg-primary text-white p-8 flex justify-center items-center"
    >
      <div className="w-full">
        <header className="mb-8 w-fit mx-auto">
          <h1 className="text-white text-center text-[5rem] w-fit mx-auto">
            {" "}
            My Arts{" "}
          </h1>
          <p className="text-tertiary text-lg -mt-2.5 w-fit mx-auto">
            Hover over projects to explore
          </p>
        </header>

        <main className="w-full mx-auto ">
          {/* Project list - now takes full width */}
          <div ref={listRef} className="w-full">
            {projects.map((project) => (
              <Link
                to={`/project/${project.id}`}
                key={project.id}
                className={`border-t block w-full border-tertiary px-4 py-8 transition-all duration-300 hover:pl-4 ${
                  activeProjectId === project.id ? "bg-white/10" : ""
                }`}
                onMouseEnter={() => handleProjectHover(project.id)}
                onMouseLeave={handleProjectLeave}
              >
                <h2 className="text-7xl mb-2 font-caniculeDisplay capitalize font-bold">
                  {project.title}
                </h2>
                <div className="flex justify-between items-center">
                  <span className="text-[0.85rem] uppercase text-tertiary">
                    {project.category}
                  </span>
                  <span className="text-sm text-tertiary">{project.year}</span>
                </div>
              </Link>
            ))}
            <div className="border-t border-tertiary"></div>
          </div>
          {activeProjectId !== null && (
            <div
              className="fixed cursor-pointer w-[650px] h-[420px] z-40 overflow-hidden border border-tertiary rounded-md shadow-lg pointer-events-none"
              style={previewStyle}
            >
              <div className="relative h-full transition-all duration-300 ease-in-out overflow-hidden">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="absolute w-full h-full transition-all duration-300 ease-in-out"
                    style={{
                      transform: `translateY(${
                        (project.id - activeProjectId) * 100
                      }%)`,
                      opacity: activeProjectId === project.id ? 1 : 0.5,
                      zIndex: activeProjectId === project.id ? 10 : 5,
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover h-full w-full"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Portfolio;
