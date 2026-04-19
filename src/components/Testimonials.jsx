import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInBlur, fadeInUp } from "../animations/fade";
import { pulseGlow } from "../animations/scroll";
import { SectionHeading } from "./shared/SectionHeading";

const testimonials = [
  {
    quote:
      "FlownaticX made our offer feel like a real software product. The site started converting from week one.",
    name: "Aarav Mehta",
    role: "Founder, LaunchDock",
    metric: "2.1x increase in qualified calls",
  },
  {
    quote:
      "The motion, clarity, and pricing narrative gave our brand a much more premium signal in outbound and paid traffic.",
    name: "Maya Kapoor",
    role: "Marketing Lead, Vanta Clinic",
    metric: "31% stronger paid landing page conversion",
  },
  {
    quote:
      "Our old site looked serviceable. The new direction feels like a serious product company and clients respond to it immediately.",
    name: "Kabir Nanda",
    role: "Operator, Northstar Growth",
    metric: "46% longer average session duration",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const active = testimonials[activeIndex];

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10">
      <motion.div
        aria-hidden="true"
        variants={pulseGlow}
        animate="animate"
        className="absolute right-16 top-10 h-64 w-64 rounded-full bg-violet-500/10 blur-[130px]"
      />
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeInBlur}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeading
            eyebrow="Testimonials"
            title="Social proof presented with more clarity, motion, and premium structure"
            description="The section now behaves like a lightweight carousel with timed transitions, richer client signal, and stronger visual hierarchy."
          />
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)]">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="glass-panel noise-overlay surface-line relative overflow-hidden rounded-[2.25rem] p-8 sm:p-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/25 to-violet-500/25 text-lg font-semibold text-white">
                    {active.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{active.name}</p>
                    <p className="text-sm text-slate-400">{active.role}</p>
                  </div>
                </div>

                <p className="text-2xl leading-10 text-slate-100 sm:text-[1.9rem] sm:leading-[3rem]">
                  "{active.quote}"
                </p>

                <div className="mt-8 inline-flex rounded-full border border-emerald-400/15 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                  {active.metric}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="grid gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.name}
                type="button"
                whileHover={{ y: -4 }}
                onClick={() => setActiveIndex(index)}
                className={`rounded-[1.75rem] border p-5 text-left transition ${
                  activeIndex === index
                    ? "border-blue-400/30 bg-white/[0.08] shadow-glow"
                    : "border-white/10 bg-white/[0.035]"
                }`}
              >
                <p className="text-sm uppercase tracking-[0.26em] text-cyan-300">
                  Client 0{index + 1}
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-slate-400">{testimonial.role}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {testimonial.metric}
                </p>
              </motion.button>
            ))}

            <div className="glass-panel rounded-[1.75rem] p-5">
              <div className="flex gap-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeIndex === index
                        ? "w-12 bg-gradient-to-r from-cyan-400 to-violet-500"
                        : "w-6 bg-white/15"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Auto-rotating social proof with manual controls for better scanability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
