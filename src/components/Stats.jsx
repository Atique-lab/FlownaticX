import { motion } from "framer-motion";
import ScrollReveal, { cardVariant, staggerContainer, viewportOnce } from "./ScrollReveal";

const stats = [
  { value: "50+", label: "Projects" },
  { value: "100%", label: "Client Retention" },
  { value: "3x", label: "More Leads" },
];

export default function Stats() {
  return (
    <ScrollReveal>
      <section className="bg-transparent px-6 py-16 text-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="glass-panel mx-auto flex max-w-6xl flex-wrap justify-center gap-12 rounded-[2rem] px-8 py-10"
        >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={cardVariant}
            className="text-center"
          >
            <h2 className="section-heading text-4xl font-bold">
              {stat.value}
            </h2>
            <p className="mt-2 text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
        </motion.div>
      </section>
    </ScrollReveal>
  );
}
