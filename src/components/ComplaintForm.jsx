/**
 * Complaint Submission Form with Real-Time AI Triage, Duplicate Alerts, and Sample Fillers
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Upload, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Camera, 
  X, 
  RefreshCw,
  Clock,
  Send,
  Building,
  Wrench,
  Bot
} from 'lucide-react';
import { CAMPUS_BUILDINGS, COMPLAINT_CATEGORIES } from '../data/sampleComplaints.js';
import { complaintService } from '../services/complaintService.js';
import { analyzeComplaint } from '../services/geminiService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { PriorityBadge, CategoryBadge } from './StatusBadge.jsx';

export function ComplaintForm({ onSubmitted }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    building: CAMPUS_BUILDINGS[0],
    priority: 'Medium',
    imageUrl: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [triageStep, setTriageStep] = useState(0); // 0: idle, 1: classifying, 2: priority, 3: duplicate check, 4: complete
  const [errors, setErrors] = useState({});

  // Preset sample complaints from user prompt for 1-click test fill
  const sampleScenarios = [
    {
      title: "Broken light in Block A classroom",
      description: "The ceiling tube lights are flickering continuously and two lights are dead in Room 104, leaving the whiteboard area completely dark.",
      location: "Block A, 1st Floor, Room 104",
      building: "Block A - Humanities & Math",
      category: "Electrical"
    },
    {
      title: "Water leakage near laboratory entrance",
      description: "Continuous water leaking from the ceiling junction right in front of Chemistry Lab 2B. Floor is slippery and hazard for walking.",
      location: "Science Complex, 2nd Floor, Hallway near Chem Lab 2B",
      building: "Science Complex & Labs",
      category: "Plumbing"
    },
    {
      title: "Damaged desk in Room 204",
      description: "Wooden bench desk broken in the middle row with loose screws sticking out.",
      location: "Block B, 2nd Floor, Seminar Room 204",
      building: "Block B - Classrooms & Lecture Halls",
      category: "Furniture"
    },
    {
      title: "Unclean washroom in Block B",
      description: "The washroom sinks are clogged, foul smell, and paper towels overflowing onto the floor.",
      location: "Block B, 2nd Floor, Restroom wing",
      building: "Block B - Classrooms & Lecture Halls",
      category: "Cleaning"
    },
    {
      title: "Wi-Fi not working in library",
      description: "BIT-Student Wi-Fi dropping connection on 3rd floor quiet zone. Cannot load online research materials.",
      location: "Central Library, 3rd Floor, Quiet Study Hall",
      building: "Central Library",
      category: "Internet/Network"
    },
    {
      title: "Broken fan in seminar hall",
      description: "Ceiling fan making loud squeaking rattling noise and wobbling dangerously at speed 3.",
      location: "Main Auditorium, Ground Floor, Seminar Hall B",
      building: "Main Auditorium",
      category: "Electrical"
    },
    {
      title: "Garbage overflowing near canteen",
      description: "Food dumpsters outside student canteen overflowing and attracting flies and stray animals.",
      location: "Student Center, Rear Food Court",
      building: "Student Center & Cafeteria",
      category: "Cleaning"
    },
    {
      title: "Door lock damaged in laboratory",
      description: "RFID card scanner and deadbolt broken on Lab 304. Door can be pushed open without keycard.",
      location: "IT & Computing Complex, 3rd Floor, Lab 304",
      building: "IT & Computing Complex",
      category: "Security"
    }
  ];

  const handleQuickFill = (sample) => {
    setFormData({
      ...formData,
      title: sample.title,
      description: sample.description,
      location: sample.location,
      building: sample.building,
      category: sample.category
    });
    setAiAnalysis(null);
    setErrors({});
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Complaint title is required.";
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errs.description = "Please describe the problem in at least 10 characters.";
    }
    if (!formData.location.trim()) errs.location = "Campus location/room is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Perform AI analysis preview
  const handleAiAnalyze = async () => {
    if (!validateForm()) return;

    setIsAnalyzing(true);
    setTriageStep(1);

    const existing = complaintService.getComplaints();

    // Step simulation for visual feedback
    const stepTimer1 = setTimeout(() => setTriageStep(2), 350);
    const stepTimer2 = setTimeout(() => setTriageStep(3), 700);

    try {
      const result = await analyzeComplaint(formData, existing);
      setAiAnalysis(result);
      if (result.category && !formData.category) {
        setFormData(prev => ({ ...prev, category: result.category }));
      }
      setTriageStep(4);
    } catch (e) {
      console.error(e);
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsAnalyzing(true);
    const existing = complaintService.getComplaints();

    let analysis = aiAnalysis;
    if (!analysis) {
      analysis = await analyzeComplaint(formData, existing);
      setAiAnalysis(analysis);
    }

    // Persist via service
    const created = complaintService.createComplaint(
      {
        ...formData,
        category: analysis.category || formData.category || "Other"
      },
      analysis,
      currentUser
    );

    setIsAnalyzing(false);

    if (onSubmitted) {
      onSubmitted(created);
    } else {
      navigate(`/complaints/${created.id}`);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Automated AI Triage Active
            </div>
            <h2 className="text-xl font-bold tracking-tight">Submit Campus Maintenance Complaint</h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
              AI automatically classifies your issue, verifies urgency, flags duplicates, and routes to maintenance.
            </p>
          </div>
          <span className="text-xs font-mono bg-blue-950/40 px-3 py-1.5 rounded-lg border border-white/20 self-start sm:self-auto">
            Logged as: {currentUser.name}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Fill Preset Buttons */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Quick-Test Scenarios (1-Click Fill)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {sampleScenarios.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickFill(s)}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1"
              >
                <span>{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Complaint Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Complaint Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Broken light in Block A classroom 102"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-rose-300 bg-rose-50/50' : 'border-slate-300'
              }`}
            />
            {errors.title && <p className="text-xs text-rose-600 mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Describe what is broken, hazards observed, how long it has been happening, and specific room details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-rose-300 bg-rose-50/50' : 'border-slate-300'
              }`}
            />
            {errors.description && <p className="text-xs text-rose-600 mt-1">{errors.description}</p>}
          </div>

          {/* Location & Building */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Campus Building <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.building}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    building: e.target.value,
                    location: `${e.target.value}, ${formData.location.split(',')[1] || 'Room '}`
                  });
                }}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CAMPUS_BUILDINGS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Specific Location / Room <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. 2nd Floor, Room 204 or Chem Lab Entrance"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? 'border-rose-300 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.location && <p className="text-xs text-rose-600 mt-1">{errors.location}</p>}
            </div>
          </div>

          {/* Category & User Priority (Optional / Auto-suggested) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Category (Auto-classified by AI)
                </label>
                {aiAnalysis?.category && (
                  <span className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Detected
                  </span>
                )}
              </div>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Let AI Decide Automatically --</option>
                {COMPLAINT_CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Student Urgency Estimate
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low (Cosmetic, Non-disruptive)</option>
                <option value="Medium">Medium (Affects class comfort / standard)</option>
                <option value="High">High (Immediate Safety Hazard / Water leak / Sparks)</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Attach Issue Photo (Optional)
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors">
                <Upload className="w-4 h-4 text-slate-500" />
                <span>Upload from Device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              
              <span className="text-xs text-slate-500">
                Supports JPG, PNG up to 5MB. Visual proof helps technicians bring proper replacement parts.
              </span>
            </div>

            {imagePreview && (
              <div className="mt-3 relative inline-block">
                <img
                  src={imagePreview}
                  alt="Complaint Preview"
                  className="w-36 h-28 object-cover rounded-lg border border-slate-300 shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, imageUrl: '' }));
                  }}
                  className="absolute -top-2 -right-2 p-1 bg-rose-600 text-white rounded-full shadow-xs hover:bg-rose-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Live AI Analysis Card (if triggered or after button click) */}
          {aiAnalysis && (
            <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-indigo-200/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-indigo-600 text-white">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <h4 className="font-bold text-indigo-950 text-sm">AI Intake Triage Summary</h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <CategoryBadge category={aiAnalysis.category} />
                  <PriorityBadge priority={aiAnalysis.priority} size="sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 font-semibold uppercase text-[10px]">Recommended Department:</span>
                  <p className="font-bold text-slate-900 mt-0.5">{aiAnalysis.department}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold uppercase text-[10px]">Est. Resolution Window:</span>
                  <p className="font-bold text-slate-900 mt-0.5">{aiAnalysis.resolutionTimeEstimate || "4-8 Hours"}</p>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Actionable Summary:</span>
                <p className="text-slate-800 italic mt-0.5 font-medium">"{aiAnalysis.summary}"</p>
              </div>

              {aiAnalysis.reason && (
                <div>
                  <span className="text-slate-500 font-semibold uppercase text-[10px]">Priority Justification:</span>
                  <p className="text-slate-700 mt-0.5">{aiAnalysis.reason}</p>
                </div>
              )}

              {aiAnalysis.duplicate && (
                <div className="p-2.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 flex items-start gap-2">
                  <Copy className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Possible Duplicate Ticket Detected</strong>
                    <span>
                      A similar complaint ({aiAnalysis.duplicateOfId || 'CMP-2026'}) is already registered for this facility. 
                      Submitting will link your report to track cumulative student impact.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleAiAnalyze}
              disabled={isAnalyzing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-indigo-300 bg-indigo-50 text-indigo-700 font-semibold text-xs sm:text-sm hover:bg-indigo-100 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>{isAnalyzing ? "AI Analyzing..." : "Run AI Triage Preview"}</span>
            </button>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Submitting & Triaging...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Complaint</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
