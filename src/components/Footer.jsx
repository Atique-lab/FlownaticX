import { Link, useLocation } from "react-router-dom";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from "react-icons/hi2";

const footerLinks = {
  services: [
    { label: "Design & Branding", to: "/services" },
    { label: "Automation Systems", to: "/services" },
    { label: "Web Development", to: "/services" },
    { label: "View Pricing", to: "/pricing" },
  ],
  company: [
    { label: "About Us", to: "/about" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Testimonials", to: "/testimonials" },
    { label: "Contact", to: "/contact" },
  ],
};

export default function Footer() {
  const location = useLocation();

  // Hide footer on admin pages
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative border-t border-white/6 bg-slate-950/60 backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="container-section py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link to="/" className="logo-text inline-flex items-center">
              <span className="logo-flow">Flow</span>
              <span className="logo-natic">natic</span>
              <span className="logo-x">X</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              We help local businesses grow with premium design, smart
              automation systems, and high-converting websites.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://wa.me/918799783853"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-slate-400 transition hover:border-green-500/30 hover:bg-green-500/8 hover:text-green-400"
              >
                <SiWhatsapp className="text-base" />
              </a>
              <a
                href="https://www.instagram.com/flownaticx.in?igsh=MTBzYXRidXkwbWF5dA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-slate-400 transition hover:border-pink-500/30 hover:bg-pink-500/8 hover:text-pink-400"
              >
                <SiInstagram className="text-base" />
              </a>
              <a
                href="https://www.facebook.com/share/1DmCwXmqX5/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/8 hover:text-blue-400"
              >
                <FaFacebookF className="text-base" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              className="mb-5 text-sm font-semibold uppercase tracking-wider text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="mb-5 text-sm font-semibold uppercase tracking-wider text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-5 text-sm font-semibold uppercase tracking-wider text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="mailto:flownaticx@gmail.com" className="flex items-center gap-2 transition hover:text-white">
                  <HiOutlineEnvelope className="text-cyan-400" />
                  flownaticx@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918799783853" className="flex items-center gap-2 transition hover:text-white">
                  <HiOutlinePhone className="text-cyan-400" />
                  +91 87997 83853
                </a>
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineMapPin className="text-cyan-400" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/6">
        <div className="container-section flex flex-col items-center justify-between gap-3 py-6 md:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} FlownaticX. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Crafted with passion by FlownaticX
          </p>
        </div>
      </div>
    </footer>
  );
}
