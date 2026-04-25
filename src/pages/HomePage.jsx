import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlinePaintBrush,
  HiOutlineBolt,
  HiOutlineGlobeAlt,
  HiOutlineMagnifyingGlass,
  HiOutlineRocketLaunch,
  HiOutlineCog6Tooth,
  HiOutlineChartBarSquare,
  HiOutlineArrowRight,
  HiOutlineStar,
  HiOutlineUserGroup,
  HiOutlineChatBubbleLeftRight,
  HiOutlinePhoto,
  HiOutlineCurrencyRupee,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { SiWhatsapp } from "react-icons/si";
import ScrollReveal from "../components/ScrollReveal";
import {
  cardVariant,
  premiumEase,
  staggerContainer,
  viewportOnce,
} from "../components/revealVariants";
import TiltCard from "../components/TiltCard";
import SEO from "../components/SEO";

/* ─── TEXT CYCLE ─── */
const cycleWords = [
  "Institutes",
  "Restaurants",
  "Gyms",
  "Clinics",
  "Salons",
  "Bars & Clubs",
];

/* ─── STATS ─── */
const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "100%", label: "Client Retention" },
  { value: "3×", label: "Average Lead Increase" },
  { value: "24/7", label: "Automation Uptime" },
];

/* ─── SERVICES PREVIEW ─── */
const services = [
  {
    icon: HiOutlinePaintBrush,
    title: "Design & Branding",
    desc: "Social media posts, posters, ad creatives, and full brand identity kits that stop the scroll.",
    color: "from-pink-500/12 to-violet-500/12",
    border: "hover:border-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    icon: HiOutlineBolt,
    title: "Automation Systems",
    desc: "WhatsApp auto-replies, lead capture bots, message alerts, and AI calling agents — running 24/7.",
    color: "from-cyan-500/12 to-blue-500/12",
    border: "hover:border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Web Development",
    desc: "High-converting landing pages and full-stack web applications built for speed and scale.",
    color: "from-emerald-500/12 to-teal-500/12",
    border: "hover:border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
];

/* ─── PROCESS ─── */
const processSteps = [
  { step: "01", title: "Discovery", desc: "We learn your business, audience, and goals inside out.", icon: HiOutlineMagnifyingGlass },
  { step: "02", title: "Strategy", desc: "Custom growth plan with clear deliverables and timeline.", icon: HiOutlineRocketLaunch },
  { step: "03", title: "Execution", desc: "Design, build, and deploy your complete growth system.", icon: HiOutlineCog6Tooth },
  { step: "04", title: "Scale", desc: "Track results, optimize, and keep growing your leads.", icon: HiOutlineChartBarSquare },
];

/* ─── PAGE PREVIEWS ─── */
const pageLinks = [
  {
    to: "/services",
    icon: HiOutlineBolt,
    title: "Services",
    desc: "Explore our 3 core services — Design, Automation & Web Development with detailed feature breakdowns.",
    color: "text-cyan-400",
    bg: "from-cyan-500/8 to-blue-500/8",
  },
  {
    to: "/pricing",
    icon: HiOutlineCurrencyRupee,
    title: "Pricing",
    desc: "Transparent pricing for every service. Compare plans side-by-side and pick what fits your budget.",
    color: "text-emerald-400",
    bg: "from-emerald-500/8 to-teal-500/8",
  },
  {
    to: "/portfolio",
    icon: HiOutlinePhoto,
    title: "Portfolio",
    desc: "Browse our best work — designs, landing pages, and automation dashboards we've built for clients.",
    color: "text-violet-400",
    bg: "from-violet-500/8 to-purple-500/8",
  },
  {
    to: "/about",
    icon: HiOutlineUserGroup,
    title: "About Us",
    desc: "Meet the team behind FlownaticX. Our story, values, process, and the industries we serve.",
    color: "text-amber-400",
    bg: "from-amber-500/8 to-orange-500/8",
  },
  {
    to: "/testimonials",
    icon: HiOutlineStar,
    title: "Testimonials",
    desc: "Real results from real businesses. Read what our clients say about working with us.",
    color: "text-pink-400",
    bg: "from-pink-500/8 to-rose-500/8",
  },
  {
    to: "/contact",
    icon: HiOutlineChatBubbleLeftRight,
    title: "Contact",
    desc: "Ready to grow? Send us a message and get a custom growth plan within 24 hours.",
    color: "text-sky-400",
    bg: "from-sky-500/8 to-indigo-500/8",
  },
];

/* ─── TESTIMONIAL PREVIEW ─── */
const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Director, Excel Academy",
    text: "Admissions increased 3x within the first two months after FlownaticX automated our entire inquiry-to-enrollment pipeline.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Owner, The Spice Kitchen",
    text: "The landing page and WhatsApp automation brought in 200+ new orders in the first month. Absolutely worth every rupee.",
    rating: 5,
  },
  {
    name: "Anil Mehta",
    role: "Founder, FitZone Gym",
    text: "WhatsApp auto-replies and the AI calling agent alone have paid for the entire package multiple times over.",
    rating: 5,
  },
];

export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setWordIndex((prev) => (prev + 1) % cycleWords.length),
      2400
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SEO 
        title="Digital Growth Agency" 
        description="FlownaticX helps Institutes, Restaurants, Gyms & Local Businesses get more customers with premium design, automation, and high-converting websites."
      />
      {/* ══════════ HERO ══════════ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28 pb-20 text-center">
        <div className="hero-gradient absolute inset-0 opacity-90" />
        <div className="soft-grid" />
        <div className="absolute left-[6%] top-[16%] h-[24rem] w-[24rem] rounded-full bg-cyan-400/8 blur-[100px]" />
        <div className="absolute right-[8%] top-[14%] h-[20rem] w-[20rem] rounded-full bg-violet-500/10 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: premiumEase }}
          className="relative z-10 max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="section-kicker mb-6"
          >
            Digital Growth Agency
          </motion.p>

          <h1
            className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            We Help{" "}
            <span className="heading-gradient relative inline-block min-w-[200px]">
              <motion.span
                key={cycleWords[wordIndex]}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: premiumEase }}
                className="inline-block"
              >
                {cycleWords[wordIndex]}
              </motion.span>
            </span>
            <br />
            Get More Customers
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-300/90 md:text-xl"
          >
            Premium design, smart automation, and conversion-optimized websites
            — everything your business needs to grow on autopilot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/contact"
              className="btn-primary flex items-center gap-2 px-8 py-3.5 text-base"
            >
              Start Your Growth Plan
              <HiOutlineArrowRight className="text-lg" />
            </Link>
            <Link to="/portfolio" className="btn-secondary flex items-center gap-2 px-8 py-3.5 text-base">
              See Our Work
              <HiOutlineArrowRight className="text-lg" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-400"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="font-bold text-white">{s.value}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════ SERVICES PREVIEW ══════════ */}
      <ScrollReveal>
        <section className="py-[var(--section-padding)]">
          <div className="container-section">
            <p className="section-kicker mb-3 text-center">What We Do</p>
            <h2 className="heading-gradient mb-4 text-center text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Three Pillars of Growth
            </h2>
            <p className="mx-auto mb-14 max-w-2xl text-center text-slate-400">
              Each service is designed to work together as a complete system — or pick what your business needs right now.
            </p>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid gap-6 md:grid-cols-3">
              {services.map((s) => (
                <motion.div key={s.title} variants={cardVariant}>
                  <TiltCard>
                    <Link to="/services">
                      <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3, ease: premiumEase }}
                        className={`glass-panel premium-surface premium-card-hover rounded-[var(--radius-card)] p-8 ${s.border}`}
                      >
                        <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color}`}>
                          <s.icon className={`text-2xl ${s.iconColor}`} />
                        </div>
                        <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                        <div className="mt-5 flex items-center gap-1 text-sm font-medium text-cyan-400">
                          Learn more <HiOutlineArrowRight />
                        </div>
                      </motion.div>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════ PROCESS ══════════ */}
      <ScrollReveal>
        <section className="py-[var(--section-padding)]">
          <div className="container-section">
            <p className="section-kicker mb-3 text-center">How It Works</p>
            <h2 className="heading-gradient mb-14 text-center text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Your Growth Roadmap
            </h2>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((s) => (
                <motion.div key={s.step} variants={cardVariant} className="glass-panel premium-surface rounded-[var(--radius-card)] p-7 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/12 to-violet-500/12">
                    <s.icon className="text-2xl text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════ EXPLORE PAGES ══════════ */}
      <ScrollReveal>
        <section className="py-[var(--section-padding)]">
          <div className="container-section">
            <p className="section-kicker mb-3 text-center">Explore</p>
            <h2 className="heading-gradient mb-14 text-center text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Everything in One Place
            </h2>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pageLinks.map((p) => (
                <motion.div key={p.to} variants={cardVariant}>
                  <Link to={p.to}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.01 }}
                      transition={{ duration: 0.28, ease: premiumEase }}
                      className="glass-panel premium-card-hover group flex items-start gap-4 rounded-[var(--radius-card)] p-6"
                    >
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${p.bg}`}>
                        <p.icon className={`text-xl ${p.color}`} />
                      </div>
                      <div>
                        <h3 className="flex items-center gap-1.5 text-base font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                          {p.title}
                          <HiOutlineArrowRight className="text-sm text-slate-500 transition-transform group-hover:translate-x-1" />
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">{p.desc}</p>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════ TESTIMONIALS PREVIEW ══════════ */}
      <ScrollReveal>
        <section className="py-[var(--section-padding)]">
          <div className="container-section">
            <p className="section-kicker mb-3 text-center">Client Results</p>
            <h2 className="heading-gradient mb-14 text-center text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Trusted by Growing Businesses
            </h2>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <motion.div key={t.name} variants={cardVariant}>
                  <div className="glass-panel premium-surface rounded-[var(--radius-card)] p-7">
                    <div className="mb-4 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <HiOutlineStar key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-slate-300">&ldquo;{t.text}&rdquo;</p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-sm font-bold text-cyan-300">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10 text-center">
              <Link to="/testimonials" className="btn-secondary flex items-center justify-center gap-2 px-6 py-2.5 text-sm mx-auto w-fit">
                Read All Reviews <HiOutlineArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════ CTA ══════════ */}
      <section className="py-[var(--section-padding)]">
        <div className="container-section">
          <div className="hero-gradient relative overflow-hidden rounded-[2rem] px-8 py-20 text-center">
            <div className="soft-grid opacity-20" />
            <div className="glass-panel premium-surface absolute inset-4 rounded-[1.75rem]" />
            <div className="relative z-10">
              <p className="section-kicker mb-3">Ready to Grow?</p>
              <h2 className="heading-gradient text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
                Let&apos;s Build Your Growth Machine
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">
                Get a custom growth plan tailored to your business — design, automation, and web development, all in one place.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="btn-primary flex items-center gap-2 px-8 py-3.5"
                >
                  Claim Your Free Plan
                  <HiOutlineArrowRight className="text-lg" />
                </Link>
                <Link to="/contact" className="btn-secondary px-8 py-3.5">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
