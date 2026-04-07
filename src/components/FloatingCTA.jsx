import { motion } from "framer-motion";

export default function FloatingCTA() {
  return (
    <motion.button
      onClick={() =>
        window.open("https://wa.me/918799783853", "_blank")
      }
      animate={{ y: [0, -12, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="fixed bottom-6 right-6 px-6 py-3 rounded-full 
      bg-gradient-to-r from-green-400 to-green-600 
      shadow-[0_0_30px_rgba(34,197,94,0.8)] hover:scale-110 transition z-50"
    >
      WhatsApp
    </motion.button>
  );
}