import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";

export default function FloatingCTA() {
  return (
    <motion.a
      href="https://wa.me/918799783853"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.4 }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-[0_8px_30px_rgba(16,185,129,0.35)] transition-shadow hover:shadow-[0_12px_40px_rgba(16,185,129,0.5)]"
    >
      <SiWhatsapp className="text-2xl" />
    </motion.a>
  );
}
