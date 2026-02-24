"use client";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import emailjs from "emailjs-com";
import Globe from "../components/Globe";
import { FaXmark } from "react-icons/fa6";

const Contact = () => {
  const MessageSuccessRef = useRef(null);
  const MessageFailRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const contactBoxRef = useRef(null);
  const contactRef = useRef(null);
  const globeRef = useRef(null);

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
        (result) => {
          MessageSuccessRef.current?.classList.toggle("scale-0");
          MessageSuccessRef.current?.classList.toggle("-translate-y-[200px]");
          setName("");
          setEmail("");
          setMessage("");
          setTimeout(() => {
            MessageSuccessRef.current?.classList.toggle("scale-0");
            MessageSuccessRef.current?.classList.toggle("-translate-y-[200px]");
          }, 2000);
        },
        (error) => {
          console.log(error.text);
          MessageFailRef.current?.classList.toggle("scale-0");
          MessageFailRef.current?.classList.toggle("-translate-y-[200px]");
          setTimeout(() => {
            MessageFailRef.current?.classList.toggle("scale-0");
            MessageFailRef.current?.classList.toggle("-translate-y-[200px]");
          }, 2000);
        },
      );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contactBoxRef.current?.classList.remove("scale-[0.2]");
            contactBoxRef.current?.classList.remove("opacity-0");
            contactRef.current?.classList.add("rotate-[-10deg]");
            globeRef.current?.classList.add("Bounce");
          }
        });
      },
      { threshold: 0.7 },
    );

    if (contactBoxRef.current) observer.observe(contactBoxRef.current);

    return () => {
      if (contactBoxRef.current) observer.unobserve(contactBoxRef.current);
    };
  }, []);

  return (
    <div
      id="Contact"
      className="h-dvh w-full py-10 bg-primary relative flex justify-center items-center overflow-hidden"
    >
      <div
        ref={MessageSuccessRef}
        className="fixed top-10 text-[1.1rem] font-semibold rounded-xl bg-white px-4 py-2 z-[9999999999] flex gap-2 items-center scale-0 -translate-y-[200px] duration-500"
      >
        {" "}
        Message Sent successfully{" "}
        <FaCheck className="text-white bg-secondary rounded-full p-2 text-[1.9rem]" />
      </div>

      <div
        ref={MessageFailRef}
        className="fixed top-10 text-[1.1rem] font-semibold rounded-xl bg-white px-4 py-2 z-[9999999999] flex gap-2 items-center scale-0 -translate-y-[200px] duration-500"
      >
        {" "}
        Failed to Send Message
        <FaXmark className="text-white bg-[red] rounded-full p-2 text-[1.9rem]" />
      </div>

      <div className="w-[90%] h-full flex justify-between items-center flex-wrap">
        <div
          ref={globeRef}
          className="flex-1 flex justify-start pl-14 items-center h-full "
        >
          <Globe />
        </div>
        <div className="w-1/2 max-w-[550px] h-full pr-16 flex items-center justify-center px-5 md:h-full text-secondary">
          <div
            ref={contactBoxRef}
            className="w-[100%] h-[80%] relative scale-[0.2] opacity-0 duration-500"
          >
            <div
              ref={contactRef}
              className="w-full h-full rounded-2xl bg-secondary absolute top-0 left-0 z-10 duration-300 delay-[0.4s]"
            ></div>

            <div className="text-center px-10 md:text-left z-20 relative bg-white h-full rounded-2xl text-primary flex justify-center items-center">
              <div className="h-fit">
                <h1 className="text-[3rem] font-bold">Contact</h1>
                <h2 className="text-[1.2rem] text-tertiary font-semibold -mt-2 mb-5">
                  Feel free to contact us any time. We will get back to you as
                  soon as we can!
                </h2>
                <form className="text-tertiary" onSubmit={handleSubmit}>
                  <label className="font-extrabold uppercase text-[0.8rem]">
                    {" "}
                    Name <span className="text-[red]">*</span>{" "}
                  </label>
                  <input
                    className="w-full px-3 py-2 text-primary bg-[#EEE] rounded-md placeholder:text-[gray] placeholder:font-semibold focus:outline-none border-[#EEE] focus:bg-white focus:border duration-200 mb-3"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="font-extrabold uppercase text-[0.8rem]">
                    {" "}
                    Email <span className="text-[red]">*</span>{" "}
                  </label>
                  <input
                    className="w-full px-3 py-2 text-primary bg-[#EEE] rounded-md placeholder:text-[gray] placeholder:font-semibold focus:outline-none border-[#EEE] focus:bg-white focus:border duration-200 mb-3"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="font-extrabold uppercase text-[0.8rem]">
                    {" "}
                    Message <span className="text-[red]">*</span>{" "}
                  </label>
                  <textarea
                    className="w-full px-3 py-2 text-primary bg-[#EEE] rounded-md placeholder:text-[gray] placeholder:font-semibold focus:outline-none border-[#EEE] focus:bg-white focus:border duration-200 mb-7"
                    placeholder="Message"
                    name="message"
                    value={message}
                    required
                    minLength={3}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="rounded-md w-2/3 bg-secondary text-center py-[6px] mx-auto block text-white text-[1.2rem] cursor-pointer">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
