import { Patient } from './src/models/patient';
import { Doctor, Role } from './src/models/doctor';
import patientsData from './patient-data';

// Array Utilities with Generics
export function addItem<T extends { id: string }>(array: T[], item: T): T[] {
  const idStr = String(item.id);
  if (array.some(p => String(p.id) === idStr)) {
    throw new Error('Phần tử đã tồn tại.');
  }
  return [...array, { ...item, id: idStr }];
}

export function updateItem<T extends { id: string }>(
  array: T[],
  id: string,
  updates: Partial<T>
): T[] {
  const idStr = String(id);
  if (!array.some(p => String(p.id) === idStr)) {
    throw new Error('Phần tử không tồn tại.');
  }
  return array.map(p => (String(p.id) === idStr ? { ...p, ...updates } : p));
}

export function deleteItem<T extends { id: string }>(array: T[], id: string): T[] {
  const idStr = String(id);
  const filtered = array.filter(p => String(p.id) !== idStr);
  if (filtered.length === array.length) {
    throw new Error('Phần tử không tồn tại.');
  }
  return filtered;
}


// Sử dụng với bệnh nhân
const newPatient: Patient = { id: '4', name: 'Phạm Văn D', age: 35, gender: 'male', diagnosis: 'High Blood Pressure' };
const newPatients = addItem<Patient>(patientsData, newPatient);
console.log('Sau khi thêm:', newPatients);


// Sử dụng với bác sĩ
const doctors: Doctor[] = [
  { id: 'd1', name: 'Dr. A', specialty: 'Cardiology', role: Role.Doctor }
];
const newDoctor: Doctor = { id: 'd2', name: 'Dr. B', specialty: 'Dermatology', role: Role.Doctor };
const newDoctors = addItem<Doctor>(doctors, newDoctor);
console.log('Danh sách bác sĩ:', newDoctors);