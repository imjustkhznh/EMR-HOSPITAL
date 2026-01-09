'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Doctor {
  _id: string;
  fullName: string;
  specialty: string;
  email: string;
  phone: string;
  department?: string;
  yearsOfExperience?: number;
  licenseNumber?: string;
  status?: 'available' | 'busy' | 'on-leave';
  workingHours?: string;
  qualifications?: string[];
  profileImage?: string;
  bio?: string;
}

const mockDoctors: Doctor[] = [];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/doctors`);
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      setDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const filteredDoctors = doctors
    .filter((doctor) => {
      const matchesSearch =
        doctor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = !filterDept || doctor.department === filterDept;
      const matchesStatus = !filterStatus || doctor.status === filterStatus;

      return matchesSearch && matchesDept && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return (a.fullName || '').localeCompare(b.fullName || '');
      } else if (sortBy === 'experience') {
        return (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0);
      }
      return 0;
    });

  const departments = Array.from(
    new Set(doctors.map((d) => d.department).filter(Boolean))
  );

  const statusColorMap: Record<string, string> = {
    available: 'bg-green-100 text-green-800',
    busy: 'bg-yellow-100 text-yellow-800',
    'on-leave': 'bg-red-100 text-red-800',
  };

  const statusLabelMap: Record<string, string> = {
    available: 'Có sẵn',
    busy: 'Đang bận',
    'on-leave': 'Đang nghỉ',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🩺 Quản lý Bác sĩ</h1>
        <p className="text-gray-600 mt-2">Danh sách và thông tin chi tiết bác sĩ trong hệ thống</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm">Tổng số bác sĩ</p>
          <p className="text-3xl font-bold text-blue-600">{doctors.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm">Đang có sẵn</p>
          <p className="text-3xl font-bold text-green-600">
            {doctors.filter((d) => d.status === 'available').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm">Chuyên khoa</p>
          <p className="text-3xl font-bold text-purple-600">{departments.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
            <input
              type="text"
              placeholder="Tên, chuyên khoa, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phòng ban</label>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả</option>
              <option value="available">Có sẵn</option>
              <option value="busy">Đang bận</option>
              <option value="on-leave">Đang nghỉ</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sắp xếp</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Tên (A-Z)</option>
              <option value="experience">Kinh nghiệm (nhiều nhất)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
        ) : filteredDoctors.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Không tìm thấy bác sĩ</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Tên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Chuyên khoa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Phòng ban
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Điện thoại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Kinh nghiệm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{doctor.fullName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {doctor.specialty}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doctor.department || '-'}</td>
                    <td className="px-6 py-4 text-sm text-blue-600 break-all">{doctor.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doctor.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {doctor.yearsOfExperience ? `${doctor.yearsOfExperience} năm` : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColorMap[doctor.status || 'available'] ||
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {statusLabelMap[doctor.status || 'available'] || doctor.status || 'Không xác định'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Results info */}
      {filteredDoctors.length > 0 && (
        <div className="text-sm text-gray-600">
          Hiển thị <span className="font-semibold">{filteredDoctors.length}</span> trong{' '}
          <span className="font-semibold">{doctors.length}</span> bác sĩ
        </div>
      )}
    </div>
  );
}

