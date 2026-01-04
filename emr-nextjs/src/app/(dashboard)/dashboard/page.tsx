"use client";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | EMR Hospital",
  description: "Hospital Dashboard - Tổng quan hệ thống EMR",
};

export default function DashboardPage() {
  const stats = [
    { label: "Tổng Bệnh nhân", value: "1,234", icon: "👥", color: "from-blue-500 to-blue-600", textColor: "text-blue-600" },
    { label: "Lịch hẹn hôm nay", value: "12", icon: "📅", color: "from-green-500 to-green-600", textColor: "text-green-600" },
    { label: "Hồ sơ bệnh án", value: "5,678", icon: "📋", color: "from-purple-500 to-purple-600", textColor: "text-purple-600" },
    { label: "Bác sĩ", value: "45", icon: "👨‍⚕️", color: "from-orange-500 to-orange-600", textColor: "text-orange-600" },
  ];

  const upcomingAppointments = [
    { id: 1, patientName: "Nguyễn Văn A", time: "09:00", doctor: "Dr. Trần", status: "Chờ xác nhận" },
    { id: 2, patientName: "Phạm Thị B", time: "10:30", doctor: "Dr. Lê", status: "Đã xác nhận" },
    { id: 3, patientName: "Lý Văn C", time: "14:00", doctor: "Dr. Vũ", status: "Chờ xác nhận" },
  ];

  const quickStats = [
    { label: "Bệnh nhân mới", value: "+23", trend: "up" },
    { label: "Tỉ lệ khám", value: "92%", trend: "up" },
    { label: "Dung lượng còn lại", value: "45%", trend: "down" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-5xl">📊</span> Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Chào mừng trở lại! Dưới đây là tóm tắt hệ thống của bạn.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition">
              Xuất báo cáo
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              + Thêm mới
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden"
          >
            <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className={`text-4xl font-bold mt-2 ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className="text-5xl opacity-70">{stat.icon}</div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600 font-semibold">↑ 12%</span>
                <span className="text-gray-500">so với tháng trước</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Upcoming Appointments - Wider */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span>📅</span> Lịch hẹn hôm nay
                </h2>
                <p className="text-gray-600 text-sm mt-1">{upcomingAppointments.length} lịch hẹn được lên lịch</p>
              </div>
              <Link href="/dashboard/patients" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                Xem tất cả →
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {appointment.patientName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-base">{appointment.patientName}</p>
                      <p className="text-sm text-gray-600">{appointment.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-lg">{appointment.time}</p>
                      <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mt-1 ${
                        appointment.status === "Đã xác nhận"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                    <Link
                      href={`/dashboard/medical-records/${appointment.id}`}
                      className="text-blue-600 hover:text-blue-700 transition font-semibold text-sm whitespace-nowrap group-hover:underline"
                    >
                      Chi tiết →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-6">
          {quickStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <div className="flex items-end justify-between mt-3">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <span className={`text-sm font-semibold ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.trend === "up" ? "↑" : "↓"} 8%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: "60%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">⚡ Hành động nhanh</h2>
        <p className="text-blue-100 mb-6">Truy cập nhanh các chức năng chính của hệ thống</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/patients"
            className="bg-white/20 hover:bg-white/30 backdrop-blur transition px-6 py-4 rounded-lg font-semibold text-center border border-white/30 hover:border-white/50"
          >
            👥 Xem danh sách bệnh nhân
          </Link>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur transition px-6 py-4 rounded-lg font-semibold border border-white/30 hover:border-white/50">
            ➕ Thêm bệnh nhân mới
          </button>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur transition px-6 py-4 rounded-lg font-semibold border border-white/30 hover:border-white/50">
            📊 Xuất báo cáo hôm nay
          </button>
        </div>
      </div>
    </div>
  );
}
