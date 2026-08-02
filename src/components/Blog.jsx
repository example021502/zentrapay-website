import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Blog() {
  // Placeholder image for the news cards
  const imgPlaceholder = "https://placehold.net/600x600.png";

  // Data arrays for the three different sections
  const newsSections = [
    {
      title: "Zentrapay News Hub",
      subtitle:
        "Stay informed with the latest developments, features, and updates from Zentrapay.",
      items: [
        {
          img: imgPlaceholder,
          heading: "Introducing Zentrapay, Your Financial Companion",
          date: "May 9, 2025",
        },
        {
          img: imgPlaceholder,
          heading: "Zentrapay Expands Global Reach",
          date: "May 9, 2025",
        },
        {
          img: imgPlaceholder,
          heading: "User Success Story: Empowering Small Businesses",
          date: "May 9, 2025",
        },
        {
          img: imgPlaceholder,
          heading: "Advanced Security Measures Rollout",
          date: "June 12, 2025",
        },
        {
          img: imgPlaceholder,
          heading: "Zentrapay Wins Fintech Innovation Award",
          date: "July 24, 2025",
        },
        {
          img: imgPlaceholder,
          heading: "Seamless Multi-Currency Support Available Now",
          date: "August 15, 2025",
        },
      ],
    },
    {
      title: "Mastering ZWallet",
      subtitle:
        "Learn expert tips, optimization strategies, and best practices to get the most out of your digital wallet.",
      items: [
        {
          img: imgPlaceholder,
          heading: "Top 5 Tips for Secure Mobile Transactions",
          date: "September 1, 2025",
        },
        {
          img: imgPlaceholder,
          heading: "How to Manage Multi-Currency Balances Like a Pro",
          date: "September 14, 2025",
        },
        {
          img: imgPlaceholder,
          heading: "Automating Your Monthly Budgeting inside ZWallet",
          date: "October 3, 2025",
        },
        {
          img: imgPlaceholder,
          heading: "Understanding Transaction Fees and How to Save",
          date: "October 20, 2025",
        },
      ],
    },
    {
      title: "Fintech Trends Uncovered",
      subtitle:
        "Dive deep into the shifting landscape of global finance, mobile money, and digital transformation.",
      items: [
        {
          img: imgPlaceholder,
          heading: "The Future of Borderless Payments in Africa",
          date: "November 5, 2025",
        },
        {
          img: imgPlaceholder,
          heading: "How AI is Reshaping Modern Banking Security",
          date: "November 18, 2025",
        },
        {
          img: imgPlaceholder,
          heading: "The Rise of Decentralized Mobile Wallets",
          date: "December 2, 2025",
        },
        {
          img: imgPlaceholder,
          heading: "Financial Inclusion: Bridging the Gap Through Tech",
          date: "December 15, 2025",
        },
      ],
    },
  ];

  useEffect(() => {
    return () => localStorage.removeItem("draftForm");
  }, []);

  return (
    <div className="w-full py-16 px-6 bg-gray-50 flex flex-col justify-center items-center space-y-20">
      {newsSections.map((section, sIndex) => {
        // State and ref for handling horizontal scroll tracking per section
        const [activeIndex, setActiveIndex] = useState(0);
        const containerRef = useRef(null);

        // Scroll container left or right when navigation arrows are clicked
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

        // Update active index based on current scroll position
        const handleScroll = () => {
          const container = containerRef.current;
          if (container) {
            const cardWidth =
              container.querySelector(".card-item")?.offsetWidth || 300;
            const scrollPos = container.scrollLeft;
            const newIndex = Math.round(scrollPos / (cardWidth + 24));
            setActiveIndex(
              Math.min(Math.max(newIndex, 0), section.items.length - 1),
            );
          }
        };

        return (
          <div key={sIndex} className="w-full max-w-7xl flex flex-col">
            {/* Section Header with Title and View All Button */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div className="text-left">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                  {section.title}
                </h2>
                <p className="text-base text-gray-600 max-w-2xl">
                  {section.subtitle}
                </p>
              </div>
              <button
                onClick={() => alert(`Viewing all items for ${section.title}`)}
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
              {section.items.map((n, i) => (
                <motion.div
                  key={i}
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
                      src={n.img}
                      alt={n.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col grow justify-between text-left">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-purple transition-colors mb-3 line-clamp-2">
                      {n.heading}
                    </h3>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="badge-success">
                        {n.date}
                      </span>
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
                {section.items.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${
                      i === activeIndex ? "dot-active" : "dot-inactive"
                    }`}
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
      })}
    </div>
  );
}
