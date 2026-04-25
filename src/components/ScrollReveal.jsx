import { motion } from "framer-motion";
import { viewportOnce, sectionVariant } from "./revealVariants";

export default function ScrollReveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={sectionVariant}
    >
      {children}
    </motion.div>
  );
}
