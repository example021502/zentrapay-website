import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Shared horizontal carousel shell used by every blog row so the scrolling
 * behaviour, header and navigation stay identical across sections — only the
 * cards themselves differ per table.
 *
 * Note on `shrink-0`: cards must not shrink (that is what makes the row
 * scrollable), but a shrink-0 card sitting flush against an `overflow-x-auto`
 * edge gets its border/rounded corners/hover-shadow clipped. The container
 * therefore carries px-4 paired with a -mx-4 so the first and last cards keep
 * breathing room for that overflow while still lining up with the heading,
 * plus `scroll-pl-4` so snap points don't park cards against the clip edge.
 */
export default function ScrollableRow({
  title,
  subtitle,
  count,
  children,
}) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollStep = () => {
    const container = containerRef.current;
    const card = container?.querySelector(".card-item");
    return card?.offsetWidth || 320;
  };

  const scrollByCard = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({
      left: (direction === "left" ? -1 : 1) * scrollStep(),
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || count === 0) return;
    const step = scrollStep();
    const index = Math.round(container.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(index, 0), count - 1));
  };

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      left: index * scrollStep(),
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full max-w-7xl flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div className="text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-base text-gray-600 max-w-2xl">{subtitle}</p>
        </div>
        <button
          onClick={() => alert(`Viewing all items for ${title}`)}
          className="link-view-all"
        >
          View All &rarr;
        </button>
      </div>

      {/* pt-4 keeps the whileHover -8px lift from being clipped by overflow-y-hidden */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full -mx-4 px-4 flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-none py-4 snap-x snap-mandatory scroll-pl-4"
      >
        {children}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => scrollByCard("left")}
          className="scroll-nav-btn"
          aria-label={`Scroll ${title} left`}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to card ${i + 1}`}
              className={`dot ${i === activeIndex ? "dot-active" : "dot-inactive"}`}
            />
          ))}
        </div>

        <button
          onClick={() => scrollByCard("right")}
          className="scroll-nav-btn"
          aria-label={`Scroll ${title} right`}
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </section>
  );
}