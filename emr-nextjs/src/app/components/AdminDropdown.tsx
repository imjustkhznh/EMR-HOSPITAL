'use client';

import { useState, useRef, useEffect } from 'react';

export function AdminDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUserEmail(
      typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null
    );

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
  };

  return (
    <div className="p-4 border-t border-gray-200" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition font-medium text-sm text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <span>Admin</span>
          <svg
            className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <div
            className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            role="menu"
          >
            <button
              onClick={() => { window.location.href = '/profile'; }}
              className="w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-blue-50 transition rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              role="menuitem"
            >
              <div className="font-semibold text-gray-900 text-sm">Admin</div>
              <div className="text-xs text-gray-500 truncate">
                {userEmail || 'admin@example.com'}
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 hover:bg-red-50 transition text-sm text-red-600 font-medium rounded-b-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              role="menuitem"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
