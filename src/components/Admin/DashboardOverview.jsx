import { HiOutlineUsers, HiOutlineCheckBadge, HiOutlineClock, HiOutlineCurrencyRupee } from "react-icons/hi2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

export function DashboardOverview({ leads, clients, tasks }) {
  const stats = [
    { label: "Total Leads", value: leads.length, icon: HiOutlineUsers, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "Active Clients", value: clients.length, icon: HiOutlineCheckBadge, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Pending Tasks", value: tasks.filter(t => t.status !== 'completed').length, icon: HiOutlineClock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Total Revenue", value: `₹${clients.reduce((acc, c) => acc + parseFloat(c.amount_paid || 0), 0).toLocaleString()}`, icon: HiOutlineCurrencyRupee, color: "text-violet-400", bg: "bg-violet-500/10" },
  ];

  const statusCounts = leads.reduce((acc, l) => {
    acc[l.status || 'new'] = (acc[l.status || 'new'] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: ['New', 'Contacted', 'Converted', 'Lost'],
    datasets: [{
      data: [statusCounts.new || 0, statusCounts.contacted || 0, statusCounts.converted || 0, statusCounts.lost || 0],
      backgroundColor: ['rgba(6, 182, 212, 0.2)', 'rgba(245, 158, 11, 0.2)', 'rgba(16, 185, 129, 0.2)', 'rgba(239, 68, 68, 0.2)'],
      borderColor: ['#06b6d4', '#f59e0b', '#10b981', '#ef4444'],
      borderWidth: 1,
    }],
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-panel p-8 rounded-[2.5rem] border border-white/5">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Leads by Status</h4>
          <div className="aspect-square">
            <Pie data={pieData} options={{ 
              plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10, weight: 'bold' }, padding: 20 } } },
              maintainAspectRatio: false 
            }} />
          </div>
        </div>

        <div className="lg:col-span-2 glass-panel p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-center">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Conversion Metrics</h4>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Conversion Rate</p>
              <p className="text-4xl font-black text-emerald-400">
                {leads.length > 0 ? ((statusCounts.converted || 0) / leads.length * 100).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-slate-600 mt-2">Leads to active clients</p>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Lost Rate</p>
              <p className="text-4xl font-black text-red-400">
                {leads.length > 0 ? ((statusCounts.lost || 0) / leads.length * 100).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-slate-600 mt-2">Leads marked as lost</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
