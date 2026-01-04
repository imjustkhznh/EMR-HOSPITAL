import Link from "next/link";
import type { ReactNode } from "react";

// Dashboard layout - Server Component
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const menuItems = [
    { label: "Dashboard", href: "/dashboard/dashboard" },
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
        <LogoutSection />
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

// Logout button as separate client component
function LogoutSection() {
  "use client";
  
  const handleLogout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    
    // Clear auth cookie
    document.cookie = "authToken=; path=/; max-age=0";
    
    // Redirect to login
    window.location.href = "/auth/login";
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <button
        onClick={handleLogout}
        className="w-full text-left hover:text-blue-600 transition font-medium text-sm px-4 py-3 rounded-lg hover:bg-gray-100"
      >
        Admin <span className="text-xs text-gray-400">(Logout)</span>
      </button>
    </div>
  );
}
