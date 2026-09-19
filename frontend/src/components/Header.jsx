import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightToLine, Menu } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  // 1. Fixed public asset path syntax
  const imgSrc = "/assets/zentrapayLogo.jpg";
  const imgPlaceholder = "";

  const buttons = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "About", id: "about" },
    { name: "Blog", id: "blog" },
    { name: "Contact Us", id: "contact_us" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  // Derived directly from the current URL (instead of its own state) so the
  // highlighted button always matches reality: on first load, after a
  // refresh, and when using the browser's back/forward buttons — not just
  // after a click.
  const activeButton =
    location.pathname === "/" ? "home" : location.pathname.replace(/^\//, "");

  // 2. Fixed: Initialized state to false (boolean)
  const [isMenu, setIsMenu] = useState(false);

  const toggleMenu = () => {
    setIsMenu((prev) => !prev);
  };

  return (
    <>
      <header className="w-full z-1000 top-0 bg-secondary text-primary p-4 sm:py-3 flex justify-between flex-row items-center">
        <div className="flex space-x-1 flex-row items-center justify-start w-fit">
          <img
            src={imgSrc ?? imgPlaceholder}
            alt="logo"
            className="h-10 w-10 rounded-full object-cover flex items-center justify-center"
          />
          <h1 className="text-lg font-bold">ZentrapPay</h1>
        </div>
        <div className="hidden sm:flex flex-2 items-center justify-center space-x-4">
          {buttons.map((b, i) => (
            <button
              onClick={() => {
                b.id === "home" ? navigate(`/`) : navigate(`/${b.id}`);
              }}
              className={`text-sm font-semibold cursor-pointer px-4 py-1.5 transition-all duration-150 hover:scale-[1.05] ease-in-out ${b.id === activeButton ? "border-b-2 border-primary rounded-none" : ""}`}
              key={i}
            >
              {b.name}
            </button>
          ))}
        </div>
        <Menu onClick={toggleMenu} className="sm:hidden cursor-pointer" />
      </header>

      <AnimatePresence>
        {isMenu && (
          <>
            {/* 3. Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-55 bg-black"
              onClick={toggleMenu}
            />

            {/* 4. Sliding Drawer */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
                type: "tween",
              }}
              className="fixed shadow-2xl z-1010 top-0 right-0 max-w-60 min-w-40 h-full border p-4 bg-white flex flex-col items-start justify-start"
            >
              <ArrowRightToLine
                onClick={toggleMenu}
                className="font-light text-sm bg-secondary text-primary p-1.5 rounded-full w-8 h-8 cursor-pointer mb-4"
              />
              {buttons.map((b, i) => (
                <motion.div
                  className="w-full space-y-2 py-2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.05,
                    type: "tween",
                    ease: "easeOut",
                  }}
                  key={b.id}
                >
                  <button
                    onClick={() => {
                      setIsMenu(!isMenu);
                      b.id === "home" ? navigate(`/`) : navigate(`/${b.id}`);
                    }}
                    className={`text-sm text-black font-semibold cursor-pointer hover:text-primary hover:bg-secondary w-full text-left px-2 py-2 rounded-lg transition-all duration-150 ease-in-out hover:scale-[1.05] ${b.id === activeButton ? "border-b-2 border-secondary rounded-none" : ""}`}
                  >
                    {b.name}
                  </button>
                  <hr className="w-full border-gray-200" />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
