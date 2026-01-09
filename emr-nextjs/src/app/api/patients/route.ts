import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function GET() {
  try {
    // Gọi backend NestJS để lấy dữ liệu bệnh nhân từ MongoDB
    const response = await fetch(`${BACKEND_URL}/patients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const patients = await response.json();

    // Transform dữ liệu từ MongoDB sang format frontend
    const transformedPatients = patients.map((patient: any) => ({
      id: patient._id || patient.id,
      name: patient.fullName,
      age: calculateAge(patient.dob),
      gender: patient.gender === 'male' ? 'Nam' : 'Nữ',
      phone: patient.phone,
      address: patient.address,
      email: patient.email,
      medicalHistory: patient.medicalHistory?.join(', ') || 'Không',
    }));

    return NextResponse.json(transformedPatients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}

// Hàm tính tuổi từ ngày sinh
function calculateAge(dob: string): number {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
