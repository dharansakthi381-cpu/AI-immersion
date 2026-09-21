/**
 * AI-Powered Campus Complaint & Maintenance Tracker
 * Main Application Entry with React Router and Auth Provider
 */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Sidebar } from './components/Sidebar.jsx';

// Pages
import { StudentDashboard } from './pages/StudentDashboard.jsx';
import { AdminDashboard } from './pages/AdminDashboard.jsx';
import { SubmitComplaint } from './pages/SubmitComplaint.jsx';
import { MyComplaints } from './pages/MyComplaints.jsx';
import { ComplaintDetails } from './pages/ComplaintDetails.jsx';
import { ManageComplaints } from './pages/ManageComplaints.jsx';
import { Analytics } from './pages/Analytics.jsx';
import { Profile } from './pages/Profile.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Sparkles, Phone, ShieldCheck, Building2 } from 'lucide-react';

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAdmin } = useAuth();
  const location = useLocation();

  // On login and register screens, show a standalone clean layout
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      {/* Top Navbar */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Area with Sidebar + Content */}
      <div className="flex-1 flex w-full">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <Routes>
              {/* Home route dynamically routes based on role */}
              <Route path="/" element={isAdmin ? <AdminDashboard /> : <StudentDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/submit" element={<SubmitComplaint />} />
              <Route path="/my-complaints" element={<MyComplaints />} />
              <Route path="/complaints/:id" element={<ComplaintDetails />} />
              <Route path="/manage" element={<ManageComplaints />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Institutional Footer */}
          <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-slate-700">
                  Beacon Institute of Technology • Campus Facilities Department
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
                <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                  <Phone className="w-3 h-3 text-rose-500" />
                  <span>24/7 Facility Hotline: <strong>ext. 4400</strong></span>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-indigo-600 font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>Powered by Gemini 3.8 Flash AI</span>
                </span>
                <span>•</span>
                <span>Local Storage Persistent Demo</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}
