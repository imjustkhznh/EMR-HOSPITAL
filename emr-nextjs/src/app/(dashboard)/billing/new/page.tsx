'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BillingItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function NewBillingPage() {
  const [formData, setFormData] = useState({
    patientId: '',
    amount: 0,
    paymentMethod: 'cash',
    dueDate: '',
    notes: '',
  });
  const [items, setItems] = useState<BillingItem[]>([
    { description: '', quantity: 1, unitPrice: 0, total: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'amount' ? parseFloat(value) : value 
    }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = field === 'description' ? value : parseFloat(value);
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }
    setItems(newItems);

    const totalAmount = newItems.reduce((sum, item) => sum + item.total, 0);
    setFormData(prev => ({ ...prev, amount: totalAmount }));
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    const totalAmount = newItems.reduce((sum, item) => sum + item.total, 0);
    setFormData(prev => ({ ...prev, amount: totalAmount }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, items }),
      });

      if (!response.ok) throw new Error('Failed to create billing');
      setSuccess(true);
      setTimeout(() => window.location.href = '/dashboard/billing', 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Tạo Hóa Đơn Mới</h1>

        {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">Tạo hóa đơn thành công!</div>}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-gray-700">Hạn Thanh Toán</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Chi Tiết Hóa Đơn</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Mô Tả</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Số Lượng</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Đơn Giá</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Thành Tiền</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                          required
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                          min="1"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        {item.total.toLocaleString('vi-VN')} đ
                      </td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-2 px-3 py-1 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
            >
              + Thêm Dòng
            </button>
          </div>

          {/* Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-end mb-4">
              <div className="text-right">
                <p className="text-gray-600">Tổng Tiền:</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formData.amount.toLocaleString('vi-VN')} đ
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method & Notes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phương Thức Thanh Toán</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="cash">Tiền Mặt</option>
                <option value="card">Thẻ</option>
                <option value="transfer">Chuyển Khoản</option>
                <option value="insurance">Bảo Hiểm</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ghi Chú</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                rows={2}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Tạo Hóa Đơn'}
            </button>
            <Link
              href="/dashboard/billing"
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
