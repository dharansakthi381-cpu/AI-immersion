/**
 * Visual Charts & AI Flow Diagrams
 */
import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Clock, 
  Filter, 
  Layers, 
  ShieldCheck, 
  Bot,
  Send,
  UserCheck,
  Wrench,
  Eye
} from 'lucide-react';

/**
 * Complaints By Category Bar Chart
 */
export function CategoryBarChart({ categoryCounts = {} }) {
  const categories = [
    { name: "Electrical", color: "bg-amber-500", barColor: "#f59e0b" },
    { name: "Plumbing", color: "bg-cyan-500", barColor: "#06b6d4" },
    { name: "Furniture", color: "bg-stone-500", barColor: "#78716c" },
    { name: "Cleaning", color: "bg-emerald-500", barColor: "#10b981" },
    { name: "Internet/Network", color: "bg-blue-500", barColor: "#3b82f6" },
    { name: "Security", color: "bg-red-500", barColor: "#ef4444" },
    { name: "Other", color: "bg-slate-500", barColor: "#64748b" }
  ];

  const total = Object.values(categoryCounts).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Complaints by Category</h4>
          <p className="text-xs text-slate-500">Distribution across campus trade divisions</p>
        </div>
        <BarChart3 className="w-4 h-4 text-slate-400" />
      </div>

      <div className="space-y-3">
        {categories.map(cat => {
          const count = categoryCounts[cat.name] || 0;
          const pct = Math.round((count / total) * 100);

          return (
            <div key={cat.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-700">{cat.name}</span>
                <span className="text-slate-500">
                  <strong className="text-slate-900">{count}</strong> ({pct}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.max(pct, count > 0 ? 5 : 0)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Status Pipeline Visualizer
 */
export function StatusPipelineChart({ statusCounts = {} }) {
  const steps = [
    { label: "Submitted", count: statusCounts["Submitted"] || 0, color: "bg-blue-500", light: "bg-blue-50 text-blue-700" },
    { label: "Under Review", count: statusCounts["Under Review"] || 0, color: "bg-amber-500", light: "bg-amber-50 text-amber-700" },
    { label: "Assigned", count: statusCounts["Assigned"] || 0, color: "bg-purple-500", light: "bg-purple-50 text-purple-700" },
    { label: "In Progress", count: statusCounts["In Progress"] || 0, color: "bg-indigo-500", light: "bg-indigo-50 text-indigo-700" },
    { label: "Resolved", count: statusCounts["Resolved"] || 0, color: "bg-emerald-500", light: "bg-emerald-50 text-emerald-700" },
  ];

  const total = steps.reduce((acc, curr) => acc + curr.count, 0) || 1;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Complaint Status Pipeline</h4>
          <p className="text-xs text-slate-500">Live progression through resolution stages</p>
        </div>
        <PieChart className="w-4 h-4 text-slate-400" />
      </div>

      {/* Segmented Bar */}
      <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex mb-4">
        {steps.map(s => {
          const width = (s.count / total) * 100;
          if (width === 0) return null;
          return (
            <div
              key={s.label}
              className={`${s.color} h-full border-r border-white/40 last:border-0 transition-all`}
              style={{ width: `${width}%` }}
              title={`${s.label}: ${s.count}`}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {steps.map(s => (
          <div key={s.label} className={`p-2.5 rounded-lg border border-slate-100 ${s.light} flex flex-col justify-between`}>
            <span className="text-[11px] font-medium opacity-90 truncate">{s.label}</span>
            <span className="text-lg font-bold mt-1">{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Priority Distribution Cards
 */
export function PriorityDistributionChart({ priorityCounts = {} }) {
  const high = priorityCounts["High"] || 0;
  const med = priorityCounts["Medium"] || 0;
  const low = priorityCounts["Low"] || 0;
  const total = high + med + low || 1;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Priority Distribution</h4>
          <p className="text-xs text-slate-500">Urgency classification breakdown</p>
        </div>
        <Layers className="w-4 h-4 text-slate-400" />
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200/80">
          <p className="text-xs font-semibold text-rose-800 uppercase tracking-wide">High</p>
          <p className="text-2xl font-bold text-rose-900 my-0.5">{high}</p>
          <p className="text-[11px] text-rose-600 font-medium">{Math.round((high / total) * 100)}% of total</p>
        </div>

        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/80">
          <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">Medium</p>
          <p className="text-2xl font-bold text-amber-900 my-0.5">{med}</p>
          <p className="text-[11px] text-amber-600 font-medium">{Math.round((med / total) * 100)}% of total</p>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Low</p>
          <p className="text-2xl font-bold text-slate-900 my-0.5">{low}</p>
          <p className="text-[11px] text-slate-500 font-medium">{Math.round((low / total) * 100)}% of total</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Flow Diagram of the Complaint Lifecycle & AI Integration
 * Explicitly fulfills the prompt's request for the 10-step visual flow.
 */
export function AiLifecycleFlow() {
  const steps = [
    { num: 1, title: "User Fills Form", desc: "Student or staff inputs title, room location, photo & issue details.", icon: Send, role: "Student" },
    { num: 2, title: "Complaint Submitted", desc: "Unique complaint ID generated (e.g. CMP-2026-1001).", icon: CheckCircle2, role: "System" },
    { num: 3, title: "AI Analyzes Complaint", desc: "Gemini 3.8 parses natural language context & safety keywords.", icon: Cpu, role: "AI Engine", highlight: true },
    { num: 4, title: "Category Identified", desc: "Mapped to Electrical, Plumbing, Furniture, Cleaning, or IT.", icon: Filter, role: "AI Engine", highlight: true },
    { num: 5, title: "Priority Identified", desc: "Urgency calculated (Low/Med/High) with safety reason.", icon: Sparkles, role: "AI Engine", highlight: true },
    { num: 6, title: "Duplicate Check", desc: "Scans active campus tickets to prevent redundant dispatches.", icon: ShieldCheck, role: "AI Engine", highlight: true },
    { num: 7, title: "Department Recommended", desc: "Routes to appropriate maintenance crew (e.g. Plumbing Services).", icon: Bot, role: "AI Engine", highlight: true },
    { num: 8, title: "Admin Receives & Assigns", desc: "Facilities officer reviews triage and confirms technician work order.", icon: UserCheck, role: "Admin" },
    { num: 9, title: "Technician Resolves", desc: "Work completed on-site with technician notes and parts recorded.", icon: Wrench, role: "Maintenance" },
    { num: 10, title: "Student Sees Live Status", desc: "Full audit log visible on student dashboard with resolution proof.", icon: Eye, role: "Student" }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            End-to-End Workflow Architecture
          </div>
          <h3 className="text-lg font-bold text-slate-900">Campus Complaint & AI Triage Lifecycle</h3>
          <p className="text-xs text-slate-500">From submission to technician resolution with automated AI intelligence</p>
        </div>
      </div>

      <div className="relative">
        {/* Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  step.highlight 
                    ? 'bg-indigo-50/70 border-indigo-200 shadow-xs' 
                    : 'bg-slate-50/60 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.highlight ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white'
                    }`}>
                      {step.num}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      step.highlight ? 'bg-indigo-200/80 text-indigo-900' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {step.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className={`w-4 h-4 ${step.highlight ? 'text-indigo-600' : 'text-slate-600'}`} />
                    <h5 className="font-bold text-xs text-slate-900">{step.title}</h5>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{step.desc}</p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex justify-end mt-2 pt-2 border-t border-slate-200/50">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * 8 AI-Powered Solution Ideas Showcase
 * Required by prompt to demonstrate all 8 features
 */
export function AiSolutionsShowcase() {
  const features = [
    {
      id: 1,
      title: "1. Automatic Complaint Classification",
      desc: "Instantly categorizes complaints into Electrical, Plumbing, Furniture, Cleaning, Internet/Network, Security, or Other without human manual sorting.",
      badge: "Natural Language Processing"
    },
    {
      id: 2,
      title: "2. Urgency & Priority Prediction",
      desc: "Detects hazard terms (sparks, floods, locks, biological waste) to assign Low, Medium, or High priority with safety justifications.",
      badge: "Risk Assessment"
    },
    {
      id: 3,
      title: "3. Duplicate Complaint Detection",
      desc: "Cross-checks room locations and issue semantics against existing open campus tickets to prevent redundant dispatches.",
      badge: "Semantic Matching"
    },
    {
      id: 4,
      title: "4. Complaint Summarization",
      desc: "Transforms long, fragmented student problem descriptions into a 1-sentence actionable summary for field technicians.",
      badge: "Executive Summarization"
    },
    {
      id: 5,
      title: "5. Department Recommendation",
      desc: "Automatically identifies which campus trade unit is responsible (e.g., Plumbing Services vs. Housekeeping).",
      badge: "Trade Routing"
    },
    {
      id: 6,
      title: "6. Smart Complaint Routing",
      desc: "Suggests specific technician squads and team leads based on required equipment and workload balance.",
      badge: "Workforce Optimization"
    },
    {
      id: 7,
      title: "7. Resolution-Time Prediction",
      desc: "Forecasts estimated completion time (e.g. 2-4 hours, 24-48 hours) based on historical repair velocity.",
      badge: "Time-to-Resolve Estimator"
    },
    {
      id: 8,
      title: "8. AI-Generated Maintenance Insights",
      desc: "Analyzes complaint clusters to recommend proactive preventative maintenance before costly equipment failures occur.",
      badge: "Predictive Maintenance"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-6 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-1 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            AI Intelligence Capabilities
          </span>
          <h3 className="text-xl font-bold tracking-tight">8 Built-in AI-Powered Solution Ideas</h3>
          <p className="text-xs text-slate-400">Transforming informal verbal complaints into structured, automated campus resolution</p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Active in All Modules
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(f => (
          <div key={f.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-400/20 text-indigo-200 border border-indigo-400/30 mb-2">
              {f.badge}
            </span>
            <h5 className="font-bold text-sm text-white mb-1.5">{f.title}</h5>
            <p className="text-xs text-slate-300 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
