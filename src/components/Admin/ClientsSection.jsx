import { useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineCheckBadge, 
  HiOutlineClock, 
  HiOutlineXMark, 
  HiOutlineCurrencyRupee, 
  HiOutlinePlus, 
  HiOutlineCheckCircle 
} from "react-icons/hi2";

export function ClientsSection({ clients, onView }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {clients.map(c => {
        const remaining = parseFloat(c.project_value) - parseFloat(c.amount_paid);
        const progress = (parseFloat(c.amount_paid) / parseFloat(c.project_value)) * 100;
        
        return (
          <div 
            key={c.id} 
            onClick={() => onView(c)}
            className="glass-panel p-8 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-xl font-black text-white group-hover:text-cyan-400 transition-all">{c.name}</h4>
                <p className="text-sm text-slate-500">{c.business_name || 'Personal Project'}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Service</p>
                <p className="text-sm text-cyan-400 font-bold">{c.service}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-bold">PAYMENT PROGRESS</span>
                <span className="text-white font-black">₹{parseFloat(c.amount_paid).toLocaleString()} / ₹{parseFloat(c.project_value).toLocaleString()}</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" 
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="text-amber-400" />
                  <span className="text-[10px] font-bold text-amber-500 uppercase">{c.pending_tasks || 0} Tasks Pending</span>
                </div>
                {remaining > 0 ? (
                  <span className="text-[10px] font-black text-red-400 bg-red-400/10 px-3 py-1 rounded-full uppercase tracking-tighter border border-red-400/20">
                    ₹{remaining.toLocaleString()} DUE
                  </span>
                ) : (
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase tracking-tighter border border-emerald-400/20">
                    PAID IN FULL
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {clients.length === 0 && (
        <div className="col-span-2 py-20 text-center glass-panel rounded-[2rem] border border-white/5">
          <HiOutlineCheckBadge className="text-5xl text-slate-800 mx-auto mb-4" />
          <p className="text-slate-500">No onboarded clients yet. Go to Leads to onboard someone!</p>
        </div>
      )}
    </div>
  );
}

export function ClientDetailDrawer({ client, tasks, onClose, onUpdate }) {
  const [showTaskAdd, setShowTaskAdd] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", priority: "medium" });
  const [newPaidAmount, setNewPaidAmount] = useState(0);

  if (!client) return null;

  const handleAddTask = async () => {
    if (!newTask.title) return;
    const token = localStorage.getItem("flownaticx_admin_token");
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ client_id: client.id, ...newTask }),
    });
    if (res.ok) {
      onUpdate();
      setShowTaskAdd(false);
      setNewTask({ title: "", priority: "medium" });
    }
  };

  const updatePayment = async () => {
    const token = localStorage.getItem("flownaticx_admin_token");
    const res = await fetch("/api/clients", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: client.id, amount_paid: parseFloat(client.amount_paid) + parseFloat(newPaidAmount) }),
    });
    if (res.ok) {
      onUpdate();
      setNewPaidAmount(0);
    }
  };

  const toggleTask = async (task) => {
    const token = localStorage.getItem("flownaticx_admin_token");
    const newStatus = task.status === "completed" ? "pending" : "completed";
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: task.id, status: newStatus }),
    });
    onUpdate();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
      <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative w-full max-w-2xl bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div>
            <h3 className="text-2xl font-black text-white">{client.name}</h3>
            <p className="text-sm text-cyan-400 font-bold">{client.service}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><HiOutlineXMark className="text-2xl" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><HiOutlineCurrencyRupee className="text-8xl" /></div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Financial Status</p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-black text-white">₹{parseFloat(client.amount_paid).toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-emerald-400 uppercase">Received</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-red-400">₹{(parseFloat(client.project_value) - parseFloat(client.amount_paid)).toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Remaining</p>
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <input 
                  type="number" value={newPaidAmount} onChange={e => setNewPaidAmount(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white outline-none"
                  placeholder="Payment amount..."
                />
                <button onClick={updatePayment} className="btn-primary px-6 py-3 text-xs font-black">Add Payment</button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-black text-white">Project Roadmap</h4>
              <button onClick={() => setShowTaskAdd(!showTaskAdd)} className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300">
                <HiOutlinePlus /> Add Task
              </button>
            </div>

            {showTaskAdd && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <input 
                  autoFocus value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white" placeholder="Task title..." 
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowTaskAdd(false)} className="px-4 py-2 text-xs text-slate-500">Cancel</button>
                  <button onClick={handleAddTask} className="px-4 py-2 bg-cyan-500 rounded-lg text-slate-950 text-xs font-bold">Add</button>
                </div>
              </motion.div>
            )}

            <div className="space-y-3">
              {tasks.map(t => (
                <div key={t.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all">
                  <button onClick={() => toggleTask(t)} className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    t.status === 'completed' ? "bg-emerald-500 border-emerald-500 text-slate-950" : "border-white/20 hover:border-cyan-500"
                  }`}>
                    {t.status === 'completed' && <HiOutlineCheckCircle />}
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${t.status === 'completed' ? "text-slate-500 line-through" : "text-slate-200"}`}>{t.title}</p>
                    <p className="text-[10px] text-slate-600 font-medium uppercase tracking-tighter">{t.priority} Priority</p>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && <p className="text-center py-10 text-slate-600 text-sm italic">No tasks added yet.</p>}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
