"use client";
import PatientList from "@/app/components/PatientList";
import "@/app/components/index.css";

export const metadata = {
  title: "Quản lý Bệnh nhân - EMR Hospital",
  description: "Danh sách và quản lý thông tin bệnh nhân",
};

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">👥 Patients</h1>
        <p className="text-gray-600 mt-2">Quản lý thông tin bệnh nhân</p>
      </div>

      <PatientList />
    </div>
  );
}
