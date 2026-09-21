/**
 * Facilities Admin & Maintenance Operations Dashboard
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Users, 
  BarChart3, 
  ArrowRight,
  RefreshCw,
  PlusCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { complaintService } from '../services/complaintService.js';
import { DashboardCard } from '../components/DashboardCard.jsx';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../components/StatusBadge.jsx';
import { 
  CategoryBarChart, 
  StatusPipelineChart, 
  PriorityDistributionChart, 
  AiSolutionsShowcase 
} from '../components/Charts.jsx';

export function AdminDashboard() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const list = complaintService.getComplaints();
    const st = complaintService.getStats();
    setComplaints(list);
    setStats(st);
  };

  if (!stats) return null;

  // High priority tickets needing attention
  const highPriorityTickets = complaints.filter(
    c => c.priority === "High" && c.status !== "Resolved"
  );

  return (
    <div className="space-y-6">
      {/* Admin Operations Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3 border border-purple-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            Campus Facilities Operations Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Facilities Management Console
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Welcome, {currentUser.name}. Centralized dispatching, AI triage oversight, and automated technician routing for all campus facilities.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            to="/manage"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <Wrench className="w-4 h-4" />
            <span>Manage All Work Orders</span>
          </Link>
          <Link
            to="/analytics"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>AI Predictive Insights</span>
          </Link>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <DashboardCard
          title="Total Tickets"
          value={stats.total}
          subtitle="Cumulative tickets"
          icon={FileSpreadsheet}
          colorScheme="blue"
        />
        <DashboardCard
          title="Submitted"
          value={stats.byStatus["Submitted"] || 0}
          subtitle="New incoming"
          icon={Clock}
          colorScheme="blue"
        />
        <DashboardCard
          title="Under Review"
          value={stats.byStatus["Under Review"] || 0}
          subtitle="Awaiting triage"
          icon={AlertTriangle}
          colorScheme="amber"
        />
        <DashboardCard
          title="In Progress"
          value={(stats.byStatus["In Progress"] || 0) + (stats.byStatus["Assigned"] || 0)}
          subtitle="Active on-site"
          icon={Wrench}
          colorScheme="indigo"
        />
        <DashboardCard
          title="Resolved"
          value={stats.byStatus["Resolved"] || 0}
          subtitle="Verified fixes"
          icon={CheckCircle2}
          colorScheme="emerald"
        />
      </div>

      {/* High Urgency Alert Banner if any */}
      {highPriorityTickets.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 bg-rose-600 text-white rounded-lg shrink-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-900">
                {highPriorityTickets.length} High Urgency Safety Hazard{highPriorityTickets.length > 1 ? 's' : ''} Require Attention
              </h4>
              <p className="text-xs text-rose-700">
                Water leaks, electrical sparks, or lock failures flagged by AI hazard heuristics.
              </p>
            </div>
          </div>
          <Link
            to="/manage"
            className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-900 px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>Review Urgent Tickets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CategoryBarChart categoryCounts={stats.byCategory} />
        <StatusPipelineChart statusCounts={stats.byStatus} />
        <PriorityDistributionChart priorityCounts={stats.byPriority} />
      </div>

      {/* Recent Dispatches & Incoming Work Orders */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Incoming Maintenance Requests</h3>
            <p className="text-xs text-slate-500">Live feed of student submissions and AI triage classifications</p>
          </div>
          <Link
            to="/manage"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All ({complaints.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Complaint Details</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {complaints.slice(0, 6).map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">
                    {c.id}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <Link to={`/complaints/${c.id}`} className="font-bold text-slate-900 hover:text-blue-600 block line-clamp-1">
                      {c.title}
                    </Link>
                    <span className="text-[11px] text-slate-500 block truncate">{c.location}</span>
                  </td>
                  <td className="px-4 py-3">
                    <CategoryBadge category={c.category} />
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={c.priority} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-slate-700 font-medium">
                    {c.department}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/complaints/${c.id}`}
                      className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800"
                    >
                      <span>Triage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8 AI Solutions Showcase */}
      <AiSolutionsShowcase />
    </div>
  );
}
