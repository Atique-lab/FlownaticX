import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
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

// Hooks & Utils
import { useLeads, useClients, useTasks, useUpdateLead, useOnboardClient, useImportLeads } from "../hooks/useAdminData";

// Components
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
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importRows, setImportRows] = useState([]);

  // Data Queries
  const { data: leads = [], isLoading: leadsLoading, refetch: refetchLeads } = useLeads();
  const { data: clients = [], isLoading: clientsLoading, refetch: refetchClients } = useClients();
  const { data: tasks = [], isLoading: tasksLoading, refetch: refetchTasks } = useTasks();

  // Mutations
  const updateLeadMutation = useUpdateLead();
  const onboardClientMutation = useOnboardClient();
  const importLeadsMutation = useImportLeads();

  const user = useMemo(() => {
    const data = sessionStorage.getItem("flownaticx_admin_user");
    return data ? JSON.parse(data) : null;
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    const token = sessionStorage.getItem("flownaticx_admin_token");
    if (!token) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const logout = () => {
    sessionStorage.removeItem("flownaticx_admin_token");
    sessionStorage.removeItem("flownaticx_admin_user");
    navigate("/admin", { replace: true });
  };

  const handleExportLeads = () => {
    if (!leads.length) return;
    const headers = ["Name", "Email", "Phone", "Business Name", "Business Type", "Service", "Status", "Date"].join(",");
    const rows = leads.map(l => [
      `"${l.name}"`, `"${l.email || ""}"`, `"${l.phone || ""}"`, `"${l.business_name || ""}"`, `"${l.business_type || ""}"`, `"${l.service || ""}"`, `"${l.status}"`, `"${l.created_at}"`
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
      let text = evt.target.result;
      text = text.replace(/^\uFEFF/, "");
      const lines = text.split(/\r?\n/).filter(l => l.trim());
      if (lines.length < 2) return;

      const parseLine = (line) => {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') inQuotes = !inQuotes;
          else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
          } else current += char;
        }
        result.push(current.trim());
        return result.map(v => v.replace(/^"|"$/g, ''));
      };

      const headers = parseLine(lines[0]).map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
      if (!headers.includes("name")) {
        alert("Error: CSV must have at least a 'name' column.");
        return;
      }

      const rows = lines.slice(1).map(line => {
        const values = parseLine(line);
        const obj = {};
        headers.forEach((h, i) => { if (h) obj[h] = values[i] || ""; });
        return obj;
      });
      setImportRows(rows);
      setShowImportModal(true);
    };
    reader.readAsText(file);
  };

  const confirmImport = async () => {
    try {
      const data = await importLeadsMutation.mutateAsync(importRows);
      alert(`Successfully imported ${data.imported} leads!${data.skipped > 0 ? ` (${data.skipped} skipped)` : ""}`);
      setShowImportModal(false);
      setImportRows([]);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const isLoading = leadsLoading || clientsLoading || tasksLoading;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-64 border-r border-white/5 bg-slate-900/50 flex flex-col z-30">
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
              onClick={() => { refetchLeads(); refetchClients(); refetchTasks(); }} 
              className={`p-2 rounded-lg hover:bg-white/5 transition-all ${isLoading ? 'animate-spin' : ''}`}
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
                  onExport={handleExportLeads}
                  onImport={handleImportCSV}
                  STATUS_CONFIG={STATUS_CONFIG}
                />
              )}
              {activeTab === "clients" && <ClientsSection clients={clients} onView={setSelectedClient} />}
              {activeTab === "tasks" && <TasksSection tasks={tasks} clients={clients} onRefresh={() => { refetchTasks(); refetchClients(); }} />}
              {activeTab === "revenue" && <RevenueSection clients={clients} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Drawers & Modals */}
        <LeadDetailDrawer 
          key={selectedLead?.id}
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)} 
          onUpdate={(id, updates) => updateLeadMutation.mutate({ id, ...updates })} 
          onOnboard={(lead, deal) => onboardClientMutation.mutate({ ...deal, lead_id: lead.id, name: lead.name, email: lead.email, phone: lead.phone, business_name: lead.business_name, service: lead.service })} 
          STATUS_CONFIG={STATUS_CONFIG}
        />
        <ClientDetailDrawer
          client={selectedClient}
          tasks={tasks.filter(t => t.client_id === selectedClient?.id)}
          onClose={() => setSelectedClient(null)}
          onUpdate={() => { refetchClients(); refetchTasks(); }}
        />
        {showImportModal && (
          <ImportPreviewModal 
            rows={importRows} 
            onClose={() => setShowImportModal(false)} 
            onConfirm={confirmImport} 
            loading={importLeadsMutation.isPending}
          />
        )}
      </main>
    </div>
  );
}
