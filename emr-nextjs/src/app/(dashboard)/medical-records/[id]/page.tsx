import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Dynamic route: Each [id] is rendered on-demand with SSR
// No revalidate = fetch data per request (fully dynamic)
export const revalidate = 0;

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  email?: string;
  dateOfBirth?: string;
  medicalHistory?: string;
}

interface Visit {
  id: string;
  date: string;
  diagnosis: string;
  doctor: string;
  prescription: string;
  notes: string;
}

interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  visits: Visit[];
}

async function getMedicalRecord(id: string): Promise<MedicalRecord | null> {
  // SSR: Fetch data at request time
  try {
    const records = await import("@/data/medical-records.json").then((m) => m.default);
    return records[id as keyof typeof records] || null;
  } catch {
    return null;
  }
}

async function getPatient(id: string): Promise<Patient | null> {
  try {
    const patients = await import("@/data/patients.json").then((m) => m.default);
    return patients.find((p: Patient) => p.id === id) || null;
  } catch {
    return null;
  }
}

// Dynamic SSR with generateMetadata: Each request generates unique metadata based on patient
// Shows in browser title and SEO with patient name: "Hồ sơ bệnh án - [Tên bệnh nhân]"
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const medicalRecord = await getMedicalRecord(params.id);

  if (!medicalRecord) {
    return {
      title: "Hồ sơ không tìm thấy",
      description: "Medical record not found",
    };
  }

  return {
    title: `Hồ sơ bệnh án - ${medicalRecord.patientName}`,
    description: `Chi tiết y tế và lịch sử khám bệnh của ${medicalRecord.patientName}`,
    openGraph: {
      title: `Hồ sơ bệnh án - ${medicalRecord.patientName}`,
      description: `Chi tiết y tế của bệnh nhân`,
      type: "website",
    },
  };
}

export default async function MedicalRecordDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const medicalRecord = await getMedicalRecord(params.id);
  const patient = await getPatient(params.id);

  if (!medicalRecord || !patient) {
    return notFound();
  }

  const { visits } = medicalRecord;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/medical-records"
            className="text-blue-600 hover:text-blue-800 transition mb-4 inline-flex items-center gap-2"
          >
            ← Quay lại
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">📋 Hồ sơ bệnh án</h1>
          <p className="text-gray-600 mt-2">Chi tiết thông tin bệnh nhân và lịch sử khám</p>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">👤 Thông tin bệnh nhân</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm font-medium">Tên</p>
            <p className="text-lg font-semibold text-gray-900">{patient.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Tuổi</p>
            <p className="text-lg font-semibold text-gray-900">{patient.age} tuổi</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Giới tính</p>
            <p className="text-lg font-semibold text-gray-900">{patient.gender}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Số điện thoại</p>
            <p className="text-lg font-semibold text-gray-900">{patient.phone}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-600 text-sm font-medium">Địa chỉ</p>
            <p className="text-lg font-semibold text-gray-900">{patient.address}</p>
          </div>
          {patient.medicalHistory && (
            <div>
              <p className="text-gray-600 text-sm font-medium">Tiền sử bệnh</p>
              <p className="text-lg font-semibold text-gray-900">{patient.medicalHistory}</p>
            </div>
          )}
        </div>
      </div>

      {/* Medical Records */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Lịch sử khám</h2>
        <div className="space-y-4">
          {visits && visits.length > 0 ? (
            visits.map((visit) => (
              <div
                key={visit.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">{visit.date}</p>
                    <p className="text-xl font-bold text-gray-900">{visit.diagnosis}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {visit.doctor}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Đơn thuốc</p>
                    <p className="text-gray-900 mt-1">{visit.prescription}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Ghi chú</p>
                    <p className="text-gray-900 mt-1">{visit.notes}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Không có lịch sử khám bệnh</p>
          )}
        </div>
      </div>

      {/* SSR Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-700">
          <strong>✅ Dynamic SSR with generateMetadata:</strong> This page is rendered server-side with dynamic metadata. The title includes the patient name for better SEO.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
          ✏️ Chỉnh sửa hồ sơ
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-semibold">
          📄 In hồ sơ
        </button>
      </div>
    </div>
  );
}
