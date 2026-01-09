'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewLabTestPage() {
  const [formData, setFormData] = useState({
    patientId: '',
    requestedBy: '',
    testName: '',
    testType: '',
    description: '',
    normalRange: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/lab-tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create lab test');
      setSuccess(true);
      setTimeout(() => window.location.href = '/dashboard/lab-tests', 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Yêu Cầu Xét Nghiệm Mới</h1>

        {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">Tạo yêu cầu xét nghiệm thành công!</div>}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mã Bệnh Nhân</label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Yêu Cầu Từ (Bác Sĩ ID)</label>
            <input
              type="text"
              name="requestedBy"
              value={formData.requestedBy}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tên Xét Nghiệm</label>
            <input
              type="text"
              name="testName"
              value={formData.testName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Loại Xét Nghiệm</label>
            <input
              type="text"
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mô Tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Giá Trị Bình Thường</label>
            <input
              type="text"
              name="normalRange"
              value={formData.normalRange}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Tạo Yêu Cầu'}
            </button>
            <Link
              href="/dashboard/lab-tests"
              className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 text-center"
            >
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
