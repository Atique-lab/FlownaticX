import { motion } from "framer-motion";
import ScrollReveal, { cardVariant, staggerContainer, viewportOnce } from "./ScrollReveal";

const testimonials = [
  {
    name: "Rajesh Kumar",
    text: "Admissions increased 3x with automation system."
  },
  {
    name: "Priya Sharma",
    text: "Designs + landing page boosted conversions massively."
  },
  {
    name: "Anil Mehta",
    text: "WhatsApp automation alone paid for everything."
  }
];

export default function Testimonials() {
  return (
    <ScrollReveal>
      <section className="px-6 py-20 text-white">
        <h2 className="section-heading mb-12 text-center text-4xl font-bold">
          Trusted by Institutes
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-6xl gap-6 overflow-x-auto snap-x snap-mandatory pb-2"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariant}
              whileHover={{ y: -4 }}
              className="glass-panel min-w-[300px] snap-start rounded-[1.75rem] p-7"
            >
              <p className="text-slate-300">"{t.text}"</p>
              <h4 className="mt-4 font-semibold text-slate-50">{t.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </ScrollReveal>
  );
}
