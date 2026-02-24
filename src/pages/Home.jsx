import Hero from "../components/Hero";

function Home() {
  return (
    <div id="Home" className=" w-full h-[100dvh] overflow-hidden">
      <div class="absolute z-0 bottom-0 -left-3 right-0 top-0 bg-[linear-gradient(to_right,#3ccf912e_1.5px,transparent_1.5px),linear-gradient(to_bottom,#3ccf912e_1.5px,transparent_1.5px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="w-[90%] mx-auto min-h-[100vh] flex justify-between items-center">
        <Hero />
        <div className="imageSection w-2/5 h-[100vh] relative">
          <div className="h-[120vh] overflow-hidden w-0 ImageAnimation origin-right bg-secondary absolute top-1/2 right-[0%] -translate-y-1/2 rotate-[4deg]">
            <div className="h-full w-full absolute top-0 right-0 translate-x-full ImageBgAnimation bg-primary"></div>
            <div className="h-full w-full absolute top-0 right-0 translate-x-[100%] ImgAnimation bg-secondary">
              <img
                className="w-full absolute left-1/2 bottom-0 -translate-x-[calc(50%-30px)] -translate-y-[20%] scale-125 rotate-[-11deg]"
                src="/images/hero.webp"
                alt="Hero"
                width="672"
                height="1008"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
