import React from "react";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-[#1c1d1f] py-5">
      <div className="text-[2.2rem] text-[#e2e2e2] flex justify-center items-center gap-5 mb-5">
        <a
          href="https://github.com/mohamed-bekkouche"
          target="_blank"
          className=" cursor-pointer hover:scale-[1.05] duration-200 hover:translate-y-[-5px] "
          rel="noreferrer"
        >
          {" "}
          <FaGithub className="shadowSociale" />{" "}
        </a>
        <a
          href="https://www.linkedin.com/in/mohamed-bekkouche/"
          rel="noreferrer"
          target="_blank"
          className=" cursor-pointer hover:scale-[1.05] duration-200 hover:translate-y-[-5px]   block "
        >
          {" "}
          <FaLinkedin className="shadowSociale" />{" "}
        </a>
        <a
          href="mailto:mohamed.bekkouche@univ-constantine2.dz"
          target="_blank"
          rel="noreferrer"
          className=" cursor-pointer hover:scale-[1.05] duration-200 hover:translate-y-[-5px]   block "
        >
          {" "}
          <FaEnvelope className="shadowSociale" />{" "}
        </a>
        <a
          href="https://www.instagram.com/mohamed_bk25"
          target="_blank"
          className="cursor-pointer  hover:scale-[1.05] duration-200 hover:translate-y-[-5px]"
          rel="noreferrer"
        >
          {" "}
          <FaInstagram className="shadowSociale" />{" "}
        </a>
      </div>
      <div className="w-fit mx-auto text-[#e2e2e2]">
        © 2025 Designed with ♥ by Mohamed Bekkouche
      </div>
    </div>
  );
}

export default Footer;
