import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineUsers,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineFunnel,
  HiOutlineArrowPath,
  HiOutlineArrowRightOnRectangle,
  HiOutlineEye,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineChatBubbleLeftRight,
  HiOutlineExclamationCircle,
  HiOutlineClock,
  HiOutlineArrowTrendingUp,
  HiOutlineCurrencyRupee,
  HiOutlineCheckBadge,
  HiOutlineListBullet,
  HiOutlineArrowDownTray,
  HiOutlineArrowUpTray,
  HiOutlinePlus,
  HiOutlineSquares2X2,
  HiOutlineBanknotes,
  HiOutlineTrash,
} from "react-icons/hi2";

const premiumEase = [0.16, 1, 0.3, 1];

const STATUS_CONFIG = {
  new: { label: "New", color: "bg-cyan-500/12 text-cyan-300 border-cyan-500/20", icon: HiOutlineClock },
  contacted: { label: "Contacted", color: "bg-amber-500/12 text-amber-300 border-amber-500/20", icon: HiOutlineChatBubbleLeftRight },
  converted: { label: "Converted", color: "bg-emerald-500/12 text-emerald-300 border-emerald-500/20", icon: HiOutlineCheckCircle },
  lost: { label: "Lost", color: "bg-red-500/12 text-red-300 border-red-500/20", icon: HiOutlineExclamationCircle },
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [leads, setLeads] = useState([]);
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filterService, setFilterService] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [user, setUser] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importRows, setImportRows] = useState([]);
  const [isImporting, setIsImporting] = useState(false);

  const getToken = useCallback(() => localStorage.getItem("flownaticx_admin_token"), []);

  // Auth check
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }
    const userData = localStorage.getItem("flownaticx_admin_user");
    if (userData) setUser(JSON.parse(userData));
  }, [navigate, getToken]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = getToken();
    try {
      const [leadsRes, clientsRes, tasksRes] = await Promise.all([
        fetch("/api/leads", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/clients", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/tasks", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (leadsRes.status === 401) {
        logout();
        return;
      }

      const [leadsData, clientsData, tasksData] = await Promise.all([
        leadsRes.json(),
        clientsRes.json(),
        tasksRes.json(),
      ]);

      if (leadsData.success) setLeads(leadsData.leads);
      if (clientsData.success) setClients(clientsData.clients);
      if (tasksData.success) setTasks(tasksData.tasks);
    } catch (err) {
      setError("Failed to sync data. Check connection.");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (getToken()) fetchData();
  }, [fetchData, getToken]);

  const logout = () => {
    localStorage.removeItem("flownaticx_admin_token");
    localStorage.removeItem("flownaticx_admin_user");
    navigate("/admin", { replace: true });
  };

  const updateLead = async (id, updates) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ id, ...updates }),
      });
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, ...updates });
    } catch (err) { console.error(err); }
  };

  const onboardClient = async (lead, dealInfo) => {
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({
          lead_id: lead.id,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          business_name: lead.business_name,
          service: lead.service,
          ...dealInfo,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setClients([data.client, ...clients]);
        setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: 'converted' } : l));
        setSelectedLead(null);
        setActiveTab("clients");
      }
    } catch (err) { console.error(err); }
  };

  const exportLeads = () => {
    const data = leads.filter(l => {
      if (filterService !== "all" && l.service !== filterService) return false;
      if (filterStatus !== "all" && l.status !== filterStatus) return false;
      return true;
    });
    if (!data.length) return;
    const headers = ["Name", "Email", "Phone", "Business", "Service", "Status", "Date"].join(",");
    const rows = data.map(l => [
      `"${l.name}"`, `"${l.email}"`, `"${l.phone}"`, `"${l.business_name}"`, `"${l.service}"`, `"${l.status}"`, `"${l.created_at}"`
    ].join(","));
    const blob = new Blob([[headers, ...rows].join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const lines = text.split("\n").filter(l => l.trim());
      const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/"/g, ''));
      const rows = lines.slice(1).map(line => {
        const values = line.split(",").map(v => v.trim().replace(/"/g, ''));
        const obj = {};
        headers.forEach((h, i) => obj[h] = values[i]);
        return obj;
      });
      setImportRows(rows);
      setShowImportModal(true);
    };
    reader.readAsText(file);
  };

  const confirmImport = async () => {
    setIsImporting(true);
    try {
      const res = await fetch("/api/import-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ rows: importRows }),
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
        setShowImportModal(false);
        setImportRows([]);
      }
    } catch (err) { console.error(err); }
    finally { setIsImporting(false); }
  };

  // Helper: Format Date
  const formatDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-64 border-r border-white/5 bg-slate-900/50 flex flex-col">
        <div className="p-6">
          <a href="/" className="logo-text text-xl">
            <span className="logo-flow">Flow</span><span className="logo-natic">natic</span><span className="logo-x">X</span>
          </a>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Agency CRM</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: "overview", label: "Overview", icon: HiOutlineSquares2X2 },
            { id: "leads", label: "Leads", icon: HiOutlineUsers },
            { id: "clients", label: "Clients", icon: HiOutlineCheckBadge },
            { id: "tasks", label: "Tasks", icon: HiOutlineListBullet },
            { id: "revenue", label: "Revenue", icon: HiOutlineBanknotes },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                activeTab === item.id ? "bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <item.icon className="text-lg" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          {user && (
            <div className="flex items-center gap-3 px-2 mb-4">
              <img src={user.picture} alt="" className="h-8 w-8 rounded-full border border-white/10" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user.name || 'Admin'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-xs font-medium text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <HiOutlineArrowRightOnRectangle className="text-lg" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-xl z-20">
          <h2 className="text-lg font-bold text-white capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchData} 
              className={`p-2 rounded-lg hover:bg-white/5 transition-all ${loading ? 'animate-spin' : ''}`}
            >
              <HiOutlineArrowPath className="text-slate-400" />
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: premiumEase }}
            >
              {activeTab === "overview" && <DashboardOverview leads={leads} clients={clients} tasks={tasks} />}
              {activeTab === "leads" && (
                <LeadsSection 
                  leads={leads} 
                  services={[...new Set(leads.map(l => l.service).filter(Boolean))]} 
                  onView={setSelectedLead}
                  onExport={exportLeads}
                  onImport={handleImportCSV}
                />
              )}
              {activeTab === "clients" && <ClientsSection clients={clients} onView={setSelectedClient} />}
              {activeTab === "tasks" && <TasksSection tasks={tasks} clients={clients} onRefresh={fetchData} />}
              {activeTab === "revenue" && <RevenueSection clients={clients} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Drawers & Modals ── */}
        <LeadDetailDrawer 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)} 
          onUpdate={updateLead} 
          onOnboard={onboardClient} 
        />
        <ClientDetailDrawer
          client={selectedClient}
          tasks={tasks.filter(t => t.client_id === selectedClient?.id)}
          onClose={() => setSelectedClient(null)}
          onUpdate={fetchData}
        />
        {showImportModal && (
          <ImportPreviewModal 
            rows={importRows} 
            onClose={() => setShowImportModal(false)} 
            onConfirm={confirmImport} 
            loading={isImporting}
          />
        )}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS (To be expanded in subsequent parts)
// ─────────────────────────────────────────────────────────────────────────────

function DashboardOverview({ leads, clients, tasks }) {
  const stats = [
    { label: "Total Leads", value: leads.length, icon: HiOutlineUsers, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "Active Clients", value: clients.length, icon: HiOutlineCheckBadge, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Pending Tasks", value: tasks.filter(t => t.status !== 'completed').length, icon: HiOutlineClock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Total Revenue", value: `₹${clients.reduce((acc, c) => acc + parseFloat(c.amount_paid || 0), 0).toLocaleString()}`, icon: HiOutlineBanknotes, color: "text-violet-400", bg: "bg-violet-500/10" },
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
      {/* Activity Feed and Recent Charts would go here */}
    </div>
  );
}

function LeadsSection({ leads, services, onView, onExport, onImport }) {
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

function LeadDetailDrawer({ lead, onClose, onUpdate, onOnboard }) {
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

function ImportPreviewModal({ rows, onClose, onConfirm, loading }) {
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

function ClientsSection({ clients, onView }) {
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

function ClientDetailDrawer({ client, tasks, onClose, onUpdate }) {
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
            <div className="absolute top-0 right-0 p-8 opacity-10"><HiOutlineBanknotes className="text-8xl" /></div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Financial Status</p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-black text-white">₹{parseFloat(client.amount_paid).toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-emerald-400 uppercase">Received</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-red-400">₹{parseFloat(client.amount_remaining).toLocaleString()}</p>
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

function TasksSection({ tasks, clients, onRefresh }) {
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

function RevenueSection({ clients }) {
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
            const perc = (amount / total) * 100;
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
