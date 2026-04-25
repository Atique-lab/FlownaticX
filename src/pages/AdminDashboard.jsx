import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineUsers,
  HiOutlineArrowPath,
  HiOutlineArrowRightOnRectangle,
  HiOutlineSquaresPlus,
  HiOutlineCurrencyRupee,
  HiOutlineCheckBadge,
  HiOutlineListBullet,
} from "react-icons/hi2";

// Import custom sections
import { DashboardOverview } from "../components/Admin/DashboardOverview";
import { LeadsSection, LeadDetailDrawer, ImportPreviewModal } from "../components/Admin/LeadsSection";
import { ClientsSection, ClientDetailDrawer } from "../components/Admin/ClientsSection";
import { TasksSection } from "../components/Admin/TasksSection";
import { RevenueSection } from "../components/Admin/RevenueSection";

const premiumEase = [0.16, 1, 0.3, 1];

const STATUS_CONFIG = {
  new: { label: "New", color: "bg-cyan-500/12 text-cyan-300 border-cyan-500/20" },
  contacted: { label: "Contacted", color: "bg-amber-500/12 text-amber-300 border-amber-500/20" },
  converted: { label: "Converted", color: "bg-emerald-500/12 text-emerald-300 border-emerald-500/20" },
  lost: { label: "Lost", color: "bg-red-500/12 text-red-300 border-red-500/20" },
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [leads, setLeads] = useState([]);
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [user, setUser] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importRows, setImportRows] = useState([]);
  const [isImporting, setIsImporting] = useState(false);

  const getToken = useCallback(() => localStorage.getItem("flownaticx_admin_token"), []);

  const fetchData = useCallback(async () => {
    setLoading(true);
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
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }
    const userData = localStorage.getItem("flownaticx_admin_user");
    if (userData) setUser(JSON.parse(userData));
    fetchData();
  }, [navigate, getToken, fetchData]);

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
    if (!leads.length) return;
    const headers = ["Name", "Email", "Phone", "Business", "Service", "Status", "Date"].join(",");
    const rows = leads.map(l => [
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
            { id: "overview", label: "Overview", icon: HiOutlineSquaresPlus },
            { id: "leads", label: "Leads", icon: HiOutlineUsers },
            { id: "clients", label: "Clients", icon: HiOutlineCheckBadge },
            { id: "tasks", label: "Tasks", icon: HiOutlineListBullet },
            { id: "revenue", label: "Revenue", icon: HiOutlineCurrencyRupee },
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
                  STATUS_CONFIG={STATUS_CONFIG}
                />
              )}
              {activeTab === "clients" && <ClientsSection clients={clients} onView={setSelectedClient} />}
              {activeTab === "tasks" && <TasksSection tasks={tasks} clients={clients} onRefresh={fetchData} />}
              {activeTab === "revenue" && <RevenueSection clients={clients} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Drawers & Modals */}
        <LeadDetailDrawer 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)} 
          onUpdate={updateLead} 
          onOnboard={onboardClient} 
          STATUS_CONFIG={STATUS_CONFIG}
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
