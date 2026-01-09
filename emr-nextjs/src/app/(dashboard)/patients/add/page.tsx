import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPatientPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "Nam",
    address: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.dob || !form.address || !form.phone) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    // TODO: Gọi API tạo bệnh nhân mới
    router.push("/dashboard/patients");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Thêm bệnh nhân mới</h1>
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
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold">Thêm bệnh nhân</button>
        <div className="mt-4 text-sm text-center">
          <a href="/dashboard/patients" className="text-blue-600">Quay lại danh sách</a>
        </div>
      </form>
    </div>
  );
}
