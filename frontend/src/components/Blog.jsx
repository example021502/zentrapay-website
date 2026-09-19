import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { getBlog } from "../lib/api";
import { useApiData } from "../lib/useApiData";
import ConnectionNotice from "./ui/ConnectionNotice";
import { CardSkeletonGroup } from "./ui/Skeletons";

const imgPlaceholder = "https://placehold.net/600x600.png";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogCategorySection({ category }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const items = category.items || [];

  const scrollByCard = (direction) => {
    const container = containerRef.current;
    if (container) {
      const cardWidth =
        container.querySelector(".card-item")?.offsetWidth || 300;
      container.scrollBy({
        left: direction === "left" ? -(cardWidth + 24) : cardWidth + 24,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const cardWidth =
        container.querySelector(".card-item")?.offsetWidth || 300;
      const scrollPos = container.scrollLeft;
      const newIndex = Math.round(scrollPos / (cardWidth + 24));
      setActiveIndex(Math.min(Math.max(newIndex, 0), items.length - 1));
    }
  };

  return (
    <div className="w-full max-w-7xl flex flex-col">
      {/* Section Header with Title and View All Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div className="text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            {category.title}
          </h2>
          <p className="text-base text-gray-600 max-w-2xl">
            {category.subtitle}
          </p>
        </div>
        <button
          onClick={() => alert(`Viewing all items for ${category.title}`)}
          className="link-view-all"
        >
          View All &rarr;
        </button>
      </div>

      {/* Horizontal Cards Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-none pb-4 pt-1 px-1 snap-x snap-mandatory"
      >
        {items.map((n, i) => (
          <motion.div
            key={n.id ?? i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, type: "tween", delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="card-hover group card-item snap-start shrink-0 w-[320px] sm:w-[350px]"
          >
            <div className="overflow-hidden aspect-video w-full bg-gray-100">
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4, type: "tween" }}
                src={n.image_url || imgPlaceholder}
                alt={n.heading}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col grow justify-between text-left">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-purple transition-colors mb-3 line-clamp-2">
                {n.heading}
              </h3>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="badge-success">{formatDate(n.post_date)}</span>
                <span className="text-xs font-semibold text-brand-purple group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read more &rarr;
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active Card Indicator Dots flanked by Navigation Buttons */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => scrollByCard("left")}
          className="scroll-nav-btn"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex justify-center items-center gap-2">
          {items.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === activeIndex ? "dot-active" : "dot-inactive"}`}
            />
          ))}
        </div>

        <button
          onClick={() => scrollByCard("right")}
          className="scroll-nav-btn"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}

export default function Blog() {
  // Failures are logged to the console only (see useApiData) — the UI falls
  // back to skeletons/a friendly notice instead of an error message.
  const { data, isLoading, isSlow, hasError, retry } = useApiData(getBlog);
  const categories = data?.categories || [];

  useEffect(() => {
    return () => localStorage.removeItem("draftForm");
  }, []);

  return (
    <div className="w-full py-16 px-6 bg-gray-50 flex flex-col justify-center items-center space-y-20">
      {isLoading ? (
        <>
          <CardSkeletonGroup
            count={3}
            className="w-full max-w-7xl flex gap-6 overflow-hidden"
          />
          {isSlow && <ConnectionNotice className="mt-2" />}
        </>
      ) : hasError ? (
        <ConnectionNotice onRetry={retry} />
      ) : (
        categories.map((category) => (
          <BlogCategorySection key={category.id} category={category} />
        ))
      )}
    </div>
  );
}
