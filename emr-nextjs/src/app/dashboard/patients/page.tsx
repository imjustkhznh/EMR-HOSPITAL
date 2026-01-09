'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

interface Patient {
  _id?: string;
  id?: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  email: string;
  medicalHistory?: string;
  dateOfBirth?: string;
}

const ITEMS_PER_PAGE = 10;

export default function PatientsPage() {
  // State quản lý dữ liệu
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
        const response = await fetch(`${backendUrl}/patients`);
        if (!response.ok) throw new Error('Failed to fetch patients');
        const data = await response.json();
        
        // Transform backend data to match frontend interface
        const transformedData = Array.isArray(data) ? data.map((patient: any) => {
          // Calculate age from DOB if age not provided
          let age = patient.age || 0;
          if (!age && patient.dob) {
            const dob = new Date(patient.dob);
            const today = new Date();
            age = today.getFullYear() - dob.getFullYear() - 
              (today.getMonth() < dob.getMonth() || 
               (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate()) ? 1 : 0);
          }
          
          // Convert gender format
          let gender = patient.gender || 'Unknown';
          if (gender === 'male' || gender === 'Male') gender = 'Nam';
          if (gender === 'female' || gender === 'Female') gender = 'Nữ';
          
          // Convert medicalHistory to string
          let medicalHistory = 'Không';
          if (patient.medicalHistory) {
            if (Array.isArray(patient.medicalHistory)) {
              medicalHistory = patient.medicalHistory.length > 0 ? patient.medicalHistory.join(', ') : 'Không';
            } else if (typeof patient.medicalHistory === 'string') {
              medicalHistory = patient.medicalHistory;
            }
          }
          
          return {
            id: patient._id || patient.id,
            name: patient.fullName || patient.name || 'N/A',
            age: age,
            gender: gender,
            phone: patient.phone || 'N/A',
            address: patient.address || 'N/A',
            email: patient.email || 'N/A',
            medicalHistory: medicalHistory,
          };
        }) : [];
        
        setAllPatients(transformedData);
        setError('');
      } catch (err) {
        console.error('Error:', err);
        setError('Không thể tải dữ liệu bệnh nhân');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Fallback data (nếu API không hoạt động)
  const fallbackPatients: Patient[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      age: 45,
      gender: 'Nam',
      phone: '0901234567',
      address: 'Hà Nội',
      email: 'a@example.com',
      medicalHistory: 'Tiểu đường',
    },
    {
      id: '2',
      name: 'Trần Thị B',
      age: 32,
      gender: 'Nữ',
      phone: '0987654321',
      address: 'TP.HCM',
      email: 'b@example.com',
      medicalHistory: 'Huyết áp cao',
    },
    {
      id: '3',
      name: 'Lê Văn C',
      age: 28,
      gender: 'Nam',
      phone: '0912345678',
      address: 'Đà Nẵng',
      email: 'c@example.com',
      medicalHistory: 'Không',
    },
    {
      id: '4',
      name: 'Phạm Thị D',
      age: 55,
      gender: 'Nữ',
      phone: '0923456789',
      address: 'Hà Nội',
      email: 'd@example.com',
      medicalHistory: 'Tim mạch',
    },
    {
      id: '5',
      name: 'Hoàng Văn E',
      age: 38,
      gender: 'Nam',
      phone: '0934567890',
      address: 'TP.HCM',
      email: 'e@example.com',
      medicalHistory: 'Xương khớp',
    },
    {
      id: '6',
      name: 'Dương Thị F',
      age: 42,
      gender: 'Nữ',
      phone: '0945678901',
      address: 'Hải Phòng',
      email: 'f@example.com',
      medicalHistory: 'Dị ứng',
    },
    {
      id: '7',
      name: 'Bùi Văn G',
      age: 51,
      gender: 'Nam',
      phone: '0956789012',
      address: 'Hà Nội',
      email: 'g@example.com',
      medicalHistory: 'Thận',
    },
    {
      id: '8',
      name: 'Vũ Thị H',
      age: 35,
      gender: 'Nữ',
      phone: '0967890123',
      address: 'TP.HCM',
      email: 'h@example.com',
      medicalHistory: 'Phổi',
    },
  ];

  // Display data: use fetched data if available, otherwise fallback
  const displayPatients = allPatients.length > 0 ? allPatients : fallbackPatients;

  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [ageRangeFilter, setAgeRangeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  // Filter and search logic
  const filteredPatients = useMemo(() => {
    return displayPatients.filter((patient) => {
      const matchSearch =
        (patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (patient.phone?.includes(searchTerm) ?? false) ||
        (patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

      const matchGender = genderFilter === '' || patient.gender === genderFilter;

      let matchAgeRange = true;
      if (ageRangeFilter !== '') {
        const [min, max] = ageRangeFilter.split('-').map(Number);
        matchAgeRange = patient.age >= min && patient.age <= max;
      }

      return matchSearch && matchGender && matchAgeRange;
    });
  }, [searchTerm, genderFilter, ageRangeFilter, displayPatients]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  // Statistics
  const stats = {
    total: displayPatients.length,
    male: displayPatients.filter((p) => p.gender === 'Nam').length,
    female: displayPatients.filter((p) => p.gender === 'Nữ').length,
    active: displayPatients.filter((p) => p.medicalHistory === 'Không').length,
  };

  const handleExport = () => {
    const csv = [
      ['Tên', 'Tuổi', 'Giới tính', 'Số điện thoại', 'Địa chỉ', 'Email', 'Lịch sử bệnh'],
      ...filteredPatients.map((p) => [
        p.name,
        p.age,
        p.gender,
        p.phone,
        p.address,
        p.email,
        p.medicalHistory,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patients_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            ⚠️ {error}
          </div>
        </div>
      )}

      {/* Main content */}
      {!loading && (
        <>
          {/* Stats Cards */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
                <p className="text-gray-600 text-sm font-medium">Tổng Bệnh Nhân</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-gray-500 text-xs mt-2">👥 Tất cả bệnh nhân</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm font-medium">Nam</p>
                <p className="text-3xl font-bold text-gray-900">{stats.male}</p>
                <p className="text-gray-500 text-xs mt-2">👨 {stats.total > 0 ? Math.round((stats.male / stats.total) * 100) : 0}%</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-pink-500">
                <p className="text-gray-600 text-sm font-medium">Nữ</p>
                <p className="text-3xl font-bold text-gray-900">{stats.female}</p>
                <p className="text-gray-500 text-xs mt-2">👩 {stats.total > 0 ? Math.round((stats.female / stats.total) * 100) : 0}%</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                <p className="text-gray-600 text-sm font-medium">Khỏe Mạnh</p>
                <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
                <p className="text-gray-500 text-xs mt-2">✓ Không có bệnh</p>
              </div>
            </div>

            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-3xl font-bold text-gray-900">📋 Danh Sách Bệnh Nhân</h1>
              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                >
                  📥 Export CSV
                </button>
                <Link href="/dashboard/patients/add" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  + Thêm Bệnh Nhân
                </Link>
              </div>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Search & Filters */}
              <div className="p-6 border-b border-gray-200 space-y-4">
                {/* Search */}
                <div>
                  <input
                    type="text"
                    placeholder="🔍 Tìm kiếm theo tên, SĐT hoặc email..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={genderFilter}
                    onChange={(e) => {
                      setGenderFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">📋 Tất cả Giới tính</option>
                    <option value="Nam">👨 Nam</option>
                    <option value="Nữ">👩 Nữ</option>
                  </select>

                  <select
                    value={ageRangeFilter}
                    onChange={(e) => {
                      setAgeRangeFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">📅 Tất cả Tuổi</option>
                    <option value="0-18">0-18 tuổi</option>
                    <option value="18-30">18-30 tuổi</option>
                    <option value="30-50">30-50 tuổi</option>
                    <option value="50-100">50+ tuổi</option>
                  </select>

                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={10}>📊 10/trang</option>
                    <option value={20}>📊 20/trang</option>
                    <option value={50}>📊 50/trang</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tên Bệnh Nhân</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tuổi</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Giới Tính</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Số ĐT</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Địa Chỉ</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedPatients.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                          Không tìm thấy bệnh nhân nào
                        </td>
                      </tr>
                    ) : (
                      paginatedPatients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-blue-50 transition">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                {patient.name.charAt(0)}
                              </div>
                              <span className="font-semibold text-gray-900">{patient.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{patient.age}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              patient.gender === 'Nam'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-pink-100 text-pink-800'
                            }`}>
                              {patient.gender === 'Nam' ? '👨 Nam' : '👩 Nữ'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{patient.phone}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{patient.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 truncate">{patient.address}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-1">
                              <Link
                                href={`/dashboard/patients/${patient.id}`}
                                className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                              >
                                👁️ Xem
                              </Link>
                              <Link
                                href={`/dashboard/patients/edit/${patient.id}`}
                                className="px-2 py-1 text-xs bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
                              >
                                ✏️ Sửa
                              </Link>
                              <Link
                                href={`/dashboard/appointments/new?patientId=${patient.id}`}
                                className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded hover:bg-green-200"
                              >
                                📅 Khám
                              </Link>
                              <Link
                                href={`/dashboard/lab-tests/new?patientId=${patient.id}`}
                                className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded hover:bg-purple-200"
                              >
                                🔬 Xét
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gray-50">
                <p className="text-sm text-gray-600">
                  Hiển thị {startIndex + 1} đến {Math.min(endIndex, filteredPatients.length)} của {filteredPatients.length} bệnh nhân
                </p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Trước
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                    .map((page, idx, arr) => (
                      <div key={page}>
                        {idx > 0 && arr[idx - 1] !== page - 1 && <span className="px-2 py-2">...</span>}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 text-sm rounded-lg transition ${
                            currentPage === page
                              ? 'bg-blue-600 text-white border border-blue-600'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Tiếp →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

