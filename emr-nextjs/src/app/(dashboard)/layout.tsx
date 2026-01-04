import Link from "next/link";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Breadcrumb } from "../components/Breadcrumb";
import { AdminDropdown } from "../components/AdminDropdown";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | EMR Hospital",
    template: "%s | EMR Hospital",
  },
  description: "Hospital Dashboard - Quản lý bệnh nhân, hồ sơ y tế, và thông tin bác sĩ",
};

// Dashboard layout - Server Component
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const menuItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Patients", href: "/dashboard/patients" },
    { label: "Medical Records", href: "/dashboard/medical-records" },
    { label: "Doctors", href: "/dashboard/doctors" },
  ];

  return (
    <div className="flex h-screen flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white text-gray-900 transition-all duration-300 border-b md:border-r border-gray-200 flex flex-col overflow-y-auto shadow-sm">
        <nav className="mt-8 space-y-2 px-4 flex-1">
          {menuItems.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-5 py-3 rounded-lg hover:bg-blue-50 transition text-sm font-semibold text-gray-700 hover:text-blue-600 border-l-4 border-transparent hover:border-blue-600 hover:pl-4"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <AdminDropdown />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50 flex flex-col">
        <Breadcrumb />
        <div className="p-4 md:p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
