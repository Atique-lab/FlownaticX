import { motion } from "framer-motion";
import { premiumEase, sectionVariant } from "./ScrollReveal";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-28 text-center">
      <div className="hero-gradient absolute inset-0 opacity-95" />
      <div className="soft-grid" />

      <div className="hero-blob hero-blob-left absolute left-[8%] top-[18%] h-[22rem] w-[22rem] rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="hero-blob hero-blob-right absolute right-[10%] top-[16%] h-[18rem] w-[18rem] rounded-full bg-fuchsia-500/12 blur-3xl" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariant}
        className="glass-panel premium-surface hero-float relative z-10 max-w-5xl rounded-[2rem] px-8 py-12 md:px-14 md:py-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
          Turn Your Business Into a{" "}
          <span className="section-heading">
            Lead Generating Machine
          </span>
        </h1>

        <p className="mt-6 text-lg text-slate-300 md:px-8">
          We help Institutes, Restaurants, Gyms, Clinics, Bars & Local Businesses
          get more customers using smart design + automation systems.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <motion.button
            onClick={() =>
              window.open("https://wa.me/918799783853", "_blank")
            }
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.24, ease: premiumEase }}
            className="premium-button button-sheen rounded-2xl bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500 px-8 py-3 font-semibold text-slate-950 hover:shadow-[0_24px_60px_rgba(34,197,94,0.36)]"
          >
            Get More Customers
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
