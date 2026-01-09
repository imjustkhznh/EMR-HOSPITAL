'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Appointment {
  _id: string;
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">📅 Lịch Khám</h1>
          <Link
            href="/dashboard/appointments/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Tạo Lịch Khám
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Bệnh nhân</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Ngày khám</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Giờ khám</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Lý do</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Trạng thái</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Không có lịch khám nào
                  </td>
                </tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{apt.patientId}</td>
                    <td className="px-6 py-4">{new Date(apt.appointmentDate).toLocaleDateString('vi-VN')}</td>
                    <td className="px-6 py-4">{apt.appointmentTime}</td>
                    <td className="px-6 py-4">{apt.reason}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        apt.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        apt.status === 'completed' ? 'bg-green-100 text-green-800' :
                        apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/appointments/${apt._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
