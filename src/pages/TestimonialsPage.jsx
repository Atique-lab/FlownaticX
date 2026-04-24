import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineStar, HiOutlineArrowRight } from "react-icons/hi2";
import { SiWhatsapp } from "react-icons/si";
import ScrollReveal, {
  cardVariant,
  premiumEase,
  staggerContainer,
  viewportOnce,
} from "../components/ScrollReveal";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Director",
    company: "Excel Academy",
    text: "Admissions increased 3x within the first two months after FlownaticX automated our entire inquiry-to-enrollment pipeline. The WhatsApp auto-reply alone handled 500+ inquiries without us lifting a finger.",
    rating: 5,
    service: "Automation",
  },
  {
    name: "Priya Sharma",
    role: "Owner",
    company: "The Spice Kitchen",
    text: "The landing page design and WhatsApp automation brought in 200+ new orders in the first month. Our Instagram content went from boring to scroll-stopping. Absolutely worth every rupee.",
    rating: 5,
    service: "Design + Web",
  },
  {
    name: "Anil Mehta",
    role: "Founder",
    company: "FitZone Gym",
    text: "WhatsApp auto-replies and the AI calling agent alone have paid for the entire package multiple times over. We went from 30 to 120 memberships in 3 months.",
    rating: 5,
    service: "Automation",
  },
  {
    name: "Dr. Kavita Singh",
    role: "Chief Doctor",
    company: "CareFirst Clinic",
    text: "Patient bookings jumped 4x after FlownaticX set up our online appointment system and automated follow-up reminders. The design work for our social media is world-class.",
    rating: 5,
    service: "Complete Bundle",
  },
  {
    name: "Vikram Patel",
    role: "Manager",
    company: "NightOwl Lounge",
    text: "Event promotions on social media started reaching 10x more people. The automation sends promotional messages to our entire contact list with one click. Game changer.",
    rating: 5,
    service: "Design + Automation",
  },
  {
    name: "Sunita Joshi",
    role: "Owner",
    company: "Glow Beauty Salon",
    text: "We were struggling with no-shows. FlownaticX's appointment reminder automation cut our no-show rate by 70%. Plus, the poster designs bring new clients every week.",
    rating: 5,
    service: "Automation + Design",
  },
  {
    name: "Rohit Agarwal",
    role: "Founder",
    company: "Bright Future Institute",
    text: "The full-stack web app they built for our institute handles enrollment, fee payments, and student communication all in one place. Professional team with incredible attention to detail.",
    rating: 5,
    service: "Web Development",
  },
  {
    name: "Meera Iyer",
    role: "Owner",
    company: "MedPlus Pharmacy",
    text: "Local customer reach increased dramatically after FlownaticX built our Google presence and set up automated promotional messages. Simple, effective, and affordable.",
    rating: 5,
    service: "Automation",
  },
];

export default function TestimonialsPage() {
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
          <p className="section-kicker mb-3">Client Stories</p>
          <h1 className="heading-gradient text-4xl font-extrabold sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
            Hear From Our Clients
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            Real businesses, real results. Here's what our clients say about working with FlownaticX.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <ScrollReveal>
        <section className="py-[var(--section-padding)]">
          <div className="container-section">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
              {testimonials.map((t) => (
                <motion.div key={t.name} variants={cardVariant} className="break-inside-avoid">
                  <div className="glass-panel premium-surface premium-card-hover rounded-[var(--radius-card)] p-7">
                    <div className="mb-4 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <HiOutlineStar key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-slate-300">&ldquo;{t.text}&rdquo;</p>
                    <div className="mt-4 inline-flex rounded-lg bg-cyan-500/8 px-2.5 py-1 text-xs font-medium text-cyan-300">
                      {t.service}
                    </div>
                    <div className="mt-4 flex items-center gap-3 border-t border-white/6 pt-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-sm font-bold text-cyan-300">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.role}, {t.company}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <section className="py-[var(--section-padding)]">
        <div className="container-section text-center">
          <div className="glass-panel premium-surface rounded-[2rem] px-8 py-16">
            <h2 className="heading-gradient text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to Be Our Next Success Story?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-400">
              Join 50+ businesses that trust FlownaticX to grow their customer base.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/918799783853" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 px-8 py-3">
                <SiWhatsapp /> Start Your Growth Journey <HiOutlineArrowRight />
              </a>
              <Link to="/pricing" className="btn-secondary px-8 py-3">View Pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
