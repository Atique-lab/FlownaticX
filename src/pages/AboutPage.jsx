import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiOutlineRocketLaunch,
  HiOutlineUserGroup,
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineMagnifyingGlass,
  HiOutlineCog6Tooth,
  HiOutlineChartBarSquare,
  HiOutlineArrowRight,
  HiOutlineStar,
} from "react-icons/hi2";
import ScrollReveal from "../components/ScrollReveal";
import {
  cardVariant,
  premiumEase,
  staggerContainer,
  viewportOnce,
} from "../components/revealVariants";

const values = [
  { icon: HiOutlineRocketLaunch, title: "Results-Driven", desc: "Every design, every automation, every line of code is built to generate measurable business growth.", color: "text-cyan-400" },
  { icon: HiOutlineUserGroup, title: "Partnership Mindset", desc: "We don't just deliver and disappear. We become your growth partner and optimize continuously.", color: "text-violet-400" },
  { icon: HiOutlineBolt, title: "Speed & Quality", desc: "Fast turnarounds without compromising on quality. Because your leads won't wait.", color: "text-amber-400" },
  { icon: HiOutlineShieldCheck, title: "Transparency", desc: "Clear pricing, honest timelines, and real-time progress updates on every project.", color: "text-emerald-400" },
];

const timeline = [
  { icon: HiOutlineMagnifyingGlass, title: "Understanding Your Business", desc: "Deep dive into your business model, target audience, competitors, and growth goals." },
  { icon: HiOutlineRocketLaunch, title: "Custom Growth Plan", desc: "A tailored roadmap covering which services you need, in what order, and expected results." },
  { icon: HiOutlineCog6Tooth, title: "Design, Build, Automate", desc: "Our team designs your brand assets, builds your website, and sets up automation systems." },
  { icon: HiOutlineChartBarSquare, title: "Track, Analyze, Scale", desc: "We monitor performance, A/B test, optimize campaigns, and scale what works." },
];

const industries = [
  { name: "Institutes & Academies", desc: "More student inquiries & admissions" },
  { name: "Restaurants & Cafes", desc: "More table bookings & delivery orders" },
  { name: "Gyms & Fitness Studios", desc: "More memberships & trial signups" },
  { name: "Clinics & Hospitals", desc: "More patient appointments" },
  { name: "Bars & Nightclubs", desc: "More footfall & event promotions" },
  { name: "Salons & Spas", desc: "More bookings & repeat customers" },
  { name: "Medical Stores", desc: "More local customer reach" },
  { name: "Real Estate", desc: "More property inquiries & site visits" },
];

const founders = [
  {
    name: "Atique",
    role: "Founder & CEO",
    img: "/founder.png",
    desc: "Visionary technologist and growth strategist who founded FlownaticX with a mission to make premium digital growth accessible to every local business.",
  },
  {
    name: "Saizel",
    role: "Co-Founder & COO",
    img: "/cofounder.png",
    desc: "Operations mastermind who ensures every project is delivered on time, on budget, and beyond expectations. The backbone of FlownaticX's execution engine.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-32 pb-16 text-center">
        <div className="page-gradient" />
        <div className="soft-grid" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="relative z-10"
        >
          <p className="section-kicker mb-3">About FlownaticX</p>
          <h1 className="heading-gradient text-4xl font-extrabold sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
            We Build Growth Machines
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            FlownaticX is a digital growth agency that combines premium design,
            intelligent automation, and high-performance web development to help
            local businesses get more customers — on autopilot.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <ScrollReveal>
        <section className="py-10">
          <div className="container-section">
            <div className="glass-panel rounded-[var(--radius-card)] px-8 py-10">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex flex-wrap justify-center gap-x-16 gap-y-8">
                {[
                  { value: "50+", label: "Projects Delivered" },
                  { value: "100%", label: "Client Retention" },
                  { value: "3×", label: "Average Lead Increase" },
                  { value: "24/7", label: "Automation Uptime" },
                ].map((s) => (
                  <motion.div key={s.label} variants={cardVariant} className="text-center">
                    <p className="heading-gradient text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
                      {s.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">{s.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Founders */}
      <ScrollReveal>
        <section className="py-[var(--section-padding)]">
          <div className="container-section">
            <p className="section-kicker mb-3 text-center">The Team</p>
            <h2 className="heading-gradient mb-14 text-center text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Meet the Founders
            </h2>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
              {founders.map((f) => (
                <motion.div key={f.name} variants={cardVariant}>
                  <div className="animated-border glass-panel premium-surface rounded-[var(--radius-card)] p-8 text-center">
                    <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-2 border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10">
                      <img
                        src={f.img}
                        alt={f.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML = `<div class="flex h-full w-full items-center justify-center text-3xl font-bold text-cyan-300" style="font-family: var(--font-heading)">${f.name.charAt(0)}</div>`;
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                      {f.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-cyan-400">{f.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Values */}
      <ScrollReveal>
        <section className="py-[var(--section-padding)]">
          <div className="container-section">
            <p className="section-kicker mb-3 text-center">Our Values</p>
            <h2 className="heading-gradient mb-14 text-center text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              What Drives Us
            </h2>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <motion.div key={v.title} variants={cardVariant} className="glass-panel premium-surface rounded-[var(--radius-card)] p-7 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10">
                    <v.icon className={`text-2xl ${v.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{v.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{v.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Process */}
      <ScrollReveal>
        <section className="py-[var(--section-padding)]">
          <div className="container-section">
            <p className="section-kicker mb-3 text-center">Our Process</p>
            <h2 className="heading-gradient mb-14 text-center text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              How We Work
            </h2>
            <div className="relative mx-auto max-w-3xl">
              <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-500/30 via-violet-500/20 to-transparent md:block" />
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-8">
                {timeline.map((step, i) => (
                  <motion.div key={step.title} variants={cardVariant} className="relative flex gap-6 md:pl-16">
                    <div className="absolute left-3.5 top-2 hidden h-5 w-5 rounded-full border-2 border-cyan-400/40 bg-slate-950 md:flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    </div>
                    <div className="glass-panel premium-surface rounded-[var(--radius-card)] p-6 flex-1">
                      <div className="flex items-center gap-2">
                        <step.icon className="text-lg text-cyan-400" />
                        <span className="section-kicker text-xs">Step {i + 1}</span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Industries */}
      <ScrollReveal>
        <section className="py-[var(--section-padding)]">
          <div className="container-section">
            <p className="section-kicker mb-3 text-center">Industries</p>
            <h2 className="heading-gradient mb-14 text-center text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Built for Every Growing Business
            </h2>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((ind) => (
                <motion.div key={ind.name} variants={cardVariant} whileHover={{ y: -4, scale: 1.02 }} className="glass-panel premium-card-hover rounded-[var(--radius-card)] p-5 text-center">
                  <h4 className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>{ind.name}</h4>
                  <p className="mt-1 text-xs text-slate-500">{ind.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <section className="py-[var(--section-padding)]">
        <div className="container-section text-center">
          <h2 className="heading-gradient text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
            Ready to Work Together?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-400">Let's discuss how FlownaticX can help your business grow.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary flex items-center gap-2 px-8 py-3">
              Contact Us <HiOutlineArrowRight />
            </Link>
            <Link to="/pricing" className="btn-secondary px-8 py-3">View Pricing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
