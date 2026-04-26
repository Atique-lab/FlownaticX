import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineArrowLeft } from "react-icons/hi2";
import SEO from "../components/SEO";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 text-center pt-24">
      <SEO title="404 - Page Not Found" description="The page you are looking for does not exist." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel rounded-[2rem] p-8 md:p-12 max-w-lg w-full"
      >
        <div className="text-8xl mb-2 font-black heading-gradient" style={{ fontFamily: "var(--font-heading)" }}>404</div>
        <h1 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Page Not Found
        </h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-primary w-full sm:w-auto">
            <HiOutlineHome className="text-lg" /> Back to Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary w-full sm:w-auto">
            <HiOutlineArrowLeft className="text-lg" /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
