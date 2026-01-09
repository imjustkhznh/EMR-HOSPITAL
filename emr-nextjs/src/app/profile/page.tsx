"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  // Giả lập lấy thông tin user từ localStorage (hoặc fetch từ API thực tế)
  const [user, setUser] = useState({ username: "", email: "", role: "" });

  useEffect(() => {
    // Lấy thông tin user từ localStorage (hoặc thay bằng API call)
    const username = localStorage.getItem("username") || "";
    // Nếu bạn lưu email/role ở localStorage thì lấy ra, nếu không thì để trống hoặc fetch từ backend
    const email = localStorage.getItem("email") || "admin@example.com";
    const role = localStorage.getItem("role") || "admin";
    setUser({ username, email, role });
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Thông tin người dùng</h1>
      <div className="space-y-4">
        <div>
          <span className="font-semibold text-gray-700">Tên đăng nhập: </span>
          <span>{user.username}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Email: </span>
          <span>{user.email}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Quyền: </span>
          <span>{user.role}</span>
        </div>
      </div>
    </div>
  );
}
