import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";

const plans = [
  {
    name: "Basic",
    price: "Custom",
    features: ["10 Posts", "Basic Automation", "1 Landing Page"],
  },
  {
    name: "Medium",
    price: "₹8,999",
    highlight: true,
    features: ["20 Designs", "WhatsApp Automation", "High Converting Page"],
  },
  {
    name: "Advance",
    price: "₹14,999",
    features: ["30 Creatives", "Full Automation", "Premium Landing Page"],
  },
];

export default function Pricing() {
  return (
    <ScrollReveal>
    <section className="py-20 bg-black text-white px-6">
      <h2 className="text-4xl text-center font-bold mb-12">
        Invest in Your Growth
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <TiltCard key={i}>
            <motion.div
              whileHover={{ y: -10 }}
              className={`p-6 rounded-2xl backdrop-blur-lg ${
                plan.highlight
                  ? "border border-purple-500 shadow-[0_0_40px_rgba(139,92,246,0.6)]"
                  : "border border-white/10"
              }`}
            >
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-3xl my-4">{plan.price}</p>

              <ul className="text-gray-400 space-y-2">
                {plan.features.map((f, idx) => (
                  <li key={idx}>• {f}</li>
                ))}
              </ul>

              <button
                onClick={() =>
                  window.open("https://wa.me/918799783853", "_blank")
                }
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-green-600"
              >
                Get Started
              </button>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
    </ScrollReveal>
  );
}