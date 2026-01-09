import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    // TODO: Gọi API đăng ký
    // Giả lập đăng ký thành công
    router.push("/auth/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Đăng ký tài khoản</h2>
        <label className="block mb-2">Tên đăng nhập</label>
        <input
          className="w-full border px-3 py-2 mb-4 rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label className="block mb-2">Mật khẩu</label>
        <input
          type="password"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label className="block mb-2">Xác nhận mật khẩu</label>
        <input
          type="password"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold">Đăng ký</button>
        <div className="mt-4 text-sm text-center">
          Đã có tài khoản? <a href="/auth/login" className="text-blue-600">Đăng nhập</a>
        </div>
      </form>
    </div>
  );
}
