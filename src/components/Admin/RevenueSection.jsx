import { motion } from "framer-motion";

export function RevenueSection({ clients }) {
  const total = clients.reduce((acc, c) => acc + parseFloat(c.amount_paid || 0), 0);
  const totalRemaining = clients.reduce((acc, c) => acc + (parseFloat(c.project_value || 0) - parseFloat(c.amount_paid || 0)), 0);
  
  const byService = clients.reduce((acc, c) => {
    acc[c.service] = (acc[c.service] || 0) + parseFloat(c.amount_paid || 0);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5">
          <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-2">Collected Revenue</p>
          <h3 className="text-5xl font-black text-white">₹{total.toLocaleString()}</h3>
        </div>
        <div className="glass-panel p-10 rounded-[3rem] border border-white/5">
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Accounts Receivable</p>
          <h3 className="text-5xl font-black text-red-400">₹{totalRemaining.toLocaleString()}</h3>
        </div>
      </div>

      <div className="glass-panel p-10 rounded-[3rem] border border-white/5 space-y-10">
        <h4 className="text-xl font-black text-white">Revenue by Service</h4>
        <div className="space-y-8">
          {Object.entries(byService).map(([service, amount]) => {
            const perc = total > 0 ? (amount / total) * 100 : 0;
            return (
              <div key={service} className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="font-bold text-slate-300">{service}</p>
                  <p className="font-black text-white">₹{amount.toLocaleString()}</p>
                </div>
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${perc}%` }} className="h-full bg-cyan-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
