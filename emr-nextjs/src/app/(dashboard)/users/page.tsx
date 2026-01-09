// Trang quản lý người dùng
import Link from "next/link";

// Giả lập dữ liệu người dùng
const mockUsers = [
  { id: "u1", name: "Nguyễn Văn A", role: "Bệnh nhân", email: "a@example.com" },
  { id: "u2", name: "Trần Thị B", role: "Bác sĩ", email: "b@example.com" },
];

export default function UsersPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Vai trò</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/dashboard" className="text-blue-600">Quay lại Dashboard</Link>
    </div>
  );
}
