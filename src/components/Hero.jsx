import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-black opacity-90" />

      {/* Animated blobs */}
      <motion.div
  className="absolute w-[600px] h-[600px] bg-blue-500 rounded-full blur-3xl opacity-10"
  animate={{ x: [0, 150, 0], y: [0, -100, 0] }}
  transition={{ repeat: Infinity, duration: 15 }}
/>
      <motion.div
        className="absolute w-[400px] h-[400px] bg-blue-500 rounded-full blur-3xl opacity-20"
        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Turn Your Business Into a{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Lead Generating Machine
          </span>
        </h1>

        <p className="mt-6 text-gray-400 text-lg">
          We help Institutes, Restaurants, Gyms, Clinics, Bars & Local Businesses
          get more customers using smart design + automation systems.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() =>
              window.open("https://wa.me/918799783853", "_blank")
            }
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-400 to-green-600 
            shadow-[0_0_30px_rgba(34,197,94,0.8)] hover:scale-105 transition"
          >
            Get More Customers
          </button>
        </div>
      </div>
    </section>
  );
}