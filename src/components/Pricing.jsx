import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../animations/fade";
import { SectionHeading } from "./shared/SectionHeading";

const plans = [
  {
    name: "Launch",
    price: "$899",
    description:
      "For lean teams that need a sharper frontend and a faster first conversion path.",
  },
  {
    name: "Growth",
    price: "$1,899",
    description:
      "For teams ready to pair premium design with automation and performance iterations.",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    description:
      "For multi-offer brands that need a flexible system, not just a one-off page build.",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans with premium execution"
          description="Retainers and project sprints structured for clarity, collaboration, and fast rollout."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.article
              key={plan.name}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className={`rounded-[2rem] p-6 ${
                plan.featured
                  ? "border border-blue-400/30 bg-gradient-to-br from-blue-500/18 to-violet-500/18 shadow-glow backdrop-blur-xl"
                  : "glass-panel"
              }`}
            >
              <p className="text-sm uppercase tracking-[0.25em] text-slate-300">
                {plan.name}
              </p>
              <p className="mt-5 text-4xl font-semibold text-white">
                {plan.price}
              </p>
              <p className="mt-4 leading-7 text-slate-300">
                {plan.description}
              </p>
              <button className="mt-8 w-full rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                Choose {plan.name}
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
