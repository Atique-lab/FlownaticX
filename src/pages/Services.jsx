import { motion } from "framer-motion";
import ServicesSection from "../components/Services";
import CTA from "../components/CTA";
import { fadeInUp } from "../animations/fade";

export default function ServicesPage() {
  return (
    <>
      <section className="px-4 pb-8 pt-36 sm:px-6 lg:px-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-7xl"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Services</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Frontend systems, motion design, and growth experiences that feel like premium software.
          </h1>
        </motion.div>
      </section>
      <ServicesSection />
      <CTA />
    </>
  );
}
