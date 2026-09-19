import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Features from "./components/Features";
import About from "./components/About";
import Blog from "./components/Blog";
import ContactUs from "./components/ContactUs";
import RouterError from "./components/RouterError";

// Every page renders inside the same scrollable <main>, which lives outside
// <Routes> so it never unmounts between navigations. Without this, whatever
// scroll position you left a page at (e.g. scrolled to the bottom of Home)
// carries over to the next page you visit. Jumping it back to the top on
// every route change is what makes each page "start at the beginning".
function ScrollToTop({ containerRef }) {
  const { pathname } = useLocation();

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, containerRef]);

  return null;
}

function App() {
  const mainRef = useRef(null);

  return (
    <Router>
      <div className="h-dvh overflow-hidden flex flex-col bg-white text-gray-900">
        <Header />
        <ScrollToTop containerRef={mainRef} />
        <main
          ref={mainRef}
          className="w-full h-dvh overflow-x-hidden overflow-y-auto scrollbar-none flex flex-col items-center z-20"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact_us" element={<ContactUs />} />
            <Route path="/*" element={<RouterError />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
