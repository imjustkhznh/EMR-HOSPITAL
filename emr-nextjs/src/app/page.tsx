import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMR Hospital - Quản lý Bệnh nhân",
  description: "Electronic Medical Records System - Hệ thống quản lý bệnh nhân chuyên nghiệp với ghi chép y tế điện tử, quản lý hồ sơ bệnh nhân và lịch sử khám bệnh",
  openGraph: {
    title: "EMR Hospital - Quản lý Bệnh nhân",
    description: "Hệ thống quản lý bệnh nhân chuyên nghiệp",
    images: ["/og-image.jpg"],
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
      <div className="max-w-2xl text-center">
        <div className="text-6xl mb-6">🏥</div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">EMR Hospital System</h1>
        <p className="text-xl text-gray-600 mb-8">
          Electronic Medical Records - Hệ thống quản lý bệnh nhân chuyên nghiệp
        </p>

        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Link
            href="/dashboard/patients"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            👥 Quản lý Bệnh nhân
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
          >
            📊 Dashboard
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600">
            Built with Next.js 14 + TypeScript + Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
