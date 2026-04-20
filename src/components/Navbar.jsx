import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 px-6 py-4 transition ${
        scrolled
          ? "bg-slate-950/60 backdrop-blur-2xl border-b border-white/10 shadow-[0_18px_60px_rgba(2,6,23,0.35)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-10" />
        </div>

        <a
          href="https://wa.me/918799783853"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open WhatsApp chat"
          className="premium-button inline-flex items-center justify-center px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-green-400 to-green-500 text-slate-950 font-semibold
          transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(34,197,94,0.34)]"
        >
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
