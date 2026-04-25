import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineFunnel, 
  HiOutlineArrowUpTray, 
  HiOutlineArrowDownTray, 
  HiOutlineEye, 
  HiOutlineXMark,
  HiOutlineCheckBadge,
  HiOutlineArrowPath
} from "react-icons/hi2";

export function LeadsSection({ leads, services, onView, onExport, onImport, STATUS_CONFIG }) {
  const [filterService, setFilterService] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = leads.filter(l => {
    if (filterService !== "all" && l.service !== filterService) return false;
    if (filterStatus !== "all" && l.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl">
            <HiOutlineFunnel className="text-slate-500" />
            <select 
              value={filterService} 
              onChange={e => setFilterService(e.target.value)}
              className="bg-transparent text-sm text-slate-300 outline-none"
            >
              <option value="all">All Services</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl">
            <select 
              value={filterStatus} 
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-transparent text-sm text-slate-300 outline-none"
            >
              <option value="all">All Statuses</option>
              {Object.keys(STATUS_CONFIG).map(s => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 transition-all cursor-pointer">
            <HiOutlineArrowUpTray />
            Import CSV
            <input type="file" accept=".csv" onChange={onImport} className="hidden" />
          </label>
          <button 
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 transition-all"
          >
            <HiOutlineArrowDownTray />
            Export CSV
          </button>
        </div>
      </div>

      <div className="glass-panel border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Lead Info</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Business</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-white/[0.02] transition-all group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-white group-hover:text-cyan-400 transition-colors">{l.name}</p>
                    <p className="text-xs text-slate-500">{l.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {l.business_name || '—'}
                    <p className="text-[10px] text-slate-600">{l.service}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${STATUS_CONFIG[l.status]?.color || STATUS_CONFIG.new.color}`}>
                      {STATUS_CONFIG[l.status]?.label || 'New'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {new Date(l.created_at).toLocaleDateString("en-IN", { day: '2-digit', month: 'short' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => onView(l)} className="p-2 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg transition-all">
                      <HiOutlineEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-20 text-center text-slate-600">No leads found matching filters.</div>
        )}
      </div>
    </div>
  );
}

export function LeadDetailDrawer({ lead, onClose, onUpdate, onOnboard, STATUS_CONFIG }) {
  const [notes, setNotes] = useState("");
  const [onboardData, setOnboardData] = useState({ project_value: 0, amount_paid: 0 });

  useEffect(() => {
    if (lead) {
      setNotes(lead.notes || "");
      setOnboardData({ project_value: 0, amount_paid: 0 });
    }
  }, [lead]);

  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
      />
      <motion.div 
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-xl bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col"
      >
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-white">{lead.name}</h3>
            <p className="text-sm text-slate-500">{lead.service} • {lead.business_type}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all">
            <HiOutlineXMark className="text-2xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email</p>
              <p className="text-sm text-slate-200">{lead.email}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Phone</p>
              <p className="text-sm text-slate-200">{lead.phone}</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Pipeline Status</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(STATUS_CONFIG).map(s => (
                <button
                  key={s}
                  onClick={() => onUpdate(lead.id, { status: s })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    lead.status === s ? STATUS_CONFIG[s].color : "border-white/5 text-slate-500 hover:border-white/10"
                  }`}
                >
                  {STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Customer Message</p>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 italic text-slate-300 text-sm leading-relaxed">
              "{lead.message}"
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Internal Notes</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => onUpdate(lead.id, { notes })}
              placeholder="Add your thoughts after talking to the client..."
              className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-cyan-500/50 transition-all resize-none"
            />
          </div>

          {lead.status === "contacted" && (
            <div className="p-8 rounded-[2.5rem] bg-cyan-500/5 border border-cyan-500/20 space-y-6">
              <div className="flex items-center gap-3">
                <HiOutlineCheckBadge className="text-3xl text-cyan-400" />
                <h4 className="text-lg font-black text-white">Ready to Onboard?</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Project Value (₹)</label>
                  <input 
                    type="number" 
                    value={onboardData.project_value}
                    onChange={e => setOnboardData({...onboardData, project_value: e.target.value})}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Initial Paid (₹)</label>
                  <input 
                    type="number" 
                    value={onboardData.amount_paid}
                    onChange={e => setOnboardData({...onboardData, amount_paid: e.target.value})}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white" 
                  />
                </div>
              </div>
              <button 
                onClick={() => onOnboard(lead, onboardData)}
                className="w-full py-4 rounded-2xl bg-cyan-500 text-slate-950 font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Onboard as Active Client
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function ImportPreviewModal({ rows, onClose, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-white">Import Leads Preview</h3>
            <p className="text-sm text-slate-500">{rows.length} records found in file</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <HiOutlineXMark className="text-2xl" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-6 custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-slate-900">
              <tr className="border-b border-white/10">
                <th className="p-3 text-slate-500">Name</th>
                <th className="p-3 text-slate-500">Email</th>
                <th className="p-3 text-slate-500">Phone</th>
                <th className="p-3 text-slate-500">Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.slice(0, 50).map((r, i) => (
                <tr key={i}>
                  <td className="p-3 text-white font-medium">{r.name}</td>
                  <td className="p-3 text-slate-400">{r.email}</td>
                  <td className="p-3 text-slate-400">{r.phone}</td>
                  <td className="p-3 text-slate-500">{r.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > 50 && <p className="p-4 text-center text-slate-600">Showing first 50 rows...</p>}
        </div>
        <div className="p-8 border-t border-white/5 bg-white/[0.02] flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-slate-400 hover:text-white transition-all">Cancel</button>
          <button 
            onClick={onConfirm} 
            disabled={loading}
            className="btn-primary px-8 py-3 text-sm font-black flex items-center gap-2"
          >
            {loading && <HiOutlineArrowPath className="animate-spin" />}
            Confirm Import
          </button>
        </div>
      </motion.div>
    </div>
  );
}
