import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Features() {
  const imgPlaceholder = "https://placehold.net/600x600.png";

  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const newsSections = [
    {
      title: "Secure Transaction, Anytime",
      subtitle: "Empowering Your Payments Globally",
      items: [
        {
          img: imgPlaceholder,
          heading: "End-to-End Encryption",
          desc: "Zentrapay employs cutting-edge encryption technology to ensure your transactions remain confidential and secure. Each payment is fortified with robust security protocols, safeguarding your financial data against unauthorized access and fraud. Rest easy knowing your money is protected, no matter where you are.",
        },
        {
          img: imgPlaceholder,
          heading: "Real-Time Fraud Detection",
          desc: "Our advanced algorithms monitor transactions in real-time, instantly identifying and flagging any suspicious activity. With immediate alerts and proactive measures, we strive to protect your assets and provide you with peace of mind during cross-border transactions. Experience unparalleled security with Zentrapay.",
        },
        {
          img: imgPlaceholder,
          heading: "Global Compliance Standards",
          desc: "Zentrapay adheres to international compliance regulations, ensuring that all cross-border transactions meet the legal requirements of various countries. This commitment not only protects your payments but also fosters trust and confidence in our services. Join us in making secure cross-border payments a reality.",
        },
      ],
    },
    {
      title: "Banking for Everyone",
      subtitle: "Empowering Underserved Communities",
      items: [
        {
          img: imgPlaceholder,
          heading: "Accessible Account Setup",
          desc: "Zentrapay simplifies the account creation process, ensuring that anyone can easily access banking services. Our user-friendly platform requires minimal documentation, allowing previously unbanked populations to join the financial ecosystem effortlessly.",
        },
        {
          img: imgPlaceholder,
          heading: "Microloans for Growth",
          desc: "We offer microloans tailored for individuals and small businesses in underserved areas, facilitating economic growth and personal development. With flexible terms and competitive rates, our microloans empower communities to thrive financially.",
        },
        {
          img: imgPlaceholder,
          heading: "Financial Literacy Programs",
          desc: "Zentrapay is dedicated to educating users about personal finance through our comprehensive literacy programs. We provide valuable resources and workshops that foster better financial decision-making, helping individuals achieve their goals.",
        },
      ],
    },
    {
      title: "Zentrapay Ecosystem",
      subtitle: "Manage your finance with Finesse",
      items: [
        {
          img: imgPlaceholder,
          heading: "ZWallet Overview",
          desc: "Dive into our ZWallet ecosystem with an interactive demo that showcases its user-friendly interface and functionalities. Experience how easy it is to manage your finances, make payments, and access banking services all in one place.",
        },
        {
          img: imgPlaceholder,
          heading: "Voice AI Payments",
          desc: "Try our innovative voice AI feature that allows you to make payments hands-free. Engage with our platform using simple voice commands to execute transactions, check balances, and manage your account effortlessly.",
        },
        {
          img: imgPlaceholder,
          heading: "Cross-Border Payment Simulation",
          desc: "Experience the ease of making secure cross-border payments through our simulation. Engage with real-time scenarios to see how our platform handles transactions seamlessly across different currencies and regions.",
        },
      ],
    },
    {
      title: "Innovative Solutions for Africa",
      subtitle: "Transforming Financial Landscapes",
      items: [
        {
          img: imgPlaceholder,
          heading: "Streamlined Payment Processes",
          desc: "Explore our animated solutions that simplify the payment process for users across Africa. This visual guide demonstrates how our platform enhances user experience with fast, reliable, and secure transactions.",
        },
        {
          img: imgPlaceholder,
          heading: "Empowering Entrepreneurs",
          desc: "Our animated feature illustrates how Zentrapay supports local entrepreneurs by providing easy access to financing options. See how our services empower small businesses to grow and thrive in the digital economy.",
        },
        {
          img: imgPlaceholder,
          heading: "Bridging the Financial Gap",
          desc: "Watch how Zentrapay addresses the financial inclusion gap in Africa through our targeted initiatives. This animation highlights our efforts in providing banking services to the unbanked and underserved populations.",
        },
      ],
    },
  ];

  const scrollRefs = useRef({});

  const [activeIndices, setActiveIndices] = useState(
    newsSections.reduce((acc, _, idx) => ({ ...acc, [idx]: 0 }), {}),
  );

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
          <span className="text-sm font-semibold text-[#4c1d95] bg-purple-50 px-3 py-1 rounded-full mb-4">
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

      {newsSections.map((section, sIndex) => (
        <section key={sIndex} className="w-full max-w-7xl flex flex-col">
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              {section.title}
            </h2>
            <p className="text-base text-gray-600">{section.subtitle}</p>
          </div>

          <div
            ref={(el) => (scrollRefs.current[sIndex] = el)}
            onScroll={() => handleScroll(sIndex, section.items.length)}
            className="w-full flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-none pb-4 pt-1 px-1 snap-x snap-mandatory"
          >
            {section.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, type: "tween", delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => openFeatureDetails(item)}
                className="card-item snap-start shrink-0 w-[320px] sm:w-[380px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col group cursor-pointer"
              >
                <div className="overflow-hidden aspect-video w-full bg-gray-100">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4, type: "tween" }}
                    src={item.img}
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
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#4c1d95] mt-4 hover:underline">
                    Learn More &rarr;
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => scrollSection(sIndex, "left")}
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition shadow-xs cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <div className="flex justify-center items-center gap-2">
              {section.items.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === (activeIndices[sIndex] || 0)
                      ? "w-6 bg-[#4c1d95]"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollSection(sIndex, "right")}
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition shadow-xs cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </section>
      ))}

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
                  src={selectedFeature.img}
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
                  {selectedFeature.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
