/**
 * Complaint Service for persisting and managing campus complaints in localStorage.
 */
import { SAMPLE_COMPLAINTS } from '../data/sampleComplaints.js';

const STORAGE_KEY = 'campus_complaints_v1';

export const complaintService = {
  /**
   * Get all complaints from localStorage, initializing with samples if needed.
   */
  getComplaints() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        this.resetToSampleData();
        return SAMPLE_COMPLAINTS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored complaints", e);
      return SAMPLE_COMPLAINTS;
    }
  },

  /**
   * Get single complaint by ID
   */
  getComplaintById(id) {
    const complaints = this.getComplaints();
    return complaints.find(c => c.id === id) || null;
  },

  /**
   * Save complaints array to localStorage
   */
  saveComplaints(complaints) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    } catch (e) {
      console.error("Failed to save complaints to localStorage", e);
    }
  },

  /**
   * Reset data to default sample complaints
   */
  resetToSampleData() {
    this.saveComplaints(SAMPLE_COMPLAINTS);
    return SAMPLE_COMPLAINTS;
  },

  /**
   * Generate next sequential complaint ID
   */
  generateComplaintId() {
    const complaints = this.getComplaints();
    const currentYear = new Date().getFullYear();
    const count = complaints.length + 1;
    const pad = String(count + 1000).padStart(4, '0');
    return `CMP-${currentYear}-${pad}`;
  },

  /**
   * Create a new complaint with AI analysis and user details
   */
  createComplaint(data, aiAnalysis, user) {
    const complaints = this.getComplaints();
    const id = this.generateComplaintId();
    const now = new Date().toISOString();

    const newComplaint = {
      id,
      title: data.title,
      description: data.description,
      category: aiAnalysis?.category || data.category || "Other",
      priority: aiAnalysis?.priority || data.priority || "Medium",
      status: "Submitted",
      department: aiAnalysis?.department || "General Facilities",
      assignedTo: "Unassigned",
      location: data.location || "Campus Facility",
      building: data.building || data.location?.split(',')[0] || "Main Campus",
      createdAt: now,
      updatedAt: now,
      imageUrl: data.imageUrl || null,
      submittedBy: {
        name: user?.name || "Student User",
        email: user?.email || "student@campus.edu",
        role: user?.role || "Student",
        studentId: user?.studentId || "STD-2024-0000",
        department: user?.department || "General",
        phone: user?.phone || "+1 (555) 000-0000"
      },
      aiAnalysis: {
        category: aiAnalysis?.category || data.category || "Other",
        priority: aiAnalysis?.priority || "Medium",
        department: aiAnalysis?.department || "General Facilities",
        summary: aiAnalysis?.summary || data.description.substring(0, 100) + "...",
        duplicate: aiAnalysis?.duplicate || false,
        duplicateOfId: aiAnalysis?.duplicateOfId || null,
        reason: aiAnalysis?.reason || "Standard intake analysis completed.",
        predictedResolutionHours: aiAnalysis?.predictedResolutionHours || 8,
        resolutionTimeEstimate: aiAnalysis?.resolutionTimeEstimate || "4 - 8 Hours",
        routingRecommendation: aiAnalysis?.routingRecommendation || "General Maintenance Dispatch",
        confidence: aiAnalysis?.confidence || 0.92
      },
      adminRemarks: "",
      history: [
        {
          status: "Submitted",
          timestamp: now,
          by: `${user?.name || 'Student'} (${user?.role || 'Student'})`,
          note: `Complaint filed via Campus Portal. AI classified as ${aiAnalysis?.category || 'General'} (${aiAnalysis?.priority || 'Medium'} priority).`
        }
      ]
    };

    const updatedList = [newComplaint, ...complaints];
    this.saveComplaints(updatedList);
    return newComplaint;
  },

  /**
   * Update complaint status
   */
  updateStatus(id, newStatus, remarks = "", user = null) {
    const complaints = this.getComplaints();
    const index = complaints.findIndex(c => c.id === id);
    if (index === -1) return null;

    const current = complaints[index];
    const now = new Date().toISOString();

    const historyEntry = {
      status: newStatus,
      timestamp: now,
      by: user ? `${user.name} (${user.role})` : "Campus Admin",
      note: remarks || `Status changed to ${newStatus}`
    };

    const updated = {
      ...current,
      status: newStatus,
      updatedAt: now,
      adminRemarks: remarks ? remarks : current.adminRemarks,
      history: [...(current.history || []), historyEntry]
    };

    complaints[index] = updated;
    this.saveComplaints(complaints);
    return updated;
  },

  /**
   * Assign complaint to a department and technician
   */
  assignComplaint(id, department, technician, remarks = "", user = null) {
    const complaints = this.getComplaints();
    const index = complaints.findIndex(c => c.id === id);
    if (index === -1) return null;

    const current = complaints[index];
    const now = new Date().toISOString();

    const historyEntry = {
      status: "Assigned",
      timestamp: now,
      by: user ? `${user.name} (${user.role})` : "Campus Admin",
      note: `Assigned to ${technician} in ${department}. ${remarks ? 'Note: ' + remarks : ''}`
    };

    const updated = {
      ...current,
      department: department || current.department,
      assignedTo: technician || current.assignedTo,
      status: current.status === "Submitted" || current.status === "Under Review" ? "Assigned" : current.status,
      updatedAt: now,
      adminRemarks: remarks ? remarks : current.adminRemarks,
      history: [...(current.history || []), historyEntry]
    };

    complaints[index] = updated;
    this.saveComplaints(complaints);
    return updated;
  },

  /**
   * Add remark/note to complaint
   */
  addRemark(id, remark, user = null) {
    const complaints = this.getComplaints();
    const index = complaints.findIndex(c => c.id === id);
    if (index === -1) return null;

    const current = complaints[index];
    const now = new Date().toISOString();

    const historyEntry = {
      status: current.status,
      timestamp: now,
      by: user ? `${user.name} (${user.role})` : "Campus Admin",
      note: `Remark added: ${remark}`
    };

    const updated = {
      ...current,
      adminRemarks: remark,
      updatedAt: now,
      history: [...(current.history || []), historyEntry]
    };

    complaints[index] = updated;
    this.saveComplaints(complaints);
    return updated;
  },

  /**
   * Delete complaint (for administrative hygiene)
   */
  deleteComplaint(id) {
    const complaints = this.getComplaints();
    const filtered = complaints.filter(c => c.id !== id);
    this.saveComplaints(filtered);
    return filtered;
  },

  /**
   * Get metrics and statistics for dashboards
   */
  getStats() {
    const complaints = this.getComplaints();
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === "Submitted" || c.status === "Under Review").length;
    const inProgress = complaints.filter(c => c.status === "In Progress" || c.status === "Assigned").length;
    const resolved = complaints.filter(c => c.status === "Resolved").length;
    const highPriority = complaints.filter(c => c.priority === "High" && c.status !== "Resolved").length;

    // Categories
    const categoryCounts = {};
    complaints.forEach(c => {
      categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
    });

    // Priority breakdown
    const priorityCounts = {
      High: complaints.filter(c => c.priority === "High").length,
      Medium: complaints.filter(c => c.priority === "Medium").length,
      Low: complaints.filter(c => c.priority === "Low").length,
    };

    // Status breakdown
    const statusCounts = {
      Submitted: complaints.filter(c => c.status === "Submitted").length,
      "Under Review": complaints.filter(c => c.status === "Under Review").length,
      Assigned: complaints.filter(c => c.status === "Assigned").length,
      "In Progress": complaints.filter(c => c.status === "In Progress").length,
      Resolved: complaints.filter(c => c.status === "Resolved").length,
    };

    // Average resolution time (approx from resolved items or predicted hours)
    const resolvedItems = complaints.filter(c => c.status === "Resolved");
    let avgHours = 4.2; // default campus baseline
    if (resolvedItems.length > 0) {
      const sum = resolvedItems.reduce((acc, curr) => {
        const created = new Date(curr.createdAt).getTime();
        const updated = new Date(curr.updatedAt).getTime();
        const diffHrs = Math.max(1, (updated - created) / (1000 * 60 * 60));
        return acc + diffHrs;
      }, 0);
      avgHours = +(sum / resolvedItems.length).toFixed(1);
    }

    return {
      total,
      pending,
      inProgress,
      resolved,
      highPriority,
      categoryCounts,
      priorityCounts,
      statusCounts,
      avgResolutionHours: avgHours,
      avgResolutionString: `${avgHours} Hours`
    };
  }
};
