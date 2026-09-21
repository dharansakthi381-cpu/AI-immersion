/**
 * Responsive Sidebar Navigation for Student and Admin roles
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  BarChart3, 
  User, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle,
  HelpCircle,
  Sparkles,
  ClipboardList,
  Flame,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export function Sidebar({ isOpen, onClose }) {
  const { currentUser, isAdmin, switchRole, logout } = useAuth();

  const studentNavItems = [
    { to: "/", label: "Student Dashboard", icon: LayoutDashboard, end: true },
    { to: "/submit", label: "Submit Complaint", icon: PlusCircle },
    { to: "/my-complaints", label: "My Complaints", icon: FileText },
    { to: "/analytics", label: "Campus Analytics", icon: BarChart3 },
    { to: "/profile", label: "My Profile", icon: User }
  ];

  const adminNavItems = [
    { to: "/admin", label: "Admin Overview", icon: LayoutDashboard, end: true },
    { to: "/manage", label: "Manage Complaints", icon: ClipboardList },
    { to: "/analytics", label: "Analytics & AI Insights", icon: BarChart3 },
    { to: "/submit", label: "Log Facility Issue", icon: PlusCircle },
    { to: "/my-complaints", label: "All Records View", icon: FileText },
    { to: "/profile", label: "Admin Profile", icon: User }
  ];

  const navItems = isAdmin ? adminNavItems : studentNavItems;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 transition-transform duration-200 ease-in-out flex flex-col justify-between overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* User Role Card */}
          <div className={`p-3.5 rounded-xl border ${
            isAdmin ? 'bg-purple-50/60 border-purple-200' : 'bg-blue-50/60 border-blue-200'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${
                isAdmin ? 'bg-purple-600' : 'bg-blue-600'
              }`}>
                {isAdmin ? <ShieldCheck className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {isAdmin ? 'Maintenance Administration' : 'Student & Staff Portal'}
                </span>
                <p className="text-xs font-bold text-slate-900 truncate">
                  {currentUser.name}
                </p>
              </div>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Menu Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => {
                    if (window.innerWidth < 768) onClose();
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Role Switching Quick Links for Testing */}
          <div className="pt-4 border-t border-slate-200">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Role Perspective
            </p>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  switchRole("student");
                  if (window.innerWidth < 768) onClose();
                }}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                  !isAdmin ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Student
              </button>
              <button
                type="button"
                onClick={() => {
                  switchRole("admin");
                  if (window.innerWidth < 768) onClose();
                }}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                  isAdmin ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info / Logout */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Gemini 3.8 Flash AI
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="AI Ready" />
          </div>
          <NavLink
            to="/login"
            className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Switch Account / Login
          </NavLink>
        </div>
      </aside>
    </>
  );
}
