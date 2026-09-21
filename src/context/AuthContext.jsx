/**
 * Authentication & User Session Context
 * Manages user state, login/logout, registration, and fast role switching between Student and Admin.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEMO_USERS = {
  student: {
    id: "USR-STD-8842",
    name: "Alex Morgan",
    email: "alex.morgan@campus.edu",
    role: "student",
    studentId: "STD-2024-8842",
    department: "Computer Science & Engineering",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    campusLocation: "North Campus Dormitory - Room 302"
  },
  staff: {
    id: "USR-FAC-1092",
    name: "Dr. Sarah Lin",
    email: "sarah.lin@campus.edu",
    role: "student", // staff shares complainant features
    studentId: "FAC-1092",
    department: "Chemistry Department",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    campusLocation: "Science Complex, Office 214"
  },
  admin: {
    id: "USR-ADM-001",
    name: "Dr. Elena Vance",
    email: "admin@campus.edu",
    role: "admin",
    studentId: "ADM-DIR-01",
    department: "Campus Facilities & Infrastructure",
    phone: "+1 (555) 987-6543",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    campusLocation: "Central Administration, Suite 104"
  }
};

const AUTH_STORAGE_KEY = 'campus_auth_user_v1';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Auth storage read error", e);
    }
    return DEMO_USERS.student;
  });

  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } catch (e) {
      console.error("Auth storage save error", e);
    }
  }, [currentUser]);

  const login = (email, password, role = "student") => {
    if (role === "admin" || email.toLowerCase().includes("admin")) {
      setCurrentUser({ ...DEMO_USERS.admin, email: email || DEMO_USERS.admin.email });
      return { success: true, role: "admin" };
    }
    setCurrentUser({
      ...DEMO_USERS.student,
      email: email || DEMO_USERS.student.email,
      name: email ? email.split('@')[0].replace('.', ' ') : DEMO_USERS.student.name
    });
    return { success: true, role: "student" };
  };

  const register = (userData) => {
    const newUser = {
      id: `USR-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || "student",
      studentId: userData.studentId || `STD-${Math.floor(1000 + Math.random() * 9000)}`,
      department: userData.department || "General Engineering",
      phone: userData.phone || "+1 (555) 000-0000",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name)}`,
      campusLocation: userData.location || "Campus Hall"
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(DEMO_USERS.student);
  };

  const switchRole = (role) => {
    if (role === "admin") {
      setCurrentUser(DEMO_USERS.admin);
    } else {
      setCurrentUser(DEMO_USERS.student);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        switchRole,
        isAdmin: currentUser?.role === "admin"
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
