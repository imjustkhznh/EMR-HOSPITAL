'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BillingRecord {
  _id: string;
  patientId: string;
  invoiceNumber: string;
  amount: number;
  paidAmount: number;
  status: string;
  dueDate: string;
  paidDate: string;
}

export default function BillingPage() {
  const [billings, setBillings] = useState<BillingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBillings = async () => {
      try {
        const response = await fetch('/api/billing');
        if (!response.ok) throw new Error('Failed to fetch billings');
        const data = await response.json();
        setBillings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBillings();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  const totalAmount = billings.reduce((sum, b) => sum + b.amount, 0);
  const totalPaid = billings.reduce((sum, b) => sum + b.paidAmount, 0);
  const unpaidBillings = billings.filter(b => b.status !== 'paid').length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">💳 Thanh Toán / Hóa Đơn</h1>
          <Link
            href="/dashboard/billing/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Tạo Hóa Đơn
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Tổng Tiền</p>
            <p className="text-2xl font-bold text-gray-900">{totalAmount.toLocaleString('vi-VN')} đ</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Đã Thanh Toán</p>
            <p className="text-2xl font-bold text-green-600">{totalPaid.toLocaleString('vi-VN')} đ</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Chưa Thanh Toán</p>
            <p className="text-2xl font-bold text-red-600">{unpaidBillings} hóa đơn</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Số Hóa Đơn</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Bệnh nhân</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Tổng Tiền</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Đã Trả</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Trạng thái</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Hạn Thanh Toán</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {billings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    Không có hóa đơn nào
                  </td>
                </tr>
              ) : (
                billings.map((bill) => (
                  <tr key={bill._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{bill.invoiceNumber}</td>
                    <td className="px-6 py-4">{bill.patientId}</td>
                    <td className="px-6 py-4">{bill.amount.toLocaleString('vi-VN')} đ</td>
                    <td className="px-6 py-4">{bill.paidAmount.toLocaleString('vi-VN')} đ</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        bill.status === 'paid' ? 'bg-green-100 text-green-800' :
                        bill.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        bill.status === 'partially_paid' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {bill.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(bill.dueDate).toLocaleDateString('vi-VN')}</td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/billing/${bill._id}`}
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
