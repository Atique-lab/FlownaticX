import { motion } from "framer-motion";
import ScrollReveal, { cardVariant, staggerContainer, viewportOnce } from "./ScrollReveal";

const businesses = [
  "Institutes",
  "Restaurants",
  "Gyms",
  "Clinics",
  "Bars",
  "Clubs",
  "Medical Stores",
  "Salons",
];

export default function BusinessTypes() {
  return (
    <ScrollReveal>
      <section className="px-6 py-16 text-center text-white">
        <h2 className="section-heading mb-8 text-3xl font-bold">
          Built for Every Growing Business
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4"
        >
          {businesses.map((b, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{ y: -4, scale: 1.04 }}
              className="glass-panel rounded-full px-6 py-2 text-slate-100"
            >
              {b}
            </motion.div>
          ))}
        </motion.div>
      </section>
    </ScrollReveal>
  );
}
