'use client';

import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <article className="max-w-md w-full text-center">
        <div className="text-6xl mb-4" aria-label="Warning icon">⚠️</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Đã có lỗi xảy ra</h1>
        <p className="text-gray-600 mb-4">
          Xin lỗi, đã có lỗi không mong muốn. Vui lòng thử lại hoặc quay lại trang chủ.
        </p>
        {error.message && (
          <p className="text-sm text-red-600 mb-6 p-4 bg-red-50 rounded-lg break-words">
            {error.message}
          </p>
        )}
        <nav className="flex gap-4 flex-col sm:flex-row">
          <button
            onClick={() => reset()}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="flex-1 px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Về trang chủ
          </Link>
        </nav>
      </article>
    </main>
  );
}
