
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


import HeaderClient from "./HeaderClient";

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
          <HeaderClient />

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
