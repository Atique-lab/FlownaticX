import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
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
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [filterService, setFilterService] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [user, setUser] = useState(null);

  const getToken = useCallback(() => {
    return localStorage.getItem("flownaticx_admin_token");
  }, []);

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

  // Fetch leads
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("flownaticx_admin_token");
        localStorage.removeItem("flownaticx_admin_user");
        navigate("/admin", { replace: true });
        return;
      }
      const data = await res.json();
      if (data.success) setLeads(data.leads);
      else setError(data.error);
    } catch {
      setError("Failed to fetch leads. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, [getToken, navigate]);

  useEffect(() => {
    if (getToken()) fetchLeads();
  }, [fetchLeads, getToken]);

  // Update lead status
  const updateStatus = async (id, status) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ id, status }),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("flownaticx_admin_token");
    localStorage.removeItem("flownaticx_admin_user");
    navigate("/admin", { replace: true });
  };

  // Stats
  const today = new Date().toDateString();
  const weekAgo = new Date(Date.now() - 7 * 86400000);
  const totalLeads = leads.length;
  const todayLeads = leads.filter((l) => new Date(l.created_at).toDateString() === today).length;
  const weekLeads = leads.filter((l) => new Date(l.created_at) >= weekAgo).length;
  const newLeads = leads.filter((l) => l.status === "new").length;

  // Filters
  const services = [...new Set(leads.map((l) => l.service).filter(Boolean))];
  const filteredLeads = leads.filter((l) => {
    if (filterService !== "all" && l.service !== filterService) return false;
    if (filterStatus !== "all" && l.status !== filterStatus) return false;
    return true;
  });

  const formatDate = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-white/6 bg-slate-950/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <a href="/" className="logo-text">
              <span className="logo-flow">Flow</span>
              <span className="logo-natic">natic</span>
              <span className="logo-x">X</span>
            </a>
            <div className="h-5 w-px bg-white/10" />
            <span className="text-sm font-medium text-slate-400">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden items-center gap-2 sm:flex">
                {user.picture && (
                  <img src={user.picture} alt="" className="h-7 w-7 rounded-full" />
                )}
                <span className="text-sm text-slate-400">{user.email}</span>
              </div>
            )}
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-white/4 px-3.5 py-2 text-sm text-slate-400 transition hover:bg-white/8 hover:text-white"
            >
              <HiOutlineArrowRightOnRectangle className="text-base" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Leads", value: totalLeads, icon: HiOutlineUsers, color: "text-cyan-400", bg: "from-cyan-500/8 to-blue-500/8" },
            { label: "Today", value: todayLeads, icon: HiOutlineCalendarDays, color: "text-emerald-400", bg: "from-emerald-500/8 to-teal-500/8" },
            { label: "This Week", value: weekLeads, icon: HiOutlineArrowTrendingUp, color: "text-violet-400", bg: "from-violet-500/8 to-purple-500/8" },
            { label: "Pending (New)", value: newLeads, icon: HiOutlineChartBar, color: "text-amber-400", bg: "from-amber-500/8 to-orange-500/8" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-[var(--radius-card)] p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-3xl font-extrabold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                    {stat.value}
                  </p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.bg}`}>
                  <stat.icon className={`text-xl ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Service Filter */}
            <div className="flex items-center gap-2">
              <HiOutlineFunnel className="text-sm text-slate-500" />
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-sm text-white outline-none [&>option]:bg-slate-900"
              >
                <option value="all">All Services</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-sm text-white outline-none [&>option]:bg-slate-900"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          <button
            type="button"
            onClick={fetchLeads}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/8"
          >
            <HiOutlineArrowPath className={`text-base ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-[var(--radius-card)] border border-white/6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <HiOutlineExclamationCircle className="mb-3 text-4xl text-red-400" />
              <p className="text-slate-400">{error}</p>
              <button type="button" onClick={fetchLeads} className="btn-secondary mt-4 text-sm">
                Retry
              </button>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <HiOutlineUsers className="mb-3 text-4xl text-slate-600" />
              <p className="text-slate-400">No leads found.</p>
              <p className="mt-1 text-xs text-slate-600">Leads will appear here when someone submits the contact form.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/6 bg-white/3">
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Name</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Business</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/4">
                  {filteredLeads.map((lead) => {
                    const sc = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                    return (
                      <tr key={lead.id} className="transition hover:bg-white/3">
                        <td className="px-5 py-4">
                          <p className="font-medium text-white">{lead.name}</p>
                          <p className="text-[10px] text-slate-500">{lead.service}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-xs text-slate-300">{lead.email}</p>
                          <p className="text-[10px] text-slate-500">{lead.phone}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-slate-400">{lead.business_name || "—"}</p>
                          <p className="text-[10px] text-slate-500">{lead.business_type}</p>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                            className={`rounded-lg border px-2.5 py-1 text-xs font-medium outline-none ${sc.color} [&>option]:bg-slate-900 [&>option]:text-white`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                          </select>
                        </td>
                        <td className="px-5 py-4 text-xs text-slate-500">{formatDate(lead.created_at)}</td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            className="flex items-center gap-1 rounded-lg bg-white/4 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/8"
                          >
                            <HiOutlineEye className="text-sm" />
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Total count */}
        {!loading && !error && (
          <p className="mt-3 text-xs text-slate-600">
            Showing {filteredLeads.length} of {totalLeads} leads
          </p>
        )}
      </main>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-6 backdrop-blur-lg"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.3, ease: premiumEase }}
              className="glass-panel premium-surface relative w-full max-w-lg rounded-[2rem] p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-400 transition hover:text-white"
              >
                <HiOutlineXMark />
              </button>

              <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Lead Details
              </h3>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Name</p>
                    <p className="mt-1 text-white">{selectedLead.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Service</p>
                    <p className="mt-1 text-cyan-400 text-sm">{selectedLead.service}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Email</p>
                    <p className="mt-1 text-white text-sm">{selectedLead.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Phone</p>
                    <p className="mt-1 text-white text-sm">{selectedLead.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Business</p>
                    <p className="mt-1 text-white">{selectedLead.business_name || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Type</p>
                    <p className="mt-1 text-white">{selectedLead.business_type || "Not specified"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Message</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-slate-300 bg-white/4 p-4 rounded-2xl border border-white/5">
                    {selectedLead.message}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">Status</p>
                    <select
                      value={selectedLead.status}
                      onChange={(e) => updateStatus(selectedLead.id, e.target.value)}
                      className={`mt-1 rounded-lg border px-3 py-1.5 text-sm font-medium outline-none ${
                        (STATUS_CONFIG[selectedLead.status] || STATUS_CONFIG.new).color
                      } [&>option]:bg-slate-900 [&>option]:text-white`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Received</p>
                    <p className="mt-1 text-xs text-slate-400">{formatDate(selectedLead.created_at)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
