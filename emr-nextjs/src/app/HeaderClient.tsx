
"use client";
import { useState, useRef, useEffect } from "react";

export default function HeaderClient() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUserEmail(typeof window !== "undefined" ? localStorage.getItem("userEmail") : null);
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-blue-600">📋</div>
            <h1 className="text-2xl font-bold text-gray-900">EMR Hospital</h1>
          </div>
          <nav className="text-sm text-gray-600 relative" ref={dropdownRef}>
            <button
              className="hover:text-blue-600 transition flex items-center gap-1 font-medium focus:outline-none"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              Admin
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="font-semibold text-gray-900">Admin</div>
                  <div className="text-xs text-gray-500 truncate">{userEmail || "admin@example.com"}</div>
                </div>
                <button
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition text-sm text-red-600 font-medium rounded-b-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}