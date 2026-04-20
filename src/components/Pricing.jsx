import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import ScrollReveal, { cardVariant, premiumEase, staggerContainer, viewportOnce } from "./ScrollReveal";

const plans = [
  {
    name: "Basic",
    price: "Custom",
    features: ["10 Posts", "Basic Automation", "1 Landing Page"],
  },
  {
    name: "Medium",
    price: "\u20B98,999",
    highlight: true,
    features: ["20 Designs", "WhatsApp Automation", "High Converting Page"],
  },
  {
    name: "Advance",
    price: "\u20B914,999",
    features: ["30 Creatives", "Full Automation", "Premium Landing Page"],
  },
];

export default function Pricing() {
  return (
    <ScrollReveal>
      <section className="px-6 py-20 text-white">
        <h2 className="section-heading mb-12 text-center text-4xl font-bold">
          Invest in Your Growth
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3"
        >
          {plans.map((plan, i) => (
            <motion.div key={plan.name} variants={cardVariant}>
              <TiltCard>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.28, ease: premiumEase }}
                  className={`animated-border glass-panel premium-surface premium-card-hover relative rounded-[1.9rem] p-7 ${
                    plan.highlight
                      ? "shadow-[0_28px_90px_rgba(168,85,247,0.24)]"
                      : ""
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                  )}

                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-4 text-3xl font-semibold text-slate-50">{plan.price}</p>

                  <ul className="mt-6 space-y-3 text-slate-300">
                    {plan.features.map((f) => (
                      <li key={f}>{"\u2022"} {f}</li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      window.open("https://wa.me/918799783853", "_blank")
                    }
                    className={`premium-button button-sheen mt-8 w-full rounded-2xl py-3 font-semibold ${
                      plan.highlight
                        ? "bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-500 text-slate-950 hover:shadow-[0_24px_70px_rgba(56,189,248,0.3)]"
                        : "bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500 text-slate-950 hover:shadow-[0_24px_70px_rgba(34,197,94,0.26)]"
                    }`}
                  >
                    Get Started
                  </button>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </ScrollReveal>
  );
}
