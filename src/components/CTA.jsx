import { motion } from "framer-motion";
import { premiumEase } from "./ScrollReveal";

export default function CTA() {
  return (
    <section className="px-6 py-20 text-center text-white">
      <div className="hero-gradient relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-8 py-16">
        <div className="soft-grid opacity-20" />
        <div className="glass-panel premium-surface absolute inset-4 rounded-[1.75rem]" />

        <div className="relative z-10">
          <h2 className="section-heading text-4xl font-bold">
            Ready to Scale Your Admissions?
          </h2>

          <p className="mt-4 text-slate-300">
            Build a system that brings students automatically.
          </p>

          <motion.button
            onClick={() =>
              window.open("https://wa.me/918799783853", "_blank")
            }
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.24, ease: premiumEase }}
            className="premium-button button-sheen slow-pulse mt-8 rounded-2xl bg-white px-8 py-3 font-semibold text-slate-950"
          >
            Start Your Growth Journey
          </motion.button>
        </div>
      </div>
    </section>
  );
}
