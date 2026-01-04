import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Bác sĩ",
  description: "Danh sách và quản lý thông tin chi tiết bác sĩ trong hệ thống EMR. Xem chuyên khoa, lịch làm việc và thông tin liên lạc",
  keywords: ["doctors", "bác sĩ", "medical staff", "doctors list"],
  openGraph: {
    title: "Quản lý Bác sĩ - EMR Hospital",
    description: "Danh sách và quản lý thông tin chi tiết bác sĩ trong hệ thống EMR",
    type: "website",
  },
};

export default function DoctorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🩺 Doctors</h1>
        <p className="text-gray-600 mt-2">Quản lý thông tin bác sĩ</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <p className="text-gray-500">Tính năng quản lý bác sĩ sẽ được cập nhật sau.</p>
      </div>
    </div>
  );
}
