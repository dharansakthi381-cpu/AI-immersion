/**
 * Complaint Card component for grid and list views
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Sparkles, 
  Copy, 
  ArrowRight, 
  Building, 
  User, 
  Wrench,
  Image as ImageIcon
} from 'lucide-react';
import { StatusBadge, PriorityBadge, CategoryBadge } from './StatusBadge.jsx';

export function ComplaintCard({ complaint, onQuickStatusChange, isAdmin = false }) {
  const formattedDate = new Date(complaint.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
              {complaint.id}
            </span>
            <CategoryBadge category={complaint.category} />
          </div>
          <StatusBadge status={complaint.status} size="sm" />
        </div>

        {/* Title */}
        <Link 
          to={`/complaints/${complaint.id}`}
          className="block group-hover:text-blue-600 transition-colors"
        >
          <h4 className="text-base font-bold text-slate-900 line-clamp-1 mb-1.5">
            {complaint.title}
          </h4>
        </Link>

        {/* Location & Time */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[200px]">{complaint.location}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {formattedDate}
          </span>
        </div>

        {/* Description snippet */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {complaint.description}
        </p>

        {/* AI Insight Box */}
        {complaint.aiAnalysis && (
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 mb-3 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 font-semibold text-indigo-700">
                <Sparkles className="w-3.5 h-3.5" />
                AI Triage
              </span>
              <PriorityBadge priority={complaint.priority} size="sm" />
            </div>
            
            {complaint.aiAnalysis.summary && (
              <p className="text-slate-600 italic line-clamp-2">
                "{complaint.aiAnalysis.summary}"
              </p>
            )}

            {complaint.aiAnalysis.duplicate && (
              <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200 font-medium">
                <Copy className="w-3 h-3 text-amber-600 shrink-0" />
                <span>Possible duplicate of {complaint.aiAnalysis.duplicateOfId || "existing complaint"}</span>
              </div>
            )}

            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60">
              <span>Est. fix: <strong className="text-slate-700">{complaint.aiAnalysis.resolutionTimeEstimate || "4-8 Hours"}</strong></span>
              <span className="text-indigo-600 font-medium truncate max-w-[150px]">{complaint.department}</span>
            </div>
          </div>
        )}

        {/* Submitter & Assigned Info */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="inline-flex items-center gap-1 truncate max-w-[150px]">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>{complaint.submittedBy?.name || "Student"}</span>
          </span>
          {complaint.assignedTo && complaint.assignedTo !== "Unassigned" ? (
            <span className="inline-flex items-center gap-1 text-slate-700 font-medium truncate max-w-[140px]">
              <Wrench className="w-3.5 h-3.5 text-indigo-500" />
              <span>{complaint.assignedTo.split(' ')[0]}</span>
            </span>
          ) : (
            <span className="text-slate-400 italic">Unassigned</span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {complaint.imageUrl && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
              <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
              Photo attached
            </span>
          )}
        </div>
        <Link
          to={`/complaints/${complaint.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
