import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function FloatingCTA() {
  return (
    <Link to="/contact">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 text-white shadow-[0_8px_30px_rgba(34,211,238,0.35)] transition-shadow hover:shadow-[0_12px_40px_rgba(34,211,238,0.5)] cursor-pointer"
      >
        <HiOutlineChatBubbleLeftRight className="text-2xl" />
      </motion.div>
    </Link>
  );
}
