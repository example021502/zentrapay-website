import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Features from "./components/Features";
import About from "./components/About";
import Blog from "./components/Blog";
import ContactUs from "./components/ContactUs";
import RouterError from "./components/RouterError";

function App() {
  return (
    <Router>
      <div className="h-dvh overflow-hidden flex flex-col bg-white text-gray-900">
        <Header />
        <main className="w-full h-dvh overflow-x-hidden overflow-y-auto scrollbar-none flex flex-col items-center z-20">
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
