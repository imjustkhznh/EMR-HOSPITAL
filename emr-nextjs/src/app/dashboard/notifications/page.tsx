// Trang thông báo
import Link from "next/link";

// Giả lập dữ liệu thông báo
const mockNotifications = [
  { id: 1, message: "Bạn có lịch khám vào ngày 10/01/2026.", date: "2026-01-08" },
  { id: 2, message: "Đơn thuốc mới đã được cập nhật.", date: "2026-01-07" },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Thông báo</h1>
      <ul className="mb-4">
        {mockNotifications.map(n => (
          <li key={n.id} className="mb-2">
            <div className="font-semibold">{n.message}</div>
            <div className="text-gray-500 text-sm">{n.date}</div>
          </li>
        ))}
        {mockNotifications.length === 0 && <li>Không có thông báo nào.</li>}
      </ul>
      <Link href="/dashboard" className="text-blue-600">Quay lại Dashboard</Link>
    </div>
  );
}
