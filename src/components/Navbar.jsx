import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 50);
    });
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-50 px-6 py-4 transition ${
        scrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-10" />
        </div>

        <button
          onClick={() =>
            window.open("https://wa.me/918799783853", "_blank")
          }
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 
          shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:scale-105 transition"
        >
          WhatsApp
        </button>
      </div>
    </div>
  );
}