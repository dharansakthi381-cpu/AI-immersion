/**
 * Top Navigation Bar with Campus Identity, Quick Role Switcher, and Live AI Indicator
 */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Sparkles, 
  PlusCircle, 
  User, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export function Navbar({ onToggleSidebar, isSidebarOpen }) {
  const { currentUser, switchRole, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to={isAdmin ? "/admin" : "/"} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">
                  Campus Facilities
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-semibold">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  AI-Powered
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Complaint & Maintenance Management System
              </p>
            </div>
          </Link>
        </div>

        {/* Center / Right: Actions & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Submit Button (for Student or anyone) */}
          <Link
            to="/submit"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Complaint</span>
          </Link>

          {/* Quick 1-Click Role Switcher Demo Tool */}
          <button
            onClick={() => {
              if (isAdmin) {
                switchRole("student");
                navigate("/");
              } else {
                switchRole("admin");
                navigate("/admin");
              }
            }}
            title="Toggle between Student and Admin views to test all workflows"
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isAdmin
                ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {isAdmin ? (
              <>
                <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                <span>Switch to Student</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Switch to Admin</span>
              </>
            )}
          </button>

          {/* User Profile Pill */}
          <Link
            to="/profile"
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-none truncate max-w-[120px]">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-slate-500 font-medium capitalize mt-0.5">
                {currentUser.role === 'admin' ? 'Facilities Admin' : 'Student/Staff'}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
