/**
 * Login Page with Student and Admin demo credentials
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight, 
  Lock, 
  Mail,
  UserCheck
} from 'lucide-react';
import { useAuth, DEMO_USERS } from '../context/AuthContext.jsx';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'admin'
  const [error, setError] = useState('');

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your campus email address.");
      return;
    }
    const result = login(email, password, activeTab);
    if (result.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const handleDemoStudentLogin = () => {
    login(DEMO_USERS.student.email, 'password123', 'student');
    navigate('/');
  };

  const handleDemoAdminLogin = () => {
    login(DEMO_USERS.admin.email, 'adminpass', 'admin');
    navigate('/admin');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Campus Facility Portal</h2>
          <p className="text-xs text-blue-100 mt-1">
            AI-Powered Complaint & Maintenance Management System
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Quick Demo Login Cards */}
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Instant 1-Click Demo Logins
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoStudentLogin}
                className="p-3 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs mb-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student View</span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium">Alex Morgan</p>
                <p className="text-[10px] text-slate-400 truncate">CS Dept (Hostel 1)</p>
              </button>

              <button
                type="button"
                onClick={handleDemoAdminLogin}
                className="p-3 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin View</span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium">Dr. Elena Vance</p>
                <p className="text-[10px] text-slate-400 truncate">Facilities Director</p>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-2 text-[11px] uppercase font-bold text-slate-400">or sign in manually</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Role selector tab */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('student')}
              className={`py-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'student' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Student / Staff
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`py-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'admin' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Maintenance Admin
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleManualSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Campus Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder={activeTab === 'admin' ? "admin@campus.edu" : "student@campus.edu"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Campus Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Sign In to {activeTab === 'admin' ? 'Admin Desk' : 'Student Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              New to campus?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
