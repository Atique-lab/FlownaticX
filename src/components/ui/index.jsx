import React from "react";
import { cn } from "../../lib/utils";

export function Button({ className, variant = "primary", size = "md", children, ...props }) {
  const variants = {
    primary: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)]",
    secondary: "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5",
    danger: "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ className, icon: Icon, ...props }) {
  return (
    <div className={cn(
      "flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus-within:border-cyan-500/50 transition-all group",
      className
    )}>
      {Icon && <Icon className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" />}
      <input
        className="bg-transparent text-sm text-slate-200 outline-none w-full placeholder:text-slate-600"
        {...props}
      />
    </div>
  );
}

export function GlassPanel({ className, children, ...props }) {
  return (
    <div 
      className={cn("glass-panel border border-white/5 rounded-[2.5rem] overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}
