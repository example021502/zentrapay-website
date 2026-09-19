import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getFeatures } from "../lib/api";
import { useApiData } from "../lib/useApiData";
import ConnectionNotice from "./ui/ConnectionNotice";
import { CardSkeletonGroup } from "./ui/Skeletons";

const imgPlaceholder = "https://placehold.net/600x600.png";

export default function Features() {
  // Failures are logged to the console only (see useApiData) — the UI falls
  // back to skeletons/a friendly notice instead of an error message.
  const { data, isLoading, isSlow, hasError, retry } = useApiData(getFeatures);
  const categories = data?.categories || [];

  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const scrollRefs = useRef({});
  const [activeIndices, setActiveIndices] = useState({});

  const scrollSection = (sectionIndex, direction) => {
    const container = scrollRefs.current[sectionIndex];
    if (container) {
      const cardWidth =
        container.querySelector(".card-item")?.offsetWidth || 300;
      container.scrollBy({
        left: direction === "left" ? -(cardWidth + 24) : cardWidth + 24,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = (sectionIndex, totalItems) => {
    const container = scrollRefs.current[sectionIndex];
    if (container) {
      const cardWidth =
        container.querySelector(".card-item")?.offsetWidth || 300;
      const scrollPos = container.scrollLeft;
      const newIndex = Math.round(scrollPos / (cardWidth + 24));
      setActiveIndices((prev) => ({
        ...prev,
        [sectionIndex]: Math.min(Math.max(newIndex, 0), totalItems - 1),
      }));
    }
  };

  const openFeatureDetails = (item) => {
    setSelectedFeature(item);
    setIsFeatureModalOpen(true);
  };

  return (
    <div className="w-full py-16 px-6 bg-gray-50 flex flex-col justify-center items-center space-y-24">
      <section
        key={"features_intro_section"}
        className="w-full max-w-7xl text-center flex flex-col lg:flex-row justify-between items-center gap-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: "tween" }}
          className="w-full lg:w-1/2 flex items-center justify-center"
        >
          <img
            src={imgPlaceholder}
            alt="Zentrapay features overview"
            className="rounded-2xl shadow-lg object-cover max-h-[450px] w-full"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: "tween", delay: 0.1 }}
          className="flex flex-col lg:w-1/2 w-full text-left items-start justify-center"
        >
          <span className="badge-purple mb-4">
            Our Features
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Designed for Speed, Security, and Simplicity
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover the powerful tools and solutions Zentrapay provides to
            revolutionize your financial journey. From encrypted cross-border
            transfers to intuitive voice AI wallets, we bring complete financial
            freedom to your fingertips.
          </p>
        </motion.div>
      </section>

      {isLoading ? (
        <>
          <CardSkeletonGroup
            count={3}
            widthClass="w-[320px] sm:w-[380px]"
            className="w-full max-w-7xl flex gap-6 overflow-hidden"
          />
          {isSlow && <ConnectionNotice className="mt-2" />}
        </>
      ) : hasError ? (
        <ConnectionNotice onRetry={retry} />
      ) : (
        categories.map((category, sIndex) => {
        const items = category.items || [];
        return (
          <section key={category.id ?? sIndex} className="w-full max-w-7xl flex flex-col">
            <div className="text-left mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                {category.title}
              </h2>
              <p className="text-base text-gray-600">{category.subtitle}</p>
            </div>

            <div
              ref={(el) => (scrollRefs.current[sIndex] = el)}
              onScroll={() => handleScroll(sIndex, items.length)}
              className="w-full flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-none pb-4 pt-1 px-1 snap-x snap-mandatory"
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.id ?? i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, type: "tween", delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => openFeatureDetails(item)}
                  className="card-hover group card-item snap-start shrink-0 w-[320px] sm:w-[380px] cursor-pointer"
                >
                  <div className="overflow-hidden aspect-video w-full bg-gray-100">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4, type: "tween" }}
                      src={item.image_url || imgPlaceholder}
                      alt={item.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col grow justify-between text-left">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {item.heading}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-brand-purple mt-4 hover:underline">
                      Learn More &rarr;
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => scrollSection(sIndex, "left")}
                className="scroll-nav-btn"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>

              <div className="flex justify-center items-center gap-2">
                {items.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${
                      i === (activeIndices[sIndex] || 0)
                        ? "dot-active"
                        : "dot-inactive"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => scrollSection(sIndex, "right")}
                className="scroll-nav-btn"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </section>
        );
        })
      )}

      <AnimatePresence>
        {isFeatureModalOpen && selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, type: "tween" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: "tween" }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col"
            >
              <div className="relative aspect-video w-full bg-gray-100">
                <img
                  src={selectedFeature.image_url || imgPlaceholder}
                  alt={selectedFeature.heading}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setIsFeatureModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 transition cursor-pointer shadow-md"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 flex flex-col text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {selectedFeature.heading}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {selectedFeature.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
