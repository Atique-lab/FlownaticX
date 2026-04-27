import { motion, AnimatePresence } from "framer-motion";

export default function PremiumLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
      {/* Aurora Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-cyan-500/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] bg-violet-500/20 blur-[120px] rounded-full"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{ backgroundImage: "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)", backgroundSize: "4rem 4rem" }}
      />

      <div className="relative flex flex-col items-center">
        {/* The Interlocking FX Logo */}
        <div className="relative h-32 w-32 flex items-center justify-center">
          {/* Liquid Glow Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-[2.5rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-[2rem] border border-cyan-500/10"
          />

          {/* Mixed FX Text */}
          <div className="relative flex items-center justify-center font-black text-6xl tracking-tighter mix-blend-screen">
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              F
            </motion.span>
            <motion.span
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              X
            </motion.span>
            
            {/* Animated Intersection Flare */}
            <motion.div
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white blur-xl rounded-full"
            />
          </div>
        </div>

        {/* Text and Progress */}
        <div className="mt-12 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4">
              System Initialization
            </span>
            
            {/* Minimal Progress Line */}
            <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              />
            </div>
          </motion.div>

          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-bold text-slate-300 tracking-wide"
          >
            <span className="text-cyan-400">FLOWNATICX</span> CORE V2.0
          </motion.p>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 - 50 + "%", 
            y: "110%",
            opacity: 0 
          }}
          animate={{ 
            y: "-10%",
            opacity: [0, 0.5, 0],
          }}
          transition={{ 
            duration: 5 + Math.random() * 5, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="absolute w-px h-12 bg-gradient-to-t from-transparent via-white/20 to-transparent"
          style={{ left: Math.random() * 100 + "%" }}
        />
      ))}
    </div>
  );
}
