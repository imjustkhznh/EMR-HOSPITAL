import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <article className="max-w-md w-full text-center">
        <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Không tìm thấy trang</h2>
        <p className="text-gray-600 mb-8">
          Xin lỗi, trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <nav className="flex gap-4 flex-col sm:flex-row">
          <Link
            href="/"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Về trang chủ
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Đi đến Dashboard
          </Link>
        </nav>
      </article>
    </main>
  );
}
