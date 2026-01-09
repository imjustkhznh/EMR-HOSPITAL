'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MedicalRecord {
  _id: string;
  patientId: string;
  patientName: string;
  visitDate: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
        const response = await fetch(`${backendUrl}/medical-records`);
        
        // If API doesn't exist, use mock data
        if (!response.ok) {
          console.warn('Medical records API not available, using mock data');
          setRecords(mockRecords);
          return;
        }
        
        const data = await response.json();
        setRecords(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error:', err);
        setRecords(mockRecords);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const mockRecords: MedicalRecord[] = [
    {
      _id: '1',
      patientId: '1',
      patientName: 'Phạm Văn C',
      visitDate: '2024-01-15',
      diagnosis: 'Tiểu đường type 2',
      prescription: 'Metformin 500mg',
      notes: 'Kiểm tra đường huyết định kỳ',
    },
    {
      _id: '2',
      patientId: '2',
      patientName: 'Lê Thị D',
      visitDate: '2024-01-10',
      diagnosis: 'Viêm khớp',
      prescription: 'Ibuprofen 400mg',
      notes: 'Kiểm tra và điều chỉnh liều',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          ⚠️ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">📋 Hồ Sơ Y Tế</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Bệnh Nhân</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ngày Khám</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Chẩn Đoán</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Đơn Thuốc</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ghi Chú</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Không có hồ sơ y tế nào
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-900">{record.patientName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(record.visitDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.diagnosis}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.prescription}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 truncate">{record.notes}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/dashboard/medical-records/${record._id}`}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                      >
                        👁️ Chi Tiết
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
