import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { fadeInUp, staggerContainer } from "../animations/fade";
import { floatRotate, shimmerX } from "../animations/scroll";
import { cardHover } from "../animations/scale";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { SectionHeading } from "./shared/SectionHeading";

const services = [
  {
    id: "01",
    title: "Frontend Revamps",
    badge: "UI Systems",
    description:
      "Premium landing pages, product storytelling, and conversion-focused UX built to feel like a funded SaaS company from the first scroll.",
    bullets: [
      "High-converting hero architecture",
      "Trust layers, pricing flow, and CTA clarity",
      "Responsive product-grade UI polish",
    ],
    metric: "2.4x stronger first impression",
    accent: "from-cyan-400/30 via-blue-500/20 to-transparent",
  },
  {
    id: "02",
    title: "Growth Automation",
    badge: "Funnels",
    description:
      "Lead capture, follow-up touchpoints, and remarketing systems packaged into a frontend that supports the full customer journey.",
    bullets: [
      "Offer-specific landing sequences",
      "WhatsApp and CRM flow planning",
      "Lifecycle messaging entry points",
    ],
    metric: "32% lower drop-off in warm traffic",
    accent: "from-blue-500/30 via-violet-500/20 to-transparent",
  },
  {
    id: "03",
    title: "Launch Systems",
    badge: "Go-To-Market",
    description:
      "Reusable launch templates and campaign pages that let teams keep shipping without redesigning their story every month.",
    bullets: [
      "Modular sections and offer frameworks",
      "Faster rollout for new campaigns",
      "Consistent product-style presentation",
    ],
    metric: "14-day sprint from brief to rollout",
    accent: "from-violet-500/30 via-fuchsia-500/20 to-transparent",
  },
];

function ServiceCard({ service, index, isActive, setActive }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={cardHover}
      onHoverStart={() => setActive(index)}
      onFocus={() => setActive(index)}
      className={`group relative overflow-hidden rounded-[2rem] border p-6 transition-colors ${
        isActive
          ? "border-blue-400/30 bg-white/[0.08] shadow-glow"
          : "border-white/10 bg-white/[0.035]"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 transition duration-500 group-hover:opacity-100 ${
          isActive ? "opacity-100" : ""
        }`}
      />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              {service.id}
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              {service.title}
            </h3>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
            {service.badge}
          </div>
        </div>

        <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
          {service.description}
        </p>

        <AnimatePresence initial={false}>
          {isActive ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                <ul className="space-y-3 text-sm text-slate-200">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-cyan-300" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
                  {service.metric}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

function ServiceShowcase({ activeService, progress, panelY, panelOpacity }) {
  const [progressLabel, setProgressLabel] = useState(8);

  useMotionValueEvent(progress, "change", (latest) => {
    setProgressLabel(Math.max(8, Math.min(100, Math.round(latest * 100))));
  });

  return (
    <motion.div style={{ y: panelY, opacity: panelOpacity }} className="relative lg:sticky lg:top-28">
      <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-blue-500/20 via-transparent to-violet-500/20 blur-3xl" />
      <motion.div
        variants={floatRotate}
        animate="animate"
        className="glass-panel relative overflow-hidden rounded-[2.25rem] p-5 sm:p-6"
      >
        <motion.div
          variants={shimmerX}
          animate="animate"
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-2xl"
        />

        <div className="relative z-10 rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Active service map</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {activeService.title}
              </h3>
            </div>
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              Delivery sprint
            </div>
          </div>

          <p className="mt-5 max-w-md leading-7 text-slate-300">
            {activeService.description}
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Section progress</span>
              <span>{progressLabel}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                style={{ scaleX: progress, transformOrigin: "left center" }}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {activeService.bullets.map((bullet, index) => (
              <motion.div
                key={bullet}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-xs uppercase tracking-[0.26em] text-cyan-300">
                  Layer 0{index + 1}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-200">{bullet}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-gradient-to-r from-white/[0.08] to-white/[0.03] px-4 py-4">
            <div>
              <p className="text-sm text-slate-400">Outcome marker</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {activeService.metric}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Focus
              </p>
              <p className="mt-2 text-sm text-slate-200">{activeService.badge}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, y, opacity } = useScrollAnimation({
    yRange: [48, -48],
    opacityRange: [0.45, 1, 0.55],
  });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 35%"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      id="services"
      ref={ref}
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: headerY }}
        className="absolute left-0 top-16 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]"
      />
      <motion.div
        aria-hidden="true"
        style={{ y }}
        className="absolute right-0 top-32 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]"
      />

      <div className="mx-auto max-w-7xl">
        <motion.div style={{ y: headerY }} className="max-w-3xl">
          <SectionHeading
            eyebrow="Services"
            title="Interactive systems designed to move like a premium product"
            description="Each service lane is presented like a modular product surface: richer on hover, clearer on scroll, and tuned for conversion-led storytelling."
          />
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-start">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-5"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isActive={activeIndex === index}
                setActive={setActiveIndex}
              />
            ))}
          </motion.div>

          <ServiceShowcase
            activeService={services[activeIndex]}
            progress={progress}
            panelY={y}
            panelOpacity={opacity}
          />
        </div>
      </div>
    </section>
  );
}
