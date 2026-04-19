import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInBlur, fadeInUp, staggerContainer } from "../animations/fade";
import { scaleIn } from "../animations/scale";
import { floatY, heroOrbit, pulseGlow, shimmerX } from "../animations/scroll";

const metrics = [
  { value: "4.7x", label: "average funnel lift" },
  { value: "32%", label: "lower CAC with creative automation" },
  { value: "14d", label: "from audit to launch sprint" },
];

const pipelineRows = [
  ["Acquisition", "92", "bg-cyan-400"],
  ["Activation", "74", "bg-blue-500"],
  ["Retargeting", "61", "bg-violet-500"],
];

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 360], [1, 0.35]);
  const xLeft = useTransform(scrollY, [0, 600], [0, -40]);
  const xRight = useTransform(scrollY, [0, 600], [0, 45]);
  const rotate = useTransform(scrollY, [0, 600], [0, -4]);

  return (
    <section className="mesh-bg relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-10 lg:pb-24 lg:pt-36">
      <div className="absolute inset-0 bg-hero-radial" />
      <motion.div
        aria-hidden="true"
        className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]"
        style={{ y, x: xLeft }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-0 top-36 h-80 w-80 rounded-full bg-violet-500/20 blur-[140px]"
        variants={heroOrbit}
        animate="animate"
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-[18%] mx-auto h-56 w-[80%] rounded-full bg-cyan-400/10 blur-[150px]"
        variants={floatY}
        animate="animate"
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[16%] top-[22%] h-28 w-28 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
        variants={pulseGlow}
        animate="animate"
        style={{ x: xRight }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          style={{ opacity }}
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeInBlur}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-slate-200 shadow-panel backdrop-blur-xl"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.85)]" />
            Product-grade growth design for founders and local brands
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl"
          >
            FlownaticX builds
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {" "}SaaS-level growth systems
            </span>
            {" "}for brands that need velocity.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            We blend conversion-focused design, launch strategy, and automation
            into a premium frontend experience that feels like a modern product
            company, not a generic agency site.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.a
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/918799783853"
              target="_blank"
              rel="noreferrer"
              className="surface-line relative rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25"
            >
              Start a Growth Sprint
            </motion.a>
            <motion.a
              whileHover={{ y: -4 }}
              href="#projects"
              className="rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10"
            >
              Explore Case Studies
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {metrics.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -6 }}
                className="glass-panel surface-line rounded-3xl px-5 py-4"
              >
                <p className="text-2xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm text-slate-400">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-transparent to-violet-500/20 blur-3xl" />
          <motion.div
            style={{ y, rotate }}
            className="glass-panel noise-overlay relative overflow-hidden rounded-[2rem] p-5 sm:p-6"
          >
            <motion.div
              variants={shimmerX}
              animate="animate"
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-2xl"
            />
            <div className="surface-line relative rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Live pipeline overview</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Conversion Command Center
                  </h2>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  +28% this month
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {pipelineRows.map(([label, value, color], index) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/8">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{
                          duration: 1,
                          delay: 0.15 * index,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`h-full rounded-full ${color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-white/8 bg-gradient-to-br from-white/10 to-white/5 p-4"
                >
                  <p className="text-sm text-slate-400">Launch velocity</p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    11 campaigns
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    Deployed with a reusable content system.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-white/8 bg-gradient-to-br from-blue-500/12 to-violet-500/12 p-4"
                >
                  <p className="text-sm text-slate-400">Revenue touchpoints</p>
                  <p className="mt-2 text-3xl font-semibold text-white">$148k</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Tracked through landing pages and follow-up flows.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
