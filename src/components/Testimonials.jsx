import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

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
    <section className="py-20 bg-black text-white px-6">
      <h2 className="text-4xl text-center font-bold mb-12">
        Trusted by Institutes
      </h2>

      <div className="flex gap-6 overflow-x-auto max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="min-w-[300px] p-6 bg-white/5 rounded-2xl border border-white/10"
          >
            <p className="text-gray-300">"{t.text}"</p>
            <h4 className="mt-4 font-semibold">{t.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
    </ScrollReveal>
  );
}