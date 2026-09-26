import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getFeatures } from "../lib/api";
import { useApiData } from "../lib/useApiData";
import ConnectionNotice from "./ui/ConnectionNotice";
import { CardSkeletonGroup } from "./ui/Skeletons";

const imgPlaceholder = "https://placehold.net/600x600.png";

const getCardScrollStep = (container) => {
  const cards = container.querySelectorAll(".card-item");
  if (cards.length < 2) return cards[0]?.offsetWidth || 300;

  return cards[1].offsetLeft - cards[0].offsetLeft;
};

export default function Features() {
  // Failures are logged to the console only (see useApiData) — the UI falls
  // back to skeletons/a friendly notice instead of an error message.
  const { data, isLoading, isSlow, hasError, retry } = useApiData(getFeatures);
  const features = data?.features || [];

  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const scrollRefs = useRef({});
  const [activeIndices, setActiveIndices] = useState({});

  const scrollSection = (sectionIndex, direction) => {
    const container = scrollRefs.current[sectionIndex];
    if (container) {
      container.scrollBy({
        left:
          (direction === "left" ? -1 : 1) *
          getCardScrollStep(container),
        behavior: "smooth",
      });
    }
  };

  const handleScroll = (sectionIndex, totalItems) => {
    const container = scrollRefs.current[sectionIndex];
    if (container && totalItems > 0) {
      const newIndex = Math.round(
        container.scrollLeft / getCardScrollStep(container),
      );
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
    <div className="w-full px-4 sm:px-6 py-8 bg-gray-50 flex flex-col justify-center items-center space-y-16 sm:space-y-20">
      <section
        key={"features_intro_section"}
        className="w-full max-w-7xl mx-auto text-center flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: "tween" }}
          className="w-full flex items-center justify-center"
        >
          <img
            src={"https://i.ibb.co/DPtScC4Y/image.png"}
            onError={(e) => e.currentTarget.src = imgPlaceholder}
            alt="Zentrapay features overview"
            className="rounded-lg shadow-lg object-cover w-full h-[240px] sm:h-[300px] lg:h-[360px]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: "tween", delay: 0.1 }}
          className="flex flex-col w-full text-left items-start bg-main p-6 rounded-xl md:-ml-8 text-primary shadow-lg justify-center"
        >
          <span className="bg-secondary/20 py-0.5 px-2 rounded-full text-sm font-extrabold mb-4">
            Our Features
          </span>
          <h1 className="text-2xl font-bold tracking-tight mb-4">
            Designed for Speed, Security, and Simplicity
          </h1>
          <p className="text-md leading-relaxed">
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
            widthClass="w-[min(85vw,360px)] sm:w-[380px]"
            className="w-full max-w-7xl flex gap-6 overflow-hidden"
          />
          {isSlow && <ConnectionNotice className="mt-2" />}
        </>
      ) : hasError ? (
        <ConnectionNotice onRetry={retry} />
      ) : (
        <section className="w-full max-w-7xl flex flex-col">
          <div
            ref={(element) => {
              scrollRefs.current[0] = element;
            }}
            onScroll={() => handleScroll(0, features.length)}
            className="w-full flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-none pb-4 pt-1 px-1 snap-mandatory"
          >
            {features.map((feature, i) => (
              <motion.article
                key={feature.id ?? i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, type: "tween", delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => openFeatureDetails(feature)}
                className="card-hover group card-item snap-start shrink-0 w-[min(85vw,360px)] sm:w-[380px] cursor-pointer"
              >
                <div className="overflow-hidden aspect-video w-full bg-gray-100">
                  <motion.img
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4, type: "tween" }}
                    src={feature.image_url}
                    onError={(e) => e.currentTarget.src = imgPlaceholder}
                    alt={feature.title || feature.heading}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col grow justify-center text-center">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-secondary
                     mb-3 group-hover:text-brand-purple transition-colors">
                      {feature.title}
                    </h2>
                    {/* Clamp to 3 lines and fade the cut-off line so the card
                        stays a fixed height; the full text lives in the modal. */}
                    <div className="relative">
                      <p className="text-base text-gray-600 leading-relaxed line-clamp-3">
                        {feature.description}
                      </p>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-white to-transparent"
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => scrollSection(0, "left")}
              className="scroll-nav-btn"
              aria-label="Scroll features left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <div className="flex justify-center items-center gap-2">
              {features.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === (activeIndices[0] || 0)
                    ? "dot-active"
                    : "dot-inactive"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollSection(0, "right")}
              className="scroll-nav-btn"
              aria-label="Scroll features right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </section>
      )}

      {/* Portalled to <body> so it escapes the <main> stacking context
          (z-20) and renders above the header (z-1000). */}
      {createPortal(
        <AnimatePresence>
          {isFeatureModalOpen && selectedFeature && (
            <motion.div
              onClick={() => setIsFeatureModalOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
              role="dialog"
              aria-modal="true"
              aria-label={selectedFeature.title || selectedFeature.heading}
              className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 bg-black/50  overflow-y-auto"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, type: "tween" }}
                className="bg-white rounded-xl my-auto overflow-y-hidden scrollbar-none shadow-2xl relative flex flex-col max-h-[90vh]"
              >
                <div className="relative aspect-video">
                  <img
                    src={selectedFeature.image_url}
                    alt={selectedFeature.title || selectedFeature.heading}
                    className="w-full opacity-80 h-full object-contain"
                  />
                  <button
                    onClick={() => setIsFeatureModalOpen(false)}
                    className="absolute top-4 z-2 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 transition cursor-pointer shadow-md"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 shadow-md z-1 absolute bottom-0 left-0 right-0 bg-linear-to-b from-secondary/60 via-secondary/60 to-main/60 border-2 border-primary text-primary sm:p-8 flex flex-col text-left h-[70%] w-full rounded-2xl">
                  <h3 className="text-2xl font-bold mb-3">
                    {selectedFeature.title}
                  </h3>
                  <p className="text-base leading-relaxed">
                    {selectedFeature.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
