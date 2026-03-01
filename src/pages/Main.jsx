import GalleryProjects from "../components/GalleryProjects";
import Header from "../components/Header";
import MouseFollower from "../components/MouseFollwer";
import Portfolio from "../components/Portfolios";
import Techs from "../components/Techs";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import useMediaQuery from "../hooks/useMediaQuery";

export default function Main() {
  const isMdUp = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {isMdUp && <MouseFollower />}
      {isMdUp && <Header />}

      <div id="Container" className="Container w-full h-full origin-center">
        <Home />

        <GalleryProjects />

        <Portfolio />

        <Techs />

        <About />

        <Contact />
      </div>
    </>
  );
}
