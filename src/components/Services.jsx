import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import ScrollReveal, { cardVariant, premiumEase, staggerContainer, viewportOnce } from "./ScrollReveal";

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
      <section className="px-6 py-20 text-white">
        <h2 className="section-heading mb-12 text-center text-4xl font-bold">
          Services That Bring Customers
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3"
        >
          {services.map((s, i) => (
            <motion.div key={i} variants={cardVariant}>
              <TiltCard>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.28, ease: premiumEase }}
                  className="glass-panel premium-surface premium-card-hover rounded-[1.75rem] p-7"
                >
                  <motion.div
                    whileHover={{ width: 72 }}
                    transition={{ duration: 0.28, ease: premiumEase }}
                    className="mb-5 h-1.5 w-14 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-500"
                  />
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-slate-400">{s.desc}</p>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </ScrollReveal>
  );
}
