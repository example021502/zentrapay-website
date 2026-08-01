import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  // Placeholder image for members, achievements, and collaborations
  const imgPlaceholder = "https://placehold.net/600x600.png";

  // State to handle the modal popup for viewing full history of achievements
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Data array for team members
  const members = [
    {
      name: "Evans Ackaah",
      position: "Founder and CEO",
      profile: imgPlaceholder,
      desc: "With over 15 years in fintech leadership, Evans has a vision for a borderless financial future. His expertise in technology and passion for social impact guides Zentrapay's strategic direction.",
    },
    {
      name: "Jane Smith",
      position: "CTO",
      profile: imgPlaceholder,
      desc: "Jane is a tech visionary with a strong background in AI and mobile solutions. She leads the development of our innovative ZWallet technology, ensuring security and user-friendliness at every step.",
    },
    {
      name: "Michael Brown",
      position: "CMO",
      profile: imgPlaceholder,
      desc: "Michael brings a wealth of marketing experience to the team, focusing on building brand awareness and community engagement. His strategies aim to make Zentrapay synonymous with seamless payments in Africa.",
    },
  ];

  // Data array for company achievements
  const achievements = [
    {
      img: imgPlaceholder,
      heading: "Expanding Partnerships",
      date: "May 9, 2025",
      desc: "By 2023, Zentrapay forged strategic partnerships with leading financial institutions and tech companies, enhancing our service offerings. These collaborations have further solidified our position as a leader in fintech solutions for Africa.",
    },
    {
      img: imgPlaceholder,
      heading: "Founding Zentrapay",
      date: "May 9, 2025",
      desc: "In 2021, Zentrapay was founded with a mission to revolutionize payments in Africa. Our founders recognized the challenges faced by individuals and businesses in cross-border transactions and set out to create a solution that would bridge these gaps.",
    },
    {
      img: imgPlaceholder,
      heading: "Launching ZWallet",
      date: "May 9, 2025",
      desc: "In 2022, we launched ZWallet, our flagship product that integrates voice AI and secure payment solutions. This innovative platform has empowered thousands of users to manage their finances effortlessly and securely.",
    },
  ];

  // Data array for strategic collaborations
  const collaborations = [
    {
      img: imgPlaceholder,
      heading: "Fintech Alliance",
      desc: "Our partnership with the Fintech Alliance has provided us with valuable insights and resources, enabling us to stay at the forefront of technological advancements. Together, we aim to foster innovation and drive financial inclusion across the continent.",
    },
    {
      img: imgPlaceholder,
      heading: "Global Payments Network",
      desc: "Collaborating with a Global Payments Network allows us to offer our users secure cross-border transactions. This partnership enhances our capabilities, ensuring that payments are not only seamless but also efficient and reliable.",
    },
    {
      img: imgPlaceholder,
      heading: "Local Banking Institutions",
      desc: "Our alliances with local banks empower us to provide tailored banking solutions that cater to the specific needs of our users. These partnerships facilitate inclusive banking practices, bringing financial services to underserved communities.",
    },
  ];

  // State and ref for members horizontal scroll tracking
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);
  const memberContainerRef = useRef(null);

  const scrollMembers = (direction) => {
    const container = memberContainerRef.current;
    if (container) {
      const cardWidth =
        container.querySelector(".card-item")?.offsetWidth || 300;
      container.scrollBy({
        left: direction === "left" ? -(cardWidth + 24) : cardWidth + 24,
        behavior: "smooth",
      });
    }
  };

  const handleMemberScroll = () => {
    const container = memberContainerRef.current;
    if (container) {
      const cardWidth =
        container.querySelector(".card-item")?.offsetWidth || 300;
      const scrollPos = container.scrollLeft;
      const newIndex = Math.round(scrollPos / (cardWidth + 24));
      setActiveMemberIndex(Math.min(Math.max(newIndex, 0), members.length - 1));
    }
  };

  // State and ref for collaborations horizontal scroll tracking
  const [activeCollabIndex, setActiveCollabIndex] = useState(0);
  const collabContainerRef = useRef(null);

  const scrollCollabs = (direction) => {
    const container = collabContainerRef.current;
    if (container) {
      const cardWidth =
        container.querySelector(".card-item")?.offsetWidth || 300;
      container.scrollBy({
        left: direction === "left" ? -(cardWidth + 24) : cardWidth + 24,
        behavior: "smooth",
      });
    }
  };

  const handleCollabScroll = () => {
    const container = collabContainerRef.current;
    if (container) {
      const cardWidth =
        container.querySelector(".card-item")?.offsetWidth || 300;
      const scrollPos = container.scrollLeft;
      const newIndex = Math.round(scrollPos / (cardWidth + 24));
      setActiveCollabIndex(
        Math.min(Math.max(newIndex, 0), collaborations.length - 1),
      );
    }
  };

  return (
    <div className="w-full py-16 px-6 bg-gray-50 flex flex-col justify-center items-center space-y-24">
      {/* Introduction Section */}
      <section
        key={"about_intro_section"}
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
            alt="Zentrapay team"
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
            About Us
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Zentrapay, Empowering Financial Freedom
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Zentrapay, we are dedicated to creating a financial ecosystem
            that transcends borders. Our mission is to empower individuals and
            businesses with seamless, transparent payment solutions that promote
            inclusivity and accessibility in Africa.
          </p>
        </motion.div>
      </section>

      {/* Leadership & Members Section */}
      <section className="w-full max-w-7xl flex flex-col">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Meet Our Leadership
          </h2>
          <p className="text-base text-gray-600">
            The visionary minds guiding Zentrapay towards a borderless financial
            future.
          </p>
        </div>

        {/* Scrollable Members Row */}
        <div
          ref={memberContainerRef}
          onScroll={handleMemberScroll}
          className="w-full flex gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 px-1 snap-x snap-mandatory"
        >
          {members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: "tween", delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="card-item snap-start shrink-0 w-[320px] sm:w-[360px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col group"
            >
              <div className="overflow-hidden aspect-square w-full bg-gray-100">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4, type: "tween" }}
                  src={member.profile}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col grow justify-between text-left">
                <div>
                  <span className="text-xs font-medium text-[#4c1d95] bg-purple-50 px-2.5 py-1 rounded-full inline-block mb-2">
                    {member.position}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                    {member.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Member Navigation Controls & Dots */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => scrollMembers("left")}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition shadow-xs cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex justify-center items-center gap-2">
            {members.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeMemberIndex
                    ? "w-6 bg-[#4c1d95]"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollMembers("right")}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition shadow-xs cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="w-full max-w-7xl flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Our Milestones & History
            </h2>
            <p className="text-base text-gray-600">
              Key moments that shaped our journey in transforming digital
              finance.
            </p>
          </div>
          <button
            onClick={() => setIsHistoryModalOpen(true)}
            className="text-sm font-semibold text-[#4c1d95] hover:underline cursor-pointer shrink-0 self-start sm:self-auto"
          >
            See Full History &rarr;
          </button>
        </div>

        {/* Displaying only 2 cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          {achievements.slice(0, 2).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: "tween", delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white max-w-md rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col group w-full"
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
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full inline-block mb-3">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.heading}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collaborations Section */}
      <section className="w-full max-w-7xl flex flex-col">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Strategic Collaborations
          </h2>
          <p className="text-base text-gray-600">
            Partnering with industry leaders to drive financial inclusion and
            safety.
          </p>
        </div>

        {/* Scrollable Collaborations Row */}
        <div
          ref={collabContainerRef}
          onScroll={handleCollabScroll}
          className="w-full flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-none pb-4 pt-1 px-1 snap-x snap-mandatory"
        >
          {collaborations.map((collab, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: "tween", delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="card-item snap-start shrink-0 w-[320px] sm:w-[380px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col group"
            >
              <div className="overflow-hidden aspect-video w-full bg-gray-100">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4, type: "tween" }}
                  src={collab.img}
                  alt={collab.heading}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col grow justify-between text-left">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {collab.heading}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {collab.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Collaboration Navigation Controls & Dots */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => scrollCollabs("left")}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition shadow-xs cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex justify-center items-center gap-2">
            {collaborations.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeCollabIndex
                    ? "w-6 bg-[#4c1d95]"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollCollabs("right")}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition shadow-xs cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </section>

      {/* Full History Modal Popup */}
      <AnimatePresence>
        {isHistoryModalOpen && (
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
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Full Corporate History
                </h3>
                <button
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {achievements.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      type: "tween",
                      delay: i * 0.05,
                    }}
                    className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 items-center"
                  >
                    <img
                      src={item.img}
                      alt={item.heading}
                      className="w-full sm:w-48 aspect-video sm:aspect-square object-cover rounded-xl shrink-0"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-2">
                        {item.date}
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {item.heading}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
