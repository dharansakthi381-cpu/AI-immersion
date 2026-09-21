/**
 * Campus Facility Analytics & AI Maintenance Insights (Feature 8)
 */
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Building, 
  Flame,
  ShieldCheck,
  Cpu,
  Layers,
  Lightbulb
} from 'lucide-react';
import { complaintService } from '../services/complaintService.js';
import { generateMaintenanceInsights } from '../services/geminiService.js';
import { DashboardCard } from '../components/DashboardCard.jsx';
import { 
  CategoryBarChart, 
  StatusPipelineChart, 
  PriorityDistributionChart, 
  AiSolutionsShowcase 
} from '../components/Charts.jsx';

export function Analytics() {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState(null);
  const [insights, setInsights] = useState(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const list = complaintService.getComplaints();
    const st = complaintService.getStats();
    setComplaints(list);
    setStats(st);

    // Initial AI insights generate
    setIsLoadingInsights(true);
    try {
      const aiInsights = await generateMaintenanceInsights(list);
      setInsights(aiInsights);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const handleRefreshInsights = async () => {
    setIsLoadingInsights(true);
    try {
      const aiInsights = await generateMaintenanceInsights(complaints);
      setInsights(aiInsights);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  if (!stats) return null;

  // Calculate resolution rate and hotspot buildings
  const total = stats.total || 1;
  const resolved = stats.byStatus["Resolved"] || 0;
  const resolutionRate = Math.round((resolved / total) * 100);

  // Compute building hotspots
  const buildingCounts = {};
  complaints.forEach(c => {
    const b = c.building || "Other Facility";
    buildingCounts[b] = (buildingCounts[b] || 0) + 1;
  });

  const sortedBuildings = Object.entries(buildingCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-1 border border-blue-200">
            <BarChart3 className="w-3.5 h-3.5" />
            Executive Facility Intelligence
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Campus Analytics & Predictive Maintenance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time trends, SLA resolution performance, and Gemini AI-driven preventive insights.
          </p>
        </div>

        <button
          onClick={handleRefreshInsights}
          disabled={isLoadingInsights}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>{isLoadingInsights ? "Analyzing Campus Trends..." : "Run AI Insights Engine"}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <DashboardCard
          title="Resolution Velocity"
          value="4.2 hrs"
          subtitle="Average turnaround time"
          icon={Clock}
          colorScheme="blue"
        />
        <DashboardCard
          title="Resolution Rate"
          value={`${resolutionRate}%`}
          subtitle={`${resolved} of ${total} resolved`}
          icon={CheckCircle2}
          colorScheme="emerald"
        />
        <DashboardCard
          title="High Urgency Load"
          value={stats.byPriority["High"] || 0}
          subtitle="Hazardous issues"
          icon={Flame}
          colorScheme="rose"
        />
        <DashboardCard
          title="Duplicate Interceptions"
          value={complaints.filter(c => c.aiAnalysis?.duplicate).length}
          subtitle="Redundant tickets avoided"
          icon={ShieldCheck}
          colorScheme="indigo"
        />
      </div>

      {/* AI Generated Insights Section (Feature 8) */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                AI Feature 8 • Autonomous Diagnostic
              </span>
              <h3 className="text-xl font-bold tracking-tight">
                AI-Generated Campus Maintenance Insights
              </h3>
            </div>
          </div>

          <div className="text-xs text-slate-300 flex items-center gap-2">
            <span>Model: <strong>Gemini 3.8 Flash</strong></span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Real-time Synthesized</span>
          </div>
        </div>

        {isLoadingInsights ? (
          <div className="py-12 text-center space-y-3">
            <RefreshCw className="w-8 h-8 mx-auto text-indigo-400 animate-spin" />
            <p className="text-sm font-semibold text-indigo-200">
              Gemini AI is analyzing complaint patterns across campus buildings...
            </p>
          </div>
        ) : insights ? (
          <div className="space-y-6 text-xs sm:text-sm">
            {/* Overview / Executive Summary */}
            <div className="p-4 bg-white/10 rounded-xl border border-white/10">
              <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block mb-1">
                Executive Facility Health Summary
              </span>
              <p className="text-slate-200 leading-relaxed text-sm">
                {insights.overallAssessment}
              </p>
            </div>

            {/* 3 Pillars of AI Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Recurrent Issues */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Top Recurrent Patterns</span>
                </div>
                <ul className="space-y-2 text-slate-300 text-xs">
                  {(insights.recurrentIssues || []).map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* High Risk Hotspots */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wide">
                  <Flame className="w-4 h-4" />
                  <span>High-Risk Infrastructure</span>
                </div>
                <ul className="space-y-2 text-slate-300 text-xs">
                  {(insights.highRiskFacilities || []).map((fac, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Proactive Recommendations */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wide">
                  <Lightbulb className="w-4 h-4" />
                  <span>Preventive Recommendations</span>
                </div>
                <ul className="space-y-2 text-slate-300 text-xs">
                  {(insights.preventativeRecommendations || []).map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {insights.resourceAllocationAdvice && (
              <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/30 text-xs text-indigo-200">
                <strong className="text-white font-semibold">Recommended Crew Allocation: </strong>
                {insights.resourceAllocationAdvice}
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CategoryBarChart categoryCounts={stats.byCategory} />
        <StatusPipelineChart statusCounts={stats.byStatus} />
        <PriorityDistributionChart priorityCounts={stats.byPriority} />
      </div>

      {/* Campus Building Hotspot Rankings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Campus Facility Hotspot Ranking</h3>
            <p className="text-xs text-slate-500">Buildings with the highest concentration of active repair requests</p>
          </div>
          <Building className="w-4 h-4 text-slate-400" />
        </div>

        <div className="space-y-3">
          {sortedBuildings.map(([bldg, count], idx) => {
            const pct = Math.round((count / total) * 100);
            return (
              <div key={bldg} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-800 font-semibold">
                    {idx + 1}. {bldg}
                  </span>
                  <span className="text-slate-500">
                    <strong className="text-slate-900">{count}</strong> tickets ({pct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.max(pct, 8)}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8 AI Solutions Showcase */}
      <AiSolutionsShowcase />
    </div>
  );
}
