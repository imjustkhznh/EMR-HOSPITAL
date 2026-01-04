
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Main font for EMR application
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

import HeaderClient from "./HeaderClient";

export const metadata: Metadata = {
  title: {
    default: "EMR Hospital - Quản lý Bệnh nhân",
    template: "%s | EMR Hospital",
  },
  description: "Electronic Medical Records System - Hệ thống quản lý bệnh nhân chuyên nghiệp với ghi chép y tế điện tử, quản lý hồ sơ bệnh nhân và lịch sử khám bệnh",
  keywords: ["EMR", "Medical Records", "Healthcare", "Patient Management", "Bệnh nhân", "Y tế"],
  authors: [{ name: "EMR Team" }],
  creator: "EMR Hospital",
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"),
  openGraph: {
    title: "EMR Hospital - Quản lý Bệnh nhân",
    description: "Electronic Medical Records System - Hệ thống quản lý bệnh nhân chuyên nghiệp",
    type: "website",
    locale: "vi_VN",
    url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    siteName: "EMR Hospital",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EMR Hospital",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}
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
