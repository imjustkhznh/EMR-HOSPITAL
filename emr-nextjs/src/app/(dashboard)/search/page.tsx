// Trang tìm kiếm/lọc hồ sơ
import { useState } from "react";
import Link from "next/link";

// Giả lập dữ liệu bệnh nhân
const mockPatients = [
  { id: "1", name: "Nguyễn Văn A", dob: "1990-01-01" },
  { id: "2", name: "Phạm Thị B", dob: "1985-05-10" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = mockPatients.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Tìm kiếm hồ sơ bệnh nhân</h1>
      <input
        className="w-full border px-3 py-2 mb-4 rounded"
        placeholder="Nhập tên bệnh nhân..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul>
        {results.map(p => (
          <li key={p.id} className="mb-2">
            <Link href={`/dashboard/patients/${p.id}`} className="text-blue-600">{p.name} ({p.dob})</Link>
          </li>
        ))}
        {results.length === 0 && <li>Không tìm thấy bệnh nhân phù hợp.</li>}
      </ul>
      <div className="mt-4">
        <Link href="/dashboard" className="text-blue-600">Quay lại Dashboard</Link>
      </div>
    </div>
  );
}
