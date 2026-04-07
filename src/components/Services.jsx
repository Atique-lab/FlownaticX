import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    title: "Design",
    desc: "Social media posts, ads, branding for all business types"
  },
  {
    title: "Automation",
    desc: "WhatsApp automation, lead capture, auto replies"
  },
  {
    title: "Growth System",
    desc: "Funnels, landing pages, conversion strategies"
  }
];

export default function Services() {
  return (
    <ScrollReveal>
    <section className="py-20 px-6 bg-black text-white">
      <h2 className="text-4xl text-center font-bold mb-12">
        Services That Bring Customers
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((s, i) => (
          <TiltCard key={i}>
            <motion.div
              whileHover={{ y: -12 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 
              hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition"
            >
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-gray-400 mt-2">{s.desc}</p>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
    </ScrollReveal>
  );
}