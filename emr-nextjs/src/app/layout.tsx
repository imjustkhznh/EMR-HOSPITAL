import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EMR Hospital - Quản lý Bệnh nhân",
  description: "Electronic Medical Records System - Hệ thống quản lý bệnh nhân chuyên nghiệp",
  openGraph: {
    title: "EMR Hospital",
    description: "Electronic Medical Records System",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-full mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-blue-600">📋</div>
                  <h1 className="text-2xl font-bold text-gray-900">EMR Hospital</h1>
                </div>
                <nav className="text-sm text-gray-600">
                  <a href="#" className="hover:text-blue-600 transition">Admin</a>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-full mx-auto px-6 py-8 text-center text-sm text-gray-600">
              <p>&copy; 2025 EMR Hospital System. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
