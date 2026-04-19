import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fade";

export default function About() {
  return (
    <section className="px-4 pb-20 pt-36 sm:px-6 lg:px-10">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">About</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">FlownaticX is evolving from a portfolio into a startup-grade frontend brand.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          This page is now part of the routed SaaS architecture and is ready for expanded brand story, process, and team sections in the next build pass.
        </p>
      </motion.div>
    </section>
  );
}
