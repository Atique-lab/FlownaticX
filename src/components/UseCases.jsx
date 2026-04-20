import { motion } from "framer-motion";
import ScrollReveal, { cardVariant, staggerContainer, viewportOnce } from "./ScrollReveal";

const useCases = [
  "\u{1F4DA} Institutes \u2192 More student inquiries & admissions",
  "\u{1F37D} Restaurants \u2192 More table bookings & orders",
  "\u{1F3CB}\uFE0F Gyms \u2192 More memberships & leads",
  "\u{1F3E5} Clinics \u2192 More patient bookings",
  "\u{1F378} Bars & Clubs \u2192 More footfall & promotions",
  "\u{1F48A} Medical Stores \u2192 More local customer reach",
];

export default function UseCases() {
  return (
    <ScrollReveal>
      <section className="px-6 py-20 text-center text-white">
        <h2 className="section-heading mb-8 text-4xl font-bold">
          How We Help Different Businesses
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-4xl space-y-4 text-slate-300"
        >
          {useCases.map((item) => (
            <motion.p
              key={item}
              variants={cardVariant}
              className="glass-panel rounded-2xl px-6 py-4"
            >
              {item}
            </motion.p>
          ))}
        </motion.div>
      </section>
    </ScrollReveal>
  );
}
