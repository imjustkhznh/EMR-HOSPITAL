'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = {
    totalPatients: 156,
    totalAppointments: 42,
    totalDoctors: 12,
    pendingBilling: 8,
  };
  const isLoading = false;

  const statCards = [
    {
      label: 'Tổng bệnh nhân',
      value: stats.totalPatients,
      icon: '👥',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Lịch hẹn hôm nay',
      value: stats.totalAppointments,
      icon: '📅',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Bác sĩ',
      value: stats.totalDoctors,
      icon: '👨‍⚕️',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: 'Hóa đơn chưa thanh toán',
      value: stats.pendingBilling,
      icon: '💳',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Chào mừng quay trở lại hệ thống quản lý bệnh nhân điện tử</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((card) => (
            <div
              key={card.label}
              className={`${card.bgColor} rounded-lg shadow p-6 border border-gray-200`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                  <p className={`text-3xl font-bold ${card.textColor} mt-2`}>{card.value}</p>
                </div>
                <span className="text-3xl">{card.icon}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Hành động nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/dashboard/patients/new"
            className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-center"
          >
            <span className="text-2xl block mb-2">➕</span>
            <span className="text-sm font-semibold text-gray-900">Thêm bệnh nhân</span>
          </a>
          <a
            href="/dashboard/appointments"
            className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition text-center"
          >
            <span className="text-2xl block mb-2">📅</span>
            <span className="text-sm font-semibold text-gray-900">Lịch hẹn</span>
          </a>
          <a
            href="/dashboard/medical-records"
            className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition text-center"
          >
            <span className="text-2xl block mb-2">📋</span>
            <span className="text-sm font-semibold text-gray-900">Hồ sơ y tế</span>
          </a>
          <a
            href="/dashboard/billing"
            className="p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 transition text-center"
          >
            <span className="text-2xl block mb-2">💰</span>
            <span className="text-sm font-semibold text-gray-900">Thanh toán</span>
          </a>
        </div>
      </div>
    </div>
  );
}
