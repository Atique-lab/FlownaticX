import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiOutlinePaintBrush,
  HiOutlineBolt,
  HiOutlineGlobeAlt,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineXMark,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import ScrollReveal from "../components/ScrollReveal";
import { premiumEase } from "../components/revealVariants";

import p1 from "../assets/projects/project1.jpg";
import p2 from "../assets/projects/project2.jpg";
import p3 from "../assets/projects/project3.jpg";
import p4 from "../assets/projects/project4.jpg";
import p5 from "../assets/projects/project5.jpg";
import p6 from "../assets/projects/project6.jpg";
import p7 from "../assets/projects/project7.jpg";
import saharImg from "../assets/projects/sahar_institute.png";
import jawaharImg from "../assets/projects/jawahar_hotel.png";

const serviceTabs = [
  { id: "all", label: "All Work", icon: null },
  { id: "design", label: "Design", icon: HiOutlinePaintBrush },
  { id: "web", label: "Landing Pages & Websites", icon: HiOutlineGlobeAlt },
  { id: "automation", label: "Automation", icon: HiOutlineBolt },
];

const items = [
  // ─── Design ───
  {
    img: p5,
    title: "Institute Admissions Poster",
    client: "Bright Future Institute",
    cat: "design",
    type: "Poster Design",
    desc: "Eye-catching admissions poster designed to increase walk-in inquiries by 40%.",
    link: null,
  },
  {
    img: p6,
    title: "Restaurant Social Media Campaign",
    client: "The Spice Kitchen",
    cat: "design",
    type: "Ad Creative",
    desc: "Complete Facebook & Instagram ad creatives for a monthly food promotion campaign.",
    link: null,
  },
  {
    img: p7,
    title: "Gym Membership Poster",
    client: "FitZone Gym",
    cat: "design",
    type: "Poster Design",
    desc: "Bold poster design for a New Year membership drive campaign.",
    link: null,
  },
  {
    img: p3,
    title: "Google Ads Creative Suite",
    client: "Excel Academy",
    cat: "design",
    type: "Ad Creative",
    desc: "Complete Google Display Network ad set in multiple sizes for admissions campaign.",
    link: null,
  },
  // ─── Landing Pages & Websites ───
  {
    img: saharImg,
    title: "Sahar Institute Landing Page",
    client: "Sahar Institute",
    cat: "web",
    type: "EdTech Landing Page",
    desc: "High-converting educational landing page for NEET & JEE coaching with optimized CTA sections.",
    link: "https://preview--sahar-dream-launch.lovable.app/",
  },
  {
    img: jawaharImg,
    title: "Jawahar Hotel Website",
    client: "Jawahar Hotel",
    cat: "web",
    type: "Restaurant Website",
    desc: "A premium Mughlai restaurant landing page showcasing traditional recipes and multiple locations.",
    link: "https://jawaharhotel.my.canva.site/",
  },
  // ─── Automation ───
  {
    img: p4,
    title: "Lead Automation Dashboard",
    client: "Excel Academy",
    cat: "automation",
    type: "CRM Dashboard",
    desc: "Custom CRM dashboard tracking lead sources, follow-up status, and conversion rates in real-time.",
    link: "#",
  },
  {
    img: p3,
    title: "WhatsApp Auto-Reply System",
    client: "The Spice Kitchen",
    cat: "automation",
    type: "Auto-Reply Flow",
    desc: "Automated ordering flow via WhatsApp with instant menu sharing and order confirmation.",
    link: "#",
  },
  {
    img: p5,
    title: "AI Calling Agent Setup",
    client: "Bright Future Institute",
    cat: "automation",
    type: "AI Calling Agent",
    desc: "Automated follow-up calling system handling 200+ calls/month for admission inquiries.",
    link: null,
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [lastFocusedIndex, setLastFocusedIndex] = useState(null);
  const modalRef = useRef(null);
  const cardRefs = useRef([]);

  const filtered =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.cat === activeFilter);

  const openPopup = (index) => {
    setLastFocusedIndex(index);
    setCurrentIndex(index);
  };

  const closePopup = () => setCurrentIndex(null);
  const nextSlide = useCallback(() => setCurrentIndex((prev) => (prev + 1) % filtered.length), [filtered.length]);
  const prevSlide = useCallback(() => setCurrentIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1)), [filtered.length]);

  useEffect(() => {
    if (currentIndex === null) {
      if (lastFocusedIndex !== null) cardRefs.current[lastFocusedIndex]?.focus();
      return undefined;
    }
    modalRef.current?.focus();
    const handleKey = (e) => {
      if (e.key === "Escape") closePopup();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, lastFocusedIndex, filtered.length, nextSlide, prevSlide]);

  const getCatColor = (cat) => {
    if (cat === "design") return "text-pink-400 bg-pink-500/10";
    if (cat === "web") return "text-emerald-400 bg-emerald-500/10";
    return "text-cyan-400 bg-cyan-500/10";
  };

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
          <p className="section-kicker mb-3">Our Work</p>
          <h1
            className="heading-gradient text-4xl font-extrabold sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Featured Projects
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            Browse our best work across design, web development, and automation systems.
          </p>
        </motion.div>
      </section>

      {/* Service Tabs */}
      <section className="sticky top-16 z-30 border-b border-white/6 bg-slate-950/80 backdrop-blur-2xl md:top-[4.5rem]">
        <div className="container-section flex justify-center">
          <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
            {serviceTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeFilter === tab.id ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {tab.icon && <tab.icon className="text-base" />}
                {tab.label}
                {activeFilter === tab.id && (
                  <motion.div
                    layoutId="portfolio-filter"
                    className="absolute inset-0 rounded-xl bg-white/8 border border-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <ScrollReveal>
        <section className="py-[var(--section-padding)]">
          <div className="container-section">
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: premiumEase }}
                  >
                    <motion.button
                      type="button"
                      ref={(el) => { cardRefs.current[i] = el; }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.28, ease: premiumEase }}
                      onClick={() => openPopup(i)}
                      aria-label={`View ${item.title}`}
                      className="glass-panel premium-surface premium-card-hover group relative h-[300px] w-full cursor-pointer overflow-hidden rounded-[var(--radius-card)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                    >
                      <motion.img
                        src={item.img}
                        alt={item.title}
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.45, ease: premiumEase }}
                        className="h-full w-full object-cover object-center"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                      {/* Bottom info */}
                      <div className="absolute inset-x-0 bottom-0 translate-y-5 px-5 pb-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-base font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</p>
                        <p className="text-xs text-slate-400">{item.client}</p>
                        {item.link && (
                          <span className="mt-1.5 inline-flex items-center gap-1 text-xs text-cyan-400">
                            <HiOutlineArrowTopRightOnSquare className="text-sm" />
                            View Live
                          </span>
                        )}
                      </div>

                      {/* Category badge */}
                      <div className={`absolute right-3 top-3 flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium backdrop-blur-sm transition opacity-0 group-hover:opacity-100 ${getCatColor(item.cat)}`}>
                        {item.type}
                      </div>
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Modal */}
      <AnimatePresence>
        {currentIndex !== null && currentIndex < filtered.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/95 px-6 backdrop-blur-xl"
            onClick={closePopup}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.34, ease: premiumEase }}
              className="glass-panel premium-surface relative w-full max-w-5xl rounded-[2rem] p-6 outline-none md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={filtered[currentIndex].img}
                src={filtered[currentIndex].img}
                alt={filtered[currentIndex].title}
                initial={{ scale: 0.965, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.38, ease: premiumEase }}
                className="max-h-[60vh] w-full rounded-[1.5rem] object-cover"
              />

              <div className="mt-5 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
                <div>
                  <p className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                    {filtered[currentIndex].title}
                  </p>
                  <p className="text-sm text-slate-500">{filtered[currentIndex].client}</p>
                  <p className="mt-1 text-xs text-slate-400">{filtered[currentIndex].desc}</p>
                </div>
                {filtered[currentIndex].link && (
                  <a
                    href={filtered[currentIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-1.5 px-4 py-2 text-xs"
                  >
                    <HiOutlineArrowTopRightOnSquare />
                    View Live
                  </a>
                )}
              </div>

              <button type="button" onClick={closePopup} aria-label="Close" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white transition hover:bg-slate-800">
                <HiOutlineXMark className="text-xl" />
              </button>
              <button type="button" onClick={prevSlide} aria-label="Previous" className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white transition hover:bg-slate-800">
                <HiOutlineChevronLeft className="text-xl" />
              </button>
              <button type="button" onClick={nextSlide} aria-label="Next" className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white transition hover:bg-slate-800">
                <HiOutlineChevronRight className="text-xl" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
