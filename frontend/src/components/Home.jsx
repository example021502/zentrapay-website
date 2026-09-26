// Import necessary animation and icon components
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  LockIcon,
  Play,
  Quote,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHome } from "../lib/api";

// Fallback image placeholder constant
const imgPlaceholder = "https://placehold.net/600x600.png";

export default function Home() {
  // State variables for homepage data and loading states
  const [highlights, setHighlights] = useState([]);
  const [app_highlights, setApp_highlights] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigate();
  // Fetch homepage data on component mount
  useEffect(() => {
    let isMounted = true;

    getHome()
      .then((data) => {
        if (!isMounted) return;
        setHighlights(data.highlights || []);
        setApp_highlights(data.app_highlights || []);
        setTestimonials(data.testimonials || []);
      })
      .catch((err) => {
        if (isMounted) console.error("Error fetching homepage data:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const [index, setIndex] = useState(0);

  const avatarRefs = useRef([]);
  const containerRef = useRef(null);

  // Automatic testimonial rotation timer effect
  useEffect(() => {
    if (testimonials.length === 0) return;

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

  // Handle manual carousel navigation
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

  // Handle downloading the app by opening the appropriate store link
  const handleDownloading = async (platform) => {
    const playStoreUrl =
      "https://play.google.com/store/apps/details?id=com.zentrapay.app";
    const appStoreUrl = "https://apps.apple.com/app/zentrapay/id123456789";

    if (platform === "playstore") {
      window.open(playStoreUrl, "_blank", "noopener,noreferrer");
    } else if (platform === "appstore") {
      window.open(appStoreUrl, "_blank", "noopener,noreferrer");
    }
  };

  const iconStyles = "text-secondary font-light stroke-1";
  return (
    <AnimatePresence>
      {/* Hero Section */}
      <section
        key={"hero-section"}
        className="w-full min-h-dvh sm:min-h-screen relative bg-linear-to-b from-secondary via-brand-purple to-main flex items-center justify-center overflow-hidden"
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
              <button
                onClick={() => handleDownloading("playstore")}
                className="btn-on-brand px-8 py-4 rounded-full font-semibold shadow-lg"
              >
                Download App
              </button>
              <button onClick={() => navigator("/contact_us")} className="btn-outline-on-brand border-2 border-white px-8 py-3 rounded-full flex items-center gap-2 justify-center">
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
              src={
                "https://i.ibb.co/v491NQ5x/935e7c6d690bce53a3383c7549a05714-removebg-preview.png"
              }
              onError={(e) => e.currentTarget.src = imgPlaceholder}
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

      {/* Highlights Section */}
      <section
        key={"2"}
        className="w-full text-center sm:text-left py-16 px-4 bg-white"
      >
        <div className="w-full max-w-5xl mx-auto text-center">
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
          {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}
          {isLoading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {highlights.map((feature, i) => (
                <motion.div
                  key={feature.id ?? i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-brand-purple/10 rounded-full flex items-center justify-center text-2xl">
                    {feature.type === "cross_border" ? (
                      <Smartphone className={iconStyles} />
                    ) : feature.type === "security" ? (
                      <LockIcon className={iconStyles} />
                    ) : (
                      feature.type === "speed" ? <Zap className={iconStyles} /> : <Zap className={iconStyles} />
                    )}
                  </div>
                  {/* <img
                    src={feature.image_url || imgPlaceholder}
                    alt={feature.title}
                    className="w-30 h-30 mx-auto mb-4 object-contain rounded-lg"
                  /> */}
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Device Features Section */}
      <section
        key={"3"}
        className="w-full px-4 py-0  text-center sm:text-left"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={
                "https://i.ibb.co/cKZGJMrG/new.png"
              }
              loading="lazy"
              onError={(e) => e.currentTarget.src = imgPlaceholder}
              alt="Device showcase"
              className="w-full max-w-md mx-auto object-cover rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, type: "tween" }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-6 px-8 py-10 pb-15 bg-main text-white rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Use Your Android or iOS <br /> Device
              <br />
              to Manage Zentrapay
            </h2>
            {app_highlights.map((d, i) => (
              <div key={d.id ?? i} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white shrink-0">
                  ✓
                </div>
                <p className="text-sm leading-relaxed text-left">
                  {d.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <div className="mx-auto p-4 m-4 -mt-10 rounded-xl gap-6 bg-primary shadow-lg flex flex-col sm:flex-row items-center justify-center">
        <div className="gap-3 flex flex-row items-center justify-start">
          <Users className="p-1 w-10 h-10 rounded-lg bg-secondary text-white font-light stroke-1 shrink-0" />
          <div className="flex flex-col items-start justify-center">
            <p className="font-bold text-xl">120,000+</p>
            <p className="font-lighter text-sm">Active users</p>
          </div>
        </div>
        <div className="gap-3 flex flex-row items-center justify-start">
          <Download className="p-1 w-10 h-10 rounded-lg bg-secondary text-white font-light stroke-1 shrink-0" />
          <div className="flex flex-col items-start justify-center">
            <p className="font-bold text-xl">23,947</p>
            <p className="font-lighter text-sm">Downloads this month</p>
          </div>
        </div>
      </div>
      {/* Testimonials Carousel Section */}
      <section
        key={"4"}
        className="w-full pb-4 px-4 bg-white text-center sm:text-left"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <img
              src={
                "https://i.ibb.co/QFS4YfVX/6a1e5ebe53a9da833097e0c30b75af60.jpg"
              }
              onError={(e) => e.currentTarget.src = imgPlaceholder}
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
            <h2 className="text-3xl font-bold mb-4 text-center">Transformative Impact</h2>
            {testimonials.length > 0 && (
              <>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, y: "100%" }}
                  transition={{
                    duration: 0.8,
                    type: "tween",
                    ease: "easeInOut",
                  }}
                  className="w-full p-4 rounded-xl bg-primary shadow-lg flex flex-col items-center justify-center mb-6"
                >
                  <p className="text-gray-600 line-clamp-3 rounded-lg overflow-hidden">
                    <Quote className="mb-2" />
                    {testimonials[index].message}
                  </p>
                  <div className="w-full text-xs font-semibold mt-8 gap-2 flex flex-wrap items-center justify-start">
                    <img
                      src={testimonials[index].profile_image_url}
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
                    className="flex flex-row w-60 shrink-0 overflow-x-auto p-2 items-center justify-center scrollbar-none"
                  >
                    {testimonials.map((t, i) => (
                      <div
                        ref={(el) => (avatarRefs.current[i] = el)}
                        key={t.id ?? `testimony-${i}`}
                        onClick={() => setIndex(i)}
                        className={`w-10 h-10 border-3 m-2 shrink-0 bg-gray-100 transition-all ease-in-out duration-150 rounded-full flex items-center justify-center cursor-pointer ${i === index
                          ? "z-20 border-main scale-[1.2]"
                          : "z-10 border-secondary"
                          }`}
                      >
                        <img
                          key={i}
                          src={t.profile_image_url}
                          alt={""}
                          className={`w-8 h-8 object-cover rounded-full`}
                        />
                      </div>
                    ))}
                  </div>
                  <ChevronRight
                    onClick={() => handleNavigation("right")}
                    className="bg-secondary/10 rounded-full p-1 h-8 w-8 cursor-pointer"
                  />
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Call to Action & Download Store Section */}
      <section
        key={"5"}
        className="w-full sm:text-left bg-main py-16 px-4 gap-12 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full md:max-w-5xl flex flex-col md:flex-row items-center justify-center text-center text-white m-auto flex flex-col items-center justify-center gap-4 p-10 shadow-[0_0_15px_rgba(0,0,0,0.4)] rounded-xl"
        >
          <div className="flex flex-col items-center justify-center gap-4 max-w-lg">

            <h2 className="text-3xl font-bold mb-4 w-full">
              ZentraPay, like never before.
            </h2>
            <p className="mb-6 text-gray-100">
              Objective deliver professional value with diverse web-readiness.
              Collaboratively transition wireless customer service without
              goal-oriented catalysts for change. Collaboratively.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-5">
            <button
              onClick={() => handleDownloading("playstore")}
              className="btn-on-brand px-6 py-3 rounded-lg flex-col font-semibold flex items-center justify-center"
            >
              <span>Download App</span>
              <span className="text-xs text-text-black">PlayStore</span>
            </button>
            <button
              onClick={() => handleDownloading("appstore")}
              className="btn-outline-on-brand border flex-col justify-center border-white px-6 py-3 rounded-lg flex items-center font-semibold"
            >
              <span>Download App</span>
              <span className="text-xs text-primary">AppStore</span>
            </button>
          </div>

          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut", type: "tween" }}
            viewport={{ once: true }}
            className="flex justify-center p-4 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.4)]"
          >
            <img
              src={"https://i.ibb.co/Vp3ZrHGR/built-for-africa.png"}
              onError={(e) => e.currentTarget.src = imgPlaceholder}
              alt="Hand with phone"
              className="md:w-50 object-contain"
            />
          </motion.div> */}
        </motion.div>
      </section>
    </AnimatePresence>
  );
}
