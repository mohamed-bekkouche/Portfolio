import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const useIsMobile = () => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setMobile(
        window.matchMedia("(pointer:coarse)").matches ||
          window.innerWidth < 768,
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
};

const Portfolio = () => {
  const isMobile = useIsMobile();
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: -999, y: -999 });

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  return (
    <>
      <div
        id="Projects"
        className="min-h-screen bg-primary text-white flex justify-center items-center md:px-10"
      >
        <div className="w-full mx-auto px-6 md:px-10 py-16">
          <header className="mb-10 sm:mb-14 text-center">
            <p className="font-caniculeDisplay text-sm sm:text-[0.925rem] tracking-[0.25em] uppercase text-tertiary mb-1">
              {isMobile ? "Tap to explore" : "Hover to explore"}
            </p>
            <h2 className="font-caniculeDisplay font-black text-white text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-none tracking-tight">
              My Arts
            </h2>
            <div className="w-8 sm:w-12 h-0.5 bg-secondary mx-auto mt-3 sm:mt-4" />
          </header>

          {/* ── Project List ── */}
          <main>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-row"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                {isMobile ? (
                  /* ── Mobile: tap accordion ── */
                  <div>
                    <button
                      className="w-full text-left border-t border-white/15 py-6 focus:outline-none cursor-pointer bg-transparent"
                      onClick={() =>
                        setExpandedId((prev) =>
                          prev === project.id ? null : project.id,
                        )
                      }
                      aria-expanded={expandedId === project.id}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-tertiary text-xs tabular-nums min-w-[2ch]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-4xl font-caniculeDisplay font-bold capitalize leading-tight truncate">
                            {project.title}
                          </h2>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="tag-chip text-tertiary">
                              {project.category}
                            </span>
                            <span className="text-tertiary text-xs">
                              {project.year}
                            </span>
                          </div>
                        </div>
                        <span
                          className="text-tertiary text-lg transition-transform duration-300 shrink-0"
                          style={{
                            transform:
                              expandedId === project.id
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                          }}
                        >
                          ↓
                        </span>
                      </div>
                    </button>

                    {/* Accordion image */}
                    <div
                      className={`mobile-preview ${
                        expandedId === project.id ? "open" : ""
                      }`}
                    >
                      <div>
                        <Link to={`/project/${project.id}`}>
                          <div className="relative overflow-hidden rounded-sm mb-4 aspect-video">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                              <span className="text-white text-sm tracking-[0.18em] uppercase">
                                View Project →
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── Desktop: hover row ── */
                  <Link
                    to={`/project/${project.id}`}
                    className="project-link group block w-full border-t border-white/15 py-7 md:py-8 relative overflow-hidden no-underline"
                    onMouseEnter={() => {
                      setActiveProjectId(project.id);
                    }}
                    onMouseLeave={() => {
                      setActiveProjectId(null);
                    }}
                  >
                    <div className="flex items-center gap-6 md:gap-8">
                      <div className="flex-1 min-w-0">
                        <h2 className="group-hover:tracking-wider pl-1 group-hover:text-secondary duration-300 transition-[cubic-bezier(0.4,0,0.2,1)] text-5xl md:text-6xl lg:text-7xl font-caniculeDisplay font-bold capitalize leading-none truncate">
                          {project.title}
                        </h2>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 mr-32">
                        <span className="text-sm group-hover:text-secondary tracking-widest font-caniculeDisplay uppercase text-tertiary hidden md:block">
                          {project.category}
                        </span>
                        <span className="text-xs group-hover:text-secondary tracking-widest font-bold text-tertiary hidden md:block">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-tertiary group-hover:w-full group-hover:bg-secondary duration-300" />
                    <span className="font-caniculeDisplay ghost-idx absolute right-0 top-1/2 transform translate-y-[-50%] translate-x-[6%] pointer-events-none user-select-none transition-opacity duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                )}
              </div>
            ))}

            {/* Final border */}
            <div className="border-t border-white/15" />
          </main>

          {/* ── Footer ── */}
          <footer className="mt-10 flex items-center justify-between">
            <span className="text-tertiary text-xs uppercase tracking-[0.2em]">
              {projects.length} Projects
            </span>
            <span className="text-tertiary text-xs opacity-40">
              © {new Date().getFullYear()}
            </span>
          </footer>
        </div>
      </div>

      {/* ── Desktop cursor-following preview card ── */}
      {!isMobile && (
        <div
          className={`preview-card fixed z-40 pointer-events-none overflow-hidden rounded-sm shadow-2xl border border-white/10 ${
            activeProjectId === null ? "hidden" : ""
          }`}
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            width: "580px",
            height: "380px",
            transform: "translate(-50%, -55%)",
          }}
        >
          <div className="relative h-full">
            {projects.map((project) => (
              <div
                key={project.id}
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  transform: `translateY(${
                    (project.id - (activeProjectId ?? 0)) * 100
                  }%)`,
                  opacity: activeProjectId === project.id ? 1 : 0.4,
                  zIndex: activeProjectId === project.id ? 10 : 5,
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover h-full w-full"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-sm tracking-[0.15em] uppercase opacity-90">
                    {project.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
