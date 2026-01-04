"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Get user email from localStorage
    const email = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    
    // Clear auth cookie
    document.cookie = "authToken=; path=/; max-age=0";
    
    // Redirect to login
    router.push("/auth/login");
  };

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/dashboard" },
    { label: "Patients", href: "/dashboard/patients" },
    { label: "Medical Records", href: "/dashboard/medical-records" },
    { label: "Doctors", href: "/dashboard/doctors" },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-gray-900 transition-all duration-300 border-r border-gray-200 flex flex-col">
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
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="hover:text-blue-600 transition font-medium text-sm flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Admin <span className="text-xs text-gray-400">(Logout)</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white">
        <div className="p-8 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
