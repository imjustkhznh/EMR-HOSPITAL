"use client";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "Tổng Bệnh nhân", value: "1,234", icon: "👥", color: "bg-blue-500" },
    { label: "Lịch hẹn hôm nay", value: "12", icon: "📅", color: "bg-green-500" },
    { label: "Hồ sơ bệnh án", value: "5,678", icon: "📋", color: "bg-purple-500" },
    { label: "Bác sĩ", value: "45", icon: "👨‍⚕️", color: "bg-orange-500" },
  ];

  const upcomingAppointments = [
    { id: 1, patientName: "Nguyễn Văn A", time: "09:00", doctor: "Dr. Trần" },
    { id: 2, patientName: "Phạm Thị B", time: "10:30", doctor: "Dr. Lê" },
    { id: 3, patientName: "Lý Văn C", time: "14:00", doctor: "Dr. Vũ" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">📊 Dashboard</h1>
        <p className="text-gray-600 mt-2">Tổng quan hệ thống EMR Hospital</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Lịch hẹn hôm nay</h2>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div>
                <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                <p className="text-sm text-gray-600">Bác sĩ: {appointment.doctor}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-blue-600">{appointment.time}</p>
                <Link
                  href={`/dashboard/medical-records/${appointment.id}`}
                  className="text-sm text-blue-500 hover:text-blue-700 transition mt-1"
                >
                  Xem hồ sơ →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">⚡ Hành động nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/patients"
            className="bg-white/20 hover:bg-white/30 backdrop-blur transition px-6 py-3 rounded-lg font-semibold text-center"
          >
            Xem danh sách bệnh nhân
          </Link>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur transition px-6 py-3 rounded-lg font-semibold">
            Thêm bệnh nhân mới
          </button>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur transition px-6 py-3 rounded-lg font-semibold">
            Báo cáo hôm nay
          </button>
        </div>
      </div>
    </div>
  );
}
