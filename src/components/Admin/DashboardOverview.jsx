import { HiOutlineUsers, HiOutlineCheckBadge, HiOutlineClock, HiOutlineCurrencyRupee } from "react-icons/hi2";

export function DashboardOverview({ leads, clients, tasks }) {
  const stats = [
    { label: "Total Leads", value: leads.length, icon: HiOutlineUsers, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "Active Clients", value: clients.length, icon: HiOutlineCheckBadge, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Pending Tasks", value: tasks.filter(t => t.status !== 'completed').length, icon: HiOutlineClock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Total Revenue", value: `₹${clients.reduce((acc, c) => acc + parseFloat(c.amount_paid || 0), 0).toLocaleString()}`, icon: HiOutlineCurrencyRupee, color: "text-violet-400", bg: "bg-violet-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(s => (
          <div key={s.label} className="glass-panel p-6 rounded-[2rem] border border-white/5 flex items-center gap-5">
            <div className={`h-12 w-12 rounded-2xl ${s.bg} flex items-center justify-center ${s.color}`}>
              <s.icon className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{s.label}</p>
              <p className="text-2xl font-black text-white">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
