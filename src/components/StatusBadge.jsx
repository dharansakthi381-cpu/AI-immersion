/**
 * Reusable StatusBadge & PriorityBadge components
 */
import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  UserCheck, 
  Wrench, 
  ShieldAlert,
  Flame,
  Check
} from 'lucide-react';

export function StatusBadge({ status, size = "md" }) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3.5 py-1.5 text-sm font-semibold"
  };

  switch (status) {
    case "Submitted":
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses[size]}`}>
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          Submitted
        </span>
      );
    case "Under Review":
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 ${sizeClasses[size]}`}>
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          Under Review
        </span>
      );
    case "Assigned":
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 ${sizeClasses[size]}`}>
          <UserCheck className="w-3.5 h-3.5 text-purple-600" />
          Assigned
        </span>
      );
    case "In Progress":
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 ${sizeClasses[size]}`}>
          <Wrench className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          In Progress
        </span>
      );
    case "Resolved":
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ${sizeClasses[size]}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Resolved
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses[size]}`}>
          {status}
        </span>
      );
  }
}

export function PriorityBadge({ priority, size = "md" }) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-0.5 text-xs font-semibold",
    lg: "px-3 py-1 text-sm font-semibold"
  };

  switch (priority) {
    case "High":
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-semibold ${sizeClasses[size]}`}>
          <Flame className="w-3.5 h-3.5 text-rose-600" />
          High Urgency
        </span>
      );
    case "Medium":
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 ${sizeClasses[size]}`}>
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          Medium
        </span>
      );
    case "Low":
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 ${sizeClasses[size]}`}>
          <Check className="w-3 h-3 text-slate-500" />
          Low
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 ${sizeClasses[size]}`}>
          {priority}
        </span>
      );
  }
}

export function CategoryBadge({ category }) {
  const colors = {
    Electrical: "bg-amber-100 text-amber-800 border-amber-200",
    Plumbing: "bg-cyan-100 text-cyan-800 border-cyan-200",
    Furniture: "bg-stone-100 text-stone-800 border-stone-200",
    Cleaning: "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Internet/Network": "bg-blue-100 text-blue-800 border-blue-200",
    Security: "bg-red-100 text-red-800 border-red-200",
    Other: "bg-slate-100 text-slate-800 border-slate-200"
  };

  const style = colors[category] || colors.Other;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${style}`}>
      {category}
    </span>
  );
}
