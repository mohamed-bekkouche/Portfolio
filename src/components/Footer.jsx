import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    icon: FaGithub,
    href: "https://github.com/mohamed-bekkouche",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/mohamed-bekkouche/",
    label: "LinkedIn",
  },
  {
    icon: FaEnvelope,
    href: "mailto:mohamed.bekkouche@univ-constantine2.dz",
    label: "Email",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/mohamed_bk25",
    label: "Instagram",
  },
];

function Footer() {
  return (
    <footer className="bg-primary relative overflow-hidden border-t border-white/15">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-secondary/5 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col items-center gap-6 py-10 px-6">
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="group relative flex items-center justify-center w-11 h-11 rounded-2xl bg-white/5 border border-white/10 text-tertiary hover:text-white hover:bg-secondary hover:border-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/25"
            >
              <Icon className="text-lg transition-transform duration-300 group-hover:scale-110" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className={`rounded-full bg-secondary ${i === 1 ? "w-6 h-1" : "w-1 h-1"}`}
            />
          ))}
        </div>

        <p className="text-tertiary text-xs tracking-widest uppercase font-medium text-center">
          © {new Date().getFullYear()} &nbsp;
          <span className="text-white font-semibold">Mohamed Bekkouche</span>
          &nbsp; — Designed with
          <span className="text-secondary mx-1">♥</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
