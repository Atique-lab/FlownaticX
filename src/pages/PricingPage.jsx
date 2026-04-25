import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlinePaintBrush,
  HiOutlineBolt,
  HiOutlineGlobeAlt,
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlineFire,
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { SiWhatsapp } from "react-icons/si";
import ScrollReveal from "../components/ScrollReveal";
import {
  cardVariant,
  premiumEase,
  staggerContainer,
} from "../components/revealVariants";
import TiltCard from "../components/TiltCard";

/* ════════════════════════════════════════════
   PRICING DATA
   ════════════════════════════════════════════ */

const categories = [
  {
    id: "design",
    label: "Design & Branding",
    icon: HiOutlinePaintBrush,
    billingNote: "per month",
    urgency: "Only 3 onboarding slots left this month",
    plans: [
      {
        name: "Starter",
        priceINR: "4,999",
        priceUSD: "59",
        period: "/mo",
        originalINR: "7,499",
        originalUSD: "89",
        desc: "Perfect for small businesses getting started with social media.",
        badge: null,
        features: [
          "10 Social Media Posts",
          "2 Poster Designs",
          "2 Ad Creatives",
          "Basic Brand Color Palette",
          "1 Revision per design",
          "JPG & PNG Delivery",
        ],
        excluded: [
          "Brand Identity Kit",
          "Story & Reel Templates",
          "Video Thumbnails",
          "Motion Graphics",
          "Dedicated Designer",
        ],
        cta: "Get Started",
        ctaStyle: "btn-primary",
      },
      {
        name: "Growth",
        priceINR: "9,999",
        priceUSD: "119",
        period: "/mo",
        originalINR: "14,999",
        originalUSD: "179",
        popular: true,
        desc: "Most chosen by growing businesses. Scale your brand fast.",
        badge: "Most Popular",
        features: [
          "20 Social Media Posts",
          "5 Poster Designs",
          "6 Ad Creatives (FB, IG, Google)",
          "Brand Identity Kit",
          "Story & Reel Templates (5)",
          "Unlimited Revisions",
          "Source File Delivery",
          "Priority Support",
        ],
        excluded: [
          "Video Thumbnails",
          "Motion Graphics",
          "Dedicated Designer",
        ],
        cta: "Start Growing",
        ctaStyle: "btn-accent",
      },
      {
        name: "Enterprise",
        priceINR: "19,999",
        priceUSD: "239",
        period: "/mo",
        originalINR: "29,999",
        originalUSD: "359",
        desc: "Complete creative team for brands that demand premium quality.",
        badge: "Best Value",
        features: [
          "30+ Social Media Posts",
          "10 Poster Designs",
          "12 Ad Creatives (All Platforms)",
          "Complete Brand Identity",
          "Story & Reel Templates (15)",
          "Video Thumbnails & Banners",
          "Motion Graphics (3 videos)",
          "Dedicated Designer",
          "Unlimited Revisions",
          "Same-day Turnaround",
        ],
        excluded: [],
        cta: "Contact Us",
        ctaStyle: "btn-primary",
      },
    ],
  },
  {
    id: "automation",
    label: "Automation Systems",
    icon: HiOutlineBolt,
    billingNote: "per month",
    urgency: "Setup takes 48 hrs — Start today, go live by weekend",
    plans: [
      {
        name: "Essential",
        priceINR: "7,999",
        priceUSD: "95",
        period: "/mo",
        originalINR: "11,999",
        originalUSD: "139",
        desc: "Start capturing leads and auto-replying to inquiries instantly.",
        badge: null,
        features: [
          "Lead Capture Forms (3)",
          "Basic Auto-Reply System",
          "WhatsApp Message Alerts",
          "Up to 500 Contacts",
          "Email Notifications",
          "Google Sheets Integration",
          "Monthly Performance Report",
        ],
        excluded: [
          "AI Calling Agent",
          "SMS Alerts",
          "CRM Integration",
          "Follow-up Sequences",
          "Custom Integrations",
          "Dedicated Account Manager",
        ],
        cta: "Get Started",
        ctaStyle: "btn-primary",
      },
      {
        name: "Professional",
        priceINR: "14,999",
        priceUSD: "179",
        period: "/mo",
        originalINR: "21,999",
        originalUSD: "259",
        popular: true,
        desc: "AI-powered calling + multi-channel capture for serious growth.",
        badge: "Most Popular",
        features: [
          "Multi-Channel Lead Capture",
          "Smart Auto-Reply System",
          "WhatsApp + SMS Alerts",
          "AI Calling Agent (100 calls/mo)",
          "CRM Integration",
          "Up to 2,000 Contacts",
          "Automated Follow-up Sequences",
          "Weekly Performance Reports",
          "Priority Support",
        ],
        excluded: [
          "Unlimited Calls",
          "Custom Integrations",
          "Dedicated Account Manager",
        ],
        cta: "Start Automating",
        ctaStyle: "btn-accent",
      },
      {
        name: "Scale",
        priceINR: "24,999",
        priceUSD: "299",
        period: "/mo",
        originalINR: "39,999",
        originalUSD: "479",
        desc: "Enterprise-grade automation. Unlimited AI. Maximum conversions.",
        badge: "Best Value",
        features: [
          "Enterprise Lead Capturing",
          "AI-Powered Smart Replies",
          "Omnichannel Alert System",
          "AI Calling Agent (Unlimited)",
          "Custom CRM Dashboard",
          "Unlimited Contacts",
          "Advanced Follow-up Sequences",
          "Custom Integrations",
          "Dedicated Account Manager",
          "Real-time Analytics Dashboard",
        ],
        excluded: [],
        cta: "Contact Us",
        ctaStyle: "btn-primary",
      },
    ],
  },
  {
    id: "web",
    label: "Web Development",
    icon: HiOutlineGlobeAlt,
    billingNote: "one-time payment",
    urgency: "Book this week — get free 1-month maintenance worth ₹5,000",
    plans: [
      {
        name: "Landing Page",
        priceINR: "14,999",
        priceUSD: "179",
        period: " one-time",
        originalINR: "19,999",
        originalUSD: "239",
        desc: "A high-converting single-page site perfect for ad traffic.",
        badge: null,
        features: [
          "Single Page Design",
          "Mobile Responsive",
          "Contact / Lead Form",
          "WhatsApp Chat Widget",
          "Basic SEO Setup",
          "1 GB Storage",
          "Up to 10K Monthly Visitors",
          "30-Day Support",
          "2 Revisions",
        ],
        excluded: [
          "Blog / CMS",
          "Admin Dashboard",
          "User Authentication",
          "Database & API",
          "Payment Integration",
        ],
        note: "Domain & Hosting not included",
        cta: "Get Started",
        ctaStyle: "btn-primary",
      },
      {
        name: "Business Website",
        priceINR: "34,999",
        priceUSD: "419",
        period: " one-time",
        originalINR: "49,999",
        originalUSD: "599",
        popular: true,
        desc: "Multi-page site with CMS, blog, and admin dashboard.",
        badge: "Most Popular",
        features: [
          "Up to 5 Pages",
          "Mobile Responsive",
          "Admin Dashboard",
          "Blog / CMS System",
          "Gallery & Portfolio Section",
          "Advanced SEO Optimization",
          "5 GB Storage",
          "Up to 50K Monthly Visitors",
          "Google Analytics Integration",
          "90-Day Support",
          "5 Revisions",
        ],
        excluded: [
          "User Authentication",
          "Database & API",
          "Payment Integration",
        ],
        note: "Domain & Hosting not included",
        cta: "Start Building",
        ctaStyle: "btn-accent",
      },
      {
        name: "Full-Stack Web App",
        priceINR: "74,999",
        priceUSD: "899",
        period: "+",
        originalINR: "99,999",
        originalUSD: "1,199",
        desc: "Custom-built app for complex requirements. Your vision, our code.",
        badge: "Best Value",
        features: [
          "Unlimited Pages",
          "Custom UI/UX Design",
          "User Authentication & Roles",
          "Database + REST / GraphQL API",
          "Payment Gateway Integration",
          "20 GB Storage (Scalable)",
          "Unlimited Traffic (Scalable)",
          "Real-time Features",
          "Performance Monitoring",
          "6-Month Support",
          "Unlimited Revisions",
          "Source Code Ownership",
        ],
        excluded: [],
        note: "Domain & Hosting not included",
        cta: "Let's Discuss",
        ctaStyle: "btn-primary",
      },
    ],
  },
];

/* ════════════════════════════════════════════ */

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [currency, setCurrency] = useState("INR"); // "INR" | "USD"
  const activeCat = categories[activeTab];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-32 pb-10 text-center">
        <div className="page-gradient" />
        <div className="soft-grid" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="relative z-10"
        >
          <p className="section-kicker mb-3">Pricing Plans</p>
          <h1
            className="heading-gradient text-4xl font-extrabold sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Invest in Your Growth
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            Transparent pricing for every service. Pick a category below to see
            detailed plans — or{" "}
            <a
              href="https://wa.me/918799783853"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
            >
              talk to us
            </a>{" "}
            for a custom bundle.
          </p>

          {/* Currency Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${currency === "INR" ? "text-white" : "text-slate-500"}`}>
              INR (₹)
            </span>
            <button
              type="button"
              onClick={() => setCurrency((c) => (c === "INR" ? "USD" : "INR"))}
              className="relative h-7 w-12 rounded-full bg-white/10 border border-white/10 transition hover:bg-white/15"
              aria-label="Toggle currency"
            >
              <motion.div
                className="absolute top-0.5 h-6 w-6 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                animate={{ left: currency === "INR" ? "2px" : "22px" }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            </button>
            <span className={`text-sm font-medium ${currency === "USD" ? "text-white" : "text-slate-500"}`}>
              USD ($)
            </span>
          </div>
        </motion.div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-30 border-b border-white/6 bg-slate-950/80 backdrop-blur-2xl md:top-[4.5rem]">
        <div className="container-section flex justify-center">
          <div className="flex gap-1 py-3">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`relative rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeTab === i ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <cat.icon className="text-base" />
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.id === "web" ? "Web" : cat.label.split(" ")[0]}</span>
                </span>
                {activeTab === i && (
                  <motion.div
                    layoutId="pricing-tab"
                    className="absolute inset-0 rounded-xl bg-white/8 border border-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-[var(--section-padding)]">
        <div className="container-section">
          {/* Urgency Banner */}
          <motion.div
            key={activeCat.urgency}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-8 flex max-w-xl items-center justify-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/8 px-5 py-2.5 text-sm text-amber-300"
          >
            <HiOutlineFire className="shrink-0 text-base text-amber-400" />
            <span>{activeCat.urgency}</span>
          </motion.div>

          {/* Billing note */}
          <p className="mb-10 text-center text-sm text-slate-500">
            All {activeCat.label} plans are billed{" "}
            <span className="font-medium text-slate-300">{activeCat.billingNote}</span>.
            {activeCat.id === "web" && (
              <span className="ml-1 text-amber-400/80">Domain & Hosting not included.</span>
            )}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCat.id}-${currency}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: premiumEase }}
            >
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid gap-6 lg:grid-cols-3">
                {activeCat.plans.map((plan) => {
                  const price = currency === "INR" ? plan.priceINR : plan.priceUSD;
                  const original = currency === "INR" ? plan.originalINR : plan.originalUSD;
                  const symbol = currency === "INR" ? "₹" : "$";

                  return (
                    <motion.div key={plan.name} variants={cardVariant}>
                      <TiltCard>
                        <div
                          className={`glass-panel premium-surface premium-card-hover relative flex h-full flex-col rounded-[var(--radius-card)] p-7 ${
                            plan.popular ? "animated-border popular-glow" : ""
                          }`}
                        >
                          {/* Badge */}
                          {plan.badge && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                              <span
                                className={`flex items-center gap-1 rounded-full px-4 py-1 text-xs font-bold shadow-lg ${
                                  plan.popular
                                    ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-white shadow-cyan-500/20"
                                    : "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-amber-500/20"
                                }`}
                              >
                                {plan.popular ? <HiOutlineFire /> : <HiOutlineClock />}
                                {plan.badge}
                              </span>
                            </div>
                          )}

                          {/* Plan Name */}
                          <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                            {plan.name}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">{plan.desc}</p>

                          {/* Price */}
                          <div className="mt-5">
                            {/* Crossed out original */}
                            <p className="text-sm text-slate-500 line-through">
                              {symbol}{original}{plan.period}
                            </p>
                            <div className="flex items-baseline gap-1">
                              <span className="text-4xl font-extrabold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                                {symbol}{price}
                              </span>
                              <span className="text-sm text-slate-500">{plan.period}</span>
                            </div>
                            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                              <HiOutlineFire className="text-sm" />
                              Save {symbol}{currency === "INR"
                                ? (parseInt(original.replace(/,/g, "")) - parseInt(price.replace(/,/g, ""))).toLocaleString("en-IN")
                                : (parseInt(original.replace(/,/g, "")) - parseInt(price.replace(/,/g, ""))).toLocaleString("en-US")
                              }
                            </p>
                          </div>

                          {/* Divider */}
                          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                          {/* Features */}
                          <ul className="flex-1 space-y-2.5">
                            {plan.features.map((f) => (
                              <li key={f} className="flex items-start gap-2.5 text-sm">
                                <HiOutlineCheck className="mt-0.5 shrink-0 text-base text-emerald-400" />
                                <span className="text-slate-300">{f}</span>
                              </li>
                            ))}
                            {plan.excluded.map((f) => (
                              <li key={f} className="flex items-start gap-2.5 text-sm">
                                <HiOutlineXMark className="mt-0.5 shrink-0 text-base text-slate-600" />
                                <span className="text-slate-600">{f}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Note */}
                          {plan.note && (
                            <p className="mt-4 flex items-center gap-1.5 rounded-lg bg-amber-500/8 px-3 py-2 text-xs text-amber-400/80">
                              <HiOutlineExclamationTriangle className="shrink-0 text-sm" />
                              {plan.note}
                            </p>
                          )}

                          {/* CTA */}
                          <Link
                            to={`/contact?service=${encodeURIComponent(activeCat.label)}&plan=${encodeURIComponent(plan.name)}`}
                            className={`mt-6 flex w-full items-center justify-center gap-2 py-3 text-center text-sm ${plan.ctaStyle}`}
                          >
                            Select Plan
                            <HiOutlineArrowRight className="text-xs" />
                          </Link>
                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Custom Package CTA */}
      <ScrollReveal>
        <section className="py-[var(--section-padding)]">
          <div className="container-section max-w-3xl text-center">
            <h2 className="heading-gradient text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--font-heading)" }}>
              Need a Custom Package?
            </h2>
            <p className="mt-4 text-slate-400">
              Every business is different. We'll create a custom bundle combining Design + Automation + Web Development tailored exactly to your needs and budget.
            </p>
            <a
              href="https://wa.me/918799783853"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 inline-flex items-center gap-2 px-8 py-3"
            >
              <SiWhatsapp />
              Build Your Custom Plan
              <HiOutlineArrowRight />
            </a>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
