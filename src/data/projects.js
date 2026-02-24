import { SiMongodb, SiCloudinary, SiStripe } from "react-icons/si";
import { FaNodeJs, FaReact } from "react-icons/fa";
export const projects = [
  {
    id: 0,
    title: "BSESA",
    year: "2024",
    video: "/images/project/bsesa.mp4",
    description:
      "A comprehensive website designed to showcase the global impact and expertise of a UK-based elite sports science team. The platform highlights their international collaborations across multiple countries including Sweden, France, Morocco, and beyond. Featuring detailed profiles of their sports scientists, coaches, and specialized professionals, the site demonstrates their methodologies, success stories, and innovative approaches to sports science. Users can explore case studies of athlete development, read testimonials from international clients, and discover how BSESA's evidence-based techniques have transformed performance outcomes across diverse sporting disciplines and cultural contexts.",
    image: "/images/project/Bsesa.png",
    phoneImage: "/images/Gallery/bsesaPhone.webp",
    subImages: [
      "/images/Gallery/g1.webp",
      "/images/Gallery/g15.webp",
      "/images/Gallery/g4.webp",
    ],
    link: "https://www.bsesac.co.uk/",
    category: "Web Development",
    techs: [
      {
        name: "React Js",
        icon: <FaReact />,
      },
      {
        name: "Node Js",
        icon: <FaNodeJs />,
      },
      {
        name: "Stripe",
        icon: <SiStripe />,
      },
    ],
  },
  {
    id: 1,
    title: "Foodly",
    year: "2023",
    description:
      "An innovative restaurant platform engineered to revolutionize the dining experience through seamless food ordering and intuitive table booking functionality. The system showcases an extensive and visually appealing menu with high-quality food photography and detailed descriptions that entice customers. Foodly's user interface prioritizes ease of navigation, allowing customers to filter by dietary preferences, browse popular items, and track their order status in real-time. The comprehensive admin panel provides restaurant owners with powerful tools for inventory management, sales analytics, customer feedback monitoring, and reservation optimization. Special features include customizable loyalty programs, promotional campaign creation, and an intelligent algorithm.",
    image: "/images/project/foodly.png",
    category: "Web Development",
    video: "/images/project/foodly.mp4",
    link: "https://food-lly.vercel.app/",
    phoneImage: "/images/Gallery/foodlyPhone.webp",
    subImages: [
      "/images/Gallery/g7.webp",
      "/images/Gallery/g2.webp",
      "/images/Gallery/g9.webp",
    ],
    techs: [
      {
        name: "React Js",
        icon: <FaReact />,
      },
      {
        name: "Node Js",
        icon: <FaNodeJs />,
      },
      {
        name: "Cloudinary",
        icon: <SiCloudinary />,
      },
    ],
  },
  {
    id: 2,
    title: "Your Health ",
    category: "Web Development",
    year: "2024",
    description:
      "A revolutionary health and wellness platform that integrates physical fitness, nutritional science, and psychological well-being into one comprehensive ecosystem. Users receive fully personalized fitness regimens and nutrition plans based on sophisticated algorithms analyzing their unique body composition, fitness goals, medical history, and lifestyle factors. The platform facilitates direct communication with a network of certified specialists including nutritionists, personal trainers, physiotherapists, and mental health counselors, available for virtual consultations and ongoing support. Educational resources include in-depth articles, video tutorials, interactive workshops, and community forums designed to empower users with evidence-based knowledge.",
    image: "/images/project/sport.png",
    phoneImage: "/images/Gallery/sportPhone.webp",
    subImages: [
      "/images/Gallery/g11.webp",
      "/images/Gallery/g13.webp",
      "/images/Gallery/g24.webp",
    ],
    video: "/images/project/sport.mp4",
    link: "https://sport-client-gamma.vercel.app/",
    techs: [
      {
        name: "React Js",
        icon: <FaReact />,
      },
      {
        name: "Node Js",
        icon: <FaNodeJs />,
      },
      {
        name: "MongoDb",
        icon: <SiMongodb />,
      },
    ],
  },
  {
    id: 3,
    title: "Start Coding Club",
    category: "Mobil Development",
    year: "2025",
    description:
      "Welcome to the Start Coding Club – where creativity meets code! Our mission is to empower learners and innovators to master essential skills in programming, design, networking, freelancing, and client communication. Whether you're a beginner taking your first steps into the world of technology or an expert looking to refine your skills, our community provides the perfect space to grow, collaborate, and innovate. Join us to learn, build, and connect with like-minded individuals who share a passion for technology and problem-solving. Let's turn ideas into reality—one line of code at a time!",
    image: "/images/project/scc.png",
    video: "/images/project/scc.mp4",
    phoneImage: "/images/Gallery/sccPhone.webp",
    subImages: [
      "/images/Gallery/ssc1.webp",
      "/images/Gallery/scc3.webp",
      "/images/Gallery/scc2.webp",
    ],
    link: "https://star-bucks-rouge.vercel.app/",
    techs: [
      {
        name: "React Js",
        icon: <FaReact />,
      },
      {
        name: "Node Js",
        icon: <FaNodeJs />,
      },
      {
        name: "MongoDb",
        icon: <SiMongodb />,
      },
    ],
  },
  {
    id: 4,
    title: "VerticCity",
    category: "Web Development",
    year: "2023",
    description:
      "VerticCity is an elegantly designed mobile application created specifically for urban plant enthusiasts seeking to transform their living spaces into lush, green sanctuaries. The application features an extensive catalog of indoor plants with detailed care guides, light requirements, watering schedules, and difficulty ratings to help users make informed selections based on their experience level and home environment. Advanced filtering options allow customers to search for plants by size, maintenance level, air-purifying qualities, pet safety, and aesthetic style. The intuitive shopping experience includes high-quality imagery, 360-degree plant views, and augmented reality features that enable users to visualize plants in their own spaces before purchasing.",
    image: "/images/Gallery/verticcity2.webp",
    video: "/images/project/starbucks.mp4",
    phoneImage: "/images/Gallery/verticPhone.webp",
    subImages: [
      "/images/Gallery/verticcity2.webp",
      "/images/Gallery/verticcity1.webp",
      "/images/Gallery/verticcity3.webp",
    ],
    techs: [
      {
        name: "React Js",
        icon: <FaReact />,
      },
      {
        name: "Node Js",
        icon: <FaNodeJs />,
      },
      {
        name: "MongoDb",
        icon: <SiMongodb />,
      },
    ],
  },
  {
    id: 5,
    title: "starbucks",
    category: "Web Development",
    year: "2023",
    description:
      "StarBucks redefines online education through its sophisticated e-learning platform designed to democratize access to high-quality educational content across diverse disciplines. The platform boasts an extensive library of professionally produced courses spanning technical skills, professional development, creative arts, personal growth, and academic subjects, each developed by industry experts and educational specialists. Learners benefit from an adaptive learning system that personalizes the educational journey based on individual progress, learning style, and performance data, ensuring optimal knowledge retention and skill development. Interactive elements including quizzes, coding challenges, peer-reviewed assignments, and virtual labs create an engaging and immersive learning environment.",
    image: "/images/Gallery/g17.webp",
    video: "/images/project/starbucks.mp4",
    phoneImage: "/images/Gallery/starbucksPhone.webp",
    subImages: [
      "/images/Gallery/g10.webp",
      "/images/Gallery/g14.webp",
      "/images/Gallery/g17.webp",
    ],
    link: "https://star-bucks-rouge.vercel.app/",
    techs: [
      {
        name: "React Js",
        icon: <FaReact />,
      },
      {
        name: "Node Js",
        icon: <FaNodeJs />,
      },
      {
        name: "MongoDb",
        icon: <SiMongodb />,
      },
    ],
  },
  {
    id: 6,
    title: "masroofy",
    category: "Web Development",
    year: "2024",
    description:
      "Masroofy stands as an innovative financial management application designed to transform how individuals interact with their personal finances. The platform offers comprehensive expense tracking with automatic categorization and customizable tags, allowing users to visualize spending habits through intuitive charts and graphs that identify trends and potential saving opportunities. Advanced budgeting tools enable the creation of flexible monthly and goal-based budgets with real-time notifications when approaching limits. Income monitoring features track multiple revenue streams with detailed analytics on earnings patterns, while the built-in financial planning section helps users establish emergency funds, plan for large purchases, and develop long-term investment strategies.",
    image: "/images/project/masroofy.png",
    video: "/images/project/masroofy.mp4",
    phoneImage: "/images/Gallery/masroofyPhone.webp",
    subImages: [
      "/images/Gallery/g30.webp",
      "/images/Gallery/g12.webp",
      "/images/Gallery/g29.webp",
    ],
    link: "https://masroofy-jade.vercel.app/",
    techs: [
      {
        name: "React Js",
        icon: <FaReact />,
      },
      {
        name: "Node Js",
        icon: <FaNodeJs />,
      },
      {
        name: "MongoDb",
        icon: <SiMongodb />,
      },
    ],
  },
];
