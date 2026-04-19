import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fade";
import { SectionHeading } from "./shared/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Bring your next launch, redesign, or funnel sprint to FlownaticX"
          description="A dedicated contact page is wired too, but this section keeps homepage conversion paths visible."
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="glass-panel mt-12 grid rounded-[2rem] p-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8"
        >
          <div className="max-w-md">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Let’s build</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Product-grade presentation for ambitious businesses.</h3>
            <p className="mt-4 leading-7 text-slate-300">
              Share your current site, offer, and launch goal. We’ll map the fastest path to a premium frontend.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:mt-0">
            {["Name", "Email", "Project scope"].map((field) => (
              <div key={field} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-slate-500">
                {field}
              </div>
            ))}
            <a
              href="https://wa.me/918799783853"
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3.5 text-sm font-semibold text-white"
            >
              Continue on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
