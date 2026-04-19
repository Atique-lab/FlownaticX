import { Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const HomePage = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const ServicesPage = lazy(() => import("./pages/Services"));
const ContactPage = lazy(() => import("./pages/Contact"));

function PageShell() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center">
                <div className="glass-panel rounded-full px-5 py-2 text-sm text-slate-200">
                  Loading FlownaticX...
                </div>
              </div>
            }
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PageShell />
    </BrowserRouter>
  );
}
