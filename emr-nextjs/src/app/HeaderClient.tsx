
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
            <h1 className="text-2xl font-bold text-gray-900">EMR Hospital</h1>
          </div>
          <nav className="text-sm text-gray-600 relative" ref={dropdownRef}>
            {/* Đã xóa dropdown user ở header, chỉ dùng dropdown đã sửa trước đó */}
          </nav>
        </div>
      </div>
    </header>
  );
}