'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LabTest {
  _id: string;
  patientId: string;
  testName: string;
  testType: string;
  status: string;
  result: string;
  resultDate: string;
}

export default function LabTestsPage() {
  const [tests, setTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('/api/lab-tests');
        if (!response.ok) throw new Error('Failed to fetch lab tests');
        const data = await response.json();
        setTests(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">🔬 Xét Nghiệm</h1>
          <Link
            href="/dashboard/lab-tests/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Yêu Cầu Xét Nghiệm
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Bệnh nhân</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Tên Xét Nghiệm</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Loại</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Trạng thái</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Kết quả</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Không có xét nghiệm nào
                  </td>
                </tr>
              ) : (
                tests.map((test) => (
                  <tr key={test._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{test.patientId}</td>
                    <td className="px-6 py-4">{test.testName}</td>
                    <td className="px-6 py-4">{test.testType}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        test.status === 'requested' ? 'bg-yellow-100 text-yellow-800' :
                        test.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        test.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {test.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{test.result || '-'}</td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/lab-tests/${test._id}`}
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
