import Link from "next/link";
import "@/app/components/index.css";

export const metadata = {
  title: "Quản lý Bệnh nhân - EMR Hospital",
  description: "Danh sách và quản lý thông tin bệnh nhân",
};

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  email: string;
  medicalHistory: string;
}

async function getPatients(): Promise<Patient[]> {
  // SSR: Fetch data at build time / request time
  const patients = await import("@/data/patients.json").then((m) => m.default);
  return patients;
}

export default async function PatientsPage() {
  const patients = await getPatients();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">👥 Patients</h1>
        <p className="text-gray-600 mt-2">Quản lý thông tin bệnh nhân</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên Bệnh nhân</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tuổi</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Giới tính</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Số điện thoại</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Địa chỉ</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{patient.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.age}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.gender}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600 truncate">{patient.address}</td>
                <td className="px-6 py-4 text-sm">
                  <Link
                    href={`/dashboard/medical-records/${patient.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    View Records
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>ℹ️ SSR Implementation:</strong> This patient list is fetched server-side during page render. Data is fresh and optimized for SEO.
        </p>
      </div>
    </div>
  );
}
