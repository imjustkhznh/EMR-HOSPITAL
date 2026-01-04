import Link from "next/link";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import LogoutButton from "../components/LogoutButton";

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
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-gray-900 transition-all duration-300 border-r border-gray-200 flex flex-col overflow-y-auto">
        <div className="p-4 flex items-center">
          <h2 className="text-lg font-bold">Menu</h2>
        </div>
        <nav className="mt-6 space-y-2 px-3 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
