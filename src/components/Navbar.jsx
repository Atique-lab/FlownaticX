import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link, NavLink } from "react-router-dom";

const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Contact", to: "/contact" },
];

const navItemClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-white/12 text-white"
      : "text-slate-300 hover:bg-white/8 hover:text-white"
  }`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  });

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
        style={{ scaleX }}
      />
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pb-4 pt-4 sm:px-6 lg:px-10"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/65 px-4 py-3 shadow-glow backdrop-blur-2xl">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 via-white/15 to-violet-500/30">
              <img src="/logo.png" alt="FlownaticX" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.22em] text-slate-200 uppercase">
                FlownaticX
              </p>
              <p className="text-xs text-slate-400">Growth systems for premium brands</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navItemClass}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#pricing"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/25 hover:bg-white/8"
            >
              Pricing
            </a>
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/918799783853"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30"
            >
              Book Strategy Call
            </motion.a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
            aria-label="Toggle navigation"
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
            </span>
          </button>
        </div>

        <motion.div
          initial={false}
          animate={
            isOpen
              ? { opacity: 1, height: "auto", marginTop: 12 }
              : { opacity: 0, height: 0, marginTop: 0 }
          }
          className="mx-auto max-w-7xl overflow-hidden lg:hidden"
        >
          <div className="glass-panel rounded-[2rem] px-4 py-4">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={navItemClass}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <a
                href="#pricing"
                onClick={() => setIsOpen(false)}
                className="rounded-full px-4 py-2 text-sm text-slate-200 transition hover:bg-white/8"
              >
                Pricing
              </a>
              <a
                href="https://wa.me/918799783853"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Book Strategy Call
              </a>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </>
  );
}
