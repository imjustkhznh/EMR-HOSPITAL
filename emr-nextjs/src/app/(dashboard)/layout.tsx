"use client";
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: "📊 Dashboard", href: "/dashboard" },
    { label: "👥 Patients", href: "/dashboard/patients" },
    { label: "🏥 Doctors", href: "/dashboard/doctors" },
    { label: "📋 Medical Records", href: "/dashboard/records" },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 border-r border-gray-800`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-lg font-bold">Menu</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="mt-6 space-y-2 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition text-sm font-medium"
            >
              {sidebarOpen ? item.label : item.label.split(" ")[0]}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
