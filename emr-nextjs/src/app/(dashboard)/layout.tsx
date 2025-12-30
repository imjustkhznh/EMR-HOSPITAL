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
    // Clear auth data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    
    // Redirect to login
    router.push("/login");
  };

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/dashboard" },
    { label: "Patients", href: "/dashboard/patients" },
    { label: "Medical Records", href: "/dashboard/medical-records" },
    { label: "Doctors", href: "/dashboard/doctors" },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {process.env.NEXT_PUBLIC_APP_NAME || "EMR Hospital"}
        </h1>
        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="text-sm text-gray-600">{userEmail}</span>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white text-gray-900 transition-all duration-300 border-r border-gray-200">
          <div className="p-4 flex items-center">
            <h2 className="text-lg font-bold">Menu</h2>
          </div>
          <nav className="mt-6 space-y-2 px-3">
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-white">
          <div className="p-8 min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
