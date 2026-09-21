/**
 * Submit Complaint Page
 */
import React from 'react';
import { ComplaintForm } from '../components/ComplaintForm.jsx';
import { Sparkles, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

export function SubmitComplaint() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Report Campus Facility Issue</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Submit broken lights, plumbing leaks, Wi-Fi drops, or furniture repairs for immediate attention.
          </p>
        </div>
      </div>

      {/* Main Form Component */}
      <ComplaintForm />

      {/* Guidance / FAQ info card */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 text-xs text-slate-600 space-y-3">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-blue-600" />
          Campus Maintenance Protocol Guidelines
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-white rounded-lg border border-slate-200/80">
            <span className="font-bold text-rose-700 block mb-1">Emergency Hazards</span>
            <p>For active electrical sparks, gas smell, or flooding near labs, prioritize High Urgency to trigger immediate dispatch.</p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200/80">
            <span className="font-bold text-indigo-700 block mb-1">AI Duplicate Protection</span>
            <p>If another student in your hall has already filed a ticket for this room, our AI engine links them to avoid split work orders.</p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200/80">
            <span className="font-bold text-emerald-700 block mb-1">Status Notifications</span>
            <p>You can monitor the live technician work log, parts dispatched, and resolution time in your student dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
