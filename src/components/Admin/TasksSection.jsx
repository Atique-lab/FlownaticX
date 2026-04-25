import { motion } from "framer-motion";

export function TasksSection({ tasks, clients, onRefresh }) {
  const groups = {
    pending: tasks.filter(t => t.status === 'pending'),
    ongoing: tasks.filter(t => t.status === 'ongoing'),
    completed: tasks.filter(t => t.status === 'completed')
  };

  const handleUpdateStatus = async (id, status) => {
    const token = localStorage.getItem("flownaticx_admin_token");
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, status }),
    });
    onRefresh();
  };

  const priorityColor = { low: "text-slate-500", medium: "text-cyan-400", high: "text-red-400" };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Object.keys(groups).map(col => (
        <div key={col} className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{col} ({groups[col].length})</h4>
          </div>
          <div className="space-y-4">
            {groups[col].map(t => (
              <motion.div 
                layoutId={t.id} key={t.id}
                className="glass-panel p-5 rounded-3xl border border-white/5 hover:border-white/10 transition-all space-y-4"
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-white leading-tight">{t.title}</p>
                  <span className={`text-[10px] font-bold ${priorityColor[t.priority]}`}>{t.priority}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    {t.client_name?.charAt(0)}
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">{t.client_name}</p>
                </div>
                <div className="flex gap-2 pt-2 border-t border-white/5">
                  {col !== 'pending' && <button onClick={() => handleUpdateStatus(t.id, 'pending')} className="text-[10px] font-bold text-slate-600 hover:text-white uppercase">Move Pending</button>}
                  {col !== 'ongoing' && <button onClick={() => handleUpdateStatus(t.id, 'ongoing')} className="text-[10px] font-bold text-cyan-600 hover:text-cyan-400 uppercase">Start Work</button>}
                  {col !== 'completed' && <button onClick={() => handleUpdateStatus(t.id, 'completed')} className="text-[10px] font-bold text-emerald-600 hover:text-emerald-400 uppercase">Complete</button>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
