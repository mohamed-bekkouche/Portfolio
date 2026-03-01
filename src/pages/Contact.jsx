import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import emailjs from "emailjs-com";
import Globe from "../components/Globe";
import { FaXmark } from "react-icons/fa6";
import useMediaQuery from "../hooks/useMediaQuery";

const Contact = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const MessageSuccessRef = useRef(null);
  const MessageFailRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const contactBoxRef = useRef(null);
  const contactRef = useRef(null);
  const globeRef = useRef(null);
  const sectionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Mohamed",
      message,
    };
    emailjs
      .send(
        "service_z7uljhm",
        "template_6zy5l9o",
        templateParams,
        "UlpkbnBdtvynHA5xh",
      )
      .then(
        () => {
          MessageSuccessRef.current?.classList.remove(
            "opacity-0",
            "translate-y-[-200px]",
            "scale-0",
          );
          MessageSuccessRef.current?.classList.add(
            "opacity-100",
            "translate-y-0",
          );
          setName("");
          setEmail("");
          setMessage("");
          setTimeout(() => {
            MessageSuccessRef.current?.classList.remove(
              "opacity-100",
              "translate-y-0",
            );
            MessageSuccessRef.current?.classList.add(
              "opacity-0",
              "translate-y-[-200px]",
            );
          }, 2500);
        },
        (error) => {
          console.log(error.text);
          MessageFailRef.current?.classList.remove(
            "opacity-0",
            "translate-y-[-200px]",
            "scale-0",
          );
          MessageFailRef.current?.classList.add("opacity-100", "translate-y-0");
          setTimeout(() => {
            MessageFailRef.current?.classList.remove(
              "opacity-100",
              "translate-y-0",
            );
            MessageFailRef.current?.classList.add(
              "opacity-0",
              "translate-y-[-200px]",
            );
          }, 2500);
        },
      );
  };

  useEffect(() => {
    const currentContactBoxRef = contactBoxRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (contactBoxRef.current) {
              contactBoxRef.current.classList.remove(
                "scale-[0.2]",
                "opacity-0",
              );
              contactBoxRef.current.classList.add("scale-100", "opacity-100");
            }
            if (contactRef.current) {
              const rotationDeg = isMobile
                ? "rotate-[-4deg]"
                : "rotate-[-8deg]";
              contactRef.current.classList.add(rotationDeg);
            }
            if (globeRef.current) {
              globeRef.current.classList.add("Bounce");
            }
          }
        });
      },
      { threshold: 0.4 },
    );
    if (currentContactBoxRef) observer.observe(currentContactBoxRef);
    return () => {
      if (currentContactBoxRef) observer.unobserve(currentContactBoxRef);
    };
  }, []);

  return (
    <div className="min-h-dvh bg-primary" id="Contact">
      {/* Toast Notifications */}
      <div
        ref={MessageSuccessRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] opacity-0 translate-y-[-200px] transition-all duration-500 flex items-center gap-3 bg-white text-primary font-semibold text-sm px-5 py-3 rounded-2xl shadow-2xl border border-gray-100"
      >
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-secondary">
          <FaCheck className="text-white text-xs" />
        </span>
        Message sent successfully!
      </div>

      <div
        ref={MessageFailRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] opacity-0 translate-y-[-200px] transition-all duration-500 flex items-center gap-3 bg-white text-primary font-semibold text-sm px-5 py-3 rounded-2xl shadow-2xl border border-gray-100"
      >
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500">
          <FaXmark className="text-white text-xs" />
        </span>
        Failed to send message.
      </div>

      {/* Header */}
      <header className="pt-16 pb-8 text-center relative">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px w-12 bg-secondary opacity-60" />
          <p className="font-caniculeDisplay text-xs tracking-[0.3em] uppercase text-tertiary">
            Get in touch
          </p>
          <div className="h-px w-12 bg-secondary opacity-60" />
        </div>
        <h2 className="font-caniculeDisplay font-black text-white text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] leading-none tracking-tight">
          Contact<span className="text-secondary">.</span>
        </h2>
      </header>

      {/* Main Content */}
      <div className="relative w-full h-dvh flex justify-center items-center overflow-hidden pb-16">
        {/* Subtle background accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-secondary opacity-[0.04] blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary opacity-[0.03] blur-3xl" />
        </div>

        <div className="w-[90%] max-w-6xl flex justify-between items-center gap-10 flex-wrap lg:flex-nowrap">
          {/* Globe Section */}
          <div
            ref={globeRef}
            className="flex-1 scale-50 hidden md:flex flex-col justify-center items-start pl-6 gap-6"
          >
            <Globe />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-auto md:flex-1 max-w-[520px] mx-auto md:mx-0 flex items-center justify-center">
            <div
              ref={contactBoxRef}
              className="w-full relative scale-[0.2] opacity-0 transition-all duration-700 ease-out"
            >
              {/* Shadow card (rotated background) */}
              <div
                ref={contactRef}
                className="w-full h-full rounded-3xl bg-secondary absolute inset-0 z-0 transition-transform duration-500 delay-300"
              />

              {/* Main card */}
              <div className="relative z-10 bg-white rounded-3xl overflow-hidden shadow-2xl">
                {/* Card top accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-secondary via-secondary/70 to-transparent" />

                <div className="px-8 py-9 md:px-10 md:py-10">
                  {/* Card header */}
                  <div className="mb-8">
                    <h1 className="text-primary text-3xl md:text-4xl font-black uppercase leading-none tracking-tight">
                      Send a Message
                    </h1>
                    <p className="text-tertiary text-sm mt-2 leading-relaxed">
                      Feel free to reach out anytime — I'll get back to you as
                      soon as possible.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="group">
                      <label className="block text-primary text-[0.7rem] font-black uppercase tracking-widest mb-1.5">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        name="name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 text-primary bg-gray-50 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white border border-transparent focus:border-secondary/20 transition-all duration-200"
                      />
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label className="block text-primary text-[0.7rem] font-black uppercase tracking-widest mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        name="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 text-primary bg-gray-50 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white border border-transparent focus:border-secondary/20 transition-all duration-200"
                      />
                    </div>

                    {/* Message */}
                    <div className="group">
                      <label className="block text-primary text-[0.7rem] font-black uppercase tracking-widest mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        placeholder="What's on your mind?"
                        name="message"
                        value={message}
                        required
                        minLength={3}
                        rows={4}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 text-primary bg-gray-50 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white border border-transparent focus:border-secondary/20 transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="relative w-full group overflow-hidden bg-secondary text-white font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Send Message
                        <svg
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </span>
                      {/* Shine sweep */}
                      <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
