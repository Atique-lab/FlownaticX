import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fade";

export default function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-r from-blue-500/16 via-slate-950 to-violet-500/16 px-8 py-12 shadow-glow"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
          Ready to launch
        </p>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Turn your portfolio presence into a product-style growth engine.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              We design conversion systems that look premium, feel modern, and
              stay easy to scale.
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="https://wa.me/918799783853"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950"
          >
            Talk to FlownaticX
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
