import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiOutlinePaintBrush,
  HiOutlineBolt,
  HiOutlineGlobeAlt,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import ScrollReveal from "../components/ScrollReveal";
import {
  cardVariant,
  premiumEase,
  staggerContainer,
  viewportOnce,
} from "../components/revealVariants";
import TiltCard from "../components/TiltCard";

const serviceCategories = [
  {
    id: "design",
    icon: HiOutlinePaintBrush,
    iconColor: "text-pink-400",
    title: "Design & Branding",
    subtitle: "Visual Identity That Converts",
    desc: "From scroll-stopping social media content to complete brand identity kits — we design everything your business needs to look premium and attract customers.",
    color: "from-pink-500 to-violet-500",
    colorLight: "from-pink-500/10 to-violet-500/10",
    border: "border-pink-500/15",
    features: [
      { name: "Social Media Posts", detail: "Instagram, Facebook, LinkedIn — branded templates and one-off designs" },
      { name: "Poster & Banner Design", detail: "Print-ready event posters, banners, and promotional materials" },
      { name: "Ad Creatives", detail: "Facebook Ads, Google Ads, Instagram Stories — optimized for conversions" },
      { name: "Brand Identity Kit", detail: "Logo, color palette, typography, brand guidelines document" },
      { name: "Story & Reel Templates", detail: "Reusable Instagram/Facebook story and reel templates" },
      { name: "Video Thumbnails", detail: "YouTube and social media video thumbnails that get clicks" },
    ],
  },
  {
    id: "automation",
    icon: HiOutlineBolt,
    iconColor: "text-cyan-400",
    title: "Automation Systems",
    subtitle: "Your Business on Autopilot",
    desc: "Stop losing leads while you sleep. Our automation systems capture, nurture, and convert leads 24/7 using WhatsApp, SMS, email, and AI calling agents.",
    color: "from-cyan-500 to-blue-500",
    colorLight: "from-cyan-500/10 to-blue-500/10",
    border: "border-cyan-500/15",
    features: [
      { name: "Lead Capture System", detail: "Multi-channel lead capture from website, ads, WhatsApp, and social media" },
      { name: "Auto-Reply System", detail: "Instant WhatsApp and email auto-replies to every inquiry — never miss a lead" },
      { name: "Message Alert System", detail: "Real-time notifications via WhatsApp, SMS, and email when leads come in" },
      { name: "AI Calling Agent", detail: "AI-powered calling system that follows up with leads automatically" },
      { name: "CRM Integration", detail: "Connect all leads to your CRM or Google Sheets for easy tracking" },
      { name: "Follow-up Sequences", detail: "Automated multi-day follow-up messages to nurture cold leads" },
    ],
  },
  {
    id: "web",
    icon: HiOutlineGlobeAlt,
    iconColor: "text-emerald-400",
    title: "Web Development",
    subtitle: "Websites Built to Convert",
    desc: "From single-page landing pages to full-stack web applications — every site we build is fast, mobile-optimized, and engineered to turn visitors into customers.",
    color: "from-emerald-500 to-teal-500",
    colorLight: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/15",
    features: [
      { name: "Landing Pages", detail: "Single-page, high-converting designs optimized for ad traffic" },
      { name: "Multi-Page Websites", detail: "Business websites with blog, gallery, contact, and admin dashboard" },
      { name: "Full-Stack Web Apps", detail: "Custom web applications with authentication, database, and APIs" },
      { name: "Mobile Responsive", detail: "Every pixel looks perfect on phones, tablets, and desktops" },
      { name: "SEO Optimization", detail: "Technical SEO, meta tags, speed optimization, and schema markup" },
      { name: "Performance Monitoring", detail: "Analytics dashboard to track visitors, conversions, and page speed" },
    ],
  },
];

export default function ServicesPage() {
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
          <p className="section-kicker mb-3">Our Services</p>
          <h1 className="heading-gradient text-4xl font-extrabold sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
            Everything You Need to Grow
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            Three powerful service categories — each designed to attract, capture, and convert more customers for your business.
          </p>
        </motion.div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((cat, catIndex) => (
        <ScrollReveal key={cat.id}>
          <section className="py-[var(--section-padding)]">
            <div className="container-section">
              <div className={`grid items-center gap-12 ${catIndex % 2 === 0 ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"}`}>
                <div className={catIndex % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.colorLight}`}>
                    <cat.icon className={`text-2xl ${cat.iconColor}`} />
                  </div>
                  <h2 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>{cat.title}</h2>
                  <p className={`mt-1 text-lg font-medium bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>{cat.subtitle}</p>
                  <p className="mt-4 text-slate-400 leading-relaxed">{cat.desc}</p>
                  <div className="mt-8 flex gap-3">
                    <Link to="/pricing" className="btn-primary flex items-center gap-2 py-2.5 text-sm">
                      View Pricing <HiOutlineArrowRight />
                    </Link>
                    <a href="https://wa.me/918799783853" target="_blank" rel="noopener noreferrer" className="btn-secondary py-2.5 text-sm">
                      Discuss Your Needs
                    </a>
                  </div>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className={`grid gap-4 sm:grid-cols-2 ${catIndex % 2 !== 0 ? "lg:order-1" : ""}`}
                >
                  {cat.features.map((f) => (
                    <motion.div key={f.name} variants={cardVariant}>
                      <TiltCard>
                        <div className={`glass-panel premium-surface premium-card-hover rounded-[var(--radius-card)] p-5 ${cat.border}`}>
                          <div className={`mb-3 h-1 w-8 rounded-full bg-gradient-to-r ${cat.color}`} />
                          <h4 className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>{f.name}</h4>
                          <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{f.detail}</p>
                        </div>
                      </TiltCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      ))}

      {/* CTA */}
      <section className="py-[var(--section-padding)]">
        <div className="container-section text-center">
          <h2 className="heading-gradient text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
            Ready to See Pricing?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-400">
            Transparent pricing for every service. Pick what your business needs — or bundle for maximum impact.
          </p>
          <div className="mt-8">
            <Link to="/pricing" className="btn-primary flex items-center gap-2 px-8 py-3 mx-auto w-fit">
              View All Pricing <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
