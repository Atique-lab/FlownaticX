import { motion } from "framer-motion";
import { useState } from "react";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineChatBubbleLeftRight,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";
import { SiWhatsapp } from "react-icons/si";
import { premiumEase } from "../components/ScrollReveal";

export default function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      business: formData.get("business"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }

      setStatus("success");

      // Also open WhatsApp with the message pre-filled
      const whatsappMsg = encodeURIComponent(
        `Hi FlownaticX! 👋\n\nName: ${data.name}\nBusiness: ${data.business}\nService: ${data.service}\nMessage: ${data.message}`
      );
      window.open(`https://wa.me/918799783853?text=${whatsappMsg}`, "_blank");
    } catch (err) {
      console.error("Form error:", err);
      setErrorMsg(err.message);
      setStatus("error");
    }
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
          <p className="section-kicker mb-3">Get In Touch</p>
          <h1 className="heading-gradient text-4xl font-extrabold sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
            Let&apos;s Build Something Great
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            Tell us about your business and goals. We&apos;ll get back to you within 24 hours with a custom growth plan.
          </p>
        </motion.div>
      </section>

      {/* Contact Grid */}
      <section className="py-[var(--section-padding)]">
        <div className="container-section">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: premiumEase }}
            >
              <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Contact Information</h2>
              <p className="mt-3 text-slate-400">Prefer to reach out directly? Here's how you can find us.</p>

              <div className="mt-8 space-y-5">
                <a
                  href="https://wa.me/918799783853"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel premium-card-hover flex items-start gap-4 rounded-[var(--radius-card)] p-5 transition"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-500/10">
                    <SiWhatsapp className="text-xl text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>WhatsApp</h4>
                    <p className="mt-0.5 text-sm text-slate-400">+91 87997 83853</p>
                    <p className="mt-1 text-xs text-emerald-400">Fastest response — usually within 1 hour</p>
                  </div>
                </a>

                <a
                  href="mailto:flownaticx@gmail.com"
                  className="glass-panel premium-card-hover flex items-start gap-4 rounded-[var(--radius-card)] p-5 transition"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10">
                    <HiOutlineEnvelope className="text-xl text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>Email</h4>
                    <p className="mt-0.5 text-sm text-slate-400">flownaticx@gmail.com</p>
                    <p className="mt-1 text-xs text-slate-500">We reply within 24 hours</p>
                  </div>
                </a>

                <a
                  href="tel:+918799783853"
                  className="glass-panel premium-card-hover flex items-start gap-4 rounded-[var(--radius-card)] p-5 transition"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10">
                    <HiOutlinePhone className="text-xl text-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>Phone</h4>
                    <p className="mt-0.5 text-sm text-slate-400">+91 87997 83853</p>
                    <p className="mt-1 text-xs text-slate-500">Mon — Sat, 10 AM — 7 PM IST</p>
                  </div>
                </a>

                <div className="glass-panel flex items-start gap-4 rounded-[var(--radius-card)] p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10">
                    <HiOutlineMapPin className="text-xl text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>Location</h4>
                    <p className="mt-0.5 text-sm text-slate-400">India</p>
                    <p className="mt-1 text-xs text-slate-500">Serving businesses worldwide</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: premiumEase }}
              className="glass-panel premium-surface rounded-[var(--radius-card)] p-8"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <HiOutlineCheckCircle className="mb-4 text-5xl text-emerald-400" />
                  <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Message Sent!</h3>
                  <p className="mt-2 text-slate-400">Your details have been saved. We&apos;ll get back to you within 24 hours.</p>
                  <p className="mt-1 text-xs text-slate-500">WhatsApp should have opened with your message pre-filled.</p>
                  <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-6">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Send Us a Message</h3>
                  <p className="text-sm text-slate-500">Fill the form below — your inquiry will be saved and WhatsApp will open with details pre-filled.</p>

                  {status === "error" && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-300">
                      <HiOutlineExclamationCircle className="shrink-0 text-lg" />
                      {errorMsg || "Something went wrong. Please try again."}
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">Your Name</label>
                      <input id="name" name="name" type="text" required placeholder="John Doe" className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20" />
                    </div>
                    <div>
                      <label htmlFor="business" className="mb-1.5 block text-sm font-medium text-slate-300">Business Name</label>
                      <input id="business" name="business" type="text" required placeholder="ABC Academy" className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-slate-300">Service Interested In</label>
                    <select id="service" name="service" required className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 [&>option]:bg-slate-900">
                      <option value="">Select a service</option>
                      <option value="Design & Branding">Design & Branding</option>
                      <option value="Automation Systems">Automation Systems</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Complete Bundle">Complete Bundle (All Services)</option>
                      <option value="Not Sure">Not Sure — Need Guidance</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">Your Message</label>
                    <textarea id="message" name="message" rows={4} required placeholder="Tell us about your business and what you need..." className="w-full resize-none rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20" />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary flex w-full items-center justify-center gap-2 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <SiWhatsapp className="text-lg" />
                        Send & Open WhatsApp
                        <HiOutlineArrowRight />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-600">
                    Your details are saved securely. WhatsApp opens as a backup channel.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
