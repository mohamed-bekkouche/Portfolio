import { useEffect, useRef } from "react";
import { IoMdMenu } from "react-icons/io";
import Logo from "./Logo";

function Header() {
  const iconRef = useRef(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const links = [
    { id: 0, href: "#Home", title: "Home" },
    { id: 1, href: "#Projects", title: "Projects" },
    { id: 2, href: "#About", title: "About" },
    { id: 3, href: "#Contact", title: "Contact" },
  ];

  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const strength = 1.2; // Strong magnetic effect
      let deltaX = (mouseX - centerX) * strength;
      let deltaY = (mouseY - centerY) * strength;

      const maxDistance = 75;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance > maxDistance) {
        deltaX = (deltaX / distance) * maxDistance;
        deltaY = (deltaY / distance) * maxDistance;
      }

      button.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.5)`;
    };

    const handleMouseLeave = () => {
      button.style.transform = "translate(0, 0) scale(1)";
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const HandlClick = () => {
    iconRef.current?.classList.toggle("scale-x-0");
    setTimeout(() => {
      headerRef.current.classList.toggle("border-[0.5px]");
      headerRef.current.classList.toggle("bg-black/20");
      headerRef.current.classList.toggle("backdrop-blur-xl");
      iconRef.current?.classList.toggle("hidden");
      buttonRef.current?.classList.toggle("hidden");
      document.getElementById("Container").classList.toggle("scale-110");
      document.getElementById("layerFilter").classList.toggle("active");
      headerRef.current.classList.toggle("active");
      logoRef.current.classList.toggle("translate-y-[50%]");
      setTimeout(() => {
        navRef.current.classList.toggle("hidden");
        navRef.current.classList.toggle("flex");
        setTimeout(() => navRef.current.classList.toggle("active"), 30);
      }, 300);
    }, 100);
  };

  const RemoveHeader = (e, link) => {
    e.preventDefault();
    document.getElementById("Container").classList.toggle("scale-110");
    navRef.current.classList.toggle("active");
    navRef.current.classList.toggle("hidden");
    navRef.current.classList.toggle("flex");
    headerRef.current.classList.toggle("activeBack");
    headerRef.current.classList.toggle("bg-black/20");
    headerRef.current.classList.toggle("backdrop-blur-xl");
    headerRef.current.classList.toggle("border-[0.5px]");
    logoRef.current.classList.toggle("translate-y-[50%]");
    setTimeout(() => {
      window.location = "/" + link;
    }, 350);
    setTimeout(() => {
      headerRef.current.classList.toggle("activeBack");
      headerRef.current.classList.toggle("active");
      iconRef.current?.classList.toggle("hidden");
      buttonRef.current?.classList.toggle("hidden");
      document.getElementById("layerFilter").classList.toggle("active");

      setTimeout(() => {
        iconRef.current?.classList.toggle("scale-x-0");
      }, 100);
    }, 400);
  };

  return (
    <>
      <div
        ref={logoRef}
        className="w-[80px] h-[80px] z-[9999999] fixed top-0 left-1/2 -translate-x-1/2 -translate-y-[300%] duration-500"
      >
        <Logo />
      </div>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999999999] ">
        <div
          ref={headerRef}
          className="Hed w-[60px] border-solid border-[#636262] xz h-[60px] rounded-full flex justify-center items-center"
        >
          <nav
            ref={navRef}
            className="links w-full mx-auto hidden justify-center items-center font-bold text-[1.1rem] text-white "
          >
            {links?.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="px-3 cursor-pointer duration-200"
                onClick={(e) => RemoveHeader(e, link.href)}
              >
                {link.title}
              </a>
            ))}
          </nav>
          <div
            onClick={HandlClick}
            ref={buttonRef}
            className="rounded-full cursor-pointer bg-black/20 backdrop-blur-xl hover:backdrop-blur-none hover:bg-secondary transition-all duration-300 ease-out will-change-transform p-1"
            style={{ willChange: "transform" }}
          >
            <div className="duration-200 p-2">
              <IoMdMenu
                ref={iconRef}
                className="text-[1.7rem] text-white duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
