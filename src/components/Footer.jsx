import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="px-4 pb-10 pt-8 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto flex max-w-7xl flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-6 text-sm text-slate-400 backdrop-blur-xl md:flex-row md:items-center md:justify-between"
      >
        <div>
          <p className="font-semibold text-white">FlownaticX</p>
          <p className="mt-1">Premium SaaS-style portfolios, launch systems, and growth frontend experiences.</p>
        </div>
        <div className="flex gap-4 text-slate-300">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
      </motion.div>
    </footer>
  );
}
