/**
 * Student & Staff Dashboard
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Wrench, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { complaintService } from '../services/complaintService.js';
import { DashboardCard } from '../components/DashboardCard.jsx';
import { ComplaintCard } from '../components/ComplaintCard.jsx';
import { AiLifecycleFlow } from '../components/Charts.jsx';

export function StudentDashboard() {
  const { currentUser } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = () => {
    const list = complaintService.getComplaints();
    setComplaints(list);
  };

  // Filter complaints submitted by this user (or all if demo testing)
  const userComplaints = complaints.filter(
    c => c.submittedBy?.email?.toLowerCase() === currentUser?.email?.toLowerCase()
  );

  // If user hasn't submitted many, show user's first, plus other campus samples
  const displayList = userComplaints.length > 0 ? userComplaints : complaints.slice(0, 4);

  const totalSubmitted = userComplaints.length || complaints.length;
  const inProgressCount = (userComplaints.length ? userComplaints : complaints).filter(
    c => c.status === "In Progress" || c.status === "Assigned"
  ).length;
  const resolvedCount = (userComplaints.length ? userComplaints : complaints).filter(
    c => c.status === "Resolved"
  ).length;
  const pendingCount = (userComplaints.length ? userComplaints : complaints).filter(
    c => c.status === "Submitted" || c.status === "Under Review"
  ).length;

  const filteredRecent = displayList.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-2xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              Campus Facilities & Rapid Maintenance Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Report campus facilities issues directly to maintenance teams. Our Gemini AI triage engine automatically categorizes your ticket, assesses urgency, and detects duplicates.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-blue-200">
              <span>Dept: <strong className="text-white">{currentUser.department}</strong></span>
              <span>•</span>
              <span>ID: <strong className="text-white">{currentUser.studentId}</strong></span>
              <span>•</span>
              <span>Status: <strong className="text-emerald-300">Active Student</strong></span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <Link
              to="/submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-800 font-bold text-sm shadow-md hover:bg-blue-50 transition-all"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              <span>Submit New Complaint</span>
            </Link>
            <Link
              to="/my-complaints"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900/50 hover:bg-blue-900/80 border border-white/20 text-white font-semibold text-xs transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Track My Complaints ({userComplaints.length})</span>
            </Link>
          </div>
        </div>

        {/* Decorative circle glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Reported"
          value={totalSubmitted}
          subtitle="All campus complaints"
          icon={FileText}
          colorScheme="blue"
        />
        <DashboardCard
          title="Under Review"
          value={pendingCount}
          subtitle="AI intake & triage"
          icon={Clock}
          colorScheme="amber"
        />
        <DashboardCard
          title="In Progress"
          value={inProgressCount}
          subtitle="Assigned technicians"
          icon={Wrench}
          colorScheme="indigo"
        />
        <DashboardCard
          title="Resolved Issues"
          value={resolvedCount}
          subtitle="Fixed & verified"
          icon={CheckCircle2}
          colorScheme="emerald"
        />
      </div>

      {/* Visual AI Workflow Timeline */}
      <AiLifecycleFlow />

      {/* Recent Activity Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Your Recent Complaints</h3>
            <p className="text-xs text-slate-500">Live status updates and technician logs</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-60"
              />
            </div>
            <Link
              to="/my-complaints"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {filteredRecent.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-sm font-semibold text-slate-700">No matching complaints found.</p>
            <p className="text-xs text-slate-500 mt-1">Have a maintenance issue on campus? Report it right away.</p>
            <Link
              to="/submit"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>File First Complaint</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecent.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
