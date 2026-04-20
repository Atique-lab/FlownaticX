import { motion } from "framer-motion";
import { premiumEase } from "./ScrollReveal";

export default function FloatingCTA() {
  return (
    <motion.button
      onClick={() =>
        window.open("https://wa.me/918799783853", "_blank")
      }
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      whileFocus={{ scale: 1.02 }}
      className="premium-button button-sheen fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500 px-6 py-3 font-semibold text-slate-950 shadow-[0_18px_45px_rgba(34,197,94,0.28)]"
    >
      WhatsApp
    </motion.button>
  );
}
