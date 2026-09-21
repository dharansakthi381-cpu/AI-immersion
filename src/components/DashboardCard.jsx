/**
 * Stat Metric Dashboard Card component
 */
import React from 'react';

export function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorScheme = "blue",
  onClick,
  className = ""
}) {
  const schemes = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-100",
      iconBg: "bg-blue-600 text-white"
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-100",
      iconBg: "bg-amber-500 text-white"
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-100",
      iconBg: "bg-indigo-600 text-white"
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-100",
      iconBg: "bg-emerald-600 text-white"
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-100",
      iconBg: "bg-rose-600 text-white"
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-100",
      iconBg: "bg-purple-600 text-white"
    }
  };

  const scheme = schemes[colorScheme] || schemes.blue;

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between ${onClick ? 'cursor-pointer hover:border-slate-300' : ''} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${scheme.iconBg} shadow-xs`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {subtitle && <span className="text-slate-500 font-medium">{subtitle}</span>}
          {trend && (
            <span className={`font-semibold ${trend.positive ? 'text-emerald-600' : 'text-slate-600'}`}>
              {trend.text}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
