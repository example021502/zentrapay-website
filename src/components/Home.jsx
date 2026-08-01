import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  LockIcon,
  Quote,
  Smartphone,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const imgPlaceholder = "https://placehold.net/600x600.png";

export default function Home() {
  const testimonials = [
    {
      name: "David Monarch",
      profession: "Software Engineer",
      profile: imgPlaceholder,
      text: "What stands out most about Zentrapay is the sheer reliability and security. Knowing that my transactions are protected by advanced encryption gives me total confidence every time I send money to friends or business partners. It’s modern, seamless, and genuinely built for our needs.",
    },
    {
      name: "David Monarch",
      profession: "Software Engineer",
      profile: imgPlaceholder,
      text: "Managing multi-currency balances and sending instant payments used to be a major hurdle for my daily operations. With Zentrapay, everything is streamlined right from my smartphone. The transfers are lightning-fast, and the interface is incredibly intuitive. It’s easily the best financial tool I’ve used in the region.",
    },
    {
      name: "David Monarch",
      profession: "Software Engineer",
      profile: imgPlaceholder,
      text: "Fast, borderless, and incredibly secure! Zentrapay has made mobile transactions completely seamless for me. I love how easy it is to manage everything right from my phone without any hidden hassles.",
    },
    {
      name: "David Monarch",
      profession: "Software Engineer",
      profile: imgPlaceholder,
      text: "Fast, borderless, and incredibly secure! Zentrapay has made mobile transactions completely seamless for me. I love how easy it is to manage everything right from my phone without any hidden hassles.",
    },
    {
      name: "David Monarch",
      profession: "Software Engineer",
      profile: imgPlaceholder,
      text: "Fast, borderless, and incredibly secure! Zentrapay has made mobile transactions completely seamless for me. I love how easy it is to manage everything right from my phone without any hidden hassles.",
    },
    {
      name: "David Monarch",
      profession: "Software Engineer",
      profile: imgPlaceholder,
      text: "Fast, borderless, and incredibly secure! Zentrapay has made mobile transactions completely seamless for me. I love how easy it is to manage everything right from my phone without any hidden hassles.",
    },
    {
      name: "David Monarch",
      profession: "Software Engineer",
      profile: imgPlaceholder,
      text: "Fast, borderless, and incredibly secure! Zentrapay has made mobile transactions completely seamless for me. I love how easy it is to manage everything right from my phone without any hidden hassles.",
    },
    {
      name: "David Monarch",
      profession: "Software Engineer",
      profile: imgPlaceholder,
      text: "Fast, borderless, and incredibly secure! Zentrapay has made mobile transactions completely seamless for me. I love how easy it is to manage everything right from my phone without any hidden hassles.",
    },
  ];
  const [index, setIndex] = useState(0);

  const avatarRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (index + 1) % testimonials.length;
      setIndex(nextIndex);

      const currentAvatar = avatarRefs.current[nextIndex];
      const container = containerRef.current;

      if (currentAvatar && container) {
        const avatarLeft = currentAvatar.offsetLeft;
        const avatarWidth = currentAvatar.offsetWidth;
        const containerWidth = container.clientWidth;

        const targetScrollLeft =
          avatarLeft - containerWidth / 2 + avatarWidth / 2;

        container.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        });
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [index, testimonials.length]);

  const handleNavigation = (id) => {
    if (id === "left") {
      if (index === 0) return;
      setIndex((index - 1) % testimonials.length);
    }
    if (id === "right") {
      if (index === testimonials.length - 1) return;
      setIndex((index + 1) % testimonials.length);
    }
  };

  return (
    <AnimatePresence>
      <section
        key={"hero-section"}
        className="w-full min-h-dvh sm:min-h-screen relative bg-linear-to-br from-[#4c1d95] via-[#6d28d9] to-[#7c3aed] flex items-center justify-center overflow-hidden"
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 px-4 sm:px-8 lg:px-12 text-white text-center md:text-left mb-8 md:mb-0"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Empowering Africa's
              <br />
              Financial Future
            </h1>
            <p className="text-sm md:text-lg mb-8 text-gray-100 max-w-lg mx-auto md:mx-0">
              Zentrapay services with secure, fast, and borderless mobile
              transactions tailored for Africa's unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-white text-[#4c1d95] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
                Download App
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full flex items-center gap-2 justify-center hover:bg-white/10 transition">
                Contact Us
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2 flex justify-center items-center"
          >
            <img
              src={imgPlaceholder}
              alt="Zentrapay mobile app"
              className="w-80 md:w-96 lg:w-md rounded-lg h-auto object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <section
        key={"2"}
        className="w-full text-center sm:text-left py-16 px-4 bg-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Why People Love ZentraPay?
          </motion.h2>
          <p className="mb-8">
            Explore what makes Zentrapay the ultimate mobile companion for fast,
            secure, and borderless financial management.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Seamless Transactions",
                desc: "Experience swift and secure transactions that allow you to send and receive money effortlessly, anytime and anywhere.",
                icon: "smartphone",
              },
              {
                title: "Cross-Border Payments",
                desc: "Enjoy the convenience of secure cross-border transactions that connect you with businesses and individuals around the globe.",
                icon: "security",
              },
              {
                title: "Personalized Banking Solutions",
                desc: "Benefit from tailored banking solutions that cater to your specific needs, ensuring you have the right tools at your disposal.",
                icon: "speed",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-[#4c1d95]/10 rounded-full flex items-center justify-center text-2xl">
                  {feature.icon === "smartphone" ? (
                    <Smartphone />
                  ) : feature.icon === "security" ? (
                    <LockIcon />
                  ) : (
                    <Zap />
                  )}
                </div>
                <img
                  src={imgPlaceholder}
                  alt={feature.title}
                  className="w-30 h-30 mx-auto mb-4 object-contain rounded-lg"
                />
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        key={"3"}
        className="w-full py-16 px-4 bg-gray-50 text-center sm:text-left"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={imgPlaceholder}
              alt="Device showcase"
              className="w-full max-w-md mx-auto object-contain rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, type: "tween" }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-6"
          >
            <h2 className="text-3xl font-bold mb-4">
              Use Your Android or iOS Device
              <br />
              to Manage Zentrapay
            </h2>
            {[
              "Manage multi-currency balances and cross-border transfers effortlessly from your smartphone.",
              "Execute lightning-fast mobile money and bank payouts with advanced encryption security.",
              "Track transaction histories, view real-time analytics, and monitor cash flow on the go.",
              "Integrate your daily financial operations seamlessly with Zentrapay's intuitive mobile dashboard.",
            ].map((text, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-[#4c1d95] rounded-full flex items-center justify-center text-white shrink-0">
                  ✓
                </div>
                <p className="text-gray-700 text-sm leading-relaxed text-left">
                  {text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        key={"4"}
        className="w-full py-16 px-4 bg-white text-center sm:text-left"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <img
              src={imgPlaceholder}
              alt="Phone mockups"
              className="max-w-100 w-full object-contain rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-3xl font-bold mb-4">Transformative Impact</h2>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
              className="w-full p-4 rounded-lg bg-secondary/10 flex flex-col items-center justify-center mb-6"
            >
              <p className="text-gray-600 line-clamp-3 rounded-lg overflow-hidden">
                <Quote className="mb-2" />
                {testimonials[index].text}
              </p>
              <div className="w-full text-xs font-semibold mt-8 gap-2 flex flex-wrap items-center justify-start">
                <img
                  src={testimonials[index].profile}
                  alt=""
                  className="h-10 w-10 rounded-full object-fit"
                />
                <div className="flex flex-col items-start justify-start">
                  <p>{testimonials[index].name}</p>
                  <p className="text-xs italic font-light">
                    {testimonials[index].profession}
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-row items-center justify-center gap-2">
              <ChevronLeft
                onClick={() => handleNavigation("left")}
                className="bg-secondary/10 rounded-full p-1 h-8 w-8 cursor-pointer"
              />
              <div
                ref={containerRef}
                className="flex flex-row w-60 shrink-0 overflow-x-auto p-2 items-center justify-start scrollbar-none"
              >
                {testimonials.map((t, i) => (
                  <div
                    ref={(el) => (avatarRefs.current[i] = el)}
                    key={`testimony-${i}`}
                    onClick={() => setIndex(i)}
                    className={`w-10 h-10 m-2 shrink-0 bg-gray-100 transition-all ease-in-out duration-150 rounded-full flex items-center justify-center cursor-pointer ${
                      i === index
                        ? "border-3 z-20 border-secondary scale-[1.2]"
                        : "scale-[0.8] z-10"
                    }`}
                  >
                    <img
                      key={i}
                      src={t.profile}
                      alt={""}
                      className={`w-6 h-6 object-contain rounded-full`}
                    />
                  </div>
                ))}
              </div>
              <ChevronRight
                onClick={() => handleNavigation("right")}
                className="bg-secondary/10 rounded-full p-1 h-8 w-8 cursor-pointer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section
        key={"5"}
        className="w-full bg-linear-to-r text-center sm:text-left from-[#4c1d95] to-[#7c3aed] py-16 px-4 relative"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              ZentraPay, like never before.
            </h2>
            <p className="mb-6 text-gray-100">
              Objective deliver professional value with diverse web-readiness.
              Collaboratively transition wireless customer service without
              goal-oriented catalysts for change. Collaboratively.
            </p>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <button className="bg-white text-[#4c1d95] px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition">
                Google Play
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-white/10 transition font-semibold">
                AppStore
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <img
              src={imgPlaceholder}
              alt="Hand with phone"
              className="w-48 md:w-64 object-contain rounded-lg"
            />
          </motion.div>
        </div>
      </section>
    </AnimatePresence>
  );
}
