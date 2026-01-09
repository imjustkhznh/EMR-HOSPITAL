'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Giả lập dữ liệu, thực tế sẽ lấy từ API
const mockPatient = {
  id: "1",
  name: "Nguyễn Văn A",
  dob: "1990-01-01",
  gender: "Nam",
  address: "Hà Nội",
  phone: "0123456789",
};

export default function EditPatientPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "Nam",
    address: "",
    phone: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // TODO: Gọi API lấy thông tin bệnh nhân theo params.id
    setForm({
      name: mockPatient.name,
      dob: mockPatient.dob,
      gender: mockPatient.gender,
      address: mockPatient.address,
      phone: mockPatient.phone,
    });
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.dob || !form.address || !form.phone) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    // TODO: Gọi API cập nhật bệnh nhân
    router.push(`/dashboard/patients/${params.id}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa thông tin bệnh nhân</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Họ tên</label>
        <input className="w-full border px-3 py-2 mb-4 rounded" name="name" value={form.name} onChange={handleChange} />
        <label className="block mb-2">Ngày sinh</label>
        <input type="date" className="w-full border px-3 py-2 mb-4 rounded" name="dob" value={form.dob} onChange={handleChange} />
        <label className="block mb-2">Giới tính</label>
        <select className="w-full border px-3 py-2 mb-4 rounded" name="gender" value={form.gender} onChange={handleChange}>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
        <label className="block mb-2">Địa chỉ</label>
        <input className="w-full border px-3 py-2 mb-4 rounded" name="address" value={form.address} onChange={handleChange} />
        <label className="block mb-2">Số điện thoại</label>
        <input className="w-full border px-3 py-2 mb-4 rounded" name="phone" value={form.phone} onChange={handleChange} />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold">Lưu thay đổi</button>
        <div className="mt-4 text-sm text-center">
          <a href={`/dashboard/patients/${params.id}`} className="text-blue-600">Quay lại chi tiết</a>
        </div>
      </form>
    </div>
  );
}
