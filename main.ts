import { Patient } from './models/patient';
import { Doctor, Role } from './models/doctor';
import patientsData from './patient-data';

// Kiểm tra tuổi bệnh nhân hợp lệ (type guard cơ bản)
export function checkAge(patient: Patient): boolean {
  return typeof patient.age === 'number' && patient.age > 0;
}
// Decorator để log action
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Action: ${propertyKey}, Args:`, args);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

// Định nghĩa model MedicalRecord
export interface MedicalRecord {
  id: string;
  patientId: string;
  date: Date;
  diagnosis: string;
}

// Sử dụng Pick cho view ngắn gọn
type MedicalRecordShortView = Pick<MedicalRecord, 'id' | 'date'>;

// Class quản lý bệnh nhân với decorator và Partial
class PatientManager {
  patients: Patient[] = [];

  @Log
  addPatient(patient: Patient) {
    this.patients = addItem(this.patients, patient);
  }

  updatePatient(id: string, updates: Partial<Patient>) {
    this.patients = updateItem(this.patients, id, updates);
  }
}

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