import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineUser,
  HiOutlineBuildingOffice2,
  HiOutlineBriefcase,
} from "react-icons/hi2";
import { SiWhatsapp } from "react-icons/si";
import { premiumEase } from "../components/ScrollReveal";

export default function ContactPage() {
  const location = useLocation();
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [preSelectedService, setPreSelectedService] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get("service");
    if (service) setPreSelectedService(service);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      businessName: formData.get("businessName"),
      businessType: formData.get("businessType"),
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

      // Professional WhatsApp redirect
      const whatsappMsg = encodeURIComponent(
        `Hi FlownaticX! I just submitted a request on your website.\n\n` +
        `👤 Name: ${data.name}\n` +
        `📧 Email: ${data.email}\n` +
        `📞 Phone: ${data.phone}\n` +
        `🏢 Business: ${data.businessName} (${data.businessType})\n` +
        `🛠 Service: ${data.service}\n` +
        `💬 Message: ${data.message}`
      );
      window.open(`https://wa.me/918799783853?text=${whatsappMsg}`, "_blank");
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen">
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
          <p className="section-kicker mb-3">Elite Partnership</p>
          <h1 className="heading-gradient text-4xl font-extrabold sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
            Let&apos;s Scale Your Vision
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            High-converting systems start with a conversation. Fill out the form below and our team will get in touch.
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="pb-24">
        <div className="container-section">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="glass-panel p-8 rounded-[2rem]">
                <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>Quick Connect</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                      <HiOutlineEnvelope className="text-xl text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Email Us</p>
                      <a href="mailto:flownaticx@gmail.com" className="text-white hover:text-cyan-400 transition">flownaticx@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20">
                      <HiOutlinePhone className="text-xl text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Call Us</p>
                      <a href="tel:+918799783853" className="text-white hover:text-violet-400 transition">+91 87997 83853</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">
                      <HiOutlineMapPin className="text-xl text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Location</p>
                      <p className="text-white">India (Serving Worldwide)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-[2rem] bg-gradient-to-br from-cyan-500/5 to-violet-500/5 border-cyan-500/10">
                <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>What Happens Next?</h4>
                <ul className="space-y-4 mt-4">
                  {[
                    "Analysis of your business goals",
                    "Customized solution proposal",
                    "Direct strategy call with founders"
                  ].map((text, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-400">
                      <HiOutlineCheckCircle className="text-cyan-400 shrink-0 text-lg" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel premium-surface rounded-[2.5rem] p-8 md:p-12"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                    <HiOutlineCheckCircle className="text-5xl text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Request Received!</h3>
                  <p className="mt-4 text-slate-400 max-w-sm">
                    Thank you for reaching out. We have saved your details and will contact you shortly.
                  </p>
                  <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-8 px-8">
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <div className="relative">
                        <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input name="name" type="text" required placeholder="Md Atique" className="w-full rounded-2xl border border-white/8 bg-white/4 pl-11 pr-4 py-4 text-white outline-none focus:border-cyan-400/40 transition-all" />
                      </div>
                    </div>
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                      <div className="relative">
                        <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input name="email" type="email" required placeholder="atique@example.com" className="w-full rounded-2xl border border-white/8 bg-white/4 pl-11 pr-4 py-4 text-white outline-none focus:border-cyan-400/40 transition-all" />
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                      <div className="relative">
                        <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input name="phone" type="tel" required placeholder="+91 87997 83853" className="w-full rounded-2xl border border-white/8 bg-white/4 pl-11 pr-4 py-4 text-white outline-none focus:border-cyan-400/40 transition-all" />
                      </div>
                    </div>
                    {/* Business Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Business Name</label>
                      <div className="relative">
                        <HiOutlineBuildingOffice2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input name="businessName" type="text" placeholder="FlownaticX Agency" className="w-full rounded-2xl border border-white/8 bg-white/4 pl-11 pr-4 py-4 text-white outline-none focus:border-cyan-400/40 transition-all" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Business Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Business Type</label>
                      <div className="relative">
                        <HiOutlineBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <select name="businessType" className="w-full appearance-none rounded-2xl border border-white/8 bg-white/4 pl-11 pr-4 py-4 text-white outline-none focus:border-cyan-400/40 transition-all [&>option]:bg-slate-900">
                          <option value="Education/Institute">Education / Institute</option>
                          <option value="Restaurant/Cafe">Restaurant / Cafe</option>
                          <option value="Gym/Fitness">Gym / Fitness</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Other">Other Business</option>
                        </select>
                      </div>
                    </div>
                    {/* Service */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Service Required</label>
                      <select name="service" defaultValue={preSelectedService} className="w-full rounded-2xl border border-white/8 bg-white/4 px-4 py-4 text-white outline-none focus:border-cyan-400/40 transition-all [&>option]:bg-slate-900">
                        <option value="Design & Branding">Design & Branding</option>
                        <option value="Automation Systems">Automation Systems</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Premium Bundle">Premium Growth Bundle</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Project Details</label>
                    <textarea name="message" rows={4} required placeholder="Tell us about your goals and what you hope to achieve..." className="w-full resize-none rounded-2xl border border-white/8 bg-white/4 px-6 py-4 text-white outline-none focus:border-cyan-400/40 transition-all" />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 rounded-2xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                      <HiOutlineExclamationCircle />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary w-full py-5 text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <>
                        Submit & Connect
                        <HiOutlineArrowRight />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 py-2 opacity-40">
                    <div className="h-px w-full bg-white/20" />
                    <span className="text-[10px] uppercase tracking-widest whitespace-nowrap">Secure Lead Portal</span>
                    <div className="h-px w-full bg-white/20" />
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
