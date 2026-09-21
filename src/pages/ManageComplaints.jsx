/**
 * Administrative Complaint Management Workbench
 * Allows filtering, assignment dispatch, status progression, and duplicate triage
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Wrench, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  ArrowRight,
  Sparkles,
  Copy,
  RefreshCw,
  Clock
} from 'lucide-react';
import { complaintService } from '../services/complaintService.js';
import { DEPARTMENTS, TECHNICIANS, COMPLAINT_CATEGORIES } from '../data/sampleComplaints.js';
import { useAuth } from '../context/AuthContext.jsx';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../components/StatusBadge.jsx';

export function ManageComplaints() {
  const { currentUser } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignDept, setAssignDept] = useState('');
  const [assignTech, setAssignTech] = useState('');
  const [assignRemark, setAssignRemark] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = () => {
    setComplaints(complaintService.getComplaints());
  };

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesDept = deptFilter === 'All' || c.department === deptFilter;
    const matchesPriority = priorityFilter === 'All' || c.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesDept && matchesPriority;
  });

  const handleQuickStatusChange = (id, newStatus) => {
    complaintService.updateStatus(id, newStatus, `Quick update by ${currentUser.name}`, currentUser);
    loadComplaints();
    setToastMessage(`Ticket ${id} marked as ${newStatus}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenAssignModal = (complaint) => {
    setSelectedComplaint(complaint);
    setAssignDept(complaint.department || DEPARTMENTS[0]);
    setAssignTech(complaint.assignedTo !== "Unassigned" ? complaint.assignedTo : '');
    setAssignRemark('');
    setAssignModalOpen(true);
  };

  const handleConfirmAssignment = (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    complaintService.assignComplaint(
      selectedComplaint.id,
      assignDept,
      assignTech || "General Squad",
      assignRemark,
      currentUser
    );

    setAssignModalOpen(false);
    loadComplaints();
    setToastMessage(`Dispatched ${selectedComplaint.id} to ${assignTech || 'Specialist'}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Title", "Category", "Priority", "Status", "Department", "AssignedTo", "Location", "Date"];
    const rows = filteredComplaints.map(c => [
      c.id,
      `"${c.title.replace(/"/g, '""')}"`,
      c.category,
      c.priority,
      c.status,
      c.department,
      c.assignedTo,
      `"${c.location.replace(/"/g, '""')}"`,
      new Date(c.createdAt).toISOString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `campus_complaints_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manage Campus Work Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Triage complaints, assign technicians, update progression status, and track repairs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search work orders by title, complaint ID, or room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs pt-1 border-t border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filter By:
          </span>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium"
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Urgency</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {(statusFilter !== 'All' || deptFilter !== 'All' || priorityFilter !== 'All' || searchTerm) && (
            <button
              onClick={() => {
                setStatusFilter('All');
                setDeptFilter('All');
                setPriorityFilter('All');
                setSearchTerm('');
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold ml-auto"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Complaint Details</th>
                <th className="px-4 py-3">AI Triage</th>
                <th className="px-4 py-3">Department & Crew</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Quick Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No matching complaints found.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {c.id}
                    </td>

                    <td className="px-4 py-3 max-w-xs">
                      <Link to={`/complaints/${c.id}`} className="font-bold text-slate-900 hover:text-blue-600 block line-clamp-1">
                        {c.title}
                      </Link>
                      <span className="text-[11px] text-slate-500 block truncate">{c.location}</span>
                      {c.aiAnalysis?.duplicate && (
                        <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-semibold">
                          <Copy className="w-2.5 h-2.5" />
                          Possible Duplicate ({c.aiAnalysis.duplicateOfId})
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1 items-start">
                        <CategoryBadge category={c.category} />
                        <PriorityBadge priority={c.priority} size="sm" />
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-800 block truncate max-w-[150px]">{c.department}</span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[150px]">
                        {c.assignedTo || "Unassigned"}
                      </span>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {/* Interactive inline quick status dropdown */}
                      <select
                        value={c.status}
                        onChange={(e) => handleQuickStatusChange(c.id, e.target.value)}
                        className="text-xs font-semibold py-1 px-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 cursor-pointer focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>

                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenAssignModal(c)}
                          className="px-2.5 py-1 rounded bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 font-semibold text-xs transition-colors flex items-center gap-1"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Assign</span>
                        </button>
                        <Link
                          to={`/complaints/${c.id}`}
                          className="p-1 rounded text-slate-400 hover:text-blue-600 transition-colors"
                          title="View Full Details"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {assignModalOpen && selectedComplaint && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Assign Maintenance Crew</h3>
                <p className="text-xs text-slate-500">{selectedComplaint.id}: {selectedComplaint.title}</p>
              </div>
              <CategoryBadge category={selectedComplaint.category} />
            </div>

            <form onSubmit={handleConfirmAssignment} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Responsible Trade Division
                </label>
                <select
                  value={assignDept}
                  onChange={(e) => setAssignDept(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500"
                >
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Technician / Specialist
                </label>
                <select
                  value={assignTech}
                  onChange={(e) => setAssignTech(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Choose Specialist --</option>
                  {TECHNICIANS.map(t => (
                    <option key={t.name} value={t.name}>
                      {t.name} ({t.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Technician Work Order Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Bring ladder and 4x LED ballast tubes to 2nd floor..."
                  value={assignRemark}
                  onChange={(e) => setAssignRemark(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAssignModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
                >
                  Confirm & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
