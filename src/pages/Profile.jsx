/**
 * User Profile & Role Management Page
 */
import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  GraduationCap, 
  ShieldCheck, 
  LogOut, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useAuth, DEMO_USERS } from '../context/AuthContext.jsx';
import { complaintService } from '../services/complaintService.js';

export function Profile() {
  const { currentUser, isAdmin, switchRole, login, logout } = useAuth();
  const complaints = complaintService.getComplaints();

  const userComplaints = complaints.filter(
    c => c.submittedBy?.email?.toLowerCase() === currentUser?.email?.toLowerCase()
  );
  const resolvedCount = userComplaints.filter(c => c.status === "Resolved").length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-sm"
          />

          <div className="flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {currentUser.name}
              </h1>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border self-center sm:self-auto ${
                isAdmin 
                  ? 'bg-purple-50 text-purple-700 border-purple-200' 
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                {isAdmin ? 'Facilities Administrator' : 'Campus Student / Staff'}
              </span>
            </div>

            <p className="text-sm text-slate-500 font-medium">
              {currentUser.department}
            </p>
            <p className="text-xs text-slate-400 font-mono">
              Campus ID: {currentUser.studentId}
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-3 text-xs">
              <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                <FileText className="w-4 h-4 text-blue-600" />
                <span><strong>{userComplaints.length}</strong> Complaints Filed</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span><strong>{resolvedCount}</strong> Resolved</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact & Department Details */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs sm:text-sm">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Campus Account Details
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Email Address</span>
                <span className="font-semibold text-slate-800 font-mono">{currentUser.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-500">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Contact Phone</span>
                <span className="font-semibold text-slate-800">{currentUser.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-500">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Department / Unit</span>
                <span className="font-semibold text-slate-800">{currentUser.department}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Role Switcher & Testing Credentials */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs sm:text-sm">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Role Switching & Testing Accounts
          </h3>
          <p className="text-slate-500 text-xs">
            Switch between Student and Admin personas to test both submission flows and maintenance triage dispatches.
          </p>

          <div className="space-y-2">
            <button
              onClick={() => login(DEMO_USERS.student.email, 'pass', 'student')}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                !isAdmin ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500/20' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div>
                <span className="font-bold text-slate-900 text-xs block">Alex Morgan (Student)</span>
                <span className="text-[11px] text-slate-500">Computer Science • Hostel Block 1</span>
              </div>
              {!isAdmin && <span className="text-xs font-bold text-blue-700">Active</span>}
            </button>

            <button
              onClick={() => login(DEMO_USERS.admin.email, 'pass', 'admin')}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                isAdmin ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-500/20' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div>
                <span className="font-bold text-slate-900 text-xs block">Dr. Elena Vance (Admin)</span>
                <span className="text-[11px] text-slate-500">Director of Campus Facilities</span>
              </div>
              {isAdmin && <span className="text-xs font-bold text-purple-700">Active</span>}
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                complaintService.resetToSampleData();
                window.location.reload();
              }}
              className="w-full py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Complaints to Fresh Demo Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
